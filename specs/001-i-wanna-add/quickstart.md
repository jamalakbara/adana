# Quickstart Guide: Website Content Management System

**Purpose**: Development setup and initial configuration for CMS implementation

## Prerequisites

### Development Environment
- Node.js 18+ installed
- npm or compatible package manager
- Git repository access
- Supabase account (free tier sufficient for development)

### Required Accounts
- **Supabase**: Create a new project at [supabase.com](https://supabase.com)
- **Better Auth**: No separate account needed (self-hosted)

## Step 1: Supabase Setup

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project: `adana-cms`
3. Note project URL and anon key

### 1.2 Configure Database
```sql
-- Run these SQL commands in Supabase SQL Editor
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
ALTER DATABASE postgres SET row_security = on;
```

### 1.3 Set Up Storage
1. Go to Storage section in Supabase Dashboard
2. Create bucket: `cms-media`
3. Set up CORS policy for your domain

## Step 2: Environment Configuration

### 2.1 Environment Variables
Create `.env.local` file in project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Better Auth Configuration
BETTER_AUTH_SECRET=generate-a-secure-32-character-secret-key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Development Mode
NODE_ENV=development
```

### 2.2 Generate Better Auth Secret
```bash
# Generate secure secret
openssl rand -base64 32
```

## Step 3: Database Setup

### 3.1 Run Database Migrations
```bash
# Install dependencies
npm install

# Initialize database schema
npm run db:setup
```

### 3.2 Verify Tables
In Supabase Dashboard → Table Editor, verify these tables exist:
- `users`
- `content_sections`
- `media_assets`
- `content_versions`

## Step 4: Authentication Setup

### 4.1 Better Auth Configuration
The authentication system is pre-configured with:
- Development bypass (enabled automatically in development)
- Production authentication (enabled automatically in production)

### 4.2 Test Authentication
```bash
# Start development server
npm run dev

# Navigate to http://localhost:3000/admin
# Should auto-login in development mode
```

## Step 5: Initial Content Setup

### 5.1 Create Default Admin User
In development mode, the system automatically creates an admin user:
- Email: `admin@example.com`
- Password: `admin123`
- Role: `admin`

### 5.2 Test CMS Functionality
1. Navigate to `http://localhost:3000/admin`
2. Login with admin credentials
3. Edit a content section (e.g., Hero section)
4. Upload a test image
5. Publish the content
6. Verify changes appear on homepage

## Step 6: Build & Deploy Verification

### 6.1 Build Test
```bash
# Test build process
npm run build

# Verify no errors
npm start
```

### 6.2 Content Verification
1. Check homepage displays CMS content
2. Test responsive design on mobile/tablet
3. Verify media uploads work correctly
4. Test admin interface functionality

## Development Workflow

### Daily Development
```bash
# 1. Start development server
npm run dev

# 2. Make changes to code

# 3. Build and test
npm run build

# 4. Fix any errors before committing
git add .
git commit -m "feat: implement CMS feature"
```

### Content Management
1. Access admin interface: `http://localhost:3000/admin`
2. Edit content sections as needed
3. Upload images through media management
4. Publish changes to make them live
5. Monitor website for proper display

## Common Issues & Solutions

### Issue: Supabase Connection Failed
**Solution**: Verify environment variables and Supabase project URL

### Issue: Authentication Not Working
**Solution**: Check Better Auth secret and URL configuration

### Issue: Image Upload Fails
**Solution**: Verify Supabase storage bucket permissions and CORS settings

### Issue: Build Errors
**Solution**: Run `npm run lint` and fix all TypeScript errors

## Production Deployment

### 1. Environment Setup
- Set production environment variables
- Configure Supabase production project
- Update Better Auth URL to production domain

### 2. Database Migration
```bash
# Apply schema changes to production
npm run db:deploy
```

### 3. Build & Deploy
```bash
# Production build
npm run build

# Start production server
npm start
```

### 4. Post-Deployment Verification
1. Test authentication (no bypass in production)
2. Verify all CMS functionality works
3. Test media uploads and display
4. Confirm responsive design works

## Support Resources

### Documentation
- **Constitution**: `.specify/memory/constitution.md`
- **API Contracts**: `specs/001-i-wanna-add/contracts/api.md`
- **Data Model**: `specs/001-i-wanna-add/data-model.md`

### Tools & Commands
- **Database Management**: `npm run db:*`
- **Build Process**: `npm run build`
- **Code Quality**: `npm run lint`
- **Development Server**: `npm run dev`

### Getting Help
- Check error logs in browser console
- Verify Supabase connection in network tab
- Review Constitution for compliance requirements
- Test changes incrementally

## Next Steps

1. **Customization**: Modify admin interface styling as needed
2. **Additional Sections**: Add custom content sections following data model pattern
3. **User Roles**: Configure additional user roles and permissions
4. **Analytics**: Add content tracking and analytics
5. **SEO**: Implement SEO optimization for CMS-managed content

## Success Criteria Verification

- ✅ Content editors can update any section within 5 minutes
- ✅ Image uploads complete within 10 seconds
- ✅ Admin interface works on mobile, tablet, and desktop
- ✅ Authentication works (bypass in dev, secure in prod)
- ✅ Content displays correctly on public website
- ✅ Build process completes without errors