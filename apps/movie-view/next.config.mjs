import NextFederationPlugin from "@module-federation/nextjs-mf";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/movies", "@repo/ui"],
  webpack(config, { isServer }) {
    if (isServer) {
      return config;
    }

    config.plugins.push(
      new NextFederationPlugin({
        name: "movieView",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./mount": "./src/federation/mount.tsx",
        },
        extraOptions: {
          skipSharingNextInternals: true,
        },
      }),
    );

    return config;
  },
};

export default nextConfig;
