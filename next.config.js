/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "violet-fly-845239.hostingersite.com",
        pathname: "/**",
      },
    ],
  },
  // Simplify the config
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  // Force all pages to be server-side rendered
  output: "standalone",
  experimental: {
    // Disable static page generation optimization
    isrMemoryCacheSize: 0,
    // Prevent build trace collection issues
    turbotrace: {
      enabled: false,
    },
  },
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
