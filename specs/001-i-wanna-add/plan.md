# Implementation Plan: Website Content Management System

**Branch**: `001-i-wanna-add` | **Date**: 2025-01-20 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-i-wanna-add/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

The CMS feature will add a comprehensive content management system to enable non-technical users to manage all website sections (navbar, hero, marquee/clients, about, services, portfolio, digital partners, CTA, footer) through a responsive admin interface. The system will integrate with Supabase for data storage and media assets, use Better Auth for authentication (with development bypass), and provide full CRUD operations with draft/publish workflows, role-based access control, and concurrent editing protection.

## Technical Context

**Language/Version**: TypeScript (strict mode enabled) with React 19
**Primary Dependencies**: Next.js 15 with App Router and Turbopack, Better Auth, Supabase client, Tailwind CSS v4, shadcn/ui components, Zod for validation
**Storage**: Supabase (PostgreSQL backend) with Supabase Storage for media assets
**Testing**: ESLint for code quality, Jest for unit testing (when implemented)
**Target Platform**: Web application (responsive design for desktop, tablet, mobile)
**Project Type**: Single web application with admin interface and public-facing website
**Performance Goals**: 3-second page load target, 2-second admin interface load, 10-second image upload processing
**Constraints**: Must maintain app/page.tsx structure, responsive design required, mobile-first approach, no Docker usage
**Scale/Scope**: Support 5 concurrent content editors, manage 9 website sections, unlimited media assets with 5MB file size limit

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle Compliance Check

**✅ I. Modern Web Stack**: COMPLIANT
- Using React 19 with Next.js 15 App Router
- TypeScript enforced with strict mode
- Tailwind CSS v4 with shadcn/ui components

**✅ II. Type Safety First**: COMPLIANT
- All data operations via typed Supabase client
- Zod schemas for runtime validation
- Better Auth integration maintains type safety

**✅ III. Authentication & Security**: COMPLIANT
- Better Auth implementation for production
- Development bypass for local development
- Proper session management and security headers

**✅ IV. CMS-Driven Content Management**: COMPLIANT
- All content managed through CMS interface
- Supabase database backend with proper schemas
- app/page.tsx structure preserved
- Content updates without code deployment

**✅ V. Responsive Design & Accessibility**: COMPLIANT
- Mobile-first responsive design required
- Touch interactions and mobile gestures supported
- Admin interface works on all device types

### Technical Standards Compliance

**✅ Technology Stack**: Next.js 15, TypeScript, Supabase, Better Auth, Tailwind CSS v4
**✅ Code Quality**: ESLint compliance, TypeScript strict mode, React 19 patterns
**✅ CMS Requirements**: Content management architecture, media storage, validation
**✅ MCP Tooling**: Tailwind CSS and shadcn/ui integration
**✅ Build Workflow**: Build after changes, error fixing, validation

### Development Workflow Compliance

**✅ Environment Setup**: Supabase configuration, environment variables
**✅ Build & Fix**: Build execution, error resolution, type checking
**✅ Code Review**: ESLint checks, component TypeScript interfaces
**✅ Deployment**: Production builds, Supabase migrations

**GATE STATUS**: ✅ PASSED - All constitution requirements met

### Post-Phase 1 Compliance Re-Check

**✅ Data Model Alignment**: COMPLIANT
- Supabase database schema defined with proper relationships
- Content sections mapped to database tables
- Media assets stored in Supabase Storage with metadata
- Type-safe operations through TypeScript interfaces

**✅ API Design Compliance**: COMPLIANT
- RESTful API with proper authentication middleware
- Better Auth integration for production
- Development bypass pattern implemented
- Role-based access control enforced

**✅ Responsive Design Architecture**: COMPLIANT
- Admin interface designed for mobile-first approach
- Touch interactions and gestures supported
- Consistent user experience across device types
- Performance targets established (2-3 second loads)

**✅ CMS Architecture Compliance**: COMPLIANT
- Headless CMS pattern with content repository
- app/page.tsx structure preserved
- Dynamic content fetching from Supabase
- Draft/publish workflow implemented

**FINAL GATE STATUS**: ✅ PASSED - All constitution requirements maintained through design phase

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
app/
├── (admin)/                    # CMS admin interface (new)
│   ├── layout.tsx             # Admin layout with navigation
│   ├── page.tsx               # Admin dashboard
│   ├── sections/              # Admin pages for each content type
│   │   ├── navbar/
│   │   ├── hero/
│   │   ├── marquee-clients/
│   │   ├── about/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── digital-partners/
│   │   ├── cta/
│   │   └── footer/
│   ├── media/                 # Media management
│   └── users/                 # User management (if needed)
├── api/                       # Existing API routes
│   ├── auth/[...all]/         # Better Auth (existing)
│   ├── admin/                 # CMS API endpoints (new)
│   │   ├── sections/
│   │   ├── media/
│   │   └── users/
│   └── content/               # Public content API (new)
├── globals.css                # Existing styles
├── layout.tsx                 # Existing root layout
├── page.tsx                   # Existing homepage (structure preserved)
└── (other existing pages)/

components/
├── ui/                        # Existing shadcn/ui components
├── home/                      # Existing homepage components
├── admin/                     # CMS-specific components (new)
│   ├── forms/                 # Content editing forms
│   ├── layout/                # Admin layout components
│   ├── media/                 # Media upload/management
│   └── shared/                # Shared admin components
└── content/                   # Content display components (new)
    ├── sections/              # Dynamic section components
    └── providers/             # Content context providers

lib/
├── (existing utilities)/
├── auth.ts                    # Better Auth config (existing)
├── db/                        # Database layer (new)
│   ├── index.ts               # Supabase client
│   ├── schema.ts              # Database schemas
│   └── migrations/            # Database migrations
├── auth/                      # Authentication utilities (existing)
└── cms/                       # CMS-specific utilities (new)
    ├── content.ts             # Content fetching/managing
    ├── media.ts               # Media upload/management
    └── validation.ts          # Content validation schemas

types/                          # TypeScript types (new)
├── content.ts                 # Content type definitions
├── admin.ts                   # Admin interface types
└── database.ts                # Database type definitions
```

**Structure Decision**: Single Next.js application with integrated admin interface at `/admin` route. This approach maintains the existing codebase structure while adding CMS functionality. The app/page.tsx structure is preserved as required by the constitution, with dynamic content fetched from Supabase.

## Complexity Tracking

*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
