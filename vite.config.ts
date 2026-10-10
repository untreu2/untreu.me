import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
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
        // Legal URLs must return successful direct responses on GitHub Pages,
        // including when opened from the iOS app or checked by a store crawler.
        for (const route of [
          'floyd/privacy',
          'altair/privacy',
          'altair/health-privacy',
          'altair/health-notice',
          'altair/support',
        ]) {
          const directory = resolve(out, route)
          mkdirSync(directory, { recursive: true })
          copyFileSync(index, resolve(directory, 'index.html'))
        }
        const dashboardHtml = readFileSync(index, 'utf8')
          .replace('<head>', '<head>\n    <meta name="robots" content="noindex, nofollow, noarchive" />')
          .replace(/<title>[^<]*<\/title>/, '<title>Altair admin · untreu.me</title>')
        for (const route of ['altair/admin', 'altair/server']) {
          const dashboard = resolve(out, route)
          mkdirSync(dashboard, { recursive: true })
          writeFileSync(resolve(dashboard, 'index.html'), dashboardHtml)
        }
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
