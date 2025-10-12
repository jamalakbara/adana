# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern Next.js 15 fullstack application with a complete Content Management System (CMS), authentication, and a comprehensive design system. The project uses TypeScript, Tailwind CSS v4, shadcn/ui components, Better Auth for authentication, Supabase for database and storage, and a custom CMS implementation for dynamic content management.

## Development Commands

### Application Commands
```bash
npm run dev              # Start development server with Turbopack
npm run build            # Build for production with Turbopack
npm start                # Start production server
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
```

### Database Commands (Supabase)
```bash
npm run db:setup         # Set up Supabase database
npm run db:migrate       # Apply migrations manually in Supabase Dashboard
npm run db:generate      # Generate Drizzle migration files
npm run db:push          # Push schema changes to Supabase
npm run db:pull          # Pull schema from Supabase
npm run db:studio        # Open Supabase Dashboard (database GUI)
npm run db:reset         # Reset database manually in Supabase Dashboard
```

### Docker Commands
```bash
npm run docker:build     # Build application Docker image
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript with strict mode
- **Authentication**: Better Auth with email/password
- **Database**: Supabase (PostgreSQL backend with managed service)
- **Storage**: Supabase Storage for media assets
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Theme**: Dark/light mode with next-themes
- **Icons**: Lucide React and Tabler Icons
- **CMS**: Custom Content Management System with admin interface
- **Validation**: Zod schemas for runtime validation

### Project Structure
```
app/                     # Next.js app router pages
├── admin/               # Admin interface for CMS management
│   ├── sections/        # Section editors (navbar, hero, etc.)
│   ├── media/           # Media management interface
│   └── layout.tsx       # Admin layout
├── api/
│   ├── auth/[...all]/   # Better Auth API routes
│   ├── content/         # Public content API endpoints
│   └── admin/           # Admin content management API
├── globals.css          # Global styles with design tokens
├── layout.tsx           # Root layout with providers
└── page.tsx             # Main landing page with CMS content

components/
├── admin/               # Admin interface components
│   ├── editor/          # Section editors and form fields
│   ├── media/           # Media upload and management
│   └── layout/          # Admin layout components
├── content/             # CMS content components
│   └── providers/       # ContentProvider for state management
├── home/                # Landing page components
├── ui/                  # shadcn/ui base components + custom UI
└── theme-provider.tsx   # Theme provider wrapper

lib/
├── auth/                # Better Auth configuration
├── cms/                 # CMS validation schemas and configs
├── db/                  # Database schemas and connection
│   ├── config.ts        # Supabase configuration
│   ├── index.ts         # Supabase client
│   └── schema/          # Database schemas (auth, cms, etc.)
├── auth.ts              # Legacy auth config (consolidated)
├── auth-client.ts       # Client-side auth utilities
└── utils.ts             # General utilities

config/                  # CMS configuration files
hooks/                   # Custom React hooks
types/                   # TypeScript type definitions
scripts/                 # Setup and utility scripts
```

### Authentication System
- Uses Better Auth with Supabase adapter
- Email/password authentication enabled
- Auth configuration in `lib/auth/`
- Database schema in `lib/db/schema/auth.ts`
- API routes in `app/api/auth/[...all]/route.ts`
- Development bypass for testing without full auth setup

### Content Management System
- **Content Provider Pattern**: Global state management for CMS content
- **Section-based Architecture**: Each page section is a separate content type
- **Admin Interface**: `/admin` route for content management
- **Public API**: `/api/content/sections` for published content
- **Admin API**: `/api/admin/sections` for content CRUD operations
- **Media Management**: `/admin/media` for file uploads and asset management
- **Validation**: Zod schemas ensure type safety and data integrity

### Database Setup
- **Exclusive Supabase Integration**: No local database, uses Supabase only
- Database connection in `lib/db/index.ts` and `lib/db/config.ts`
- Drizzle configuration in `drizzle.config.ts` (Supabase credentials)
- Schema definitions in `lib/db/schema/`
- Use Supabase Dashboard for database management and migrations

### Media Management System
- **Supabase Storage**: All media assets stored in `cms-media` bucket
- **Upload API**: `/api/admin/media` for authenticated uploads
- **Media Library**: Grid/list view with search and selection
- **Validation**: File type, size, and dimension validation
- **Automatic Bucket Creation**: Handles missing storage buckets

### Design System
- Built on shadcn/ui components with Radix UI primitives
- Uses Oklch color space with CSS custom properties
- Full dark/light theme support via next-themes
- Typography: Geist Sans (primary), Parkinsans (headings), Geist Mono (code)
- Mobile-first responsive design
- See `.cursor/rules/design_system_rules.mdc` for comprehensive guidelines

## Development Workflow

### Initial Setup
1. Install dependencies: `npm install`
2. Copy environment variables: `cp .env.example .env.local`
3. Configure Supabase credentials in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY`
4. Create Supabase project and set up storage bucket
5. Start development: `npm run dev`

