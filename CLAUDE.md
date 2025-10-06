# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern Next.js 15 fullstack application with authentication, database integration, and a comprehensive design system. The project uses TypeScript, Tailwind CSS v4, shadcn/ui components, Better Auth for authentication, and Drizzle ORM with PostgreSQL.

## Development Commands

### Application Commands
```bash
npm run dev              # Start development server with Turbopack
npm run build            # Build for production with Turbopack
npm start                # Start production server
npm run lint             # Run ESLint
```

### Database Commands
```bash
npm run db:up            # Start PostgreSQL in Docker
npm run db:down          # Stop PostgreSQL container
npm run db:dev           # Start development PostgreSQL (port 5433)
npm run db:dev-down      # Stop development PostgreSQL
npm run db:push          # Push schema changes to database
npm run db:generate      # Generate Drizzle migration files
npm run db:studio        # Open Drizzle Studio (database GUI)
npm run db:reset         # Reset database (drop all tables and recreate)
```

### Docker Commands
```bash
npm run docker:build     # Build application Docker image
npm run docker:up        # Start full application stack (app + database)
npm run docker:down      # Stop all containers
npm run docker:logs      # View container logs
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript
- **Authentication**: Better Auth with email/password
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Theme**: Dark/light mode with next-themes
- **Icons**: Lucide React and Tabler Icons

### Project Structure
```
app/                     # Next.js app router pages
├── api/auth/[...all]/   # Better Auth API routes
├── globals.css          # Global styles with design tokens
├── layout.tsx           # Root layout with providers
└── page.tsx             # Main landing page

components/
├── home/                # Landing page components
├── ui/                  # shadcn/ui base components + custom UI
└── theme-provider.tsx   # Theme provider wrapper

db/
├── index.ts             # Database connection
└── schema/              # Database schemas (auth, etc.)

lib/
├── auth.ts              # Better Auth configuration
├── auth-client.ts       # Client-side auth utilities
└── utils.ts             # General utilities

hooks/                   # Custom React hooks
```

### Authentication System
- Uses Better Auth with Drizzle adapter
- Email/password authentication enabled
- Auth configuration in `lib/auth.ts`
- Database schema in `db/schema/auth.ts`
- API routes in `app/api/auth/[...all]/route.ts`

### Database Setup
- PostgreSQL with Drizzle ORM
- Database connection in `db/index.ts`
- Drizzle configuration in `drizzle.config.ts`
- Default Docker setup uses port 5433 for development

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
2. Copy environment variables: `cp .env.example .env`
3. Start database: `npm run db:up`
4. Push schema: `npm run db:push`
5. Start development: `npm run dev`

### Code Style Guidelines
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

## Environment Variables
```env
# Database (Docker defaults)
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/postgres
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# Authentication
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

## Key Files to Understand
- `app/layout.tsx` - Root layout with font and theme providers
- `lib/auth.ts` - Authentication configuration
- `db/index.ts` - Database connection setup
- `components/ui/` - Base UI components and design system
- `.cursor/rules/design_system_rules.mdc` - Comprehensive design system guidelines

## Common Development Tasks

### Adding New Components
1. Check if shadcn/ui component exists: `npx shadcn@latest add [component-name]`
2. For custom components, follow established patterns in `components/ui/`
3. Use CVA for variants and proper TypeScript interfaces
4. Include responsive design and accessibility

### Database Schema Changes
1. Modify schema files in `db/schema/`
2. Generate migration: `npm run db:generate`
3. Push changes: `npm run db:push`
4. Use studio for visual inspection: `npm run db:studio`

### Authentication Features
- Extend `lib/auth.ts` for new auth providers
- Update `db/schema/auth.ts` for new auth-related tables
- Modify `app/api/auth/[...all]/route.ts` for custom auth logic

### Styling and Theming
- Use CSS custom properties for design tokens
- Test in both light and dark themes
- Follow mobile-first responsive patterns
- Use established color palette and typography scale

This codebase is optimized for modern development practices with comprehensive tooling and a well-defined design system.