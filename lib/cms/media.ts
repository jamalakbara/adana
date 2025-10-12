// Media management utilities for the CMS
import { createServerClient } from '@/lib/db';
import { CONSTRAINTS, SUPPORTED_MIME_TYPES } from '@/lib/db/schema';

// Media types
export interface MediaAsset {
  id: string;
  filename: string;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  width: number | null;
  height: number | null;
  alt_text: string | null;
  supabase_path: string;
  supabase_url: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface MediaAssetInsert {
  filename: string;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  width?: number | null;
  height?: number | null;
  alt_text?: string | null;
  supabase_path: string;
  supabase_url: string;
  created_by?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface MediaAssetUpdate {
  alt_text?: string | null;
  updated_at?: string;
}

export interface UploadResult {
  success: boolean;
  asset?: MediaAsset;
  error?: string;
}

export interface MediaUploadOptions {
  altText?: string;
  userId?: string;
  optimize?: boolean;
}

// Media management class
export class MediaManager {
  private supabase = createServerClient();
  private bucketName = 'cms-media';

  /**
   * Upload a file to Supabase Storage and create database record
   */
  async uploadFile(
    file: File,
    options: MediaUploadOptions = {}
  ): Promise<UploadResult> {
    try {
      // Ensure storage bucket exists
      await this.ensureStorageBucket();

      // Validate file
      const validation = this.validateFile(file);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.error,
        };
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2);
      const filename = `${timestamp}-${randomId}.${fileExt}`;
      const filePath = `uploads/${filename}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await this.supabase
        .storage
        .from(this.bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        return {
          success: false,
          error: `Upload failed: ${uploadError.message}`,
        };
      }

      // Get public URL
      const { data: urlData } = this.supabase
        .storage
        .from(this.bucketName)
        .getPublicUrl(filePath);

      // Get image dimensions if it's an image
      const dimensions = await this.getImageDimensions(file);

      // Create database record
      const mediaData: MediaAssetInsert = {
        filename,
        original_name: file.name,
        mime_type: file.type,
        size_bytes: file.size,
        width: dimensions?.width || null,
        height: dimensions?.height || null,
        alt_text: options.altText || null,
        supabase_path: filePath,
        supabase_url: urlData.publicUrl,
        created_by: options.userId || null, // Make it nullable for development
      };

      const { data: asset, error: dbError } = await this.supabase
        .from('media_assets')
        .insert(mediaData)
        .select()
        .single();

      if (dbError) {
        // If database insert fails, clean up uploaded file
        await this.supabase
          .storage
          .from(this.bucketName)
          .remove([filePath]);

        return {
          success: false,
          error: `Database insert failed: ${dbError.message}`,
        };
      }

      return {
        success: true,
        asset,
      };
    } catch (error) {
      return {
        success: false,
        error: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Get all media assets with pagination and filtering
   */
  async getMediaAssets(options: {
    limit?: number;
    offset?: number;
    search?: string;
    mimeType?: string;
  } = {}): Promise<{ assets: MediaAsset[]; total: number }> {
    let query = this.supabase
      .from('media_assets')
      .select('*', { count: 'exact' });

    // Apply search filter
    if (options.search) {
      query = query.or(`original_name.ilike.%${options.search}%,alt_text.ilike.%${options.search}%`);
    }

    // Apply MIME type filter
    if (options.mimeType) {
      query = query.eq('mime_type', options.mimeType);
    }

    // Apply ordering
    query = query.order('created_at', { ascending: false });

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data: assets, error, count } = await query;

    if (error) {
      throw new Error(`Failed to fetch media assets: ${error.message}`);
    }

    return {
      assets: assets || [],
      total: count || 0,
    };
  }

  /**
   * Get a specific media asset by ID
   */
  async getMediaAsset(id: string): Promise<MediaAsset | null> {
    const { data, error } = await this.supabase
      .from('media_assets')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch media asset: ${error.message}`);
    }

