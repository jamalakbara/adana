"use client";

import { useState, useRef, useEffect } from "react";
import { TouchButton } from "../shared/TouchButton";

interface MobileCameraProps {
  onCapture: (file: File) => void;
  onCancel?: () => void;
  maxSize?: number; // in MB
  allowedTypes?: string[];
  className?: string;
}

interface CameraError {
  code: string;
  message: string;
}

export function MobileCamera({
  onCapture,
  onCancel,
  maxSize = 10,
  allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
  className = ""
}: MobileCameraProps) {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<CameraError | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isUsingFile, setIsUsingFile] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Check camera support on mount
  useEffect(() => {
    checkCameraSupport();

    return () => {
      stopCameraStream();
    };
  }, []);

  const checkCameraSupport = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API not supported in this browser");
      }

      // Check camera permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      // Clean up the test stream
      stream.getTracks().forEach(track => track.stop());

      setIsSupported(true);
    } catch (err) {
      const error = err as Error;
      setIsSupported(false);

      // Provide user-friendly error messages
      if (error.name === 'NotAllowedError') {
        setError({
          code: 'PERMISSION_DENIED',
          message: 'Camera access denied. Please allow camera permissions to use this feature.'
        });
      } else if (error.name === 'NotFoundError') {
        setError({
          code: 'NO_CAMERA',
          message: 'No camera found on this device.'
        });
      } else if (error.name === 'NotSupportedError') {
        setError({
          code: 'NOT_SUPPORTED',
          message: 'Camera is not supported in this browser or device.'
        });
      } else {
        setError({
          code: 'UNKNOWN_ERROR',
          message: 'Unable to access camera: ' + error.message
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const startCamera = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      const error = err as Error;
      setError({
        code: 'CAMERA_ERROR',
        message: 'Failed to start camera: ' + error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stopCameraStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
      setError({
        code: 'CAPTURE_ERROR',
        message: 'Camera not ready. Please try again.'
      });
      return;
    }

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Could not get canvas context');
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to blob
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `camera-capture-${Date.now()}.jpg`, {
            type: 'image/jpeg'
          });
          onCapture(file);
        }
      }, 'image/jpeg', 0.9);

      // Add haptic feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    } catch (err) {
      setError({
        code: 'CAPTURE_ERROR',
        message: 'Failed to capture photo: ' + (err as Error).message
      });
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setError({
        code: 'INVALID_TYPE',
        message: `File type not supported. Allowed types: ${allowedTypes.join(', ')}`
      });
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setError({
        code: 'FILE_TOO_LARGE',
        message: `File too large. Maximum size: ${maxSize}MB`
      });
      return;
    }

    // Success
    setError(null);
    setIsUsingFile(false);
    onCapture(file);
  };

  const handleFileUpload = () => {
    setIsUsingFile(true);
    stopCameraStream();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const switchToCamera = () => {
    setIsUsingFile(false);
    startCamera();
  };

  // Render error state
  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-lg border border-gray-200 p-6 ${className}`}>
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Camera Error
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            {error.message}
          </p>
          <div className="flex flex-col space-y-3">
            {error.code === 'PERMISSION_DENIED' && (
              <p className="text-xs text-gray-500">
                Please check your browser settings and allow camera access.
              </p>
            )}
            {error.code === 'NO_CAMERA' && (
              <p className="text-xs text-gray-500">
                Please connect a camera to use this feature.
              </p>
            )}
            <TouchButton
              variant="outline"
              onClick={handleFileUpload}
              fullWidth
            >
              Upload from Device
            </TouchButton>
            {onCancel && (
              <TouchButton
                variant="ghost"
                onClick={onCancel}
                fullWidth
              >
                Cancel
              </TouchButton>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render loading state
  if (isLoading || isSupported === null) {
    return (
      <div className={`bg-white rounded-lg shadow-lg border border-gray-200 p-6 ${className}`}>
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isSupported === null ? 'Checking Camera...' : 'Starting Camera...'}
          </h3>
          <p className="text-sm text-gray-600">
            {isSupported === null
              ? 'Checking camera availability...'
              : 'Please wait while we connect to your camera...'
            }
          </p>
        </div>
      </div>
    );
  }

  // Render file upload mode
  if (isUsingFile || !isSupported) {
    return (
      <div className={`bg-white rounded-lg shadow-lg border border-gray-200 p-6 ${className}`}>
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Upload Photo
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Choose a photo from your device
          </p>
          <div className="flex flex-col space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept={allowedTypes.join(',')}
              onChange={handleFileSelect}
              className="hidden"
              capture="environment"
            />
            <TouchButton
              variant="primary"
              onClick={handleFileUpload}
              fullWidth
            >
              Select Photo
            </TouchButton>
            {isSupported && (
              <TouchButton
                variant="outline"
                onClick={switchToCamera}
                fullWidth
              >
                Use Camera
              </TouchButton>
            )}
            {onCancel && (
              <TouchButton
                variant="ghost"
                onClick={onCancel}
                fullWidth
              >
                Cancel
              </TouchButton>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Supported formats: {allowedTypes.join(', ')}<br />
            Maximum size: {maxSize}MB
          </p>
        </div>
      </div>
    );
  }

  // Render camera view
  return (
    <div className={`bg-black rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="relative">
        {/* Video preview */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-64 sm:h-80 object-cover"
        />

        {/* Controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-center space-x-4">
              <TouchButton
                variant="primary"
                onClick={capturePhoto}
                size="lg"
                className="flex-1"
              >
                <div className="flex items-center justify-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2m0 0a2 2 0 012 2m0 0a2 2 0 012-2m0 0a2 2 0 012-2" />
                  </svg>
                  <span>Take Photo</span>
                </div>
              </TouchButton>
              <TouchButton
                variant="outline"
                onClick={handleFileUpload}
                size="lg"
              >
                <div className="flex items-center justify-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>Upload</span>
                </div>
              </TouchButton>
            </div>
            {onCancel && (
              <TouchButton
                variant="ghost"
                onClick={onCancel}
                size="sm"
                className="mx-auto"
              >
                Cancel
              </TouchButton>
            )}
          </div>
        </div>
      </div>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Flash for better photos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-pulse bg-white opacity-0"></div>
      </div>
    </div>
  );
}

// Hook for checking camera capabilities
export function useCameraCapabilities() {
  const [capabilities, setCapabilities] = useState({
    hasCamera: false,
    hasUserMedia: false,
    hasEnvironmentCamera: false,
    supportedFormats: [] as string[],
  });

  useEffect(() => {
    const checkCapabilities = async () => {
      const caps = {
        hasCamera: 'mediaDevices' in navigator,
        hasUserMedia: 'getUserMedia' in navigator.mediaDevices,
        hasEnvironmentCamera: false,
        supportedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
      };

      try {
        if (caps.hasUserMedia) {
          // Check if we can get environment camera (back camera)
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          caps.hasEnvironmentCamera = true;
          stream.getTracks().forEach(track => track.stop());
        }
      } catch (error) {
        console.log('Camera capability check failed:', error);
      }

      setCapabilities(caps);
    };

    checkCapabilities();
  }, []);

  return capabilities;
}