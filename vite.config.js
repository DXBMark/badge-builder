import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/badge-builder/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('simple-icons')) return 'vendor-icons-simple';
            if (id.includes('lucide')) return 'vendor-icons-lucide';
            if (id.includes('@mui')) return 'vendor-mui';
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 800,
  }
})
