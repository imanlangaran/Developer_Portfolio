import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: "/Developer_Portfolio",
  
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Optimize chunk sizes
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'framer': ['framer-motion'],
          'icons': ['react-icons', 'lucide-react']
        }
      }
    }
  },

  server: {
    preTransformRequests: true,
  }
})
