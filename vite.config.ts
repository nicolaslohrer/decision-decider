import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import VitePluginInjectPreload from "vite-plugin-inject-preload";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
      eslint(),
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        workbox: {
          globPatterns: ["**/*.{js,css,html,png,ico,woff,woff2}"],
        },
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
        manifest: {
          name: "DecisionDecider",
          short_name: "DecisionDecider",
          description:
            "Gotta decide a decision? DecisionDecider's got you covered.",
          theme_color: "#dc504a",
          icons: [
            {
              src: "icons/48x48.png",
              sizes: "48x48",
              type: "image/png",
            },
            {
              src: "icons/128x128.png",
              sizes: "128x128",
              type: "image/png",
            },
            {
              src: "icons/192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "icons/512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "icons/512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
      }),
      VitePluginInjectPreload({
        injectTo: "head",
        files: [
          {
            match: /.*\.woff2$/,
            attributes: {
              type: "font/woff2",
              as: "font",
              crossorigin: "anonymous",
            },
          },
        ],
      }),
    ],
  };
});
