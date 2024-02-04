import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import { createRequire } from 'module'
// import { nodePolyfills } from 'vite-plugin-node-polyfills'
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'

const require = createRequire(import.meta.url)

export default defineConfig({
  base: '/',
  server: {
    host: '127.0.0.1',
    port: 8000
  },
  esbuild: {
    loader: 'tsx'
  },
  optimizeDeps: {
    exclude: ['csv-parse']
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  build: {
    outDir: 'build'
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgr({
      include: '**/*.svg?react'
    })
  ]
})
