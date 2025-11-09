import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tambahkan konfigurasi images di sini
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;