import { betterAuth } from "better-auth";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

// Only create supabase client if environment variables are available
let supabase: ReturnType<typeof createClient> | null = null;
if (supabaseUrl && supabaseServiceKey) {
  supabase = createClient(supabaseUrl, supabaseServiceKey);
}

// Development bypass user
const DEV_USER = {
  id: "dev-user-001",
  email: "admin@example.com",
  name: "Development Admin",
  role: "admin" as const,
};

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === "development";

const authConfig = betterAuth({
  // Database configuration using Supabase
  database: {
    provider: "postgresql",
    url: process.env.DATABASE_URL || supabaseUrl.replace('https://', 'postgresql://postgres:') + ':5432/postgres',
  },

  // Email and password authentication
  emailAndPassword: {
    enabled: !isDevelopment, // Disable in development for bypass
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },

  // Advanced configuration
  advanced: {
    generateId: () => crypto.randomUUID(),
  },

  // Social providers (disabled in development)
  socialProviders: isDevelopment ? {} : {
    // Add social providers here if needed
  },

  // Development bypass middleware
  onRequest: async (request: Request) => {
    if (isDevelopment) {
      // In development, automatically authenticate with dev user
      const headers = new Headers();
      headers.set("x-user-id", DEV_USER.id);
      headers.set("x-user-email", DEV_USER.email);
      headers.set("x-user-name", DEV_USER.name);
      headers.set("x-user-role", DEV_USER.role);

      return {
        request: new Request(request, { headers }),
        context: {
          user: DEV_USER,
          session: {
            id: "dev-session",
            userId: DEV_USER.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          }
        }
      };
    }
    return { request };
  },

  // Custom database adapter for Supabase
  adapter: supabase ? {
    create: async (model: string, data: Record<string, unknown>) => {
      const table = model === "user" ? "users" :
                   model === "session" ? "user_sessions" :
                   model === "account" ? "user_accounts" : "user_verification";

      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result;
    },

    findOne: async (model: string, where: Record<string, unknown>) => {
      const table = model === "user" ? "users" :
                   model === "session" ? "user_sessions" :
                   model === "account" ? "user_accounts" : "user_verification";

      const { data: result, error } = await supabase
        .from(table)
        .select()
        .match(where)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return result;
    },

    findMany: async (model: string, where?: Record<string, unknown>) => {
      const table = model === "user" ? "users" :
                   model === "session" ? "user_sessions" :
                   model === "account" ? "user_accounts" : "user_verification";

      let query = supabase.from(table).select('*');

      if (where) {
        Object.entries(where).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      const { data: result, error } = await query;
      if (error) throw error;
      return result || [];
    },

    update: async (model: string, where: Record<string, unknown>, data: Record<string, unknown>) => {
      const table = model === "user" ? "users" :
                   model === "session" ? "user_sessions" :
                   model === "account" ? "user_accounts" : "user_verification";

      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .match(where)
        .select()
        .single();

      if (error) throw error;
      return result;
    },

    delete: async (model: string, where: Record<string, unknown>) => {
      const table = model === "user" ? "users" :
                   model === "session" ? "user_sessions" :
                   model === "account" ? "user_accounts" : "user_verification";

      const { error } = await supabase
        .from(table)
        .delete()
        .match(where);

      if (error) throw error;
      return true;
    }
  } : null, // Use null adapter if supabase client is not available
});

// Export the auth instance
export const auth = authConfig;