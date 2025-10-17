import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Environment variables validation
const apiKey = process.env.MAILCHIMP_API_KEY;
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

if (!apiKey || !audienceId) {
  throw new Error('Missing Mailchimp configuration. Please check environment variables.');
}

// Type guards for environment variables
const validateEnvironment = (): { apiKey: string; audienceId: string } => {
  if (!apiKey || !audienceId) {
    throw new Error('Missing Mailchimp configuration. Please check environment variables.');
  }
  return { apiKey, audienceId };
};

const { apiKey: validApiKey, audienceId: validAudienceId } = validateEnvironment();

// Extract server prefix from API key (format: xxxxxxxxxxxxxx-usXX)
const serverPrefix = validApiKey.split('-')[1];

// Configure Mailchimp client
mailchimp.setConfig({
  apiKey: validApiKey,
  server: serverPrefix,
});

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

    try {
      // Add member to Mailchimp list
      const response = await mailchimp.lists.addListMember(validAudienceId, {
        email_address: email,
        status: 'subscribed', // or 'pending' for double opt-in
        tags: ['website_signup'], // Tag to track subscription source
      });

      const successResponse: SuccessResponse = {
        success: true,
        message: 'Successfully subscribed to newsletter!',
        mailchimpId: 'id' in response ? response.id : undefined,
      };

      return NextResponse.json(successResponse, { status: 200 });
    } catch (mailchimpError: unknown) {
      // Handle specific Mailchimp errors
      const error = mailchimpError as { status?: number; response?: { body?: { detail?: string } }; message?: string };

      if (error.status === 400) {
        const errorDetail = error.response?.body?.detail || '';

        if (errorDetail.includes('already exists') || errorDetail.includes('is a member')) {
          // User is already subscribed
          const successResponse: SuccessResponse = {
            success: true,
            message: 'You are already subscribed! Thank you for staying connected.',
          };
          return NextResponse.json(successResponse, { status: 200 });
        } else if (errorDetail.includes('Invalid Resource') || errorDetail.includes('email')) {
          const errorResponse: ErrorResponse = {
            success: false,
            message: 'Invalid email address. Please check and try again.',
            error: 'Invalid email',
          };
          return NextResponse.json(errorResponse, { status: 400 });
        }
      }

      // Generic error handling
      const errorResponse: ErrorResponse = {
        success: false,
        message: 'Failed to subscribe. Please try again later.',
        error: error.message || 'Unknown error',
      };

      return NextResponse.json(errorResponse, { status: 500 });
    }
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
  try {
    // Test Mailchimp connection
    await mailchimp.ping.get();

    return NextResponse.json({
      success: true,
      message: 'Newsletter API is healthy',
      mailchimp: 'connected',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Newsletter API is unhealthy',
      mailchimp: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}