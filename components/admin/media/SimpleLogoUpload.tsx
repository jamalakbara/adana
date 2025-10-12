"use client";

import { useState, useCallback, useRef } from "react";
import { X, FileImage, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MediaAsset {
  url?: string;
  supabase_url?: string;
  alt_text?: string;
  width?: number;
  height?: number;
  media_id?: string;
}

interface SimpleLogoUploadProps {
  value?: MediaAsset | string;
  onChange: (asset: MediaAsset | null) => void;
  className?: string;
}

export function SimpleLogoUpload({ value, onChange, className }: SimpleLogoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(
  typeof value === 'string' ? value :
  (value as MediaAsset)?.url || (value as MediaAsset)?.supabase_url || null
);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, SVG, etc.)');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Create preview immediately
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Upload to Supabase Storage
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt_text', `Logo: ${file.name}`);

      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      console.log('Upload response status:', response.status);
      console.log('Upload response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response data:', errorData);
        const errorMessage = errorData.error?.message || 'Upload failed';

        // Provide more helpful error message for common issues
        if (errorMessage.includes('Bucket not found')) {
          throw new Error('Storage bucket not found. Please set up the "cms-media" bucket in Supabase dashboard.');
        }

        throw new Error(errorMessage);
      }

      const asset = await response.json();

      console.log('Upload response:', asset); // Debug log

      if (asset && asset.supabase_url) {
        setPreview(asset.supabase_url);

        // Return media asset object in the expected format for validation
        const mediaAsset = {
          media_id: asset.id,
          alt_text: asset.alt_text || `Logo: ${asset.original_name}`,
          url: asset.supabase_url,
          width: asset.width || 200, // Default width for logos
          height: asset.height || 60, // Default height for logos
        };

        console.log('Media asset object:', mediaAsset); // Debug log
        onChange(mediaAsset);
      } else {
        console.error('Invalid asset structure:', asset);
        throw new Error('Invalid response from server: missing supabase_url');
      }
    } catch (error) {
      console.error('Upload error:', error);

      // Provide more specific error messages
      let errorMessage = 'Failed to upload image. Please try again.';

      if (error instanceof Error) {
        if (error.message.includes('Bucket not found')) {
          errorMessage = 'Storage bucket not found. Please contact administrator.';
        } else if (error.message.includes('Invalid response')) {
          errorMessage = 'Server returned invalid response. Please try again.';
        } else if (error.message.includes('File too large')) {
          errorMessage = 'File is too large. Maximum size is 5MB.';
        } else if (error.message.includes('Invalid file type')) {
          errorMessage = 'Invalid file type. Please upload an image file.';
        }
      }

      alert(errorMessage);
      // Reset preview on error
      setPreview(value?.url || value || null);
    } finally {
      setIsUploading(false);
    }
  }, [onChange, value]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    setPreview(null);
    onChange(null); // Pass null instead of empty string
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onChange]);

  const handleClick = useCallback(() => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  }, [isUploading]);

  return (
    <div className={cn("relative w-full", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        disabled={isUploading}
      />

      {preview ? (
        // Preview mode
        <div className="relative group">
          <div className="flex items-center justify-center p-4 border rounded-lg bg-muted/30">
            <img
              src={preview}
              alt="Logo preview"
              className="max-h-16 max-w-full object-contain"
            />
          </div>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute inset-0 group-hover:bg-black/5 rounded-lg transition-colors" />
        </div>
      ) : (
        // Upload area
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50",
            isUploading && "pointer-events-none opacity-60"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          {isUploading ? (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <FileImage className="h-8 w-8 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Drop logo image here</p>
                <p className="text-muted-foreground">or click to browse</p>
              </div>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, SVG up to 5MB
              </p>
            </div>
          )}
        </div>
      )}

      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Uploading...</span>
          </div>
        </div>
      )}
    </div>
  );
}