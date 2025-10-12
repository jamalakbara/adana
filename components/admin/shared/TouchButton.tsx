"use client";

import React from "react";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface TouchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const TouchButton = forwardRef<HTMLButtonElement, TouchButtonProps>(
  ({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    icon,
    fullWidth = false,
    className = "",
    disabled,
    ...props
  }, ref) => {
    const baseClasses = `
      inline-flex items-center justify-center
      font-medium
      transition-all duration-200
      ease-in-out
      touch-manipulation
      select-none
      active:scale-95
      focus:outline-none
      focus:ring-2
      focus:ring-offset-2
      disabled:cursor-not-allowed
      disabled:opacity-50
      disabled:active:scale-100
      ${fullWidth ? "w-full" : ""}
    `;

    const sizeClasses = {
      sm: "px-3 py-2 text-sm min-h-[44px] sm:min-h-[32px]",
      md: "px-4 py-3 text-base min-h-[48px] sm:min-h-[40px] sm:px-4 sm:py-2 sm:text-sm",
      lg: "px-6 py-4 text-lg min-h-[52px] sm:min-h-[44px] sm:px-5 sm:py-3 sm:text-base",
    };

    const variantClasses = {
      primary: `
        bg-blue-600
        text-white
        hover:bg-blue-700
        active:bg-blue-800
        focus:ring-blue-500
        shadow-sm
        sm:shadow
      `,
      secondary: `
        bg-gray-600
        text-white
        hover:bg-gray-700
        active:bg-gray-800
        focus:ring-gray-500
        shadow-sm
        sm:shadow
      `,
      outline: `
        bg-transparent
        text-gray-700
        border border-gray-300
        hover:bg-gray-50
        hover:text-gray-900
        active:bg-gray-100
        focus:ring-blue-500
        focus:border-blue-500
      `,
      ghost: `
        bg-transparent
        text-gray-600
        hover:bg-gray-100
        hover:text-gray-900
        active:bg-gray-200
        focus:ring-gray-500
      `,
    };

    const combinedClasses = `
      ${baseClasses}
      ${sizeClasses[size]}
      ${variantClasses[variant]}
      ${className}
    `;

    return (
      <button
        ref={ref}
        className={combinedClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {icon && !loading && (
          <span className="mr-2">{icon}</span>
        )}

        <span className="font-medium">{children}</span>
      </button>
    );
  }
);

TouchButton.displayName = "TouchButton";