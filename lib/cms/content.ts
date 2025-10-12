// Content management utilities for the CMS
import { createServerClient } from '@/lib/db';
import type { SectionType, ContentStatus, Json } from '@/types/database';
import { DEFAULT_LOCK_DURATION } from '@/lib/db/schema';
import { validateSectionContentSafe, getDefaultSectionContent } from './validation';

// Basic types (simplified for now)
export interface ContentSection {
  id: string;
  section_type: SectionType;
  title: string | null;
  status: ContentStatus;
  content: Json;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  version: number;
  locked_by: string | null;
  locked_until: string | null;
}

export interface ContentVersion {
  id: string;
  section_id: string;
  content: Json;
  version_number: number;
  created_by: string | null;
  created_at: string;
  change_summary: string | null;
}

// Content management class
export class ContentManager {
  private _supabase: ReturnType<typeof createServerClient> | null = null;

  private get supabase() {
    if (!this._supabase) {
      this._supabase = createServerClient();
    }
    return this._supabase;
  }

  /**
   * Get all content sections
   */
  async getAllSections(status?: ContentStatus): Promise<ContentSection[]> {
    let query = this.supabase
      .from('content_sections')
      .select('*')
      .order('section_type', { ascending: true });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch content sections: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get a specific content section by type
   */
  async getSection(sectionType: SectionType): Promise<ContentSection | null> {
    const { data, error } = await this.supabase
      .from('content_sections')
      .select('*')
      .eq('section_type', sectionType)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch ${sectionType} section: ${error.message}`);
    }

    return data;
  }

  /**
   * Get the published version of a content section
   */
  async getPublishedSection(sectionType: SectionType): Promise<ContentSection | null> {
    const { data, error } = await this.supabase
      .from('content_sections')
      .select('*')
      .eq('section_type', sectionType)
      .eq('status', 'published')
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch published ${sectionType} section: ${error.message}`);
    }

