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
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  env: {
    WP_URL: process.env.NEXT_PUBLIC_WORDPRESS_URL,
    WC_CONSUMER_KEY: process.env.WC_CONSUMER_KEY,
    WC_CONSUMER_SECRET: process.env.WC_CONSUMER_SECRET,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  // Explicitly set output
  output: "standalone",
  // Disable image optimization during development
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "violet-fly-845239.hostingersite.com",
        pathname: "/**",
      },
    ],
  },
  // Disable certain experimental features
  experimental: {
    optimizeCss: false, // Disable CSS optimization
    scrollRestoration: false,
    legacyBrowsers: false,
  },
  // Configure build output
  distDir: ".next",
  // Add build trace options
  generateBuildId: async () => {
    return "build-" + Date.now();
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;
