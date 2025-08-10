// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['media-amazon.com'],
    // Or use remotePatterns for more control:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.media-amazon.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig