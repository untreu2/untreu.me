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
import altairPrivacy from './legal/AltairPrivacy.md?raw'
import altairHealthPrivacy from './legal/AltairHealthPrivacy.md?raw'
import altairHealthNotice from './legal/AltairHealthNotice.md?raw'

// Legal / policy pages, rendered with the same Markdown article layout.
export const legal: Entry[] = [
  {
    slug: 'privacy',
    title: 'Floyd Privacy Policy',
    description: 'How the Floyd app collects, uses, and protects your data.',
    body: floydPrivacy,
  },
]

export const altairLegal: Entry[] = [
  {
    slug: 'privacy',
    title: 'Altair Privacy Policy',
    description: 'How Altair handles account, health, conversation, and subscription data.',
    body: altairPrivacy,
  },
  {
    slug: 'health-privacy',
    title: 'Altair Consumer Health Data Privacy Policy',
    description: 'The health data Altair collects, its sources, uses, recipients, and your choices.',
    body: altairHealthPrivacy,
  },
  {
    slug: 'health-notice',
    title: 'Altair Health Notice',
    description: 'The limits of Altair’s wellness information, scores, and AI estimates.',
    body: altairHealthNotice,
  },
]

export function findEntry(collection: Entry[], slug?: string) {
  return collection.find((e) => e.slug === slug)
}
