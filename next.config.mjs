/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Force Next.js to use Webpack instead of Turbopack
  turbopack: false,

  // Environment variables
  env: {
    CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
    CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    CONTENTSTACK_BRANCH: process.env.CONTENTSTACK_BRANCH || 'main',
    CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
    CONTENTSTACK_APP_HOST: process.env.CONTENTSTACK_APP_HOST,
    CONTENTSTACK_PREVIEW_HOST: process.env.CONTENTSTACK_PREVIEW_HOST,
    CONTENTSTACK_PREVIEW_TOKEN: process.env.CONTENTSTACK_PREVIEW_TOKEN,
    CONTENTSTACK_LIVE_EDIT_TAGS: process.env.CONTENTSTACK_LIVE_EDIT_TAGS,
    CONTENTSTACK_API_HOST: process.env.CONTENTSTACK_API_HOST,
  },

  // Server external packages
  serverExternalPackages: ['contentstack', '@contentstack/utils'],

  // Image config
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.contentstack.io',
      },
      {
        protocol: 'https',
        hostname: '*.contentstack.io',
      },
    ],
  },

  // Webpack adjustments
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
};

export default nextConfig;
