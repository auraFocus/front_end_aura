import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/aura/auth': {
        target: 'http://18.118.184.194:3000',
        changeOrigin: true,
        secure: false,
      },
      '/aura/schools': {
        target: 'http://18.118.184.194:3000',
        changeOrigin: true,
        secure: false,
      },
      '/aura/students': {
        target: 'http://18.118.184.194:3000',
        changeOrigin: true,
        secure: false,
      },
      '/aura/teachers': {
        target: 'http://18.118.184.194:3000',
        changeOrigin: true,
        secure: false,
      },
      '/aura/parents': {
        target: 'http://18.118.184.194:3000',
        changeOrigin: true,
        secure: false,
      }, 
      '/aura/b2b_admin': {
        target: 'http://18.118.184.194:3000',
        changeOrigin: true,
        secure: false,
      }, 
    },
  },
})
