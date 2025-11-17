import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const isTauri = !!process.env.TAURI_ENV_PLATFORM;

export default defineConfig({
    base: isTauri ? "/" : "/frontend",
    server: {
        host: true,
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:8000", // для React разработки - localhost
                changeOrigin: true,
            },
            "/images": {
                target: "http://localhost:9000", // для React разработки - localhost
                changeOrigin: true,
            }
        },
    },
    plugins: [
        react(),
        tsconfigPaths()
    ]
})