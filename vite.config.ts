import react from '@vitejs/plugin-react'
import { defineConfig, ConfigEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ command }: ConfigEnv) => {
  
    const base = command === 'build'
      ? '/frontend-application-development/' 
      : '/';

    return {
      base: base, 
      plugins: [
        react(),
        tsconfigPaths(),
        VitePWA({
          registerType: 'autoUpdate',
          devOptions: { enabled: command === 'serve' },
          manifest: {
            name: "Расчет амортизации автомобилей",
            short_name: "Амортизация авто",
            description: "Приложение для расчета амортизации автомобилей логистической компании",
            start_url: ".",
            display: "standalone",
            background_color: "#ffffff",
            theme_color: "#007bff",
            icons: [
              {
                src: "/icons/icon-192.png",
                sizes: "192x192",
                type: "image/png"
              },
              {
                src: "/icons/icon-512.png", 
                sizes: "512x512",
                type: "image/png"
              }
            ]
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
      build: {
        outDir: 'dist',
        sourcemap: false
      }
    }
})