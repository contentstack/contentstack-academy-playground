/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    
    // Environment variables available at build time
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
    
    // Server external packages for Node.js modules
    serverExternalPackages: ['contentstack', '@contentstack/utils'],
    
    // Image configuration
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
    
    // Webpack config for client-side Node.js module fallbacks
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
