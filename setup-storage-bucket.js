#!/usr/bin/env node

// Simple script to create the cms-media storage bucket
// Run this with: node setup-storage-bucket.js

const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY; // You'll need this service role key

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY');
  console.error('');
  console.error('Please add NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY to your .env file');
  console.error('You can find this in your Supabase dashboard under Settings > API');
  process.exit(1);
}

// Create Supabase client with service role key (has admin permissions)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createStorageBucket() {
  const bucketName = 'cms-media';

  console.log(`🪣 Creating storage bucket: ${bucketName}`);

  try {
    // First, check if bucket already exists
    const { data: bucket, error: checkError } = await supabase
      .storage
      .getBucket(bucketName);

    if (bucket) {
      console.log(`✅ Bucket '${bucketName}' already exists!`);
      return;
    }

    if (checkError && !checkError.message?.includes('does not exist')) {
      console.error('❌ Error checking bucket:', checkError);
      return;
    }

    // Create the bucket
    const { data, error } = await supabase
      .storage
      .createBucket(bucketName, {
        public: true,
        allowedMimeTypes: [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/webp',
          'image/gif',
          'image/svg+xml'
        ],
        fileSizeLimit: 5242880, // 5MB
      });

    if (error) {
      console.error('❌ Failed to create bucket:', error.message);
      console.error('');
      console.error('🔧 Manual setup required:');
      console.error('1. Go to your Supabase dashboard');
      console.error('2. Navigate to Storage');
      console.error('3. Click "New bucket"');
      console.error('4. Name it: cms-media');
      console.error('5. Set as Public');
      console.error('6. File size limit: 5MB');
      console.error('7. Allowed MIME types: image/*');
      return;
    }

    console.log(`✅ Successfully created bucket '${bucketName}'!`);
    console.log('');
    console.log('🎉 Your logo upload functionality should now work!');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Run the setup
createStorageBucket();