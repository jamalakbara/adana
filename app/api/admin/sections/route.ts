import { NextResponse } from "next/server";
import { contentManager } from "@/lib/cms/content";
import { withDevelopmentBypass } from "@/lib/auth/client";

// Get all content sections
export const GET = withDevelopmentBypass(async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'draft' | 'published' | undefined;

    const sections = await contentManager.getAllSections(status);

    return NextResponse.json({
      sections,
      total: sections.length,
    });
  } catch (error) {
    console.error("Failed to fetch sections:", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch content sections",
        },
      },
      { status: 500 }
    );
  }
});

// Create a new content section
export const POST = withDevelopmentBypass(async (request: Request) => {
  try {
    const body = await request.json();
    const { section_type, content, title } = body;

    if (!section_type || !content) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "section_type and content are required",
          },
        },
        { status: 400 }
      );
    }

    const section = await contentManager.upsertSection(section_type, {
      title,
      content,
      status: 'draft',
    });

    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    console.error("Failed to create section:", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to create content section",
        },
      },
      { status: 500 }
    );
  }
});