import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="mx-auto flex max-w-content flex-col items-start px-6 py-28">
      <p className="text-sm font-bold text-accent">404</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">
        page not found
      </h1>
      <p className="mt-3 font-medium text-muted">
        the page you're looking for doesn't exist or has moved.
      </p>
      <Link to="/" className="pill mt-8">
        return home
      </Link>
    </section>
  )
}
