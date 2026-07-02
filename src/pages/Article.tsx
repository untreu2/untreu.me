import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Markdown } from '../components/Markdown'
import { findEntry, type Entry } from '../content'
import { NotFound } from './NotFound'

interface ArticleProps {
  collection: Entry[]
  backPath: string
  backLabel: string
}

export function Article({ collection, backPath, backLabel }: ArticleProps) {
  const { slug } = useParams()
  const entry = findEntry(collection, slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (entry) document.title = `${entry.title} — untreu`
    return () => {
      document.title = 'untreu'
    }
  }, [entry])

  if (!entry) return <NotFound />

  return (
    <article className="mx-auto max-w-content px-6 py-16">
      <Link
        to={backPath}
        className="animate-fade-up inline-flex items-center gap-1.5 text-sm font-bold text-muted transition-colors hover:text-accent"
      >
        <span aria-hidden>&larr;</span> {backLabel}
      </Link>

      <h1 className="animate-fade-up mt-6 text-4xl font-extrabold leading-tight tracking-tight text-ink">
        {entry.title}
      </h1>

      <div className="mt-8">
        <Markdown>{entry.body}</Markdown>
      </div>

      <footer className="mt-14 border-t border-line pt-6 text-sm text-muted">
        written by untreu (emir yorulmaz)
      </footer>
    </article>
  )
}
