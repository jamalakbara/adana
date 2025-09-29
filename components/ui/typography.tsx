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
    "section-label": "text-[14px] sm:text-[15px] md:text-[16px] font-medium leading-[normal] uppercase",
    "section-title": "text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] font-normal leading-[normal]",
    "section-subtitle": "text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-normal leading-[normal]",
    "section-description": "text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[18px] sm:leading-[19px] md:leading-[20px]",
    "body": "text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[18px] sm:leading-[19px] md:leading-[20px]"
  };

  const defaultStyles = {
    "section-label": {
      color: "#1E1E1E",
      fontFamily: '"Public Sans"',
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "normal"
    },
    "section-title": {
      color: "#1E1E1E",
      fontFamily: '"Public Sans"',
      fontSize: "44px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal"
    },
    "section-subtitle": {
      color: "#1E1E1E",
      fontFamily: '"Public Sans"',
      fontSize: "36px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal"
    },
    "section-description": {
      color: "#646464",
      fontFamily: '"Public Sans"',
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "20px"
    },
    "body": {
      color: "#646464",
      fontFamily: '"Public Sans"',
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "20px"
    }
  };

  const mergedStyle = { ...defaultStyles[variant], ...style };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} style={mergedStyle} data-node-id={nodeId}>
      {children}
    </div>
  );
}