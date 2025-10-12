// Database types generated from Supabase schema
// These types correspond to the tables defined in the migration file

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'editor' | 'viewer'
          name: string | null
          created_at: string
          updated_at: string
          last_login: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          email: string
          role: 'admin' | 'editor' | 'viewer'
          name?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'editor' | 'viewer'
          name?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
          is_active?: boolean
        }
      }
      content_sections: {
        Row: {
          id: string
          section_type: 'navbar' | 'hero' | 'marquee_clients' | 'about' | 'services' | 'portfolio' | 'digital_partners' | 'cta' | 'footer'
          title: string | null
          status: 'draft' | 'published'
          content: Json
          created_by: string | null
          created_at: string
          updated_at: string
          published_at: string | null
          version: number
          locked_by: string | null
          locked_until: string | null
        }
        Insert: {
          id?: string
          section_type: 'navbar' | 'hero' | 'marquee_clients' | 'about' | 'services' | 'portfolio' | 'digital_partners' | 'cta' | 'footer'
          title?: string | null
          status?: 'draft' | 'published'
          content: Json
          created_by?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
          version?: number
          locked_by?: string | null
          locked_until?: string | null
        }
        Update: {
          id?: string
          section_type?: 'navbar' | 'hero' | 'marquee_clients' | 'about' | 'services' | 'portfolio' | 'digital_partners' | 'cta' | 'footer'
          title?: string | null
          status?: 'draft' | 'published'
          content?: Json
          created_by?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
          version?: number
          locked_by?: string | null
          locked_until?: string | null
        }
      }
      media_assets: {
        Row: {
          id: string
          filename: string
          original_name: string
          mime_type: string
          size_bytes: number
          width: number | null
          height: number | null
          alt_text: string | null
          supabase_path: string
          supabase_url: string
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          filename: string
          original_name: string
          mime_type: string
          size_bytes: number
          width?: number | null
          height?: number | null
          alt_text?: string | null
          supabase_path: string
          supabase_url: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          filename?: string
          original_name?: string
          mime_type?: string
          size_bytes?: number
          width?: number | null
          height?: number | null
          alt_text?: string | null
          supabase_path?: string
          supabase_url?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      content_versions: {
        Row: {
          id: string
          section_id: string
          content: Json
          version_number: number
          created_by: string | null
          created_at: string
          change_summary: string | null
        }
        Insert: {
          id?: string
          section_id: string
          content: Json
          version_number: number
          created_by?: string | null
          created_at?: string
          change_summary?: string | null
        }
        Update: {
          id?: string
          section_id?: string
          content?: Json
          version_number?: number
          created_by?: string | null
          created_at?: string
          change_summary?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Content section types based on the schema
export interface NavbarContent {
  logo?: {
    media_id: string
    alt_text: string
    url: string
    width: number
    height: number
  }
  navigation_items: Array<{
    text: string
    href: string
    is_external: boolean
  }>
  cta_button?: {
    text: string
    href: string
    variant: 'primary' | 'secondary'
    is_external: boolean
  }
}

export interface HeroContent {
  headline: string
  subheadline: string
  background_image?: {
    media_id: string
    alt_text: string
    url: string
    width: number
    height: number
  }
  cta_buttons: Array<{
    text: string
    href: string
    variant: 'primary' | 'secondary'
    is_external: boolean
  }>
}

export interface MarqueeClientsContent {
  clients: Array<{
    id: string
    name: string
    logo: {
      media_id: string
      alt_text: string
      url: string
      width: number
      height: number
    }
    website_url?: string
  }>
  auto_scroll: boolean
  scroll_speed?: 'slow' | 'medium' | 'fast'
}

export interface AboutContent {
  headline: string
  description: string
  features: Array<{
    title: string
    description: string
    icon?: string
  }>
  team_members: Array<{
    id: string
    name: string
    role: string
    bio: string
    photo?: {
      media_id: string
      alt_text: string
      url: string
      width: number
      height: number
    }
  }>
}

export interface ServicesContent {
  headline: string
  description: string
  services: Array<{
    id: string
    title: string
    description: string
    icon?: string
    features: string[]
  }>
}

export interface PortfolioContent {
  headline: string
  description: string
  projects: Array<{
    id: string
    title: string
    description: string
    tags: string[]
    images: Array<{
      media_id: string
      alt_text: string
      url: string
      width: number
      height: number
    }>
    project_url?: string
    github_url?: string
    featured: boolean
    order: number
  }>
}

export interface DigitalPartnersContent {
  headline: string
  description: string
  partners: Array<{
    id: string
    name: string
    description: string
    logo: {
      media_id: string
      alt_text: string
      url: string
      width: number
      height: number
    }
    partnership_type: 'technology' | 'integration' | 'reseller' | 'strategic'
    website_url?: string
  }>
}

export interface CTAContent {
  headline: string
  description: string
  background_image?: {
    media_id: string
    alt_text: string
    url: string
    width: number
    height: number
  }
  cta_button: {
    text: string
    href: string
    variant: 'primary' | 'secondary'
    is_external: boolean
  }
}

export interface FooterContent {
  company_info: {
    name: string
    description: string
    logo?: {
      media_id: string
      alt_text: string
      url: string
      width: number
      height: number
    }
  }
  navigation_sections: Array<{
    title: string
    links: Array<{
      text: string
      href: string
      is_external: boolean
    }>
  }>
  social_links: Array<{
    platform: 'twitter' | 'linkedin' | 'github' | 'instagram' | 'facebook'
    url: string
  }>
  copyright_text: string
}

// Union type for all content types
export type SectionContent =
  | NavbarContent
  | HeroContent
  | MarqueeClientsContent
  | AboutContent
  | ServicesContent
  | PortfolioContent
  | DigitalPartnersContent
  | CTAContent
  | FooterContent

// Export section type and status
export type SectionType = 'navbar' | 'hero' | 'marquee_clients' | 'about' | 'services' | 'portfolio' | 'digital_partners' | 'cta' | 'footer';
export type ContentStatus = 'draft' | 'published';

// Helper type to get content type based on section type
export type ContentTypeForSection<T extends string> =
  T extends 'navbar' ? NavbarContent :
  T extends 'hero' ? HeroContent :
  T extends 'marquee_clients' ? MarqueeClientsContent :
  T extends 'about' ? AboutContent :
  T extends 'services' ? ServicesContent :
  T extends 'portfolio' ? PortfolioContent :
  T extends 'digital_partners' ? DigitalPartnersContent :
  T extends 'cta' ? CTAContent :
  T extends 'footer' ? FooterContent :
  never