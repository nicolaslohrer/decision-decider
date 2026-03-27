import react from "@vitejs/plugin-react";
import UnpluginInjectPreload from "unplugin-inject-preload/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(() => {
  return {
    build: { outDir: "build" },
    server: { open: true },
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
      }),
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
      UnpluginInjectPreload({
        injectTo: "head",
        files: [
          {
            outputMatch: /.*\.woff2$/,
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
