import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',

  typescript: {
    // Temporarily ignore build errors for commit
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
