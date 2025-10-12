# CMS Setup Guide

This guide will help you set up the Content Management System (CMS) for your website.

## Prerequisites

1. **Node.js 18+** - Make sure you have Node.js installed
2. **Supabase Account** - Create a free account at [supabase.com](https://supabase.com)
3. **Git** - For version control

## Quick Setup

### 1. Automated Setup

Run the automated setup script:

```bash
npm run setup
```

This will:
- Copy environment file template
- Install dependencies
- Check TypeScript compilation
- Test the build

### 2. Manual Setup

If you prefer manual setup:

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Check TypeScript types
npm run type-check

# Test build
npm run build
```

## Supabase Configuration

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project name: `your-website-cms`
5. Set a strong database password
6. Choose a region closest to you
7. Click "Create new project"

### 2. Get Your Credentials

Once your project is ready:

1. Go to Settings → API
2. Copy the **Project URL** - this is your `NEXT_PUBLIC_SUPABASE_URL`
3. Copy the **anon public** key - this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Copy the **service_role** key - this is your `SUPABASE_SERVICE_ROLE_KEY`

### 3. Configure Environment Variables

Edit your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Better Auth Configuration
BETTER_AUTH_SECRET=generate-a-secure-32-character-secret-key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Development Mode
NODE_ENV=development
```

### 4. Set Up Database

1. Go to the Supabase Dashboard
2. Click on "SQL Editor"
3. Copy and paste the contents of `lib/db/migrations/001_initial_schema.sql`
4. Click "Run" to execute the migration

This will create:
- `users` table for authentication
- `content_sections` table for CMS content
- `media_assets` table for uploaded images
- `content_versions` table for version history
- Proper indexes and Row Level Security policies

### 5. Set Up Storage

1. Go to Storage in the Supabase Dashboard
2. Create a new bucket named `cms-media`
3. Set up CORS policies if needed

## Development

### Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Main Website**: http://localhost:3000
- **Admin Interface**: http://localhost:3000/admin

### Development Authentication

In development mode, the authentication system automatically bypasses login and uses a development admin user:
- Email: `admin@example.com`
- Role: `admin`

## Features

### Admin Interface

The admin interface provides management for:

- **Navbar**: Navigation items and logo
- **Hero Section**: Headline, subheadline, and CTA buttons
- **Marquee Clients**: Client logos and testimonials
- **About**: Company information and team members
- **Services**: Service descriptions and features
- **Portfolio**: Project showcase
- **Digital Partners**: Partner information
- **CTA Section**: Call-to-action content
- **Footer**: Footer content and links
- **Media Library**: Image upload and management

### Key Features

- **Development Bypass**: Auto-login in development mode
- **Production Authentication**: Secure login in production
- **Role-Based Access**: Admin, Editor, Viewer roles
- **Version History**: Track content changes
- **Pessimistic Locking**: Prevent concurrent editing
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Image Optimization**: Automatic image processing

## API Endpoints

### Admin APIs
- `GET /api/admin/sections` - List all content sections
- `POST /api/admin/sections` - Create new content section
- `GET /api/admin/sections/{type}` - Get specific section
- `PUT /api/admin/sections/{type}` - Update section
- `POST /api/admin/sections/{type}/publish` - Publish section

### Public APIs
- `GET /api/content/sections` - Get all published sections
- `GET /api/content/sections/{type}` - Get specific published section

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Check TypeScript types: `npm run type-check`
2. Check ESLint: `npm run lint`
3. Ensure all environment variables are set

### Database Connection Issues

1. Verify Supabase credentials in `.env.local`
2. Check if Supabase project is active
3. Ensure database tables were created successfully

### Authentication Issues

In development mode, authentication should be bypassed automatically. If it's not working:

1. Check `NODE_ENV=development` is set
2. Verify Better Auth configuration
3. Check browser console for errors

## Production Deployment

For production deployment:

1. Set production environment variables
2. Configure Better Auth with production URL
3. Ensure Supabase production project is set up
4. Run database migrations on production
5. Disable development bypass (automatic)

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify environment variables are correctly set
3. Ensure Supabase project is properly configured
4. Review the database schema in Supabase Dashboard

## Next Steps

Once setup is complete:

1. Visit the admin interface at `/admin`
2. Start editing your content sections
3. Upload images through the media library
4. Publish changes to make them live on your website
5. Test responsive design on different devices