import { defineConfig } from 'vite';
 
export default defineConfig({
  root: './',
  build: {
    outDir: '/dist',
  },
  server: {
    port: 2002, 
  }
});