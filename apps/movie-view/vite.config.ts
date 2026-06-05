import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

function normalizePublicUrl(url: string) {
  return `${url.replace(/\/$/, "")}/`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const publicBaseUrl = normalizePublicUrl(
    env.VITE_PUBLIC_BASE_URL ?? "http://localhost:3002",
  );

  return {
    base: publicBaseUrl,
    build: {
      chunkSizeWarningLimit: 700,
      cssCodeSplit: true,
      modulePreload: false,
      target: "esnext",
    },
    plugins: [
      federation({
        exposes: {
          "./mount": "./src/federation/mount.tsx",
        },
        filename: "remoteEntry.js",
        name: "movieView",
        shared: [],
      }),
      react(),
    ],
    preview: {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      port: 3002,
      strictPort: true,
    },
    server: {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      origin: "http://localhost:3002",
      port: 3002,
      strictPort: true,
    },
  };
});
