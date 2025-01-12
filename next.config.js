/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    esmExternals: true
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    config.resolve.modules = ['node_modules', 'src', ...config.resolve.modules || []];
    return config;
  },
  distDir: '.next'
};

module.exports = nextConfig; 