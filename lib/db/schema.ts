// Database schema definitions for validation and type safety
// These correspond to the database tables defined in the migration

export const SECTION_TYPES = [
  'navbar',
  'hero',
  'marquee_clients',
  'about',
  'services',
  'portfolio',
  'digital_partners',
  'cta',
  'footer'
] as const;

export type SectionType = typeof SECTION_TYPES[number];

export const USER_ROLES = [
  'admin',
  'editor',
  'viewer'
] as const;

export type UserRole = typeof USER_ROLES[number];

export const CONTENT_STATUS = [
  'draft',
  'published'
] as const;

export type ContentStatus = typeof CONTENT_STATUS[number];

export const SUPPORTED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif'
] as const;

export type SupportedMimeType = typeof SUPPORTED_MIME_TYPES[number];

export const PARTNERSHIP_TYPES = [
  'technology',
  'integration',
  'reseller',
  'strategic'
] as const;

export type PartnershipType = typeof PARTNERSHIP_TYPES[number];

export const SOCIAL_PLATFORMS = [
  'twitter',
  'linkedin',
  'github',
  'instagram',
  'facebook'
] as const;

export type SocialPlatform = typeof SOCIAL_PLATFORMS[number];

export const BUTTON_VARIANTS = [
  'primary',
  'secondary'
] as const;

export type ButtonVariant = typeof BUTTON_VARIANTS[number];

export const SCROLL_SPEEDS = [
  'slow',
  'medium',
  'fast'
] as const;

export type ScrollSpeed = typeof SCROLL_SPEEDS[number];

// Database table names
export const TABLES = {
  USERS: 'users',
  CONTENT_SECTIONS: 'content_sections',
  MEDIA_ASSETS: 'media_assets',
  CONTENT_VERSIONS: 'content_versions'
} as const;

// Constants for validation
export const CONSTRAINTS = {
  // File size limits (in bytes)
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB

  // String length limits
  MAX_EMAIL_LENGTH: 255,
  MAX_NAME_LENGTH: 100,
  MAX_TITLE_LENGTH: 200,
  MAX_FILENAME_LENGTH: 255,
  MAX_ALT_TEXT_LENGTH: 500,

  // Numeric limits
  MAX_VERSION_NUMBER: 999999,
  MIN_LOCK_DURATION_MINUTES: 5,
  MAX_LOCK_DURATION_MINUTES: 120,

  // Array limits
  MAX_NAVIGATION_ITEMS: 10,
  MAX_CTA_BUTTONS: 3,
  MAX_CLIENTS: 50,
  MAX_FEATURES: 10,
  MAX_TEAM_MEMBERS: 20,
  MAX_SERVICES: 20,
  MAX_PROJECTS: 100,
  MAX_PARTNERS: 50,
  MAX_SOCIAL_LINKS: 10,
  MAX_IMAGES_PER_PROJECT: 10,
  MAX_PROJECT_TAGS: 10,
} as const;

// Default lock duration in minutes
export const DEFAULT_LOCK_DURATION = 30;