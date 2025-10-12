# Data Model: Website Content Management System

**Date**: 2025-01-20
**Purpose**: Database schema and data relationships for CMS implementation

## Core Entities

### Users (Admin Authentication)
**Table**: `users`
- `id` (UUID, Primary Key)
- `email` (Text, Unique, Not Null)
- `role` (Enum: 'admin' | 'editor' | 'viewer', Not Null)
- `name` (Text)
- `created_at` (Timestamp, Default: NOW())
- `updated_at` (Timestamp, Default: NOW())
- `last_login` (Timestamp)
- `is_active` (Boolean, Default: true)

### Content Sections
**Table**: `content_sections`
- `id` (UUID, Primary Key)
- `section_type` (Enum: 'navbar' | 'hero' | 'marquee_clients' | 'about' | 'services' | 'portfolio' | 'digital_partners' | 'cta' | 'footer', Not Null)
- `title` (Text)
- `status` (Enum: 'draft' | 'published', Default: 'draft')
- `content` (JSON, Not Null) - Section-specific content fields
- `created_by` (UUID, Foreign Key: users.id)
- `created_at` (Timestamp, Default: NOW())
- `updated_at` (Timestamp, Default: NOW())
- `published_at` (Timestamp)
- `version` (Integer, Default: 1)
- `locked_by` (UUID, Foreign Key: users.id, Nullable) - For pessimistic locking
- `locked_until` (Timestamp, Nullable)

### Media Assets
**Table**: `media_assets`
- `id` (UUID, Primary Key)
- `filename` (Text, Not Null)
- `original_name` (Text, Not Null)
- `mime_type` (Text, Not Null)
- `size_bytes` (Integer, Not Null)
- `width` (Integer)
- `height` (Integer)
- `alt_text` (Text)
- `supabase_path` (Text, Not Null) - Storage bucket path
- `supabase_url` (Text, Not Null) - Public URL
- `created_by` (UUID, Foreign Key: users.id)
- `created_at` (Timestamp, Default: NOW())
- `updated_at` (Timestamp, Default: NOW())

### Content Versions (History)
**Table**: `content_versions`
- `id` (UUID, Primary Key)
- `section_id` (UUID, Foreign Key: content_sections.id)
- `content` (JSON, Not Null)
- `version_number` (Integer, Not Null)
- `created_by` (UUID, Foreign Key: users.id)
- `created_at` (Timestamp, Default: NOW())
- `change_summary` (Text)

## Content Section Schemas

### Navbar Content
```json
{
  "logo": {
    "media_id": "UUID",
    "alt_text": "string",
    "height": "integer"
  },
  "navigation_items": [
    {
      "label": "string",
      "href": "string",
      "is_external": "boolean"
    }
  ]
}
```

### Hero Content
```json
{
  "headline": "string",
  "subheadline": "string",
  "background_image": {
    "media_id": "UUID",
    "alt_text": "string"
  },
  "cta_buttons": [
    {
      "text": "string",
      "href": "string",
      "variant": "primary | secondary",
      "is_external": "boolean"
    }
  ]
}
```

### Marquee Clients Content
```json
{
  "clients": [
    {
      "id": "string",
      "name": "string",
      "logo": {
        "media_id": "UUID",
        "alt_text": "string"
      },
      "website_url": "string"
    }
  ]
}
```

### About Content
```json
{
  "headline": "string",
  "description": "string",
  "sections": [
    {
      "type": "text | image | team",
      "content": "string",
      "media_id": "UUID",
      "team_members": [
        {
          "name": "string",
          "role": "string",
          "bio": "string",
          "image_id": "UUID"
        }
      ]
    }
  ]
}
```

### Services Content
```json
{
  "headline": "string",
  "subheadline": "string",
  "services": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "icon": "string",
      "features": ["string"]
    }
  ]
}
```

### Portfolio Content
```json
{
  "headline": "string",
  "subheadline": "string",
  "projects": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "category": "string",
      "client": "string",
      "year": "string",
      "technologies": ["string"],
      "images": [
        {
          "media_id": "UUID",
          "alt_text": "string",
          "is_primary": "boolean"
        }
      ],
      "project_url": "string",
      "sort_order": "integer"
    }
  ]
}
```

### Digital Partners Content
```json
{
  "headline": "string",
  "subheadline": "string",
  "partners": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "logo": {
        "media_id": "UUID",
        "alt_text": "string"
      },
      "website_url": "string",
      "partnership_type": "string"
    }
  ]
}
```

### CTA Content
```json
{
  "headline": "string",
  "subheadline": "string",
  "background_image": {
    "media_id": "UUID",
    "alt_text": "string"
  },
  "button": {
    "text": "string",
    "href": "string",
    "variant": "primary | secondary"
  }
}
```

### Footer Content
```json
{
  "copyright_text": "string",
  "social_links": [
    {
      "platform": "string",
      "url": "string",
      "icon": "string"
    }
  ],
  "footer_links": [
    {
      "category": "string",
      "links": [
        {
          "label": "string",
          "href": "string"
        }
      ]
    }
  ],
  "contact_info": {
    "email": "string",
    "phone": "string",
    "address": "string"
  }
}
```

## Relationships

1. **Users → Content Sections**: One-to-Many (created_by)
2. **Users → Media Assets**: One-to-Many (created_by)
3. **Content Sections → Content Versions**: One-to-Many
4. **Content Sections → Media Assets**: Many-to-Many (via JSON content references)
5. **Users → Content Sections**: One-to-Many (locked_by for concurrent editing)

## Validation Rules

### Content Sections
- `section_type` must be one of the 9 valid section types
- `content` JSON must validate against section-specific schema
- `status` cannot be 'published' if required fields are missing
- Only one section can be published per `section_type`

### Media Assets
- `filename` must be unique
- `size_bytes` must be ≤ 5MB (5,242,880 bytes)
- Supported MIME types: image/jpeg, image/png, image/webp
- `alt_text` is required for all images

### Content Versions
- `version_number` must be sequential
- `content` JSON must be valid
- `change_summary` is required for audit trail

## Indexes

- `content_sections`: (section_type, status)
- `content_sections`: (created_by)
- `content_sections`: (locked_by)
- `media_assets`: (created_by)
- `content_versions`: (section_id, version_number)
- `users`: (email)
- `users`: (role)

## Constraints

1. **Unique section types**: Only one active section per type
2. **Media cleanup**: Media assets cannot be deleted if referenced in published content
3. **Version limits**: Maximum 100 versions per content section
4. **Lock timeout**: Content locks expire after 30 minutes
5. **File size**: Maximum 5MB per media asset
6. **Concurrent editing**: Pessimistic locking prevents simultaneous edits

## Data Flow

1. **Content Creation**: Users create drafts → content validated → saved with 'draft' status
2. **Content Publishing**: Draft reviewed → status changed to 'published' → content version created
3. **Media Upload**: Files uploaded to Supabase Storage → metadata saved → URLs generated
4. **Content Editing**: Section locked → modifications made → version created → lock released
5. **Content Display**: Public API fetches published content → cached → served to website

## Performance Considerations

- **Content caching**: Published content cached for 5 minutes
- **Media optimization**: Images automatically resized and compressed
- **Lazy loading**: Large content sections loaded on demand
- **Database pooling**: Connection pooling for concurrent user support
- **Index optimization**: Strategic indexes for common query patterns