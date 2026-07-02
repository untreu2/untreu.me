import { Link } from 'react-router-dom'
import { SocialIcon } from '../components/SocialIcons'
import { posts } from '../content'
import { links, profile } from '../data/profile'

export function Home() {
  return (
    <section className="mx-auto max-w-content px-6 py-20 sm:py-24">
      <div className="animate-fade-up flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <img
            src={profile.avatar}
            alt={profile.name}
            width={80}
            height={80}
            className="h-20 w-20 flex-shrink-0 rounded-full border border-line object-cover"
          />
          <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {profile.name}
          </h1>
        </div>

        <p className="mt-5 max-w-md text-lg font-medium leading-relaxed text-ink underline decoration-accent decoration-2 underline-offset-4">
          {profile.bio}
        </p>

        <nav className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="pill gap-2"
            >
              <SocialIcon name={link.icon} className="h-4 w-4" />
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="animate-fade-up mt-14">
        <ul>
          {posts.map((entry) => (
            <li key={entry.slug}>
              <Link
                to={`/posts/${entry.slug}`}
                className="group block border-b border-line py-5 text-center"
              >
                <h3 className="text-xl font-bold text-ink transition-colors group-hover:text-accent">
                  {entry.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-muted">
                  {entry.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
