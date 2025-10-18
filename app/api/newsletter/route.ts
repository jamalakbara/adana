import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_KEY?.split('-')[1],
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

    // Log the subscription
    console.log('Newsletter subscription request:', email);

    try {
      // Add subscriber to Mailchimp
      const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

      if (!audienceId) {
        throw new Error('Mailchimp audience ID not configured');
      }

      const response = await mailchimp.lists.addListMember(audienceId, {
        email_address: email,
        status: 'subscribed',
      });

      // Type the response properly and safely access the id
      const mailchimpId = (response as { id?: string })?.id || 'unknown';
      console.log('Successfully subscribed to Mailchimp:', mailchimpId);

      const successResponse: SuccessResponse = {
        success: true,
        message: 'Thank you for subscribing! You\'ve been added to our newsletter.',
        mailchimpId: mailchimpId,
      };

      return NextResponse.json(successResponse, { status: 200 });

    } catch (mailchimpError: Error | { response?: Response; status?: number }) {
      console.error('Mailchimp subscription error:', mailchimpError);

      // Handle specific Mailchimp errors
      let errorMessage = 'An unexpected error occurred. Please try again.';
      let statusCode = 500;

      if (mailchimpError.response?.status === 400) {
        const errorDetail = mailchimpError.response.body.detail;

        if (errorDetail?.includes('already a list member')) {
          errorMessage = 'This email is already subscribed to our newsletter.';
          statusCode = 409; // Conflict
        } else if (errorDetail?.includes('looks fake or invalid')) {
          errorMessage = 'Please enter a valid email address.';
          statusCode = 400; // Bad request
        } else {
          errorMessage = errorDetail || 'Invalid email address.';
          statusCode = 400;
        }
      }

      const errorResponse: ErrorResponse = {
        success: false,
        message: errorMessage,
        error: mailchimpError.message,
      };

      return NextResponse.json(errorResponse, { status: statusCode });
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
  return NextResponse.json({
    success: true,
    message: 'Newsletter API is healthy and ready',
    service: 'Mailchimp integration',
    configured: !!(process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_AUDIENCE_ID),
  });
}