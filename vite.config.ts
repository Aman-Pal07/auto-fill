import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer()
          ),
        ]
      : []),
    {
      name: "copy-extension-files",
      async writeBundle() {
        const files = [
          { src: "frontend/extension/icons", dest: "dist/icons" },
          { src: "frontend/extension/background.js", dest: "dist/background.js" },
          { src: "frontend/extension/content.js", dest: "dist/content.js" },
          { src: "frontend/extension/manifest.json", dest: "dist/manifest.json" },
          { src: "frontend/extension/popup.html", dest: "dist/popup.html" },
          { src: "frontend/extension/popup.js", dest: "dist/popup.js" },
          { src: "frontend/extension/styles.css", dest: "dist/styles.css" },
          { src: "frontend/extension/utils.js", dest: "dist/utils.js" }
        ];

        for (const file of files) {
          await fs.copy(path.resolve(__dirname, file.src), path.resolve(__dirname, file.dest), {
            overwrite: true
          });
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});
