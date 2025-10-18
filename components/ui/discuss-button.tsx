"use client";

import React from "react";
import { AnimatedButton } from "@/components/ui/animated-button";

export function DiscussButton() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/628112114142', '_blank');
  };

  return (
    <AnimatedButton
      variant="primary"
      hasArrow={true}
      arrowDirection="up-right"
      animationType="scale"
      size="md"
      onClick={handleWhatsAppClick}
    >
      Let&apos;s Discuss
    </AnimatedButton>
  );
}