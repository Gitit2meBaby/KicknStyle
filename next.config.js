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
    WP_URL: process.env.WP_URL,
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
    console.log("Webpack build:", isServer ? "Server" : "Client");
    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

console.log("Building with environment:", {
  WP_URL: process.env.WP_URL ? "Set" : "Not Set",
  WC_CONSUMER_KEY: process.env.WC_CONSUMER_KEY ? "Set" : "Not Set",
  WC_CONSUMER_SECRET: process.env.WC_CONSUMER_SECRET ? "Set" : "Not Set",
});

module.exports = nextConfig;
