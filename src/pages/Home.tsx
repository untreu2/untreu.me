import { Link } from 'react-router-dom'
import { posts } from '../content'
import { links, profile } from '../data/profile'

export function Home() {
  return (
    <section className="mx-auto flex min-h-screen w-[90vw] max-w-4xl flex-col py-8 sm:py-10">
      <div className="animate-fade-up flex flex-1 flex-col justify-center py-20 sm:py-28">
        <h1 className="max-w-2xl font-display text-6xl font-normal leading-[0.9] tracking-[-0.04em] text-ink sm:text-8xl">
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
        aria-label="GitHub activity"
        className="animate-fade-up border-t border-ink py-8"
      >
        <a
          href="https://github.com/untreu2"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="View untreu2 on GitHub"
          className="block w-full overflow-x-auto pb-2"
        >
          <img
            src="https://ghchart.rshah.org/2da44e/untreu2"
            alt="GitHub contribution chart for untreu2"
            loading="lazy"
            decoding="async"
            className="h-auto w-full min-w-[720px] max-w-none"
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
