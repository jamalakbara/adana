<!--
Sync Impact Report:
Version change: 1.2.0 → 1.3.0 (minor version - Marquee clients simplification + section routing fixes)
Modified principles: IV (CMS section key mapping implementation)
Added sections: Section Type Mapping, Component Integration Patterns
Updated sections: Content API Architecture, Development Workflow, Build & Fix Workflow
Templates requiring updates: ✅ plan-template.md (Constitution Check compatible), ✅ spec-template.md (aligned), ✅ tasks-template.md (aligned)
Follow-up TODOs: N/A
-->

# Adana Constitution

## Core Principles

### I. Modern Web Stack
Every component MUST use current, stable web technologies; TypeScript enforced for type safety; React 19 with Next.js 15 App Router as the foundation; Tailwind CSS v4 for styling with shadcn/ui components; Content Management System (CMS) integration for dynamic content. Rationale: Ensures consistency, maintainability, and access to latest web development capabilities with content flexibility.

### II. Type Safety First
All data operations, API endpoints, and component props MUST be fully typed; Zod schemas for runtime validation and content validation; Supabase client for type-safe database operations; Better Auth integration maintains type safety across authentication flows; Content types MUST be defined with proper TypeScript interfaces. Rationale: Prevents runtime errors and improves developer experience through predictable data shapes.

### III. Authentication & Security
All routes MUST implement proper authentication checks where required; Better Auth configuration MUST be centralized; Environment variables MUST be used for secrets; Database connections MUST use parameterized queries; CORS and security headers properly configured. Rationale: Protects user data and prevents common web vulnerabilities.

### IV. CMS-Driven Content Management
All content MUST be managed through CMS system; Supabase serves as the database backend; Static content structure in app/page.tsx MUST remain as component templates; Dynamic content fetched from CMS via ContentProvider and API endpoints; Content types MUST be defined in Supabase with proper schemas; Published content MUST be publicly accessible via content API. Rationale: Enables non-technical content management while maintaining consistent data structure and component reusability.

### V. Responsive Design & Accessibility
All components MUST be mobile-first responsive; Dark mode support MUST be implemented system-wide; Semantic HTML5 elements MUST be used; ARIA labels and keyboard navigation MUST be included; Color contrast MUST meet WCAG AA standards. Rationale: Provides inclusive user experience across all devices and abilities.

## Technical Standards

### Technology Stack Requirements
- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript with strict mode enabled
- **Database**: Supabase (PostgreSQL backend with managed service)
- **Authentication**: Better Auth with session management
- **Styling**: Tailwind CSS v4 with shadcn/ui components (New York style)
- **Icons**: Lucide React for consistent iconography
- **Testing**: ESLint for code quality, Jest for unit testing when implemented
- **Deployment**: Direct deployment without Docker containers
- **CMS Integration**: ContentProvider pattern for dynamic content

### Code Quality Standards
- All TypeScript files MUST have strict typing enabled
- ESLint configuration MUST pass without warnings
- Components MUST follow React 19 patterns (no more forwardRef needed)
- Database queries MUST use Supabase client with proper error handling
- Environment variables MUST be validated at startup

## CMS Requirements

### Content Management Architecture
- All website content MUST be managed through CMS interface
- Supabase tables MUST define content schemas (pages, sections, media)
- Content MUST be fetchable via ContentProvider pattern with type safety
- Static page structure in app/page.tsx MUST remain unchanged as component templates
- Content updates MUST NOT require code deployments
- Admin interface MUST be accessible at /admin route for content management

### Content Types & Schemas
- Homepage sections MUST correspond to CMS content types (navbar, hero, about, services, portfolio, etc.)
- All content MUST have published/unpublished status
- Media assets MUST be stored in Supabase Storage with bucket management
- Content relationships MUST be defined via foreign keys
- Content validation MUST be enforced at database level using Zod schemas

## Content API Architecture

### Content Provider Pattern
- ContentProvider MUST wrap the entire application for global state management
- Components MUST use useSection hook for type-safe content access
- Content API endpoints MUST separate public and admin routes
- Content MUST be unwrapped from API response format for direct component use
- Fallback content MUST be defined for graceful degradation

### Section Type Mapping
- Section key mapping MUST handle URL format (hyphens) to database format (underscores) conversion
- ContentProvider MUST implement proper section key transformation for component compatibility
- Admin routing MUST convert URL section types to database formats for validation and processing
- SectionConfigs MUST use database format keys while maintaining URL-friendly routing
- Mapping MUST be consistent across ContentProvider, admin routing, and component layers

### API Route Structure
- Public content API: `/api/content/sections` for published content access
- Admin content API: `/api/admin/sections` for authenticated content management
- Media management API: `/api/admin/media` for file uploads and storage
- All APIs MUST implement proper authentication and authorization checks
- Error handling MUST be consistent across all endpoints

