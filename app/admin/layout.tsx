import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { OrientationHandler } from "@/components/admin/shared/OrientationHandler";
import { PerformanceOptimizer } from "@/components/admin/shared/usePerformanceMonitor";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PerformanceOptimizer
      enableReducedMotion
      enableLowQualityImages
      enableVirtualization
    >
      <OrientationHandler>
        <div className="min-h-screen bg-gray-50 flex">
          {/* Sidebar - Hidden on mobile, visible on desktop */}
          <AdminSidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <AdminHeader />

            {/* Page Content */}
            <main className="flex-1 overflow-auto">
              <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 flex-shrink-0">
              <div className="max-w-7xl mx-auto py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-xs sm:text-sm text-gray-500">
                  CMS Admin Interface - Development Build
                </p>
              </div>
            </footer>
          </div>
        </div>
      </OrientationHandler>
    </PerformanceOptimizer>
  );
}