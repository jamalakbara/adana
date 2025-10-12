import React from "react";

interface AdminCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export function AdminCard({
  children,
  title,
  description,
  className = "",
  padding = "md",
}: AdminCardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>
      {(title || description) && (
        <div className={`${padding !== "none" ? paddingClasses[padding] : ""} border-b border-gray-200`}>
          {title && (
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}
      <div className={padding !== "none" && !title && !description ? paddingClasses[padding] : ""}>
        {children}
      </div>
    </div>
  );
}