## Media Management System

### Supabase Storage Integration
- All media assets MUST be stored in Supabase Storage buckets
- File uploads MUST be processed with proper validation and error handling
- Image processing MUST include dimension detection and optimization
- Media assets MUST be accessible via signed URLs
- Storage buckets MUST be created automatically or via setup scripts

### Media Asset Management
- Media uploads MUST support multiple file types (images, videos, documents)
- File size limits MUST be enforced server-side
- Media assets MUST have proper metadata (alt text, dimensions, file size)
- Media gallery MUST provide search, filtering, and selection capabilities
- Media MUST be linkable to content sections via foreign keys
- SimpleLogoUpload component MUST be used for logo-specific uploads with streamlined interface
- Media fields MUST support nullable values for optional content with proper validation

## Admin Interface

### Content Management UI
- Admin interface MUST be accessible at `/admin` route
- Section editors MUST provide form-based content editing
- Media management MUST be integrated into the content workflow
- Real-time preview MUST be available for content changes
- Draft/publish workflow MUST be implemented for content staging

### User Experience
- Admin interface MUST be responsive and accessible
- Form validation MUST provide clear error messages
- Loading states MUST be shown for async operations
- Success/error feedback MUST be provided for user actions
- Interface MUST be intuitive for non-technical users

## Component Integration Patterns

### CMS Content Integration
- Components MUST use useSection hook with proper TypeScript typing
- Fallback content MUST be implemented when CMS data is unavailable
- Content rendering MUST handle null/undefined values gracefully
- Dynamic content MUST preserve original component styling and animations
- Section simplification MUST maintain component API compatibility

### Dynamic Form Handling
- Array field management MUST support automatic UUID generation for new items
- Hidden fields MUST be supported for internal data management
- Field types MUST include specialized components (logo, media, text, etc.)
- Form validation MUST handle nullable schema fields appropriately
- DynamicField component MUST generate default objects based on field configurations

## MCP Tooling Requirements

### Tailwind CSS Integration
- All styling MUST use Tailwind CSS utility classes
- Tailwind MCP server MUST be used for utility queries and generation
- Custom styling MUST be implemented via Tailwind utilities first
- CSS-in-JS or inline styles MUST be avoided unless absolutely necessary
- Component styling MUST follow Tailwind responsive design patterns

### shadcn/ui Component Management
- All UI components MUST be sourced from shadcn/ui registry
- shadcn MCP server MUST be used for component discovery and installation
- Component customizations MUST respect shadcn/ui design system
- New components MUST be added via `npx shadcn@latest add [component]`
- Component variations MUST be documented and consistent

## Development Workflow

### Environment Setup
- Supabase project MUST be created and configured
- Environment variables MUST be configured before first run (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY)
- Supabase client MUST be initialized with proper credentials
- All dependencies MUST be installed via npm or compatible package manager
- CMS tables MUST be created in Supabase before first use

### Build & Fix Workflow
- `npm run build` MUST be executed after every code change
- All build errors MUST be fixed before committing changes
- Build process MUST complete without warnings or errors
- TypeScript compilation MUST pass without type errors
- ESLint MUST pass without warnings
- Build configuration MAY temporarily disable validation for deployment urgency but MUST be re-enabled
- Environment variable handling MUST be tolerant of missing development variables

### Code Review Requirements
- All changes MUST pass ESLint checks
- Supabase schema changes MUST be applied via migrations or Drizzle push
- New components MUST include TypeScript interfaces for props
- Authentication flows MUST be tested with different user roles
- Responsive design MUST be verified on mobile viewports
- Build MUST pass successfully before pull request approval
- CMS content types MUST be properly validated with Zod schemas

### Deployment Process
- Production builds MUST use `next build --turbopack`
- Supabase migrations MUST be applied to production schema before deployment
- Environment variables MUST be configured in production environment
- Health checks MUST verify Supabase connectivity and authentication status
- Content MUST be manageable through CMS interface post-deployment
- CMS functionality MUST be tested before production deployment

## Governance

This constitution supersedes all other development practices and guidelines. All code changes, feature implementations, and architectural decisions MUST comply with these principles.

### Amendment Procedure
- Amendments require documented rationale in a GitHub issue
- Changes MUST be reviewed and approved by project maintainers
- Major changes require migration plan for existing code
- Version MUST be incremented according to semantic versioning

### Compliance Review
- All pull requests MUST verify constitution compliance
- Complex technical decisions MUST reference specific principles
- Template files MUST stay synchronized with constitution updates
- Violations MUST be explicitly justified in implementation documentation

**Version**: 1.3.0 | **Ratified**: 2025-01-20 | **Last Amended**: 2025-01-21