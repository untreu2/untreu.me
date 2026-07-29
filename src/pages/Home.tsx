import { Link } from 'react-router-dom'
import { posts } from '../content'
import { links, profile } from '../data/profile'

export function Home() {
  return (
    <section className="mx-auto flex min-h-screen max-w-content flex-col px-6 py-8 sm:px-8 sm:py-10">
      <header className="animate-fade-up flex items-center justify-between border-b border-ink pb-4 text-sm">
        <span className="font-semibold">{profile.handle}</span>
        <span className="italic text-muted">Istanbul</span>
      </header>

      <div className="animate-fade-up flex flex-1 flex-col justify-center py-20 sm:py-28">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Software developer
        </p>
        <h1 className="max-w-2xl text-6xl font-normal leading-[0.9] tracking-[-0.04em] text-ink sm:text-8xl">
          {profile.name}
        </h1>

        <p className="mt-8 max-w-xl border-l border-ink pl-5 text-xl leading-relaxed text-ink sm:text-2xl">
          {profile.bio}
        </p>

        <nav aria-label="Social links" className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-base underline decoration-line underline-offset-4 hover:decoration-ink"
            >
              {link.label}
              <span aria-hidden> ↗</span>
            </a>
          ))}
        </nav>
      </div>

      <section
        aria-labelledby="github-activity-heading"
        className="animate-fade-up border-t border-ink py-8"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h2
            id="github-activity-heading"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-muted"
          >
            GitHub activity
          </h2>
          <a
            href="https://github.com/untreu2"
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            View profile <span aria-hidden>↗</span>
          </a>
        </div>

        <a
          href="https://github.com/untreu2"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="View untreu2 on GitHub"
          className="mt-6 block overflow-x-auto pb-2"
        >
          <img
            src="https://ghchart.rshah.org/2da44e/untreu2"
            alt="GitHub contribution chart for untreu2"
            loading="lazy"
            decoding="async"
            className="min-w-[640px]"
          />
        </a>
      </section>

      {posts.length > 0 && (
        <div className="animate-fade-up border-t border-ink pt-3">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Writing
          </h2>
          <ul>
            {posts.map((entry) => (
              <li key={entry.slug}>
                <Link
                  to={`/posts/${entry.slug}`}
                  className="group grid border-b border-line py-5 sm:grid-cols-[1fr_2fr] sm:gap-8"
                >
                  <h3 className="text-xl font-semibold text-ink">
                    {entry.title}
                  </h3>
                  <p className="mt-1 text-base text-muted transition-colors group-hover:text-ink sm:mt-0">
                    {entry.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

    </section>
  )
}
