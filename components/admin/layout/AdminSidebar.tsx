"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navigationItems: NavItem[] = [
  { name: "Dashboard", href: "/admin", icon: "🏠" },
  { name: "Media Library", href: "/admin/media", icon: "📁" },
  { name: "Content Sections", href: "/admin/sections", icon: "📝" },
];

const contentSections: NavItem[] = [
  { name: "Navbar", href: "/admin/sections/navbar", icon: "🧭" },
  { name: "Hero", href: "/admin/sections/hero", icon: "🎯" },
  { name: "About", href: "/admin/sections/about", icon: "ℹ️" },
  { name: "Services", href: "/admin/sections/services", icon: "⚡" },
  { name: "Portfolio", href: "/admin/sections/portfolio", icon: "💼" },
  { name: "Clients", href: "/admin/sections/marquee-clients", icon: "👥" },
  { name: "Partners", href: "/admin/sections/digital-partners", icon: "🤝" },
  { name: "CTA", href: "/admin/sections/cta", icon: "📣" },
  { name: "Footer", href: "/admin/sections/footer", icon: "🔗" },
];

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [contentSectionsExpanded, setContentSectionsExpanded] = useState(false);
  const pathname = usePathname();

  // Auto-collapse on small screens
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = (href: string) => pathname === href;

  const NavLink = ({ item, indent = false }: { item: NavItem; indent?: boolean }) => (
    <Link
      href={item.href}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        indent ? "ml-6" : ""
      } ${
        isActive(item.href)
          ? "bg-blue-100 text-blue-700"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <span className="mr-3">{item.icon}</span>
      {!isCollapsed && <span>{item.name}</span>}
    </Link>
  );

  return (
    <div className={`hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? "w-16" : "w-64"
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <h1 className="text-lg font-semibold text-gray-900">CMS</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>

        {/* Content Sections */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => setContentSectionsExpanded(!contentSectionsExpanded)}
            className={`flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <span className="mr-3">{!contentSectionsExpanded ? "▶" : "▼"}</span>
            {!isCollapsed && <span>Content Sections</span>}
          </button>

          {contentSectionsExpanded && !isCollapsed && (
            <div className="mt-2 space-y-1">
              {contentSections.map((item) => (
                <NavLink key={item.href} item={item} indent />
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed && (
          <div className="text-xs text-gray-500">
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Development Mode</span>
            </div>
            <p>Admin Interface</p>
          </div>
        )}
        {isCollapsed && (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}