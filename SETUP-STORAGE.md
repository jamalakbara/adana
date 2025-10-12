# Setting Up Supabase Storage for Media Uploads

## Issue
The navbar editor's logo upload shows this error:
```
Storage bucket not found. Please set up the "cms-media" bucket in Supabase dashboard.
```

## Solution: Choose one of the following methods:

### Method 1: Automatic Setup (Recommended)
1. Add your Supabase Service Role Key to `.env`:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```
2. Get the key from: Supabase Dashboard → Settings → API → service_role (found)
3. Run the setup script:
   ```bash
   node setup-storage-bucket.js
   ```

### Method 2: Manual Setup (Quick & Easy)
1. Go to your **Supabase Dashboard**
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"**
4. Enter bucket name: `cms-media`
5. Set bucket as **Public**
6. File size limit: `5MB`
7. Allowed MIME types: `image/*` (or leave default)
8. Click **"Save"**

### Method 3: API Setup (Development)
The code now includes automatic bucket creation, but it may fail due to Supabase permissions. If you see a "Warning: Failed to create storage bucket" message in your console, use Method 1 or 2 instead.

## Verification
After setup, test the logo upload:
1. Navigate to `http://localhost:3002/admin/sections/navbar`
2. Try uploading a logo image
3. Should work without errors!

## Notes
- The bucket needs to be created **once** per project
- Automatic bucket creation is included in the upload flow
- Service Role Key has elevated permissions - keep it secure
- Public bucket allows images to be served directly from Supabase CDN

## Troubleshooting
If you still get "Bucket not found" errors:
1. Check the bucket name is exactly `cms-media`
2. Verify your Supabase URL and keys in `.env`
3. Ensure you're using the correct Supabase project
4. Check browser console for additional error details