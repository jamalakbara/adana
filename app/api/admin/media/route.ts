import { NextResponse } from "next/server";
import { mediaManager } from "@/lib/cms/media";
import { withDevelopmentBypass } from "@/lib/auth/client";

// Upload a new media asset
export const POST = withDevelopmentBypass(async (request: Request) => {
  console.log('POST /api/admin/media received');

  try {
    const formData = await request.formData();
    console.log('FormData received:', formData);

    const file = formData.get('file') as File;
    const altText = formData.get('alt_text') as string | undefined;

    console.log('File:', file);
    console.log('Alt text:', altText);

    // Check if environment variables are set
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

    console.log('Supabase URL:', supabaseUrl ? 'SET' : 'NOT SET');
    console.log('Supabase Service Key:', supabaseServiceKey ? 'SET' : 'NOT SET');

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        {
          error: {
            code: "CONFIG_ERROR",
            message: "Supabase configuration is missing. Please check environment variables.",
          },
        },
        { status: 500 }
      );
    }

    if (!file) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "File is required",
          },
        },
        { status: 400 }
      );
    }

    // Check if file is too large (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: {
            code: "FILE_TOO_LARGE",
            message: `File size ${file.size} exceeds maximum allowed size of ${maxSize} bytes`,
          },
        },
        { status: 400 }
      );
    }

    console.log('Starting upload process...');

    let result;
    try {
      result = await mediaManager.uploadFile(file, {
        altText,
        userId: null, // In development, don't associate with a user
      });
    } catch (uploadError) {
      console.error('MediaManager uploadFile threw an error:', uploadError);
      return NextResponse.json(
        {
          error: {
            code: "UPLOAD_EXCEPTION",
            message: uploadError instanceof Error ? uploadError.message : "Unknown upload error",
            details: uploadError instanceof Error ? uploadError.stack : undefined,
          },
        },
        { status: 500 }
      );
    }

    console.log('Upload result:', result);

    if (!result.success) {
      console.error('Upload failed:', result.error);
      return NextResponse.json(
        {
          error: {
            code: "UPLOAD_ERROR",
            message: result.error || "Upload failed",
          },
        },
        { status: 400 }
      );
    }

    console.log('Asset to return:', result.asset);
    return NextResponse.json(result.asset, { status: 201 });
  } catch (error) {
    console.error("Failed to upload media:", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to upload media asset",
          details: error instanceof Error ? error.message : "Unknown error"
        },
      },
      { status: 500 }
    );
  }
});

// Get all media assets
export const GET = withDevelopmentBypass(async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search') || undefined;
    const mimeType = searchParams.get('mime_type') || undefined;

    const result = await mediaManager.getMediaAssets({
      limit,
      offset,
      search,
      mimeType,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch media assets:", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch media assets",
        },
      },
      { status: 500 }
    );
  }
});