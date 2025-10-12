"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MobileFormProps {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent) => void;
  noValidate?: boolean;
}

interface MobileFormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function MobileForm({ children, className = "", onSubmit, noValidate = false }: MobileFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  // Handle keyboard navigation and touch events
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    // Add touch-friendly event listeners
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        // Add haptic feedback if available
        if ('vibrate' in navigator) {
          navigator.vibrate(10);
        }
      }
    };

    form.addEventListener('touchstart', handleTouchStart);

    return () => {
      form.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  // Handle form submission with better mobile UX
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Disable form submission temporarily to prevent double taps
    const submitButton = formRef.current?.querySelector('[type="submit"]') as HTMLButtonElement;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.classList.add('opacity-75', 'cursor-not-allowed');

      // Re-enable after a short delay
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
      }, 300);
    }

    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form
      ref={formRef}
      className={cn(
        // Mobile-first form styling
        "space-y-6 px-4 py-6 sm:px-6 sm:py-8",
        // Touch optimization
        "touch-manipulation select-none",
        // Prevent zoom on iOS when focusing inputs
        "transform-gpu",
        className
      )}
      onSubmit={handleSubmit}
      noValidate={noValidate}
    >
      {children}
    </form>
  );
}

export function MobileFormSection({
  title,
  description,
  children,
  className = ""
}: MobileFormSectionProps) {
  return (
    <div className={cn(
      // Section container with better mobile spacing
      "bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6",
      className
    )}>
      {title && (
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 sm:text-xl">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-gray-600 sm:text-base">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="space-y-4 sm:space-y-6">
        {children}
      </div>
    </div>
  );
}

export function MobileFormActions({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      // Sticky footer with proper mobile padding
      "sticky bottom-0 bg-white border-t border-gray-200 px-4 py-4 sm:px-6 sm:py-6",
      "flex flex-col sm:flex-row sm:justify-end sm:space-x-4 sm:space-y-0 space-y-3",
      className
    )}>
      {children}
    </div>
  );
}

export function MobileFormSuccess({
  title,
  description,
  onDismiss
}: {
  title: string;
  description?: string;
  onDismiss?: () => void;
}) {
  useEffect(() => {
    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      if (onDismiss) onDismiss();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-green-800 sm:text-base">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-green-700 sm:text-sm">
              {description}
            </p>
          )}
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <button
              onClick={onDismiss}
              className="inline-flex text-green-600 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 p-1"
              aria-label="Dismiss"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
        )}
      </div>
    </div>
  );
}

export function MobileFormError({
  title,
  description,
  onRetry
}: {
  title: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800 sm:text-base">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-red-700 sm:text-sm">
              {description}
            </p>
          )}
          {onRetry && (
            <div className="mt-3">
              <button
                onClick={onRetry}
                className="text-sm font-medium text-red-800 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}