### Content Management Workflow
1. **Access Admin Interface**: Navigate to `/admin`
2. **Edit Sections**: Choose section type (navbar, hero, etc.) to edit content
3. **Upload Media**: Use `/admin/media` for file uploads and asset management
4. **Save Drafts**: Changes are saved as drafts by default
5. **Publish Content**: Use publish API or admin interface to make content live
6. **Verify Integration**: Check main page to see published content

### Code Style Guidelines
- Follow Constitution guidelines in `.specify/memory/constitution.md`
- Use established design tokens from design system
- Follow component patterns from shadcn/ui
- Implement mobile-first responsive design
- Include proper TypeScript typing
- Use CVA (Class Variance Authority) for component variants
- Always include accessibility attributes and keyboard navigation

### Component Patterns
- Build on shadcn/ui foundation components
- Use compound components (Card/CardHeader/CardContent)
- Implement proper ARIA attributes
- Support both light and dark themes
- Follow naming conventions: kebab-case for files, PascalCase for components
- Use ContentProvider pattern for CMS-driven content

## Environment Variables
```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Authentication (Required)
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Development Options (Optional)
DEVELOPMENT_MODE=true     # Enable development bypasses
```

## Key Files to Understand
- `app/layout.tsx` - Root layout with ContentProvider wrapper
- `components/content/providers/ContentProvider.tsx` - Global CMS content state
- `lib/cms/validation.ts` - Zod schemas for content validation
- `lib/cms/section-configs.ts` - Section field configurations
- `app/api/content/sections/route.ts` - Public content API
- `app/api/admin/sections/[section_type]/route.ts` - Admin content management
- `app/api/admin/media/route.ts` - Media upload and management
- `lib/db/schema/cms.ts` - CMS database schemas
- `components/admin/editor/SectionEditor.tsx` - Section editing interface
- `components/admin/media/MediaUpload.tsx` - File upload component
- `.specify/memory/constitution.md` - Development principles and requirements

## Common Development Tasks

### Adding New CMS Sections
1. Define section schema in `lib/cms/validation.ts`
2. Add section configuration in `lib/cms/section-configs.ts`
3. Create database schema in `lib/db/schema/cms.ts`
4. Add section to ContentProvider type definitions
5. Create admin editor interface in `components/admin/editor/`
6. Update page components to use CMS content via `useSection()` hook

### Working with Media Assets
1. Navigate to `/admin/media` for media management
2. Use `SimpleLogoUpload` component for logo uploads
3. Media assets are stored with metadata (alt text, dimensions, etc.)
4. Use media selection components for image fields
5. All uploads go through validation and optimization

### Database Schema Changes
1. Modify schema files in `lib/db/schema/`
2. Generate migration: `npm run db:generate`
3. Push changes to Supabase: `npm run db:push`
4. Use Supabase Dashboard for visual inspection
5. Update validation schemas to match database changes

### Content Integration
- Use `useSection('section-name')` hook to access CMS content
- Components automatically fall back to default content if CMS unavailable
- Content is cached for 5 minutes with manual refresh option
- Published content is publicly accessible via API

### Authentication Features
- Extend `lib/auth/` for new auth providers
- Update `lib/db/schema/auth.ts` for new auth-related tables
- Modify `app/api/auth/[...all]/route.ts` for custom auth logic
- Admin routes are protected by authentication middleware

### Styling and Theming
- Use CSS custom properties for design tokens
- Test in both light and dark themes
- Follow mobile-first responsive patterns
- Use established color palette and typography scale
- Preserve original animations when integrating CMS content

## CMS Content Types
- **navbar**: Logo, navigation items, CTA button
- **hero**: Headline, subheadline, background image, CTAs
- **about**: Title, description, stats, images
- **services**: Service cards with icons and features
- **portfolio**: Project showcase with images and links
- **marquee-clients**: Client logo scrolling display
- **digital-partners**: Partner information and links
- **cta**: Call-to-action section with background
- **footer**: Company info, links, social media

## Development Tips
- Content changes in admin are saved as drafts by default
- Use the publish endpoint or admin interface to make content live
- The ContentProvider automatically handles caching and error states
- Media assets are validated and optimized during upload
- All sections have fallback content for graceful degradation
- Follow Constitution guidelines for all architectural decisions

This codebase is optimized for modern development practices with comprehensive CMS functionality, Supabase integration, and a well-defined design system.