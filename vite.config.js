import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
    
      '/aura/auth': {
        target: 'http://18.118.184.194:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
