import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs'
import path from 'path'

export default defineConfig(({ command }) => {
  
    const base = command === 'build'
      ? '/CarDepreciationFrontend/' 
      : '/';

    return {
      base: base, 
      plugins: [
        react(),
        tsconfigPaths(),
        mkcert(),
        VitePWA({
          registerType: 'autoUpdate',
          devOptions: {
            enabled: true,
          },
          manifest: {
            name: "Расчет амортизации автомобилей",
            short_name: "Амортизация авто",
            description: "Приложение для расчета амортизации автомобилей логистической компании",
            start_url: "/CarDepreciationFrontend/",
            display: "standalone",
            background_color: "#ffffff",
            theme_color: "#007bff",
            orientation: "portrait-primary",
            icons: [
              {
                src: `${base}icons/icon-192.png`,
                type: "image/png",
                sizes: "192x192"
              },
              {
                src: `${base}icons/icon-512.png`,
                type: "image/png", 
                sizes: "512x512"
              }
            ],
          }
        })
      ],
      server: {
        host: true,
        port: 3000,
        proxy: {
          '/api': {
            target: 'http://localhost:8000',
            changeOrigin: true, 
          },
          '/images': {
            target: 'http://localhost:9000',
            changeOrigin: true,
          }
        },
      },
    }
  }
)