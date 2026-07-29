import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Markdown } from '../components/Markdown'
import { findEntry, type Entry } from '../content'
import { NotFound } from './NotFound'

interface ArticleProps {
  collection: Entry[]
}

export function Article({ collection }: ArticleProps) {
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
    <article className="mx-auto min-h-screen w-[90vw] max-w-4xl py-8 sm:py-10">
      <header className="animate-fade-up flex min-h-[42vh] items-end py-20 sm:py-28">
        <h1 className="max-w-3xl font-display text-6xl font-normal leading-[0.9] tracking-[-0.04em] text-ink sm:text-8xl">
          {entry.title}
        </h1>
      </header>

      <div className="border-t border-ink py-8 sm:py-10">
        <div className="max-w-content">
          <Markdown>{entry.body}</Markdown>
        </div>
      </div>
    </article>
  )
}
