"use client";

import { ReactNode } from "react";
import { AdminCard, AdminButton } from "@/components/admin/ui";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function SectionsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Link href="/admin" className="flex items-center hover:text-gray-700 transition-colors">
          <Home className="h-4 w-4 mr-1" />
          Admin
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Sections</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Sections</h1>
          <p className="mt-1 text-sm text-gray-600">
            Edit and manage your website content sections
          </p>
        </div>
        <Link href="/admin">
          <AdminButton variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </AdminButton>
        </Link>
      </div>

      {/* Section Content */}
      {children}
    </div>
  );
}