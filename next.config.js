/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    typedRoutes: true
  },
  images: {
    domains: ['googleusercontent.com', 'oaidalleapiprodscus.blob.core.windows.net', 'cdn.openai.com']
  },
  eslint: {
    ignoreDuringBuilds: true,
    ignoreBuildErrors: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
