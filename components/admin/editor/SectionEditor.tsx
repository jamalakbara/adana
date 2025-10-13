"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AdminButton, AdminCard, AdminAlert, AdminSpinner } from "@/components/admin/ui";
import { DynamicField } from "./DynamicField";
import { EditorPreview } from "./EditorPreview";
// Removed server-side import - using API calls instead
import type { SectionType } from "@/lib/cms/validation";
import type { Json } from "@/types/database";

// API helper functions
const fetchSection = async (sectionType: SectionType) => {
  const response = await fetch(`/api/admin/sections/${sectionType}`);
  if (!response.ok) {
    throw new Error('Failed to fetch section');
  }
  return response.json();
};

const updateSection = async (sectionType: SectionType, data: any) => {
  const response = await fetch(`/api/admin/sections/${sectionType}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update section');
  }
  return response.json();
};

const publishSection = async (sectionType: SectionType) => {
  const response = await fetch(`/api/admin/sections/${sectionType}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'published' }),
  });
  if (!response.ok) {
    throw new Error('Failed to publish section');
  }
  return response.json();
};

interface SectionEditorProps {
  sectionType: SectionType;
  title: string;
  description?: string;
  fields: EditorFieldConfig[];
}

export interface EditorFieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "media" | "logo" | "array" | "object" | "boolean" | "id";
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  hidden?: boolean; // For auto-generated fields like IDs
  options?: Array<{ value: string; label: string }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  rows?: number; // For textarea fields
  fields?: EditorFieldConfig[]; // For nested objects
}

interface EditorState {
  content: Record<string, unknown>;
  originalContent: Record<string, unknown>;
  loading: boolean;
  saving: boolean;
  publishing: boolean;
  error: string | null;
  success: string | null;
  hasUnsavedChanges: boolean;
  lockStatus: {
    isLocked: boolean;
    lockedBy?: string;
    lockedAt?: string;
  } | null;
}

