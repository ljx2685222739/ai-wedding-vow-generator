/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      };
      config.optimization.splitChunks.maxSize = 20 * 1024 * 1024; // 20MB
    }
    return config;
  },
  experimental: {
    optimizeCss: true,
  },
  env: {
    ZHIPU_API_KEY: process.env.ZHIPU_API_KEY,
  },
}

module.exports = nextConfig