import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@pages": "/src/pages",
      "@contexts": "/src/contexts",
      "@utils": "/src/utils",
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@models": "/src/models",
      "@services": "/src/services"
    }
  }
})