    return data;
  }

  /**
   * Update media asset metadata
   */
  async updateMediaAsset(
    id: string,
    data: MediaAssetUpdate
  ): Promise<MediaAsset> {
    const updateData = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    const { data: asset, error } = await this.supabase
      .from('media_assets')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update media asset: ${error.message}`);
    }

    return asset;
  }

  /**
   * Delete a media asset (both from database and storage)
   */
  async deleteMediaAsset(id: string): Promise<void> {
    // Get the asset first to get the file path
    const asset = await this.getMediaAsset(id);
    if (!asset) {
      throw new Error('Media asset not found');
    }

    // Delete from database
    const { error: dbError } = await this.supabase
      .from('media_assets')
      .delete()
      .eq('id', id);

    if (dbError) {
      throw new Error(`Failed to delete media asset record: ${dbError.message}`);
    }

    // Delete from storage
    const { error: storageError } = await this.supabase
      .storage
      .from(this.bucketName)
      .remove([asset.supabase_path]);

    if (storageError) {
      console.warn(`Warning: Failed to delete file from storage: ${storageError.message}`);
      // Don't throw error since database record is deleted
    }
  }

  /**
   * Get media assets by type (image, video, etc.)
   */
  async getMediaAssetsByType(mimeType: string): Promise<MediaAsset[]> {
    const { data, error } = await this.supabase
      .from('media_assets')
      .select('*')
      .eq('mime_type', mimeType)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch media assets by type: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get all images
   */
  async getImages(): Promise<MediaAsset[]> {
    const imageTypes = SUPPORTED_MIME_TYPES.filter(type => type.startsWith('image/'));
    const { data, error } = await this.supabase
      .from('media_assets')
      .select('*')
      .in('mime_type', imageTypes)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch images: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Validate file before upload
   */
  private validateFile(file: File): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > CONSTRAINTS.MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File size ${file.size} exceeds maximum allowed size of ${CONSTRAINTS.MAX_FILE_SIZE} bytes`,
      };
    }

    // Check MIME type
    if (!SUPPORTED_MIME_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not supported`,
      };
    }

    return { valid: true };
  }

  /**
   * Get image dimensions using browser Image API
   */
  private async getImageDimensions(file: File): Promise<{ width: number; height: number } | null> {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof Image === 'undefined') {
      // Server-side - skip dimension detection for now
      // Could implement server-side image processing libraries if needed
      return null;
    }

    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        resolve(null);
        return;
      }

      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(null);
      };

      img.src = objectUrl;
    });
  }

  /**
   * Generate a thumbnail URL for an image
   */
  generateThumbnailUrl(asset: MediaAsset, width = 300, height = 300): string {
    if (!asset.supabase_url) return '';

    // For Supabase, we can use image transformations
    // This is a basic implementation - in production you might want to use a CDN
    return asset.supabase_url;
  }

  /**
   * Get formatted file size
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Check if file is an image
   */
  static isImage(mimeType: string): boolean {
    return mimeType.startsWith('image/');
  }

  /**
   * Get file extension from MIME type
   */
  static getFileExtension(mimeType: string): string {
    const mimeToExt: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif',
      'application/pdf': 'pdf',
    };

    return mimeToExt[mimeType] || 'bin';
  }

  /**
   * Create Supabase Storage bucket if it doesn't exist
   */
  async ensureStorageBucket(): Promise<void> {
    try {
      const { error } = await this.supabase
        .storage
        .getBucket(this.bucketName);

      if (error && error.message?.includes('does not exist')) {
        // Bucket doesn't exist, create it
        const { error: createError } = await this.supabase
          .storage
          .createBucket(this.bucketName, {
            public: true,
            allowedMimeTypes: SUPPORTED_MIME_TYPES,
            fileSizeLimit: CONSTRAINTS.MAX_FILE_SIZE,
          });

        if (createError) {
          console.warn(`Warning: Failed to create storage bucket: ${createError.message}`);
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not check storage bucket: ${error}`);
    }
  }
}

// Export singleton instance
export const mediaManager = new MediaManager();