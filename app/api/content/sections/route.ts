import { NextRequest, NextResponse } from "next/server";
import { contentManager } from "@/lib/cms/content";
import type { SectionType } from "@/types/database";

// Get all published content sections (public API)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section_type = searchParams.get('section_type');

    if (section_type) {
      // Get specific section
      const section = await contentManager.getPublishedSection(section_type as SectionType);

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

      return NextResponse.json({
        section_type: section.section_type,
        content: section.content,
        updated_at: section.updated_at,
      });
    } else {
      // Get all published sections
      const sections = await contentManager.getAllSections('published');

      const allSections: Record<string, unknown> = {};
      sections.forEach(section => {
        allSections[section.section_type] = {
          content: section.content,
          updated_at: section.updated_at,
        };
      });

      return NextResponse.json(allSections);
    }
  } catch (error) {
    console.error("Failed to fetch public content:", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch content",
        },
      },
      { status: 500 }
    );
  }
}