import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
      <footer className="mx-auto w-[90vw] max-w-4xl border-t border-line py-6">
        <nav aria-label="App policies" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
          <Link className="underline underline-offset-4 hover:text-ink" to="/floyd/privacy">Floyd Privacy</Link>
          <Link className="underline underline-offset-4 hover:text-ink" to="/altair/privacy">Altair Privacy</Link>
          <Link className="underline underline-offset-4 hover:text-ink" to="/altair/health-privacy">Altair Consumer Health Data Privacy</Link>
          <Link className="underline underline-offset-4 hover:text-ink" to="/altair/health-notice">Altair Health Notice</Link>
        </nav>
      </footer>
    </div>
  )
}
