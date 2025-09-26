import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react(),
     tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/components': fileURLToPath(new URL('./src/presentation/components', import.meta.url)),
      '@/pages': fileURLToPath(new URL('./src/presentation/pages', import.meta.url)),
      '@/hooks': fileURLToPath(new URL('./src/application/hooks', import.meta.url)),
      '@/services': fileURLToPath(new URL('./src/application/services', import.meta.url)),
      '@/api': fileURLToPath(new URL('./src/infrastructure/api', import.meta.url)),
      '@/utils': fileURLToPath(new URL('./src/shared/utils', import.meta.url)),
      '@/constants': fileURLToPath(new URL('./src/shared/constants', import.meta.url)),
    }
  }
})