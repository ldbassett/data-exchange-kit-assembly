import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Known-good, SPA-safe Vite config for Vercel
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  },
  // If you ever switch back to HistoryRouter (no # in URL),
  // leave this as-is; routing is handled by vercel.json rewrites.
  // HashRouter (what you have now) doesn't need any extra config.
})
