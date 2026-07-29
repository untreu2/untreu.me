import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Keep the static GitHub Pages fallback and add a tiny Cloudflare Worker
// entrypoint so the same build can be hosted without changing the app.
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

      const server = resolve(out, 'server')
      mkdirSync(server, { recursive: true })
      writeFileSync(
        resolve(server, 'index.js'),
        `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)
    if (response.status !== 404) return response
    return env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request))
  },
}
`,
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallback()],
})
