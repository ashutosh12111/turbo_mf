import NextFederationPlugin from "@module-federation/nextjs-mf";
import path from "node:path";

const movieListUrl =
  process.env.MOVIE_LIST_REMOTE_URL ?? "http://localhost:3001";
const movieViewUrl =
  process.env.MOVIE_VIEW_REMOTE_URL ?? "http://localhost:3002";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/movies", "@repo/ui"],
  webpack(config, { isServer }) {
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "movieList/mount": path.resolve(
          "./src/components/FederatedModuleNoop.tsx",
        ),
        "movieView/mount": path.resolve(
          "./src/components/FederatedModuleNoop.tsx",
        ),
      };

      return config;
    }

    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          movieList: `movieList@${movieListUrl}/_next/static/chunks/remoteEntry.js`,
          movieView: `movieView@${movieViewUrl}/_next/static/chunks/remoteEntry.js`,
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
