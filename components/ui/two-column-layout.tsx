"use client";

import React from "react";

interface TwoColumnLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  gap?: "sm" | "md" | "lg" | "xl";
  alignment?: "start" | "center" | "end";
  reverseOnMobile?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const gapClasses = {
  sm: "gap-6",
  md: "gap-8",
  lg: "gap-12",
  xl: "gap-[80px]"
};

const alignmentClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end"
};

export function TwoColumnLayout({
  leftContent,
  rightContent,
  gap = "lg",
  alignment = "center",
  reverseOnMobile = false,
  className = ""
}: TwoColumnLayoutProps) {
  return (
    <div className={`flex flex-col lg:flex-row ${gapClasses[gap]} ${alignmentClasses[alignment]} ${className} ${reverseOnMobile ? "lg:flex-row-reverse" : ""}`}>
      <div className="flex-1">
        {leftContent}
      </div>
      <div className="flex-1">
        {rightContent}
      </div>
    </div>
  );
}