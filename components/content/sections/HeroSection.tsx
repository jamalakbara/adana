"use client";

import { useContent } from "../providers/ContentProvider";
import type { CTAButton } from "@/lib/cms/validation";

export function HeroSection() {
  const { content, loading, error } = useContent();

  if (loading) {
    return (
      <section className="relative bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded mb-4 max-w-3xl mx-auto"></div>
              <div className="h-6 bg-gray-700 rounded mb-8 max-w-2xl mx-auto"></div>
              <div className="h-10 bg-gray-700 rounded w-32 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative bg-red-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Content Error</h1>
            <p className="text-xl">Failed to load hero section content.</p>
          </div>
        </div>
      </section>
    );
  }

  const heroContent = content.hero?.content || {};
  const {
    headline = "Welcome to Our Website",
    subheadline = "We build amazing things",
    cta_buttons = [],
  } = heroContent;

  return (
    <section className="relative bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {headline}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            {subheadline}
          </p>
          <div className="space-x-4">
            {cta_buttons.map((button: CTAButton, index: number) => (
              <a
                key={index}
                href={button.href || "#"}
                className={`inline-block px-8 py-3 rounded-lg font-medium transition-colors ${
                  button.variant === "primary"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                }`}
              >
                {button.text || "Get Started"}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}