    return data;
  }

  /**
   * Validate content before saving
   */
  private validateContent(sectionType: SectionType, content: unknown): { success: boolean; errors?: string[] } {
    const validation = validateSectionContentSafe(sectionType, content);
    if (!validation.success) {
      return { success: false, errors: validation.error };
    }
    return { success: true };
  }

  /**
   * Create or update a content section with validation
   */
  async upsertSection(
    sectionType: SectionType,
    data: Partial<ContentSection>,
    userId?: string
  ): Promise<ContentSection> {
    // Validate content if provided
    if (data.content !== undefined) {
      const validation = this.validateContent(sectionType, data.content);
      if (!validation.success) {
        throw new Error(`Content validation failed: ${validation.errors?.join(', ')}`);
      }
    }

    // Check if section exists
    const existing = await this.getSection(sectionType);

    if (existing) {
      // Update existing section
      const updateData = {
        ...data,
        updated_at: new Date().toISOString(),
      };

      const { data: result, error } = await this.supabase
        .from('content_sections')
        .update(updateData)
        .eq('section_type', sectionType)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update ${sectionType} section: ${error.message}`);
      }

      return result;
    } else {
      // Create new section
      const insertData = {
        section_type: sectionType,
        status: 'draft',
        content: data.content || getDefaultSectionContent(sectionType),
        created_by: userId,
        ...data,
      };

      const { data: result, error } = await this.supabase
        .from('content_sections')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create ${sectionType} section: ${error.message}`);
      }

      return result;
    }
  }

  /**
   * Acquire a lock for a content section (alias for lockSection)
   */
  async acquireLock(
    sectionType: SectionType,
    userId: string,
    durationMinutes: number = DEFAULT_LOCK_DURATION
  ): Promise<{ success: boolean; lockInfo?: { locked_by: string; locked_at: string; locked_until: string } | null }> {
    try {
      const result = await this.lockSection(sectionType, userId, durationMinutes);

      if (result.locked) {
        return {
          success: true,
          lockInfo: {
            locked_by: userId,
            locked_at: new Date().toISOString(),
            locked_until: result.lockedUntil!
          }
        };
      } else {
        const existingSection = await this.getSection(sectionType);
        return {
          success: false,
          lockInfo: existingSection ? {
            locked_by: existingSection.locked_by!,
            locked_at: existingSection.updated_at!,
            locked_until: existingSection.locked_until!
          } : null
        };
      }
    } catch (error) {
      return {
        success: false,
        lockInfo: null
      };
    }
  }

  /**
   * Get content section with proper error handling
   */
  async getContentSection(sectionType: SectionType): Promise<{ success: boolean; data?: ContentSection; error?: string }> {
    try {
      const data = await this.getSection(sectionType);

      if (data) {
        return { success: true, data };
      } else {
        // Return default content if none exists
        const defaultContent = getDefaultSectionContent(sectionType);
        const defaultSection: ContentSection = {
          id: `temp-${sectionType}`,
          section_type: sectionType,
          title: sectionType.charAt(0).toUpperCase() + sectionType.slice(1),
          status: 'draft',
          content: defaultContent,
          created_by: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published_at: null,
          version: 1,
          locked_by: null,
          locked_until: null
        };

        return { success: true, data: defaultSection };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get content section'
      };
    }
  }

  /**
   * Update a content section
   */
  async updateContentSection(sectionType: SectionType, content: Json): Promise<{ success: boolean; data?: ContentSection; error?: string }> {
    try {
      const data = await this.upsertSection(sectionType, { content });
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update content section'
      };
    }
  }

  /**
   * Publish a content section
   */
  async publishContentSection(sectionType: SectionType): Promise<{ success: boolean; data?: ContentSection; error?: string }> {
    try {
      const data = await this.upsertSection(sectionType, { status: 'published', published_at: new Date().toISOString() });
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to publish content section'
      };
    }
  }

  /**
   * Lock a content section for editing (pessimistic locking)
   */
  async lockSection(
    sectionType: SectionType,
    userId: string,
    durationMinutes: number = DEFAULT_LOCK_DURATION
  ): Promise<{ locked: boolean; lockedUntil: string | null }> {
    const lockedUntil = new Date(Date.now() + durationMinutes * 60 * 1000).toISOString();

    // First check if section is already locked
    const section = await this.getSection(sectionType);

    if (section?.locked_by && section.locked_until) {
      // Check if lock is still valid
      if (new Date(section.locked_until) > new Date() && section.locked_by !== userId) {
        return {
          locked: false,
          lockedUntil: section.locked_until,
        };
      }
    }

    // Try to acquire lock
    const { error } = await this.supabase
      .from('content_sections')
      .update({
        locked_by: userId,
        locked_until: lockedUntil,
        updated_at: new Date().toISOString(),
      })
      .eq('section_type', sectionType)
      .or(`locked_by.is.null,locked_until.lt.${new Date().toISOString()}`);

    if (error) {
      throw new Error(`Failed to lock ${sectionType} section: ${error.message}`);
    }

    // Verify lock was acquired
    const updated = await this.getSection(sectionType);
    const lockAcquired = updated?.locked_by === userId;

    return {
      locked: lockAcquired,
      lockedUntil: lockAcquired ? lockedUntil : null,
    };
  }

  /**
   * Unlock a content section
   */
  async unlockSection(sectionType: SectionType, userId: string): Promise<void> {
    const { error } = await this.supabase
      .from('content_sections')
      .update({
        locked_by: null,
        locked_until: null,
        updated_at: new Date().toISOString(),
      })
      .eq('section_type', sectionType)
      .eq('locked_by', userId);

    if (error) {
      throw new Error(`Failed to unlock ${sectionType} section: ${error.message}`);
    }
  }

  /**
   * Publish a content section
   */
  async publishSection(sectionType: SectionType, userId?: string): Promise<ContentSection> {
    // Get current section
    const section = await this.getSection(sectionType);
    if (!section) {
      throw new Error(`Section ${sectionType} not found`);
    }

    // Create version history entry
    if (userId) {
      await this.createVersionHistory(section.id, section.content, userId, 'Published changes');
    }

    // Update section status
    const { data: result, error } = await this.supabase
      .from('content_sections')
      .update({
        status: 'published',
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('section_type', sectionType)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to publish ${sectionType} section: ${error.message}`);
    }

    return result;
  }

  /**
   * Create a version history entry
   */
  async createVersionHistory(
    sectionId: string,
    content: unknown,
    userId: string,
    _changeSummary?: string
  ): Promise<ContentVersion> {
    // Get current version number
    const { data: currentVersion } = await this.supabase
      .from('content_versions')
      .select('version_number')
      .eq('section_id', sectionId)
      .order('version_number', { ascending: false })
      .limit(1)
      .single();

    const newVersionNumber = (currentVersion?.version_number || 0) + 1;

    const versionData = {
      section_id: sectionId,
      content: content as Json,
      version_number: newVersionNumber,
      created_by: userId,
      change_summary: _changeSummary,
    };

    const { data: result, error } = await this.supabase
      .from('content_versions')
      .insert(versionData)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create version history: ${error.message}`);
    }

    // Update section version number
    await this.supabase
      .from('content_sections')
      .update({ version: newVersionNumber })
      .eq('id', sectionId);

    return result;
  }

  /**
   * Get version history for a section
   */
  async getVersionHistory(sectionId: string): Promise<ContentVersion[]> {
    const { data, error } = await this.supabase
      .from('content_versions')
      .select('*')
      .eq('section_id', sectionId)
      .order('version_number', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch version history: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Revert a section to a previous version
   */
  async revertToVersion(
    sectionId: string,
    versionNumber: number,
    userId: string
  ): Promise<ContentSection> {
    // Get the version to revert to
    const { data: version, error: versionError } = await this.supabase
      .from('content_versions')
      .select('*')
      .eq('section_id', sectionId)
      .eq('version_number', versionNumber)
      .single();

    if (versionError || !version) {
      throw new Error(`Version ${versionNumber} not found`);
    }

    // Create current version snapshot before reverting
    const { data: currentSection } = await this.supabase
      .from('content_sections')
      .select('content')
      .eq('id', sectionId)
      .single();

    if (currentSection) {
      await this.createVersionHistory(
        sectionId,
        currentSection.content,
        userId,
        `Snapshot before reverting to v${versionNumber}`
      );
    }

    // Update section with version content
    const { data: result, error } = await this.supabase
      .from('content_sections')
      .update({
        content: version.content as Json,
        updated_at: new Date().toISOString(),
      })
      .eq('id', sectionId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to revert to version ${versionNumber}: ${error.message}`);
    }

    return result;
  }

  /**
   * Delete a content section
   */
  async deleteSection(sectionType: SectionType): Promise<void> {
    const { error } = await this.supabase
      .from('content_sections')
      .delete()
      .eq('section_type', sectionType);

    if (error) {
      throw new Error(`Failed to delete ${sectionType} section: ${error.message}`);
    }
  }

  /**
   * Get section with lock status
   */
  async getSectionWithLockStatus(sectionType: SectionType): Promise<ContentSection & { canEdit: boolean; lockedBy?: string; lockedUntil?: string | null }> {
    const section = await this.getSection(sectionType);

    if (!section) {
      throw new Error(`Section ${sectionType} not found`);
    }

    const canEdit = !section.locked_by ||
      !section.locked_until ||
      new Date(section.locked_until) <= new Date() ||
      section.locked_by === 'dev-user-001'; // Development bypass

    return {
      ...section,
      canEdit,
      lockedBy: section.locked_by || undefined,
      lockedUntil: section.locked_until,
    };
  }

  /**
   * Get all sections with their lock status
   */
  async getAllSectionsWithLockStatus(status?: ContentStatus): Promise<Array<ContentSection & { canEdit: boolean; lockedBy?: string; lockedUntil?: string | null }>> {
    const sections = await this.getAllSections(status);

    return sections.map(section => {
      const canEdit = !section.locked_by ||
        !section.locked_until ||
        new Date(section.locked_until) <= new Date() ||
        section.locked_by === 'dev-user-001'; // Development bypass

      return {
        ...section,
        canEdit,
        lockedBy: section.locked_by || undefined,
        lockedUntil: section.locked_until,
      };
    });
  }

  /**
   * Check if section is locked
   */
  async isSectionLocked(sectionType: SectionType): Promise<boolean> {
    const section = await this.getSection(sectionType);

    if (!section) {
      return false;
    }

    return !!(section.locked_by &&
      section.locked_until &&
      new Date(section.locked_until) > new Date() &&
      section.locked_by !== 'dev-user-001'); // Development bypass
  }

  /**
   * Validate content without saving
   */
  validateContentOnly(sectionType: SectionType, content: unknown): { success: boolean; errors?: string[] } {
    return this.validateContent(sectionType, content);
  }

  /**
   * Get default content for a section type
   */
  getDefaultContent(sectionType: SectionType): Json {
    return getDefaultSectionContent(sectionType);
  }
}

// Lazy initialization factory
let contentManagerInstance: ContentManager | null = null;

export const getContentManager = (): ContentManager => {
  if (!contentManagerInstance) {
    contentManagerInstance = new ContentManager();
  }
  return contentManagerInstance;
};

// Export for backward compatibility (but this will be lazy)
export const contentManager = getContentManager();