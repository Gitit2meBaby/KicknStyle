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
    unoptimized: process.env.NODE_ENV === "development",
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
  // Add these configurations
  experimental: {
    optimizeCss: false,
    browsersListForSwc: false,
    legacyBrowsers: false,
  },
  // Modify webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        path: false,
      };
    }

    // Add this to prevent potential circular dependencies
    config.module.rules.push({
      test: /\.js$/,
      enforce: "pre",
      use: ["source-map-loader"],
    });

    return config;
  },
  // Add output configuration
  output: "standalone",
  // Disable specific optimizations that might cause issues
  swcMinify: false,
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_WORDPRESS_URL: process.env.NEXT_PUBLIC_WORDPRESS_URL || "",
    NEXT_PUBLIC_WC_CONSUMER_KEY: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY || "",
    NEXT_PUBLIC_WC_CONSUMER_SECRET:
      process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET || "",
  },
};

module.exports = nextConfig;
