"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from "react";
import type { NavbarContent, HeroContent, AboutContent, ServicesContent, PortfolioContent, MarqueeClientsContent, DigitalPartnersContent, CTAContent, FooterContent } from "@/lib/cms/validation";

// Type definitions for content
export type ContentSections = {
  navbar?: NavbarContent;
  hero?: HeroContent;
  about?: AboutContent;
  services?: ServicesContent;
  portfolio?: PortfolioContent;
  "marquee-clients"?: MarqueeClientsContent;
  "digital-partners"?: DigitalPartnersContent;
  cta?: CTAContent;
  footer?: FooterContent;
};

interface ContentContextType {
  content: ContentSections;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getSection: <T extends keyof ContentSections>(section: T) => ContentSections[T] | null;
  isSectionLoaded: <T extends keyof ContentSections>(section: T) => boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

interface ContentProviderProps {
  children: React.ReactNode;
  fallbackContent?: Partial<ContentSections>;
  enableCache?: boolean;
  cacheTimeout?: number; // in milliseconds
}

export function ContentProvider({
  children,
  fallbackContent = {},
  enableCache = true,
  cacheTimeout = 5 * 60 * 1000 // 5 minutes
}: ContentProviderProps) {
  // Default fallback content to prevent runtime errors
  const defaultFallbackContent: Partial<ContentSections> = {
    footer: {
      company_info: {
        name: "Adana Digital",
        description: "Creating exceptional digital experiences that help businesses thrive in the modern world.",
      },
      navigation_sections: [
        {
          title: "Services",
          links: [
            { title: "Web Development", href: "#" },
            { title: "Mobile Apps", href: "#" },
            { title: "UI/UX Design", href: "#" },
            { title: "Digital Marketing", href: "#" }
          ]
        },
        {
          title: "Legal",
          links: [
            { title: "Privacy Policy", href: "#" },
            { title: "Terms of Service", href: "#" },
            { title: "Cookie Policy", href: "#" }
          ]
        }
      ],
      social_links: [],
      copyright_text: "© 2025 Adana Digital. All Right Reserved"
    }
  };

  // Merge user-provided fallback with default fallback
  const mergedFallbackContent = { ...defaultFallbackContent, ...fallbackContent };
  const [content, setContent] = useState<ContentSections>(mergedFallbackContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);
  const hasInitialContent = useRef(Object.keys(mergedFallbackContent).length > 0);

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache if enabled
      if (enableCache && Date.now() - lastFetch < cacheTimeout && (hasInitialContent.current || Object.keys(content).length > 0)) {
        setLoading(false);
        return;
      }

      const response = await fetch("/api/content/sections", {
        cache: enableCache ? "default" : "no-store",
        headers: {
          'Cache-Control': enableCache ? `max-age=${Math.floor(cacheTimeout / 1000)}` : 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Unwrap content from API response format
      // API returns: { navbar: { content: {...}, updated_at: "..." } }
      // We want: { navbar: {...} }
      const unwrappedData: ContentSections = {};

      // Handle section key mapping (API format to component format)
      const sectionKeyMapping: Record<string, string> = {
        'marquee_clients': 'marquee-clients',
        'digital_partners': 'digital-partners',
      };

      Object.entries(data).forEach(([sectionKey, sectionData]) => {
        if (sectionData && typeof sectionData === 'object' && 'content' in sectionData) {
          // Convert API key format to component format
          const componentKey = sectionKeyMapping[sectionKey] || sectionKey;
          console.log(`Mapping section: ${sectionKey} -> ${componentKey}`, (sectionData as any).content);
          unwrappedData[componentKey as keyof ContentSections] = (sectionData as any).content;
        }
      });
      console.log('Final unwrapped data:', unwrappedData);

      // Validate and set content
      setContent(unwrappedData);
      setLastFetch(Date.now());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching content";
      setError(errorMessage);
      console.error("Content fetch error:", err);

      // Keep fallback content on error
      if (Object.keys(mergedFallbackContent).length > 0) {
        setContent(mergedFallbackContent);
      }
    } finally {
      setLoading(false);
    }
  }, [enableCache, cacheTimeout]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // Memoized getSection function
  const getSection = useCallback(<T extends keyof ContentSections>(section: T): ContentSections[T] | null => {
    return content[section] || null;
  }, [content]);

  // Memoized isSectionLoaded function
  const isSectionLoaded = useCallback(<T extends keyof ContentSections>(section: T): boolean => {
    return !!content[section];
  }, [content]);

  // Memoized context value
  const value = useMemo(() => ({
    content,
    loading,
    error,
    refetch: fetchContent,
    getSection,
    isSectionLoaded,
  }), [content, loading, error, fetchContent, getSection, isSectionLoaded]);

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}

// Hook for getting a specific section with type safety
export function useSection<T extends keyof ContentSections>(section: T): {
  data: ContentSections[T] | null;
  loading: boolean;
  error: string | null;
  isLoaded: boolean;
} {
  const { getSection, loading, error, isSectionLoaded } = useContent();

  return {
    data: getSection(section),
    loading,
    error,
    isLoaded: isSectionLoaded(section),
  };
}

// Hook for getting multiple sections
export function useSections<T extends keyof ContentSections>(sections: T[]): {
  data: Pick<ContentSections, T>;
  loading: boolean;
  error: string | null;
  isLoaded: Record<T, boolean>;
} {
  const { content, loading, error, isSectionLoaded } = useContent();

  const data = sections.reduce((acc, section) => {
    acc[section] = content[section];
    return acc;
  }, {} as Pick<ContentSections, T>);

  const isLoaded = sections.reduce((acc, section) => {
    acc[section] = isSectionLoaded(section);
    return acc;
  }, {} as Record<T, boolean>);

  return {
    data,
    loading,
    error,
    isLoaded,
  };
}