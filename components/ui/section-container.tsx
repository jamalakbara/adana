"use client";

import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
  background?: "light" | "dark" | "accent" | "custom";
  padding?: "sm" | "md" | "lg" | "xl" | "none";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "none";
  className?: string;
  nodeId?: string;
  ref?: React.Ref<HTMLElement>;
}

const backgroundClasses = {
  light: "bg-[#fcfcf4]",
  dark: "bg-[#334e4d]",
  accent: "bg-[#F1FF66]",
  custom: ""
};

const paddingClasses = {
  sm: "py-[40px] sm:py-[50px] md:py-[60px]",
  md: "py-[50px] sm:py-[65px] md:py-[80px]",
  lg: "py-[60px] sm:py-[80px] md:py-[100px]",
  xl: "py-[80px] sm:py-[100px] md:py-[120px]",
  none: ""
};

const maxWidthClasses = {
  sm: "max-w-4xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  none: ""
};

export const SectionContainer = React.forwardRef<HTMLElement, SectionContainerProps>(({
  children,
  background = "light",
  padding = "xl",
  maxWidth = "xl",
  className = "",
  nodeId
}, ref) => {
  return (
    <section
      ref={ref}
      className={`relative ${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}
      data-node-id={nodeId}
    >
      <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}>
        {children}
      </div>
    </section>
  );
});

SectionContainer.displayName = "SectionContainer";