import { NextResponse } from "next/server";
import { contentManager } from "@/lib/cms/content";
import { withDevelopmentBypass } from "@/lib/auth/client";
import type { SectionType } from "@/types/database";

// Get a specific content section
export const GET = withDevelopmentBypass(async (
  request: Request,
  { params }: { params: Promise<{ section_type: SectionType }> }
) => {
  try {
    const { section_type } = await params;
    const section = await contentManager.getSection(section_type);

    if (!section) {
      return NextResponse.json(
        {
          error: {
            code: "NOT_FOUND",
            message: "Section not found",
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(section);
  } catch (error) {
    console.error("Failed to fetch section:", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch content section",
        },
      },
      { status: 500 }
    );
  }
});

// Update a content section
export const PUT = withDevelopmentBypass(async (
  request: Request,
  { params }: { params: Promise<{ section_type: SectionType }> }
) => {
  try {
    const { section_type } = await params;
    const body = await request.json();
    const { content, status, title } = body;

    // Debug logging for footer section
    if (section_type === 'footer') {
      console.log('Footer Content received:', JSON.stringify(content, null, 2));
      console.log('Social links:', content.social_links);
    }

    const section = await contentManager.upsertSection(section_type, {
      title,
      content,
      status,
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error("Failed to update section:", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to update content section",
        },
      },
      { status: 500 }
    );
  }
});

// Publish a content section
export const PATCH = withDevelopmentBypass(async (
  request: Request,
  { params }: { params: Promise<{ section_type: SectionType }> }
) => {
  try {
    const { section_type } = await params;
    const body = await request.json();
    const { status } = body;

    if (status === 'published') {
      const section = await contentManager.publishSection(section_type);
      return NextResponse.json({
        ...section,
        message: "Section published successfully"
      });
    } else {
      const section = await contentManager.upsertSection(section_type, {
        status,
      });
      return NextResponse.json(section);
    }
  } catch (error) {
    console.error("Failed to update section status:", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to update section status",
        },
      },
      { status: 500 }
    );
  }
});

// Delete a content section
export const DELETE = withDevelopmentBypass(async (
  request: Request,
  { params }: { params: Promise<{ section_type: SectionType }> }
) => {
  try {
    const { section_type } = await params;

    // This would need to be implemented in ContentManager
    // For now, return an error
    return NextResponse.json(
      {
        error: {
          code: "NOT_IMPLEMENTED",
          message: "Delete functionality not yet implemented",
        },
      },
      { status: 501 }
    );
  } catch (error) {
    console.error("Failed to delete section:", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to delete content section",
        },
      },
      { status: 500 }
    );
  }
});