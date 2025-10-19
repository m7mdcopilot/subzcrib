import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Basic configuration for Vercel
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
