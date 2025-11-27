import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/.netlify/functions/createTracker': {
        target: 'https://script.google.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/\.netlify\/functions\/createTracker/, '/macros/s/AKfycbxbfhtIIoCN8REDLGMfbp3VE7sX1ZfPdUaTwrXaydRdqW56A94VaKyunEmui2W5vipu/exec'),
      },
    },
  },
})
