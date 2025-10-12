"use client";

import { useState } from "react";
import { isDevelopmentBypass } from "@/lib/auth/client";
import { MobileNavigation } from "./MobileNavigation";

export function AdminHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDev = isDevelopmentBypass();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label="Open navigation menu"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Center - Page Title */}
          <div className="flex-1 flex justify-center">
            <h1 className="text-xl font-semibold text-gray-900 lg:hidden">
              CMS Admin
            </h1>
          </div>

          {/* Right side - User info */}
          <div className="flex items-center space-x-4">
            {isDev && (
              <div className="hidden sm:block">
                <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Development Mode
                </span>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {isDev ? "Development Admin" : "Admin User"}
                </p>
                <p className="text-xs text-gray-500">
                  {isDev ? "admin@example.com" : "admin@website.com"}
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Component */}
        <MobileNavigation
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
}