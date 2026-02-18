import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Hostinger ve alt dizinler için dosya yollarını düzeltir
})