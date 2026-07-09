export interface Entry {
  slug: string
  title: string
  description: string
  body: string
}

// Posts are ordered newest-first for the index listing. Add entries here and
// create a matching markdown file in ./posts/<slug>.md, then import it with
// `?raw` and reference it as the entry `body`.
export const posts: Entry[] = []

import floydPrivacy from './legal/FloydPrivacy.md?raw'

// Legal / policy pages, rendered with the same Markdown article layout.
export const legal: Entry[] = [
  {
    slug: 'privacy',
    title: 'Floyd Privacy Policy',
    description: 'How the Floyd app collects, uses, and protects your data.',
    body: floydPrivacy,
  },
]

export function findEntry(collection: Entry[], slug?: string) {
  return collection.find((e) => e.slug === slug)
}
