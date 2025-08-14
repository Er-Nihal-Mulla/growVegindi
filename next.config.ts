/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // make sure the app/ folder is used
  },
  output: 'standalone', // makes Vercel build standalone output
};

export default nextConfig;
