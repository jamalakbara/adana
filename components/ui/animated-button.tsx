"use client";

import React from "react";

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  hasArrow?: boolean;
  arrowDirection?: "up-right" | "down" | "right";
  animationType?: "scale" | "glow" | "slide" | "bounce";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

const variantClasses = {
  primary: "bg-[#F1FF66] text-[#334E4D] hover:bg-[#e6ee5f] active:bg-[#dde554]",
  secondary: "bg-[#1E1E1E] text-[#FFFFFF] hover:bg-[#2a2a2a] active:bg-[#333333]",
  outline: "bg-transparent border border-[#1E1E1E] text-[#1E1E1E] hover:bg-[#1E1E1E] hover:text-[#FFFFFF]",
  ghost: "bg-transparent text-[#1E1E1E] hover:bg-[#f5f5ed]"
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-[18px] py-[12px] text-[14px]",
  lg: "px-6 py-3 text-base"
};

const arrowIcons = {
  "up-right": (
    <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  "down": (
    <path d="M7 3L7 11M7 11L3 7M7 11L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  "right": (
    <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  )
};

export function AnimatedButton({
  children,
  variant = "primary",
  size = "md",
  hasArrow = false,
  arrowDirection = "up-right",
  animationType = "scale",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  style
}: AnimatedButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-[12px] rounded-[6px] font-['Funnel_Display:Medium',_sans-serif] font-medium transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed";

  const animationClasses = {
    scale: "hover:scale-105 active:scale-95",
    glow: "shadow-sm hover:shadow-md hover:shadow-[#F1FF66]/30",
    slide: "hover:translate-x-1 active:translate-x-0",
    bounce: "hover:animate-bounce"
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${animationClasses[animationType]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        color: variant === "primary" ? "#334E4D" : variant === "secondary" ? "#FFFFFF" : "#1E1E1E",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "normal",
        ...style
      }}
    >
      <span className="leading-[normal] whitespace-nowrap">{children}</span>

      {hasArrow && (
        <div className="relative shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="currentColor">
            {arrowIcons[arrowDirection]}
          </svg>
        </div>
      )}
    </button>
  );
}