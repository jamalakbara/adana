import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Request validation schema
const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// Response types
interface SuccessResponse {
  success: true;
  message: string;
  mailchimpId?: string;
}

interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validation = subscribeSchema.safeParse(body);

    if (!validation.success) {
      const errorResponse: ErrorResponse = {
        success: false,
        message: 'Invalid email format',
        error: validation.error.issues[0]?.message,
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const { email } = validation.data;

    // Log the subscription for now (could also save to a file or database later)
    console.log('Newsletter subscription request:', email);

    // TODO: Add email to local storage, database, or external service
    // For now, we'll just return a success message

    const successResponse: SuccessResponse = {
      success: true,
      message: 'Thank you for subscribing! We\'ll keep you updated with our latest news and insights.',
    };

    return NextResponse.json(successResponse, { status: 200 });
  } catch (error) {
    console.error('Newsletter subscription error:', error);

    const errorResponse: ErrorResponse = {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
      error: 'Server error',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Newsletter API is healthy and ready',
    service: 'Local storage (no external dependencies)',
  });
}