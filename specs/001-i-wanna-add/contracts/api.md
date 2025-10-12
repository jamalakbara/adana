# API Contracts: Website Content Management System

**Format**: RESTful API with OpenAPI 3.0 specification
**Base URL**: `/api`

## Authentication

All admin endpoints require authentication via Better Auth session.
Development bypass available for local development.

## Admin API Endpoints

### Content Sections Management

#### GET /api/admin/sections
Get all content sections for the admin interface.

**Response:**
```json
{
  "sections": [
    {
      "id": "uuid",
      "section_type": "hero",
      "title": "Hero Section",
      "status": "published",
      "locked_by": null,
      "locked_until": null,
      "updated_at": "2025-01-20T10:00:00Z"
    }
  ]
}
```

#### GET /api/admin/sections/{section_type}
Get a specific content section by type.

**Parameters:**
- `section_type` (path): navbar | hero | marquee_clients | about | services | portfolio | digital_partners | cta | footer

**Response:**
```json
{
  "id": "uuid",
  "section_type": "hero",
  "title": "Hero Section",
  "status": "published",
  "content": {
    "headline": "Welcome to Our Website",
    "subheadline": "We build amazing things",
    "background_image": {
      "media_id": "uuid",
      "alt_text": "Hero background"
    },
    "cta_buttons": [...]
  },
  "created_by": "uuid",
  "created_at": "2025-01-20T10:00:00Z",
  "updated_at": "2025-01-20T11:00:00Z",
  "published_at": "2025-01-20T11:30:00Z",
  "version": 3,
  "locked_by": null,
  "locked_until": null
}
```

#### POST /api/admin/sections/{section_type}/lock
Lock a content section for editing (pessimistic locking).

**Request:**
```json
{
  "lock_duration_minutes": 30
}
```

**Response:**
```json
{
  "locked": true,
  "locked_until": "2025-01-20T11:30:00Z",
  "locked_by": "user@email.com"
}
```

#### PUT /api/admin/sections/{section_type}
Update a content section.

**Request:**
```json
{
  "title": "Updated Hero Section",
  "content": {
    "headline": "New Headline",
    "subheadline": "New Subheadline",
    "background_image": {
      "media_id": "uuid",
      "alt_text": "New hero background"
    },
    "cta_buttons": [...]
  },
  "status": "draft"
}
```

**Response:**
```json
{
  "id": "uuid",
  "section_type": "hero",
  "version": 4,
  "updated_at": "2025-01-20T12:00:00Z"
}
```

#### POST /api/admin/sections/{section_type}/publish
Publish a content section from draft to live.

**Response:**
```json
{
  "id": "uuid",
  "section_type": "hero",
  "status": "published",
  "published_at": "2025-01-20T12:15:00Z",
  "version": 4
}
```

#### GET /api/admin/sections/{section_type}/versions
Get version history for a content section.

**Response:**
```json
{
  "versions": [
    {
      "id": "uuid",
      "version_number": 4,
      "created_by": "user@email.com",
      "created_at": "2025-01-20T12:00:00Z",
      "change_summary": "Updated headline and CTA buttons"
    }
  ]
}
```

#### POST /api/admin/sections/{section_type}/revert
Revert a content section to a previous version.

**Request:**
```json
{
  "version_number": 3,
  "reason": "Reverting to previous design"
}
```

### Media Assets Management

#### GET /api/admin/media
Get all media assets.

**Query Parameters:**
- `search` (optional): Search by filename or alt text
- `mime_type` (optional): Filter by MIME type
- `limit` (optional): Pagination limit (default: 20)
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "media": [
    {
      "id": "uuid",
      "filename": "hero-background.jpg",
      "original_name": "my-hero-image.jpg",
      "mime_type": "image/jpeg",
      "size_bytes": 1024000,
      "width": 1920,
      "height": 1080,
      "alt_text": "Hero background image",
      "supabase_url": "https://storage.supabase.co/...",
      "created_at": "2025-01-20T10:00:00Z"
    }
  ],
  "total": 45,
  "limit": 20,
  "offset": 0
}
```

#### POST /api/admin/media/upload
Upload a new media asset.

**Request**: `multipart/form-data`
- `file`: The image file (max 5MB)
- `alt_text` (optional): Alt text for accessibility

**Response:**
```json
{
  "id": "uuid",
  "filename": "generated-unique-name.jpg",
  "original_name": "my-image.jpg",
  "mime_type": "image/jpeg",
  "size_bytes": 1024000,
  "width": 1920,
  "height": 1080,
  "alt_text": "My uploaded image",
  "supabase_url": "https://storage.supabase.co/...",
  "created_at": "2025-01-20T12:30:00Z"
}
```

#### PUT /api/admin/media/{media_id}
Update media asset metadata.

**Request:**
```json
{
  "alt_text": "Updated alt text"
}
```

#### DELETE /api/admin/media/{media_id}
Delete a media asset.

**Response:**
```json
{
  "deleted": true,
  "message": "Media asset deleted successfully"
}
```

### User Management

#### GET /api/admin/users
Get all users (admin only).

**Response:**
```json
{
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "editor",
      "is_active": true,
      "last_login": "2025-01-20T09:00:00Z",
      "created_at": "2025-01-15T10:00:00Z"
    }
  ]
}
```

#### PUT /api/admin/users/{user_id}/role
Update user role (admin only).

**Request:**
```json
{
  "role": "admin"
}
```

## Public Content API

### GET /api/content/sections/{section_type}
Get published content for a specific section (public-facing).

**Parameters:**
- `section_type` (path): navbar | hero | marquee_clients | about | services | portfolio | digital_partners | cta | footer

**Response:**
```json
{
  "section_type": "hero",
  "content": {
    "headline": "Welcome to Our Website",
    "subheadline": "We build amazing things",
    "background_image": {
      "media_id": "uuid",
      "alt_text": "Hero background",
      "url": "https://storage.supabase.co/...",
      "width": 1920,
      "height": 1080
    },
    "cta_buttons": [
      {
        "text": "Get Started",
        "href": "/contact",
        "variant": "primary",
        "is_external": false
      }
    ]
  },
  "updated_at": "2025-01-20T11:00:00Z"
}
```

### GET /api/content/sections
Get all published sections in a single request.

**Response:**
```json
{
  "navbar": { ... },
  "hero": { ... },
  "marquee_clients": { ... },
  "about": { ... },
  "services": { ... },
  "portfolio": { ... },
  "digital_partners": { ... },
  "cta": { ... },
  "footer": { ... }
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "content.headline",
      "message": "Headline is required"
    }
  }
}
```

### Error Codes

- `UNAUTHORIZED`: User not authenticated or insufficient permissions
- `VALIDATION_ERROR`: Request data failed validation
- `NOT_FOUND`: Requested resource does not exist
- `CONFLICT`: Resource conflict (e.g., section already locked)
- `RATE_LIMITED`: Too many requests
- `INTERNAL_ERROR`: Server error
- `FILE_TOO_LARGE`: Upload exceeds 5MB limit
- `UNSUPPORTED_MEDIA_TYPE`: File type not supported

## Rate Limiting

- Admin endpoints: 100 requests per minute per user
- Public endpoints: 1000 requests per minute per IP
- Media upload: 10 uploads per minute per user

## Caching

- Public content endpoints: 5-minute cache
- Admin endpoints: No caching (real-time data)
- Media assets: 1-hour cache for URLs

## Security Headers

All responses include:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000` (production only)