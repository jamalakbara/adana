// Database configuration with proper environment variable handling
const getRequiredEnv = (key: string) => {
  const value = process.env[key];
  if (!value && process.env.NODE_ENV === 'production') {
    throw new Error(`${key} is required in production`);
  }
  if (!value) {
    console.warn(`${key} is not set. Some features may not work correctly.`);
    return null;
  }
  return value;
};

export const supabaseConfig = {
  url: getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL'),
  anonKey: getRequiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  serviceKey: getRequiredEnv('NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY'),
};