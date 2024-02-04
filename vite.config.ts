import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '/',
  server: {
    host: '127.0.0.1',
    port: 8000
  },
  esbuild: {
    loader: 'tsx'
  },
  build: {
    outDir: 'build'
  },
  plugins: [react(), viteTsconfigPaths()]
})
