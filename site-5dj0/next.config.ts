import type { NextConfig } from 'next'

// STATIC_EXPORT=1 produit un site entièrement statique dans out/
// (GitHub Pages, Netlify sans adaptateur, n'importe quel hébergeur de fichiers).
const isStaticExport = process.env.STATIC_EXPORT === '1'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isStaticExport ? { output: 'export' as const, trailingSlash: true } : {}),
  experimental: {
    optimizePackageImports: ['@react-three/drei', 'three'],
  },
}

export default nextConfig
