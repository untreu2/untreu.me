export const profile = {
  name: 'emir yorulmaz',
  handle: 'untreu',
  bio: 'Building software stuff.',
}

export interface SocialLink {
  label: string
  href: string
}

export const links: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/untreu2/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/untreu/' },
  { label: 'X', href: 'https://x.com/_untreu' },
]

export const tech = {
  flutter: { name: 'Flutter', logo: '/stack/flutter.svg' },
  dart: { name: 'Dart', logo: '/stack/dart.svg' },
  swift: { name: 'Swift', logo: '/stack/swift.svg' },
  go: { name: 'Go', logo: '/stack/go.svg' },
  typescript: { name: 'TypeScript', logo: '/stack/typescript.svg' },
  react: { name: 'React', logo: '/stack/react.svg' },
  tailwind: { name: 'Tailwind CSS', logo: '/stack/tailwindcss.svg' },
  postgresql: { name: 'PostgreSQL', logo: '/stack/postgresql.svg' },
  docker: { name: 'Docker', logo: '/stack/docker.svg' },
  googlecloud: { name: 'Google Cloud', logo: '/stack/googlecloud.svg' },
  firebase: { name: 'Firebase', logo: '/stack/firebase.svg' },
}

export type Tech = keyof typeof tech

export interface Project {
  name: string
  tagline: string
  date: string
  logo: string
  href: string
  story: string
  stack: Tech[]
  // App Store apps show screenshots; websites show a screenshot of the site.
  link: { kind: 'app-store' | 'website'; label: string; previews: string[] }
}

// Newest first, so the story reads backwards from where I am now to where it started.
export const projects: Project[] = [
  {
    name: 'Altair',
    tagline: 'AI health & diet coach',
    date: 'August 2026',
    logo: '/projects/altair.png',
    href: 'https://apps.apple.com/us/app/altair-ai-health-diet-coach/id6802138197',
    story:
      'Everything before this led here. Altair is the most ambitious thing I have shipped: a voice-first health agent you talk to or show a photo, and it logs your meals and workouts, reads Apple Health, and turns your day into a single health score. It is the first time I owned the whole stack end to end, from the SwiftUI app to a Go and PostgreSQL backend on Google Cloud, subscriptions included.',
    stack: ['swift', 'go', 'postgresql', 'docker', 'googlecloud', 'firebase'],
    link: { kind: 'app-store', label: 'View on the App Store', previews: ['/projects/previews/altair-1.jpg', '/projects/previews/altair-2.jpg', '/projects/previews/altair-3.jpg'] },
  },
  {
    name: 'Floyd',
    tagline: 'AI-powered calendar',
    date: 'July 2026',
    logo: '/projects/floyd.png',
    href: 'https://apps.apple.com/us/app/floyd-ai-powered-calendar/id6787791794',
    story:
      'Floyd was the test of whether Dame actually worked. I built it on top of Dame\'s infrastructure, and it was also my move from Flutter to native SwiftUI: a calendar you can just talk to, turning plain language into events and reminders. It made it to the App Store, and it gave me the confidence to go after something bigger.',
    stack: ['swift', 'go', 'postgresql', 'docker', 'googlecloud', 'firebase'],
    link: { kind: 'app-store', label: 'View on the App Store', previews: ['/projects/previews/floyd-1.jpg', '/projects/previews/floyd-2.jpg', '/projects/previews/floyd-3.jpg'] },
  },
  {
    name: 'Dame',
    tagline: 'Autonomous AI engineer',
    date: 'May 2026',
    logo: '/projects/dame.png',
    href: 'https://dame.dev',
    story:
      'After shipping small apps on my own, the bottleneck was clear: too much of the work was repetitive. So I built Dame, an autonomous AI engineer that turns goals into editable plans on GitHub and keeps the developer in the loop. Multiple models cross-check each other, and each task goes to the most efficient one. It became my first paid product, and the foundation for everything that came after.',
    stack: ['typescript', 'react', 'tailwind', 'go', 'postgresql', 'docker', 'googlecloud', 'firebase'],
    link: { kind: 'website', label: 'dame.dev', previews: ['/projects/previews/dame-site.jpg'] },
  },
  {
    name: 'Wisdom',
    tagline: 'Encrypted note-taking app',
    date: 'April 2025',
    logo: '/projects/wisdom.png',
    href: 'https://apps.apple.com/us/app/wisdom-note-taking-app/id6744746646',
    story:
      'With one app out, I wanted the next one to take privacy seriously. Wisdom is a simple note-taking app that is fully offline, encrypted, and open source, built with Flutter and shipped to the App Store. Your notes never leave your device.',
    stack: ['flutter', 'dart'],
    link: { kind: 'app-store', label: 'View on the App Store', previews: ['/projects/previews/wisdom-1.jpg', '/projects/previews/wisdom-2.jpg', '/projects/previews/wisdom-3.jpg'] },
  },
  {
    name: 'Humble',
    tagline: 'Fasting app',
    date: 'December 2024',
    logo: '/projects/humble.png',
    href: 'https://apps.apple.com/us/app/humble-fasting-app/id6557081711',
    story:
      'Where it all started. Humble is a small, open-source fasting timer and my first app on the App Store, built with Flutter. It taught me what it takes to take something from an idea to a real product in people\'s hands. These days I am rebuilding it natively in SwiftUI.',
    stack: ['flutter', 'dart'],
    link: { kind: 'app-store', label: 'View on the App Store', previews: ['/projects/previews/humble-1.jpg', '/projects/previews/humble-2.jpg', '/projects/previews/humble-3.jpg'] },
  },
]
