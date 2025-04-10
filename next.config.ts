import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v-live-pi.vercel.app',  
      },
      {
        protocol: 'https',
        hostname: 'command-app.vercel.app',
      },
    ],
  },
};

export default nextConfig;
