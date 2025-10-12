-- Initial Schema for CMS System
-- Website Content Management System Database Setup
-- Created: 2025-01-20

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
ALTER DATABASE postgres SET row_security = on;

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')),
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

-- Content Sections table for managing website sections
CREATE TABLE IF NOT EXISTS content_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_type TEXT NOT NULL CHECK (section_type IN (
        'navbar', 'hero', 'marquee_clients', 'about', 'services',
        'portfolio', 'digital_partners', 'cta', 'footer'
    )),
    title TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    content JSONB NOT NULL,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE,
    version INTEGER DEFAULT 1,
    locked_by UUID REFERENCES users(id),
    locked_until TIMESTAMP WITH TIME ZONE,

    -- Ensure only one published section per type
    CONSTRAINT unique_published_section UNIQUE (section_type, status) DEFERRABLE INITIALLY DEFERRED
);

-- Media Assets table for storing uploaded images
CREATE TABLE IF NOT EXISTS media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL UNIQUE,
    original_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    width INTEGER,
    height INTEGER,
    alt_text TEXT,
    supabase_path TEXT NOT NULL,
    supabase_url TEXT NOT NULL,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- File size constraint (5MB limit)
    CONSTRAINT media_size_limit CHECK (size_bytes <= 52428880)
);

-- Content Versions table for version history
CREATE TABLE IF NOT EXISTS content_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_id UUID NOT NULL REFERENCES content_sections(id) ON DELETE CASCADE,
    content JSONB NOT NULL,
    version_number INTEGER NOT NULL,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    change_summary TEXT
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_content_sections_type_status ON content_sections(section_type, status);
CREATE INDEX IF NOT EXISTS idx_content_sections_created_by ON content_sections(created_by);
CREATE INDEX IF NOT EXISTS idx_content_sections_locked_by ON content_sections(locked_by);
CREATE INDEX IF NOT EXISTS idx_media_assets_created_by ON media_assets(created_by);
CREATE INDEX IF NOT EXISTS idx_content_versions_section_version ON content_versions(section_id, version_number);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Enable Row Level Security policies
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for content sections
CREATE POLICY "Users can view all content sections" ON content_sections
    FOR SELECT USING (true);

CREATE POLICY "Admins can insert content sections" ON content_sections
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    ));

CREATE POLICY "Admins and Editors can update their own sections" ON content_sections
    FOR UPDATE USING (
        auth.uid() = created_by OR
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Admins and Editors can delete content sections" ON content_sections
    FOR DELETE USING (
        auth.uid() = created_by OR
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- RLS Policies for media assets
CREATE POLICY "Users can view all media assets" ON media_assets
    FOR SELECT USING (true);

CREATE POLICY "Admins and Editors can insert media assets" ON media_assets
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'editor')
    ));

CREATE POLICY "Admins and Editors can update their own media assets" ON media_assets
    FOR UPDATE USING (
        auth.uid() = created_by OR
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Admins and Editors can delete their own media assets" ON media_assets
    FOR DELETE USING (
        auth.uid() = created_by OR
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- RLS Policies for content versions
CREATE POLICY "Users can view all content versions" ON content_versions
    FOR SELECT USING (true);

CREATE POLICY "All users can insert content versions" ON content_versions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view but not update content versions" ON content_versions
    FOR UPDATE USING (false);

CREATE POLICY "Users can view but not delete content versions" ON content_versions
    FOR DELETE USING (false);

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Admin user for development/testing (only inserted if not exists)
INSERT INTO users (email, role, name, is_active)
SELECT
    'admin@example.com' as email,
    'admin' as role,
    'Admin User' as name,
    true as is_active
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@example.com');