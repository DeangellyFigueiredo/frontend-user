import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  preview: {
    port: 3008,
    strictPort: true,
  },
  server: {
    port: 3008,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:3008',
  },
});
