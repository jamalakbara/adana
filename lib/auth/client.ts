import { createAuthClient } from "better-auth/react";

// Define user type
interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor" | "viewer";
  isActive: boolean;
}

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});

export const {
  signIn,
  signUp,
  signOut,
  getSession,
  useSession,
} = authClient;

// Development bypass helper
export const isDevelopmentBypass = () => {
  return process.env.NODE_ENV === "development";
};

// Get current user (works in both development and production)
export const getCurrentUser = async (): Promise<User | null> => {
  if (isDevelopmentBypass()) {
    return {
      id: "dev-user-001",
      email: "admin@example.com",
      name: "Development Admin",
      role: "admin",
      isActive: true,
    };
  }

  try {
    const { data: user } = await authClient.getSession();
    if (!user?.user) return null;

    // Convert Better Auth user to our User interface
    return {
      id: user.user.id,
      email: user.user.email,
      name: user.user.name || '',
      role: (user.user as { role?: string }).role || 'viewer',
      isActive: true,
    } as User;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
};

// Role-based access control helpers
export const hasRole = (user: User | null, role: string): boolean => {
  if (isDevelopmentBypass()) {
    return true; // Dev user has all permissions
  }
  return user?.role === role;
};

export const isAdmin = (user: User | null): boolean => hasRole(user, "admin");
export const isEditor = (user: User | null): boolean => hasRole(user, "editor") || isAdmin(user);
export const isViewer = (user: User | null): boolean => hasRole(user, "viewer") || isEditor(user);

// Development bypass middleware for API routes
export const withDevelopmentBypass = (handler: (req: Request, ...args: unknown[]) => Promise<Response>) => {
  return async (req: Request, ...args: unknown[]): Promise<Response> => {
    if (isDevelopmentBypass()) {
      // Add dev user context to request
      const headers = new Headers(req.headers);
      headers.set("x-user-id", "dev-user-001");
      headers.set("x-user-email", "admin@example.com");
      headers.set("x-user-name", "Development Admin");
      headers.set("x-user-role", "admin");

      const modifiedReq = new Request(req.url, {
        method: req.method,
        headers,
        body: req.body,
        duplex: 'half',
      } as RequestInit);

      return handler(modifiedReq, ...args);
    }

    return handler(req, ...args);
  };
};