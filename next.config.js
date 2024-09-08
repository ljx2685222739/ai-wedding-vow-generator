/** @type {import('next').NextConfig} */
const nextConfig = {
  // 移除 output: 'standalone'
  // 保留 Edge Runtime 配置
  experimental: {
    runtime: 'experimental-edge',
  },
}

module.exports = nextConfig