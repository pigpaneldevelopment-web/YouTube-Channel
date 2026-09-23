import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/YouTube-Channel/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Wedding Seating Chart",
        short_name: "Seating Chart",
        description: "Drag-and-drop wedding seating chart with guest assignment",
        theme_color: "#0f3460",
        background_color: "#1a1a2e",
        display: "standalone",
        start_url: "/YouTube-Channel/",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg}"],
      },
    }),
  ],
  build: {
    outDir: "dist",
  },
});
