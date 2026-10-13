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
            src="https://ghchart.rshah.org/2da44e/untreu2"
            alt="GitHub contribution chart for untreu2"
            loading="lazy"
            decoding="async"
            className="h-auto w-full min-w-[720px] max-w-none"
            // On narrow screens the chart scrolls; start at the most recent months.
            onLoad={(event) => {
              const scroller = event.currentTarget.parentElement
              if (scroller) scroller.scrollLeft = scroller.scrollWidth
            }}
          />
        </a>
      </section>

      <section aria-label="Projects" className="animate-fade-up py-8">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-ink">
          Projects
        </h2>
        <ol className="relative">
          {projects.map((project, index) => (
            <li key={project.name} className="relative grid grid-cols-[2.5rem_1fr] gap-3 pb-12 last:pb-0 sm:grid-cols-[4rem_1fr] sm:gap-8">
              {index < projects.length - 1 && (
                <span aria-hidden className="absolute bottom-0 left-5 top-12 w-px bg-line sm:left-8 sm:top-[4.5rem]" />
              )}
              <img
                src={project.logo}
                alt={`${project.name} logo`}
                loading="lazy"
                decoding="async"
                className="h-10 w-10 rounded-[22%] border border-line bg-surface object-cover sm:h-16 sm:w-16"
              />
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-ink">
                  {project.name} <span className="ml-1 align-middle text-sm font-normal text-muted">({project.date})</span>
                </h3>
                <p className="mt-1 text-sm text-muted">{project.tagline}</p>
                <ul aria-label={`${project.name} stack`} className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((id) => (
                    <li
                      key={id}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2 py-0.5 text-xs text-ink"
                    >
                      <img src={tech[id].logo} alt="" aria-hidden className="h-3 w-3" />
                      {tech[id].name}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/90 sm:text-lg">{project.story}</p>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group mt-5 block overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-ink"
                >
                  {project.link.kind === 'app-store' ? (
                    <div className="grid grid-cols-3 gap-2 bg-accent-soft p-3">
                      {project.link.previews.map((src, i) => (
                        <img
                          key={src}
                          src={src}
                          alt={`${project.name} App Store screenshot ${i + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[6/13] w-full rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  ) : (
                    <img
                      src={project.link.previews[0]}
                      alt={`${project.link.label} website`}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover object-top"
                    />
                  )}
                  <span className="flex items-center justify-between gap-4 border-t border-line px-4 py-3 text-sm">
                    <span className="font-semibold text-ink">{project.link.label}</span>
                    <span aria-hidden className="text-muted transition-colors group-hover:text-ink">↗</span>
                  </span>
                </a>
              </div>
            </li>
          ))}
        </ol>
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
