import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

function normalizeRemoteUrl(url: string) {
  return url.replace(/\/$/, "");
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const movieListRemoteUrl = normalizeRemoteUrl(
    env.VITE_MOVIE_LIST_REMOTE_URL ?? "http://localhost:3001",
  );
  const movieViewRemoteUrl = normalizeRemoteUrl(
    env.VITE_MOVIE_VIEW_REMOTE_URL ?? "http://localhost:3002",
  );

  return {
    build: {
      chunkSizeWarningLimit: 700,
      cssCodeSplit: true,
      modulePreload: false,
      target: "esnext",
    },
    plugins: [
      federation({
        filename: "remoteEntry.js",
        name: "host",
        remotes: {
          movieList: `${movieListRemoteUrl}/assets/remoteEntry.js`,
          movieView: `${movieViewRemoteUrl}/assets/remoteEntry.js`,
        },
        shared: [],
      }),
      react(),
    ],
    preview: {
      port: 3000,
      strictPort: true,
    },
    server: {
      origin: "http://localhost:3000",
      port: 3000,
      strictPort: true,
    },
  };
});
