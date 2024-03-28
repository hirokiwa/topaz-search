import { resolve } from "path";
import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        404: resolve(__dirname, '404.html'),
      }
    }
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      
      manifest: {
        short_name: "Topa'z 検索くん",
        name: "Topa'z 検索くん",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "./image/topaz-search-icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "./image/topaz-search-icon-512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "./image/topaz-search-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
        background_color: "#ffffff",
        theme_color: "#000000",
        lang: "ja",
      }
    })
  ],
});
