import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Đặt '/' nếu website đặt ở gốc domain hoặc '/subfolder/' nếu trong thư mục con
  server: {
    port: 5173,
  },
})
