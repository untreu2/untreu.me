export const profile = {
  name: 'emir yorulmaz',
  handle: 'untreu',
  avatar: 'https://avatars.githubusercontent.com/u/110045638?v=4',
  bio: 'Bitcoin maxi. Building software stuff.',
}

export type SocialIcon = 'github' | 'x'

export interface SocialLink {
  label: string
  href: string
  icon: SocialIcon
}

export const links: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/untreu2/', icon: 'github' },
  { label: 'X', href: 'https://x.com/_untreu', icon: 'x' },
]
