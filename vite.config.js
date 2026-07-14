import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split large third-party libs into their own cacheable chunks so the
    // app code and vendor code can be fetched/cached independently.
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          react: ['react', 'react-dom'],
          vendor: ['lucide-react', 'react-intersection-observer'],
        },
      },
    },
    // Bump the warning limit slightly; framer-motion is inherently chunky.
    chunkSizeWarningLimit: 600,
  },
})
