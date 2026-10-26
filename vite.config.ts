import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/Portfolio/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5174, // Run on port 5174 so the user can compare both portfolios simultaneously!
  },
});
