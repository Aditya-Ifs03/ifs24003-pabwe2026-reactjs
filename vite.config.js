import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Memuat environment variables dari file .env
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      port: parseInt(env.APP_PORT || '3000'),
    },
    define: {
      'DELCOM_BASEURL': JSON.stringify(env.DELCOM_BASEURL || 'https://open-api.delcom.org/api/v1')
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.js'],
      globals: true,
      coverage: {
        provider: 'v8',
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80
        }
      }
    }
  }
})