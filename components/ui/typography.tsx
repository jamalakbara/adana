"use client";

import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  variant: "section-label" | "section-title" | "section-subtitle" | "section-description" | "body";
  className?: string;
  style?: React.CSSProperties;
  nodeId?: string;
}

export function Typography({ children, variant, className = "", style, nodeId }: TypographyProps) {
  const baseClasses = "font-['Public_Sans']";

  const variantClasses = {
    "section-label": "text-[#1E1E1E] text-[14px] sm:text-[15px] md:text-[16px] font-medium leading-[normal] uppercase self-stretch",
    "section-title": "text-[#1E1E1E] text-[24px] sm:text-[28px] md:text-[36px] lg:text-[40px] xl:text-[44px] font-normal leading-[normal] self-stretch",
    "section-subtitle": "text-[#1E1E1E] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-normal leading-[normal]",
    "section-description": "text-[#646464] text-[14px] sm:text-[13px] md:text-[14px] font-normal leading-[20px] self-stretch",
    "body": "text-[#646464] text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[18px] sm:leading-[19px] md:leading-[20px]"
  };

  
  const mergedStyle = { ...style };

  const Tag = variant === "section-title" ? "h1" : "div";

  return (
    <Tag className={`${baseClasses} ${variantClasses[variant]} ${className}`} style={mergedStyle} data-node-id={nodeId}>
      {children}
    </Tag>
  );
}