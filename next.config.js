/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    mdxRs: true,
  },
  output: 'standalone'
}

const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)
