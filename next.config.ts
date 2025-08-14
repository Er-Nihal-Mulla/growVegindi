// STUDIO/next.config.ts
import { defineConfig } from 'next';

export default defineConfig({
  // Remove swcMinify and appDir if you are not using experimental app router features
  experimental: {
    serverActions: true, // optional, only if you use server actions
  },
  reactStrictMode: true,
});
