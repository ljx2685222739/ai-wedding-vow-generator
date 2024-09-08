/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
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
}

module.exports = nextConfig