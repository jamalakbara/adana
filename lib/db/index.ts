import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";
import { supabaseConfig } from "./config";

// Create a singleton Supabase client for the browser
export const createBrowserClient = () => {
  return createClient<Database>(supabaseConfig.url, supabaseConfig.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
};

// Create a Supabase client for server-side use
export const createServerClient = () => {
  return createClient<Database>(supabaseConfig.url, supabaseConfig.serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Default browser client instance
export const supabase = createBrowserClient();

// Export types for convenience
export type { Database };