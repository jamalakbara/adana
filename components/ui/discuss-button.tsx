"use client";

import React from "react";
import { AnimatedButton } from "@/components/ui/animated-button";

export function DiscussButton() {
  return (
    <AnimatedButton
      variant="primary"
      hasArrow={true}
      arrowDirection="up-right"
      animationType="scale"
      size="md"
    >
      Let's Discuss
    </AnimatedButton>
  );
}