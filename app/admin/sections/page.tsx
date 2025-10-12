"use client";

import Link from "next/link";
import { AdminCard, AdminButton } from "@/components/admin/ui";
import {
  Navigation,
  Sparkles,
  Users,
  Building,
  Briefcase,
  Image,
  Handshake,
  Target,
  Footprints,
  ArrowRight
} from "lucide-react";

const SECTION_OVERVIEWS = [
  {
    section: "navbar",
    title: "Navbar",
    description: "Site navigation, logo, and main menu",
    icon: Navigation,
    color: "bg-blue-50 text-blue-600 border-blue-200",
    quickEdit: "Logo & Navigation"
  },
  {
    section: "hero",
    title: "Hero Section",
    description: "Landing page headline and call-to-action",
    icon: Sparkles,
    color: "bg-purple-50 text-purple-600 border-purple-200",
    quickEdit: "Headline & CTA"
  },
  {
    section: "marquee_clients",
    title: "Client Marquee",
    description: "Client logos scrolling showcase",
    icon: Users,
    color: "bg-green-50 text-green-600 border-green-200",
    quickEdit: "Client Logos"
  },
  {
    section: "about",
    title: "About Section",
    description: "Company story and team information",
    icon: Building,
    color: "bg-orange-50 text-orange-600 border-orange-200",
    quickEdit: "About Content"
  },
  {
    section: "services",
    title: "Services",
    description: "Service offerings and features",
    icon: Briefcase,
    color: "bg-red-50 text-red-600 border-red-200",
    quickEdit: "Service List"
  },
  {
    section: "portfolio",
    title: "Portfolio",
    description: "Featured projects and case studies",
    icon: Image,
    color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    quickEdit: "Portfolio Items"
  },
  {
    section: "digital_partners",
    title: "Digital Partners",
    description: "Technology and service partners",
    icon: Handshake,
    color: "bg-teal-50 text-teal-600 border-teal-200",
    quickEdit: "Partner Info"
  },
  {
    section: "cta",
    title: "Call-to-Action",
    description: "Main conversion prompts",
    icon: Target,
    color: "bg-pink-50 text-pink-600 border-pink-200",
    quickEdit: "CTA Buttons"
  },
  {
    section: "footer",
    title: "Footer",
    description: "Site footer links and information",
    icon: Footprints,
    color: "bg-gray-50 text-gray-600 border-gray-200",
    quickEdit: "Footer Links"
  },
];

export default function SectionsPage() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdminCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sections</p>
              <p className="text-2xl font-bold text-gray-900">{SECTION_OVERVIEWS.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Navigation className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </AdminCard>

        <AdminCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ready to Edit</p>
              <p className="text-2xl font-bold text-green-600">{SECTION_OVERVIEWS.length}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </AdminCard>

        <AdminCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Updated</p>
              <p className="text-lg font-bold text-gray-900">Today</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </AdminCard>
      </div>

      {/* Section Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SECTION_OVERVIEWS.map((section) => {
          const IconComponent = section.icon;
          return (
            <AdminCard
              key={section.section}
              className="p-6 hover:shadow-lg transition-shadow duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg border ${section.color} group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {section.section}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {section.title}
              </h3>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {section.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Quick edit: {section.quickEdit}
                </span>

                <Link href={`/admin/sections/${section.section}`}>
                  <AdminButton size="sm" className="group-hover:bg-blue-600 transition-colors">
                    Edit
                    <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </AdminButton>
                </Link>
              </div>
            </AdminCard>
          );
        })}
      </div>

      {/* Quick Actions */}
      <AdminCard className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Quick Actions
            </h3>
            <p className="text-sm text-gray-600">
              Jump to your most frequently edited sections
            </p>
          </div>
          <div className="flex space-x-2">
            <Link href="/admin/sections/navbar">
              <AdminButton variant="outline" size="sm">
                <Navigation className="h-4 w-4 mr-1" />
                Navbar
              </AdminButton>
            </Link>
            <Link href="/admin/sections/hero">
              <AdminButton variant="outline" size="sm">
                <Sparkles className="h-4 w-4 mr-1" />
                Hero
              </AdminButton>
            </Link>
            <Link href="/admin/sections/footer">
              <AdminButton variant="outline" size="sm">
                <Footprints className="h-4 w-4 mr-1" />
                Footer
              </AdminButton>
            </Link>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}