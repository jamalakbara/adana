"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swipeable } from "@/components/admin/shared/Swipeable";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const [contentSectionsExpanded, setContentSectionsExpanded] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  // Close navigation when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname, isOpen, onClose]);

  // Close navigation on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const NavLink = ({ item, indent = false }: { item: NavItem; indent?: boolean }) => (
    <Link
      href={item.href}
      onClick={onClose}
      className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors touch-manipulation ${
        indent ? "ml-4" : ""
      } ${
        isActive(item.href)
          ? "bg-blue-100 text-blue-700 border-l-4 border-blue-700"
          : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
      }`}
    >
      <span className="mr-3 text-xl">{item.icon}</span>
      <span>{item.name}</span>
    </Link>
  );

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
        onClick={onClose}
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
      />

      {/* Slide-in Sidebar */}
      <Swipeable
        onSwipeRight={() => {}} // Prevent closing on right swipe
        onSwipeLeft={onClose}
        preventDefault={true}
        hapticFeedback={true}
      >
        <div
          className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <h1 className="text-xl font-bold text-gray-900">CMS</h1>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="Close navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto h-full pb-20">
          {/* Main Navigation */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Main
            </p>
            {navigationItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>

          {/* Content Sections */}
          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={() => setContentSectionsExpanded(!contentSectionsExpanded)}
              className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation"
            >
              <span className="mr-3 text-xl">
                {contentSectionsExpanded ? "📂" : "📁"}
              </span>
              <span>Content Sections</span>
              <svg
                className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                  contentSectionsExpanded ? "rotate-90" : ""
                }`}
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
            </button>

            {contentSectionsExpanded && (
              <div className="mt-2 space-y-1">
                <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Sections
                </p>
                {contentSections.map((item) => (
                  <NavLink key={item.href} item={item} indent />
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="pt-6 border-t border-gray-200">
            <div className="px-4 py-3 bg-green-50 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium text-green-800">Development Mode</span>
              </div>
              <p className="text-xs text-green-600">Admin Interface v1.0</p>
            </div>
          </div>
        </nav>
        </div>
      </Swipeable>
    </>
  );
}