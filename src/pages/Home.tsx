import { Link } from 'react-router-dom'
import { posts } from '../content'
import { links, profile, projects, tech } from '../data/profile'

export function Home() {
  return (
    <section className="mx-auto flex min-h-screen w-[90vw] max-w-4xl flex-col justify-center py-8 sm:py-10">
      <div className="animate-fade-up pb-2">
        <h1 className="max-w-2xl font-display text-6xl font-normal leading-[0.9] tracking-[-0.04em] text-ink sm:text-8xl">
          {profile.name}
        </h1>

        <p className="mt-8 max-w-xl text-xl leading-relaxed text-ink sm:text-2xl">
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
        className="animate-fade-up py-8"
      >
        <a
          href="https://github.com/untreu2"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="View untreu2 on GitHub"
          className="block w-full overflow-x-auto pb-2"
        >
          <img
            // Saved at deploy time (see deploy.yml) so it loads from this site;
            // falls back to the live chart service if the copy is missing.
            src="/github-chart.svg"
            alt="GitHub contribution chart for untreu2"
            width={663}
            height={104}
            decoding="async"
            className="h-auto w-full min-w-[720px] max-w-none"
            onError={(event) => {
              const remote = 'https://ghchart.rshah.org/2da44e/untreu2'
              if (event.currentTarget.src !== remote) event.currentTarget.src = remote
            }}
            // On narrow screens the chart scrolls; start at the most recent months.
            onLoad={(event) => {
              const scroller = event.currentTarget.parentElement
              if (scroller) scroller.scrollLeft = scroller.scrollWidth
            }}
          />
        </a>
      </section>

      <section aria-label="Projects" className="animate-fade-up py-8">
        <h2 className="mb-5 text-2xl font-semibold tracking-tight text-ink">
          Projects I built on my own
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.name}>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-ink"
              >
                {project.link.kind === 'app-store' ? (
                  <div className="grid h-32 grid-cols-3 gap-1.5 overflow-hidden bg-accent-soft px-3 pt-3">
                    {project.link.previews.map((src, i) => (
                      <img
                        key={src}
                        src={src}
                        alt={`${project.name} App Store screenshot ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full rounded-t-lg object-cover object-top"
                      />
                    ))}
                  </div>
                ) : (
                  <img
                    src={project.link.previews[0]}
                    alt={`${project.link.label} website`}
                    loading="lazy"
                    decoding="async"
                    className="h-32 w-full object-cover object-left-top"
                  />
                )}
                <div className="flex flex-1 flex-col border-t border-line p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={project.logo}
                      alt={`${project.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className="h-9 w-9 shrink-0 rounded-[22%] border border-line object-cover"
                    />
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold leading-tight text-ink">
                        {project.name} <span className="text-xs font-normal text-muted">({project.date})</span>
                      </h3>
                      <p className="text-xs text-muted">{project.tagline}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink/85">{project.story}</p>
                  <ul aria-label={`${project.name} stack`} className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {project.stack.map((id) => (
                      <li
                        key={id}
                        className="inline-flex items-center gap-1 rounded-full border border-line px-2 py-0.5 text-[11px] text-ink"
                      >
                        <img src={tech[id].logo} alt="" aria-hidden className="h-3 w-3" />
                        {tech[id].name}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-4 flex items-center justify-between text-xs font-semibold text-ink">
                    {project.link.label}
                    <span aria-hidden className="text-muted transition-colors group-hover:text-ink">↗</span>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
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
