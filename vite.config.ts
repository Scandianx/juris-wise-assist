import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base =
  process.env.VITE_BASE_PATH ??
  (process.env.GITHUB_ACTIONS === "true" && repoName ? `/${repoName}/` : "/");

export default defineConfig({
  base,
  plugins: [
    tanstackStart({
      spa: {
        enabled: true,
      },
    }),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
});
