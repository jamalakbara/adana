"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface SectionStatus {
  section: string;
  title: string;
  status: "published" | "draft" | "needs_review";
  lastUpdated: string;
  hasContent: boolean;
  href: string;
}

interface DashboardStats {
  totalSections: number;
  publishedSections: number;
  draftSections: number;
  totalMediaAssets: number;
  recentlyUpdated: number;
}

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: string;
  color: "blue" | "green" | "purple" | "orange";
}

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSections: 9,
    publishedSections: 0,
    draftSections: 0,
    totalMediaAssets: 0,
    recentlyUpdated: 0,
  });
  const [sectionStatuses, setSectionStatuses] = useState<SectionStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const quickActions: QuickAction[] = [
    {
      title: "Add New Content",
      description: "Create or edit website sections",
      href: "/admin/sections",
      icon: "📝",
      color: "blue",
    },
    {
      title: "Upload Media",
      description: "Add images and assets to media library",
      href: "/admin/media",
      icon: "📁",
      color: "green",
    },
    {
      title: "Preview Website",
      description: "See how your website looks live",
      href: "/",
      icon: "👁️",
      color: "purple",
    },
    {
      title: "View Analytics",
      description: "Monitor website performance",
      href: "/admin/analytics",
      icon: "📊",
      color: "orange",
    },
  ];

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        // Define sections data
        const sections: SectionStatus[] = [
          {
            section: "navbar",
            title: "Navbar",
            status: "draft",
            lastUpdated: "2025-01-11",
            hasContent: false,
            href: "/admin/sections/navbar",
          },
          {
            section: "hero",
            title: "Hero Section",
            status: "draft",
            lastUpdated: "2025-01-11",
            hasContent: false,
            href: "/admin/sections/hero",
          },
          {
            section: "marquee-clients",
            title: "Marquee Clients",
            status: "draft",
            lastUpdated: "2025-01-11",
            hasContent: false,
            href: "/admin/sections/marquee-clients",
          },
          {
            section: "about",
            title: "About Section",
            status: "draft",
            lastUpdated: "2025-01-11",
            hasContent: false,
            href: "/admin/sections/about",
          },
          {
            section: "services",
            title: "Services",
            status: "draft",
            lastUpdated: "2025-01-11",
            hasContent: false,
            href: "/admin/sections/services",
          },
          {
            section: "portfolio",
            title: "Portfolio",
            status: "draft",
            lastUpdated: "2025-01-11",
            hasContent: false,
            href: "/admin/sections/portfolio",
          },
          {
            section: "digital-partners",
            title: "Digital Partners",
            status: "draft",
            lastUpdated: "2025-01-11",
            hasContent: false,
            href: "/admin/sections/digital-partners",
          },
          {
            section: "cta",
            title: "CTA Section",
            status: "draft",
            lastUpdated: "2025-01-11",
            hasContent: false,
            href: "/admin/sections/cta",
          },
          {
            section: "footer",
            title: "Footer",
            status: "draft",
            lastUpdated: "2025-01-11",
            hasContent: false,
            href: "/admin/sections/footer",
          },
        ];

        // Fetch media assets count
        const mediaResponse = await fetch("/api/admin/media");
        if (mediaResponse.ok) {
          const mediaData = await mediaResponse.json();
          const mediaCount = mediaData.assets?.length || 0;

          setStats(prev => ({
            ...prev,
            totalMediaAssets: mediaCount,
          }));
        }

        // Set section data
        setSectionStatuses(sections);

        // Calculate stats
        const publishedCount = sections.filter(s => s.status === "published").length;
        const draftCount = sections.filter(s => s.status === "draft").length;

        setStats(prev => ({
          ...prev,
          publishedSections: publishedCount,
          draftSections: draftCount,
          recentlyUpdated: 0, // Would be calculated from actual timestamps
        }));
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: SectionStatus["status"]) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "needs_review":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getQuickActionColor = (color: QuickAction["color"]) => {
    switch (color) {
      case "blue":
        return "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100";
      case "green":
        return "bg-green-50 border-green-200 text-green-700 hover:bg-green-100";
      case "purple":
        return "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100";
      case "orange":
        return "bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500">Total Sections</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{stats.totalSections}</div>
          <div className="text-sm text-gray-600 mt-1">Website sections</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500">Published</div>
          <div className="text-3xl font-bold text-green-600 mt-2">{stats.publishedSections}</div>
          <div className="text-sm text-gray-600 mt-1">Live sections</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500">Drafts</div>
          <div className="text-3xl font-bold text-yellow-600 mt-2">{stats.draftSections}</div>
          <div className="text-sm text-gray-600 mt-1">Need work</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500">Media Assets</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">{stats.totalMediaAssets}</div>
          <div className="text-sm text-gray-600 mt-1">Images & files</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          <p className="text-sm text-gray-600 mt-1">Common tasks you can perform</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`block p-4 rounded-lg border transition-colors duration-200 ${getQuickActionColor(
                  action.color
                )}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{action.icon}</span>
                  <div>
                    <h4 className="font-medium">{action.title}</h4>
                    <p className="text-sm opacity-80 mt-1">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Section Status */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Content Sections</h3>
          <p className="text-sm text-gray-600 mt-1">Status of your website sections</p>
        </div>
        <div className="divide-y divide-gray-200">
          {sectionStatuses.map((section) => (
            <Link
              key={section.section}
              href={section.href}
              className="block p-4 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-gray-900">{section.title}</h4>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        section.status
                      )}`}
                    >
                      {section.status.replace("_", " ")}
                    </span>
                    {!section.hasContent && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        No content
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Last updated: {section.lastUpdated}
                  </p>
                </div>
                <div className="text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Development Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Development Mode
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                You are currently in development mode. Some features may not be fully functional.
                Authentication is bypassed for development purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}