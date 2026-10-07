import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist' },
  server: { port: 3000 },
  // Expose the existing deploy variable names on import.meta.env. Vite also
  // picks up matching process.env vars (how Cloudflare injects them at build),
  // so the deploy workflow and Terraform keep working unchanged.
  envPrefix: ['VITE_', 'REACT_APP_', 'SERVER_URL'],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@public': path.resolve(__dirname, 'public'),
    },
  },
});
