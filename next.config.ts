/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // avoid Vercel image optimization issues
  },
};

export default nextConfig;
