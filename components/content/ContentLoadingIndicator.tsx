"use client";

import React from "react";
import { useContent } from "./providers/ContentProvider";

interface ContentLoadingIndicatorProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function ContentLoadingIndicator({
  fallback = null,
  children
}: ContentLoadingIndicatorProps) {
  const { loading, error } = useContent();

  // Show fallback or error state
  if (loading && fallback) {
    return <>{fallback}</>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] p-8">
        <div className="text-center">
          <div className="text-yellow-600 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Content Loading Error
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Component for showing loading skeleton
export function ContentSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-4/6"></div>
    </div>
  );
}

// Component for section-level loading
export function SectionLoading({ section }: { section: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-sm text-gray-600">
          Loading {section}...
        </p>
      </div>
    </div>
  );
}