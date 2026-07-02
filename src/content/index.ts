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

export function findEntry(collection: Entry[], slug?: string) {
  return collection.find((e) => e.slug === slug)
}
