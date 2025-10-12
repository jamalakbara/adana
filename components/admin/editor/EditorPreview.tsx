"use client";

import { useState } from "react";
import { AdminCard, AdminButton, AdminBadge } from "@/components/admin/ui";
import type { EditorFieldConfig } from "./SectionEditor";

interface MediaAsset {
  id: string;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  supabase_url: string;
  alt_text?: string;
  is_temp?: boolean;
}

interface EditorPreviewProps {
  title: string;
  content: unknown;
  fields: EditorFieldConfig[];
  previewComponent?: React.ComponentType<{ content: unknown }>;
}

export function EditorPreview({
  title,
  content,
  fields,
  previewComponent: CustomPreview,
}: EditorPreviewProps) {
  const [activeView, setActiveView] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const viewSizes = {
    desktop: "w-full",
    tablet: "max-w-md mx-auto",
    mobile: "max-w-sm mx-auto",
  };

  const renderFieldValue = (field: EditorFieldConfig, value: unknown): React.ReactNode => {
    if (!value && value !== 0 && value !== false) {
      return <span className="text-gray-400 italic">Not set</span>;
    }

    switch (field.type) {
      case "boolean":
        return value ? (
          <AdminBadge variant="green" size="sm">Yes</AdminBadge>
        ) : (
          <AdminBadge variant="gray" size="sm">No</AdminBadge>
        );

      case "media":
        if ((value as MediaAsset)?.mime_type?.startsWith("image/")) {
          const media = value as MediaAsset;
          return (
            <div className="space-y-2">
              <img
                src={media.supabase_url}
                alt={media.alt_text || field.label}
                className="max-w-xs h-auto rounded border border-gray-200"
              />
              <div className="text-xs text-gray-500">
                <p>{media.original_name}</p>
                <p>{media.mime_type} • {formatFileSize(media.size_bytes)}</p>
              </div>
            </div>
          );
        } else {
          const media = value as MediaAsset;
          return (
            <div className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <p className="font-medium">{media?.original_name || "File"}</p>
                <p className="text-xs text-gray-500">{media?.mime_type}</p>
              </div>
            </div>
          );
        }

      case "array":
        if (!Array.isArray(value) || value.length === 0) {
          return <span className="text-gray-400 italic">No items</span>;
        }
        return (
          <div className="space-y-2">
            {value.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded p-3 bg-gray-50">
                <h4 className="font-medium text-sm mb-2">Item {index + 1}</h4>
                <div className="space-y-1">
                  {field.fields?.map((subField) => (
                    <div key={subField.name} className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">{subField.label}:</span>
                      <span className="text-xs">{renderFieldValue(subField, (item as Record<string, unknown>)[subField.name])}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "object":
        if (!value || typeof value !== "object") {
          return <span className="text-gray-400 italic">No data</span>;
        }
        return (
          <div className="space-y-2">
            {field.fields?.map((subField) => (
              <div key={subField.name} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{subField.label}:</span>
                <span className="text-sm">{renderFieldValue(subField, (value as Record<string, unknown>)[subField.name])}</span>
              </div>
            ))}
          </div>
        );

      case "textarea":
        return (
          <div className="bg-gray-50 p-3 rounded border border-gray-200">
            <p className="whitespace-pre-wrap text-sm">{String(value)}</p>
          </div>
        );

      default:
        return <span className="text-sm">{String(value)}</span>;
    }
  };

  // If a custom preview component is provided, use it
  if (CustomPreview) {
    return (
      <AdminCard title={`Preview: ${title}`}>
        <div className="space-y-4">
          {/* View selector */}
          <div className="flex space-x-2">
            {(["desktop", "tablet", "mobile"] as const).map((view) => (
              <AdminButton
                key={view}
                variant={activeView === view ? "primary" : "outline"}
                size="sm"
                onClick={() => setActiveView(view)}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </AdminButton>
            ))}
          </div>

          {/* Custom preview */}
          <div className={`border border-gray-200 rounded-lg overflow-hidden ${viewSizes[activeView]}`}>
            <div className="bg-white p-4">
              <CustomPreview content={content} />
            </div>
          </div>

          {/* Data view */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-sm text-gray-700 mb-3">Content Data</h4>
            <div className="space-y-3">
              {fields.map((field) => (
                <div key={field.name} className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <div>
                    {renderFieldValue(field, getNestedValue(content, field.name))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminCard>
    );
  }

  // Default data preview
  return (
    <AdminCard title={`Preview: ${title}`}>
      <div className="space-y-4">
        {/* View selector */}
        <div className="flex space-x-2">
          {(["desktop", "tablet", "mobile"] as const).map((view) => (
            <AdminButton
              key={view}
              variant={activeView === view ? "primary" : "outline"}
              size="sm"
              onClick={() => setActiveView(view)}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </AdminButton>
          ))}
        </div>

        {/* Preview frame */}
        <div className={`border border-gray-200 rounded-lg overflow-hidden ${viewSizes[activeView]}`}>
          <div className="bg-gradient-to-b from-gray-50 to-white min-h-96 p-6">
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-1">
                    {field.label}
                  </h3>
                  <div className="pl-2">
                    {renderFieldValue(field, getNestedValue(content, field.name))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Empty state */}
        {isEmptyContent(content, fields) && (
          <div className="text-center py-12 text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No content yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start adding content to see a preview here
            </p>
          </div>
        )}
      </div>
    </AdminCard>
  );
}

// Helper function to get nested value
function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce((current, key) => current && typeof current === 'object' ? (current as Record<string, unknown>)[key] : undefined, obj);
}

// Helper function to check if content is empty
function isEmptyContent(content: unknown, fields: EditorFieldConfig[]): boolean {
  return fields.every(field => {
    const value = getNestedValue(content, field.name);

    switch (field.type) {
      case "boolean":
        return !value;
      case "number":
        return !value && value !== 0;
      case "array":
        return !Array.isArray(value) || value.length === 0;
      case "object":
        return !value || typeof value !== "object" || Object.keys(value).length === 0;
      case "media":
        return !value;
      default:
        return !value || value === "";
    }
  });
}

// Utility function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}