export function SectionEditor({
  sectionType,
  title,
  description,
  fields,
}: SectionEditorProps) {
  const router = useRouter();

  // Safety check for fields
  if (!fields || !Array.isArray(fields)) {
    console.error('SectionEditor: fields prop is required and must be an array', { sectionType, fields });
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
        <p className="text-gray-600">
          Section "{sectionType}" is not properly configured. Please check the section configuration.
        </p>
      </div>
    );
  }

  const [state, setState] = useState<EditorState>({
    content: {},
    originalContent: {},
    loading: true,
    saving: false,
    publishing: false,
    error: null,
    success: null,
    hasUnsavedChanges: false,
    lockStatus: null,
  });

  const generateDefaultContent = useCallback((fieldConfigs: EditorFieldConfig[]): Record<string, unknown> => {
    const content: Record<string, unknown> = {};

    if (!fieldConfigs || !Array.isArray(fieldConfigs)) {
      console.warn('fieldConfigs is not an array:', fieldConfigs);
      return content;
    }

    fieldConfigs.forEach(field => {
      switch (field.type) {
        case "text":
        case "textarea":
          content[field.name] = "";
          break;
        case "number":
          content[field.name] = 0;
          break;
        case "boolean":
          content[field.name] = false;
          break;
        case "array":
          content[field.name] = [];
          break;
        case "object":
          content[field.name] = field.fields ? generateDefaultContent(field.fields) : {};
          break;
        case "media":
          content[field.name] = null;
          break;
        case "select":
          content[field.name] = field.options?.[0]?.value || "";
          break;
        default:
          content[field.name] = null;
      }
    });

    return content;
  }, []);

  const loadContent = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Load content via API
      try {
        const sectionData = await fetchSection(sectionType);
        setState(prev => ({
          ...prev,
          content: (sectionData.content as Record<string, unknown>) || {},
          originalContent: (sectionData.content as Record<string, unknown>) || {},
          loading: false,
        }));
      } catch (error) {
        // Create new content if none exists
        const defaultContent = generateDefaultContent(fields);
        setState(prev => ({
          ...prev,
          content: defaultContent,
          originalContent: defaultContent,
          loading: false,
        }));
      }
    } catch (error) {
      console.error("Failed to load content:", error);
      setState(prev => ({
        ...prev,
        error: "Failed to load content. Please try again.",
        loading: false,
      }));
    }
  }, [sectionType, fields, generateDefaultContent]);

  // Load content on mount
  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const updateField = (fieldName: string, value: unknown) => {
    setState(prev => {
      const newContent = { ...prev.content };
      setNestedValue(newContent, fieldName, value);

      return {
        ...prev,
        content: newContent,
        hasUnsavedChanges: JSON.stringify(newContent) !== JSON.stringify(prev.originalContent),
        error: null,
        success: null,
      };
    });
  };

  const setNestedValue = (obj: Record<string, unknown>, path: string, value: unknown) => {
    const keys = path.split(".");
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current) || typeof current[key] !== "object") {
        current[key] = {};
      }
      current = current[key] as Record<string, unknown>;
    }

    current[keys[keys.length - 1]] = value;
  };

  const getNestedValue = (obj: Record<string, unknown>, path: string) => {
    const keys = path.split(".");
    let result: unknown = obj;

    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = (result as Record<string, unknown>)[key];
      } else {
        return undefined;
      }
    }

    return result as Record<string, unknown> | undefined;
  };

  const handleSave = async () => {
    try {
      setState(prev => ({ ...prev, saving: true, error: null }));

      const result = await updateSection(sectionType, {
        content: state.content as Json,
        status: 'draft'
      });

      if (result) {
        setState(prev => ({
          ...prev,
          saving: false,
          success: "Content saved successfully!",
          originalContent: { ...prev.content },
          hasUnsavedChanges: false,
        }));

        // Clear success message after 3 seconds
        setTimeout(() => {
          setState(prev => ({ ...prev, success: null }));
        }, 3000);
      } else {
        throw new Error(result.error || "Failed to save content");
      }
    } catch (error) {
      console.error("Failed to save content:", error);
      setState(prev => ({
        ...prev,
        saving: false,
        error: error instanceof Error ? error.message : "Failed to save content",
      }));
    }
  };

  const handlePublish = async () => {
    try {
      setState(prev => ({ ...prev, publishing: true, error: null }));

      // First save the content
      const saveResult = await updateSection(sectionType, {
        content: state.content as Json,
        status: 'draft'
      });

      if (!saveResult) {
        throw new Error("Failed to save content before publishing");
      }

      // Then publish it
      const publishResult = await publishSection(sectionType);

      if (publishResult) {
        setState(prev => ({
          ...prev,
          publishing: false,
          success: "Content published successfully!",
          originalContent: { ...prev.content },
          hasUnsavedChanges: false,
        }));

        // Clear success message after 3 seconds
        setTimeout(() => {
          setState(prev => ({ ...prev, success: null }));
        }, 3000);
      } else {
        throw new Error(publishResult.error || "Failed to publish content");
      }
    } catch (error) {
      console.error("Failed to publish content:", error);
      setState(prev => ({
        ...prev,
        publishing: false,
        error: error instanceof Error ? error.message : "Failed to publish content",
      }));
    }
  };

  const handleDiscardChanges = () => {
    setState(prev => ({
      ...prev,
      content: { ...prev.originalContent },
      hasUnsavedChanges: false,
      error: null,
      success: null,
    }));
  };

  // Show lock screen if content is locked by someone else
  if (state.lockStatus?.isLocked) {
    return (
      <div className="max-w-4xl mx-auto">
        <AdminCard title="Content Locked" className="text-center py-12">
          <div className="text-yellow-600 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            This content is currently being edited
          </h3>
          <p className="text-gray-600 mb-4">
            {state.lockStatus.lockedBy && (
              <>Locked by: <strong>{state.lockStatus.lockedBy}</strong><br /></>
            )}
            {state.lockStatus.lockedAt && (
              <>Since: {new Date(state.lockStatus.lockedAt).toLocaleString()}</>
            )}
          </p>
          <AdminButton
            variant="outline"
            onClick={() => router.push("/admin")}
          >
            Back to Dashboard
          </AdminButton>
        </AdminCard>
      </div>
    );
  }

  // Show loading state
  if (state.loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <AdminSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="mt-1 text-gray-600">{description}</p>
            )}
          </div>
          <AdminButton
            variant="outline"
            onClick={() => router.push("/admin")}
          >
            Back to Dashboard
          </AdminButton>
        </div>
      </div>

      {/* Alerts */}
      {state.error && (
        <AdminAlert variant="error" className="mb-6">
          {state.error}
        </AdminAlert>
      )}

      {state.success && (
        <AdminAlert variant="success" className="mb-6">
          {state.success}
        </AdminAlert>
      )}

      {/* Editor Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Form */}
        <div className="xl:col-span-2 space-y-6">
          <AdminCard title="Edit Content">
            <div className="space-y-6">
              {fields.map((field) => (
                <DynamicField
                  key={field.name}
                  field={field}
                  value={getNestedValue(state.content, field.name)}
                  onChange={(value) => updateField(field.name, value)}
                />
              ))}
            </div>
          </AdminCard>

          {/* Preview */}
          <EditorPreview
            title={title}
            content={state.content}
            fields={fields}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <AdminCard title="Status" padding="sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Changes</span>
                <span className={`text-sm ${state.hasUnsavedChanges ? "text-yellow-600" : "text-green-600"}`}>
                  {state.hasUnsavedChanges ? "Unsaved" : "Saved"}
                </span>
              </div>

              {state.hasUnsavedChanges && (
                <div className="flex space-x-2">
                  <AdminButton
                    variant="outline"
                    size="sm"
                    onClick={handleDiscardChanges}
                    disabled={state.saving || state.publishing}
                    className="flex-1"
                  >
                    Discard
                  </AdminButton>
                  <AdminButton
                    variant="secondary"
                    size="sm"
                    onClick={handleSave}
                    disabled={state.saving || state.publishing}
                    loading={state.saving}
                    className="flex-1"
                  >
                    Save
                  </AdminButton>
                </div>
              )}
            </div>
          </AdminCard>

          {/* Actions */}
          <AdminCard title="Actions" padding="sm">
            <div className="space-y-3">
              <AdminButton
                onClick={handleSave}
                disabled={!state.hasUnsavedChanges || state.saving || state.publishing}
                loading={state.saving}
                className="w-full"
              >
                Save Draft
              </AdminButton>

              <AdminButton
                variant="primary"
                onClick={handlePublish}
                disabled={state.publishing || state.saving}
                loading={state.publishing}
                className="w-full"
              >
                Publish Changes
              </AdminButton>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}