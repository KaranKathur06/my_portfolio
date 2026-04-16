/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // Server-side rendering enabled (no static export)
  // Required for API routes, middleware, and database connectivity
};

module.exports = nextConfig;
