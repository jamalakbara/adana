import type { MetadataRoute } from 'next';
import { portfolioItems } from '@/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://by-adana.vercel.app';

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/#portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#digital-partners`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    }
  ];

  // Dynamic portfolio item routes
  const portfolioRoutes = portfolioItems.map((item) => ({
    url: `${baseUrl}/portfolio/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...portfolioRoutes];
}