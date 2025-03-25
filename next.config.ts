import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  crossOrigin: 'anonymous',
  productionBrowserSourceMaps: false,
}

export default nextConfig
