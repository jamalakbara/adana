import { NextResponse } from "next/server";
import { mediaManager } from "@/lib/cms/media";
import { withDevelopmentBypass } from "@/lib/auth/client";

// Get a specific media asset
export const GET = withDevelopmentBypass(
  async (request: Request, ...args: unknown[]) => {
    try {
      const { params } = args[0] as { params: { media_id: string } };
      const asset = await mediaManager.getMediaAsset(params.media_id);

      if (!asset) {
        return NextResponse.json(
          {
            error: {
              code: "NOT_FOUND",
              message: "Media asset not found",
            },
          },
          { status: 404 }
        );
      }

      return NextResponse.json(asset);
    } catch (error) {
      console.error("Failed to fetch media asset:", error);
      return NextResponse.json(
        {
          error: {
            code: "INTERNAL_ERROR",
            message: "Failed to fetch media asset",
          },
        },
        { status: 500 }
      );
    }
  }
);

// Update media asset metadata
export const PUT = withDevelopmentBypass(
  async (request: Request, ...args: unknown[]) => {
    try {
      const { params } = args[0] as { params: { media_id: string } };
      const body = await request.json();
      const { alt_text } = body;

      if (alt_text !== undefined) {
        const updatedAsset = await mediaManager.updateMediaAsset(params.media_id, {
          alt_text,
        });

        return NextResponse.json(updatedAsset);
      } else {
        return NextResponse.json(
          {
            error: {
              code: "VALIDATION_ERROR",
              message: "No valid fields to update",
            },
          },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Failed to update media asset:", error);
      return NextResponse.json(
        {
          error: {
            code: "INTERNAL_ERROR",
            message: "Failed to update media asset",
          },
        },
        { status: 500 }
      );
    }
  }
);

// Delete a media asset
export const DELETE = withDevelopmentBypass(
  async (request: Request, ...args: unknown[]) => {
    try {
      const { params } = args[0] as { params: { media_id: string } };
      await mediaManager.deleteMediaAsset(params.media_id);

      return NextResponse.json({
        deleted: true,
        message: "Media asset deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete media asset:", error);
      return NextResponse.json(
        {
          error: {
            code: "INTERNAL_ERROR",
            message: "Failed to delete media asset",
          },
        },
        { status: 500 }
      );
    }
  }
);