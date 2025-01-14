import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envPrefix: 'VITE_',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      external: ['jquery'], // Mark jQuery as external
    },
  },
});