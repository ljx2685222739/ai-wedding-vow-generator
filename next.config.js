/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // 如果您使用了 Edge Runtime，可能需要添加以下配置
  experimental: {
    runtime: 'experimental-edge',
  },
}

module.exports = nextConfig