"use client";

import { useState, useEffect } from "react";
import { AdminInput, AdminTextarea, AdminSelect, AdminButton, AdminCard, AdminModal } from "@/components/admin/ui";
import { TouchButton } from "@/components/admin/shared/TouchButton";
import { MobileCamera } from "@/components/admin/media/MobileCamera";
import { SimpleLogoUpload } from "@/components/admin/media/SimpleLogoUpload";
import { OptimizedImage } from "@/components/admin/shared/OptimizedImage";
import { MobileLazyLoad } from "@/components/admin/shared/LazyLoad";
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

interface DynamicFieldProps {
  field: EditorFieldConfig;
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}

export function DynamicField({ field, value, onChange, error }: DynamicFieldProps) {
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  const handleMediaSelect = (mediaAsset: unknown) => {
    onChange(mediaAsset);
    setMediaModalOpen(false);
  };

  // Handle hidden fields (like auto-generated IDs)
  if (field.hidden) {
    return null;
  }

  switch (field.type) {
    case "text":
      return (
        <AdminInput
          label={field.label}
          value={typeof value === 'string' ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          helperText={field.helperText}
          error={error}
          required={field.required}
        />
      );

    case "textarea":
      return (
        <AdminTextarea
          label={field.label}
          value={typeof value === 'string' ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          helperText={field.helperText}
          error={error}
          required={field.required}
          rows={field.validation?.min || 3}
        />
      );

    case "number":
      return (
        <AdminInput
          label={field.label}
          type="number"
          value={typeof value === 'number' ? value : 0}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder={field.placeholder}
          helperText={field.helperText}
          error={error}
          required={field.required}
          min={field.validation?.min}
          max={field.validation?.max}
        />
      );

    case "boolean":
      return (
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id={field.name}
              checked={typeof value === 'boolean' ? value : false}
              onChange={(e) => onChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor={field.name} className="ml-2 text-sm text-gray-600">
              {field.placeholder || "Enable this option"}
            </label>
          </div>
          {field.helperText && (
            <p className="text-sm text-gray-500">{field.helperText}</p>
          )}
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </div>
      );

    case "select":
      return (
        <AdminSelect
          label={field.label}
          value={typeof value === 'string' ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          options={field.options || []}
          placeholder={field.placeholder}
          helperText={field.helperText}
          error={error}
          required={field.required}
        />
      );

    case "media":
      return (
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {value ? (
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {(value as MediaAsset)?.mime_type?.startsWith("image/") ? (
                    <OptimizedImage
                      src={(value as MediaAsset).supabase_url}
                      alt={(value as MediaAsset).alt_text || field.label}
                      className="h-12 w-12 object-cover rounded"
                      width={48}
                      height={48}
                      sizes="48px"
                      quality={60}
                    />
                  ) : (
                    <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                      <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {(value as MediaAsset).original_name || "Selected file"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(value as MediaAsset).mime_type} • {formatFileSize((value as MediaAsset).size_bytes)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <TouchButton
                    variant="outline"
                    size="sm"
                    onClick={() => setMediaModalOpen(true)}
                  >
                    Change
                  </TouchButton>
                  <TouchButton
                    variant="outline"
                    size="sm"
                    onClick={() => onChange(null)}
                  >
                    Remove
                  </TouchButton>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div className="mt-4">
                <TouchButton
                  variant="outline"
                  onClick={() => setMediaModalOpen(true)}
                  fullWidth
                >
                  Select Media
                </TouchButton>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {field.placeholder || "Select an image or file from the media library"}
              </p>
            </div>
          )}

          {field.helperText && (
            <p className="text-sm text-gray-500">{field.helperText}</p>
          )}
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {/* Media Selection Modal */}
          <MediaSelectorModal
            isOpen={mediaModalOpen}
            onClose={() => setMediaModalOpen(false)}
            onSelect={handleMediaSelect}
            accept={field.options?.[0]?.value} // Use options to specify accepted types
          />
        </div>
      );

    case "logo":
      return (
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <SimpleLogoUpload
            value={value}
            onChange={(asset) => onChange(asset)}
            className="w-full"
          />
          {field.helperText && (
            <p className="text-sm text-gray-500">{field.helperText}</p>
          )}
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </div>
      );

    case "array":
      return (
        <ArrayField
          field={field}
          value={(value as unknown[]) || []}
          onChange={onChange}
          error={error}
        />
      );

    case "object":
      return (
        <ObjectField
          field={field}
          value={(value as Record<string, unknown>) || {}}
          onChange={onChange}
          error={error}
        />
      );

    case "id":
      // Hidden ID field - value is managed automatically
      return null;

    default:
      return (
        <div className="text-sm text-gray-500">
          Unknown field type: {field.type}
        </div>
      );
  }
}

// Array field component for handling arrays of objects
function ArrayField({ field, value, onChange, error }: {
  field: EditorFieldConfig;
  value: unknown[];
  onChange: (value: unknown[]) => void;
  error?: string;
}) {
  const addItem = () => {
    const newItem = field.fields ? generateDefaultObject(field.fields) : {};
    // Add UUID for items that have an id field (required for validation)
    if ('id' in newItem === false && field.fields?.some(f => f.name === 'id')) {
      newItem.id = crypto.randomUUID();
    }
    onChange([...value, newItem]);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, fieldName: string, fieldValue: unknown) => {
    const newValue = [...value];
    const updatedItem = { ...(newValue[index] as Record<string, unknown>), [fieldName]: fieldValue };
    newValue[index] = updatedItem;
    onChange(newValue);
  };

  const generateDefaultObject = (fields: EditorFieldConfig[]) => {
    const obj: Record<string, unknown> = {};
    fields.forEach(f => {
      switch (f.type) {
        case "text":
        case "textarea":
          if (f.required) {
            // Provide better defaults based on field name
            if (f.name === "href" || f.name.includes("url")) {
              obj[f.name] = "/";
            } else if (f.name === "text" || f.name.includes("title") || f.name.includes("label")) {
              obj[f.name] = "New Item";
            } else {
              obj[f.name] = "Default Value";
            }
          } else {
            obj[f.name] = "";
          }
          break;
        case "number":
          obj[f.name] = 0;
          break;
        case "boolean":
          obj[f.name] = false;
          break;
        case "id":
          obj[f.name] = crypto.randomUUID();
          break;
        case "array":
          obj[f.name] = [];
          break;
        case "object":
          obj[f.name] = f.fields ? generateDefaultObject(f.fields) : {};
          break;
        case "media":
          obj[f.name] = null;
          break;
        default:
          obj[f.name] = null;
      }
    });
    return obj;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <AdminButton
          variant="outline"
          size="sm"
          onClick={addItem}
        >
          Add Item
        </AdminButton>
      </div>

      {field.helperText && (
        <p className="text-sm text-gray-500">{field.helperText}</p>
      )}

      <div className="space-y-3">
        {value.map((item, index) => (
          <AdminCard key={index} className="relative">
            <div className="absolute top-4 right-4">
              <AdminButton
                variant="danger"
                size="sm"
                onClick={() => removeItem(index)}
              >
                Remove
              </AdminButton>
            </div>
            <div className="pr-20">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                {field.label} #{index + 1}
              </h4>
              <div className="space-y-4">
                {field.fields?.map((subField) => (
                  <DynamicField
                    key={`${index}-${subField.name}`}
                    field={subField}
                    value={(item as Record<string, unknown>)[subField.name]}
                    onChange={(newValue) => updateItem(index, subField.name, newValue)}
                    error={undefined} // Pass field-specific errors if needed
                  />
                ))}
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      {value.length === 0 && (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <p>No items added yet</p>
          <AdminButton
            variant="outline"
            size="sm"
            onClick={addItem}
            className="mt-2"
          >
            Add First Item
          </AdminButton>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

// Object field component for handling nested objects
function ObjectField({ field, value, onChange, error }: {
  field: EditorFieldConfig;
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}) {
  const updateField = (fieldName: string, fieldValue: unknown) => {
    onChange({ ...(value as Record<string, unknown>), [fieldName]: fieldValue });
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {field.helperText && (
        <p className="text-sm text-gray-500">{field.helperText}</p>
      )}

      <div className="pl-4 border-l-2 border-gray-200 space-y-4">
        {field.fields?.map((subField) => (
          <DynamicField
            key={subField.name}
            field={subField}
            value={(value as Record<string, unknown>)[subField.name]}
            onChange={(newValue) => updateField(subField.name, newValue)}
          />
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

// Media selector modal component
function MediaSelectorModal({
  isOpen,
  onClose,
  onSelect,
  accept
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: unknown) => void;
  accept?: string;
}) {
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"library" | "camera">("library");

  useEffect(() => {
    if (isOpen) {
      loadMediaAssets();
    }
  }, [isOpen]);

  const loadMediaAssets = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/media");
      if (response.ok) {
        const data = await response.json();
        setMediaAssets(data.assets || []);
      }
    } catch (error) {
      console.error("Failed to load media assets:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAssets = mediaAssets.filter((asset: MediaAsset) =>
    asset.original_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCameraCapture = (file: File) => {
    // Create a mock media object that matches the expected format
    const mediaObject = {
      id: `camera-${Date.now()}`,
      original_name: file.name,
      mime_type: file.type,
      size_bytes: file.size,
      supabase_url: URL.createObjectURL(file),
      alt_text: file.name,
      is_temp: true // Mark as temporary until uploaded
    };
    onSelect(mediaObject);
  };

  const handleCameraCancel = () => {
    setActiveTab("library");
  };

  return (
    <AdminModal isOpen={isOpen} onClose={onClose} title="Select Media" size="lg">
      <div className="space-y-4">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "library"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("library")}
          >
            📁 Media Library
          </button>
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "camera"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("camera")}
          >
            📸 Take Photo
          </button>
        </div>

        {/* Library Tab Content */}
        {activeTab === "library" && (
          <div className="space-y-4">
            <AdminInput
              placeholder="Search media..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-500">Loading media...</p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  {filteredAssets.map((asset: MediaAsset) => (
                    <div
                      key={asset.id}
                      className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => onSelect(asset)}
                    >
                      {asset.mime_type.startsWith("image/") ? (
                        <OptimizedImage
                          src={asset.supabase_url}
                          alt={asset.alt_text || asset.original_name}
                          className="w-full h-24 object-cover rounded mb-2"
                          width={200}
                          height={96}
                          sizes="(max-width: 640px) 50vw, 200px"
                          quality={70}
                        />
                      ) : (
                        <div className="w-full h-24 bg-gray-100 rounded mb-2 flex items-center justify-center">
                          <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {asset.original_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(asset.size_bytes)}
                      </p>
                    </div>
                  ))}
                </div>

                {filteredAssets.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No media found</p>
                    <AdminButton
                      variant="outline"
                      size="sm"
                      onClick={() => window.open("/admin/media", "_blank")}
                      className="mt-2"
                    >
                      Upload New Media
                    </AdminButton>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Camera Tab Content */}
        {activeTab === "camera" && (
          <div className="space-y-4">
            <MobileLazyLoad
              rootMargin="20px"
              delay={100}
              placeholder={
                <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
                  <div className="text-center text-gray-500">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2m0 0a2 2 0 012 2m0 0a2 2 0 012-2m0 0a2 2 0 012-2" />
                    </svg>
                    <p className="text-sm">Loading camera...</p>
                  </div>
                </div>
              }
            >
              <MobileCamera
                onCapture={handleCameraCapture}
                onCancel={handleCameraCancel}
                maxSize={10}
                allowedTypes={accept ? [accept] : ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]}
              />
            </MobileLazyLoad>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <AdminButton variant="outline" onClick={onClose}>
            Cancel
          </AdminButton>
        </div>
      </div>
    </AdminModal>
  );
}

// Utility function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}