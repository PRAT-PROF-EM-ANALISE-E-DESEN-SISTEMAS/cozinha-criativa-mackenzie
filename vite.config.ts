import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true }, // permite testar PWA no `npm run dev`
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        name: "Cozinha Criativa 2.0",
        short_name: "Cozinha",
        description: "Receitas, filtros e sua despensa.",
        start_url: "/home",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ec4899",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable any" }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        navigateFallback: "index.html",                    // SPA fallback (React Router)
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          // imagens: cache-first
          {
            urlPattern: /^https?:\/\/.*\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          },
          // API: network-first
          {
            urlPattern: /^https?:\/\/.*\/api\/.*$/i,
            handler: "NetworkFirst",
            options: { cacheName: "api", networkTimeoutSeconds: 3 }
          }
        ]
      }
    })
  ]
});
