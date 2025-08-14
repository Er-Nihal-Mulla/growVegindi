import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'razorpay.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.worldvectorlogo.com', pathname: '/**' },
    ],
  },
  experimental: { serverActions: {} }, // ✅ fixed
  appDir: 'src/app',
};

export default nextConfig;
