import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves a static host with no SPA rewrite support. Copying the
// built index.html to 404.html makes deep links (e.g. /posts/llms) resolve to
// the same bundle so BrowserRouter can take over client-side.
function spaFallback(): Plugin {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    closeBundle() {
      const out = resolve(__dirname, 'dist')
      const index = resolve(out, 'index.html')
      if (existsSync(index)) {
        copyFileSync(index, resolve(out, '404.html'))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallback()],
})
