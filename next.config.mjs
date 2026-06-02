/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: "plus.unsplash.com"
      }
    ],
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;
