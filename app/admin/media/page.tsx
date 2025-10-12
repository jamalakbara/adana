"use client";

import { useState, useEffect, useCallback } from "react";
import { MediaLibrary } from "@/components/admin/media/MediaLibrary";
import { MediaUpload } from "@/components/admin/media/MediaUpload";
import { AdminButton } from "@/components/admin/ui";
import type { MediaAsset } from "@/lib/cms/media";

export default function MediaManagement() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    limit: 20,
    offset: 0,
    total: 0,
    hasMore: false,
  });

  const fetchAssets = useCallback(async (resetOffset = false) => {
    try {
      setLoading(true);
      setError(null);

      const offset = resetOffset ? 0 : pagination.offset;
      const params = new URLSearchParams({
        limit: pagination.limit.toString(),
        offset: offset.toString(),
      });

      const response = await fetch(`/api/admin/media?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch media assets');
      }

      const data = await response.json();

      if (resetOffset) {
        setAssets(data.assets || []);
      } else {
        setAssets(prev => [...prev, ...(data.assets || [])]);
      }

      setPagination(prev => ({
        ...prev,
        offset: offset + (data.assets?.length || 0),
        total: data.total || 0,
        hasMore: data.hasMore || false,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [pagination.limit, pagination.offset]);

  useEffect(() => {
    fetchAssets(true);
  }, []);

  const handleUploadSuccess = (newAsset: MediaAsset) => {
    setAssets(prev => [newAsset, ...prev]);
    setShowUpload(false);
    setPagination(prev => ({
      ...prev,
      total: prev.total + 1,
    }));
  };

  const handleDeleteSelected = async () => {
    if (selectedAssets.length === 0) return;

    try {
      const deletePromises = selectedAssets.map(id =>
        fetch(`/api/admin/media/${id}`, { method: 'DELETE' })
      );

      await Promise.all(deletePromises);

      setAssets(prev => prev.filter(asset => !selectedAssets.includes(asset.id)));
      setSelectedAssets([]);
      setPagination(prev => ({
        ...prev,
        total: Math.max(0, prev.total - selectedAssets.length),
      }));
    } catch (err) {
      setError('Failed to delete selected assets');
    }
  };

  const handleSearch = async (search: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: pagination.limit.toString(),
        offset: '0',
        ...(search && { search }),
      });

      const response = await fetch(`/api/admin/media?${params}`);
      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      setAssets(data.assets || []);
      setPagination(prev => ({
        ...prev,
        offset: data.assets?.length || 0,
        total: data.total || 0,
        hasMore: data.hasMore || false,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Media Library
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your images and media assets. Upload, organize, and select files for your content.
            </p>
          </div>
          <AdminButton
            onClick={() => setShowUpload(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Upload New Media
          </AdminButton>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Total: <span className="font-medium text-gray-900">{pagination.total} assets</span>
            </div>
            {selectedAssets.length > 0 && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">
                  {selectedAssets.length} selected
                </span>
                <AdminButton
                  onClick={handleDeleteSelected}
                  variant="danger"
                  size="sm"
                >
                  Delete Selected
                </AdminButton>
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => setError(null)}
                    className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Media Library */}
        <MediaLibrary
          assets={assets}
          loading={loading}
          selectedAssets={selectedAssets}
          onSelectionChange={setSelectedAssets}
          onSearch={handleSearch}
          onLoadMore={() => fetchAssets(false)}
          hasMore={pagination.hasMore}
        />
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowUpload(false)}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Upload Media
                  </h3>
                  <button
                    onClick={() => setShowUpload(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <MediaUpload
                  onUploadSuccess={handleUploadSuccess}
                  onCancel={() => setShowUpload(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}