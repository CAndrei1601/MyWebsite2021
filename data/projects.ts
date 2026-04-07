// data/projects.ts

export interface Project {
  id: string
  number: string
  name: string
  subtitle: string
  type: string
  description: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  image: string
  reversed: boolean
}

export const projects: Project[] = [
  {
    id: 'forma',
    number: '01',
    name: 'Forma',
    subtitle: 'Component Library',
    type: 'Design System · Personal',
    description:
      'Production-ready Vue 3 design system with 17 accessible components, full TypeScript, design tokens exported to JSON, CSS, and Tailwind config. Built to demonstrate what a well-structured component API looks and feels like in practice.',
    tags: ['Vue 3', 'TypeScript', 'Design Tokens', 'Tailwind CSS', 'Nuxt 3'],
    liveUrl: 'https://component-library-pl.vercel.app/',
    image: '/images/forma.webp',
    reversed: false,
  },
  {
    id: 'themeforge',
    number: '02',
    name: 'ThemeForge',
    subtitle: 'Theme Builder',
    type: 'Interactive Tool · Experiment',
    description:
      'Live design token playground with real-time CSS variable propagation across 40+ components. Export tokens to JSON, CSS, and Tailwind config. Built to explore how design systems behave at the token layer.',
    tags: ['Next.js', 'React', 'Zustand', 'CSS Variables', 'Tailwind CSS'],
    liveUrl: 'https://theme-builder-neon.vercel.app/',
    image: '/images/themeforge.webp',
    reversed: true,
  },
  {
    id: 'tgmures',
    number: '03',
    name: 'TgMures.ro',
    subtitle: 'City Discovery Platform',
    type: 'Full Product · Personal',
    description:
      'End-to-end local discovery platform for Târgu Mureș — restaurants, cafes, bars, and events. Built with search, category filtering, and venue detail pages. A full product challenge requiring both UI craft and architectural thinking.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://spotlymures.netlify.app/targu-mures',
    image: '/images/tgmures.webp',
    reversed: false,
  },
  {
    id: 'clinicatlas',
    number: '04',
    name: 'ClinicAtlas',
    subtitle: 'Healthcare Data Tool',
    type: 'Utility Tool · Personal',
    description:
      'Transforms raw healthcare spreadsheets into geocoded, map-ready data. Upload an Excel or CSV file with clinic addresses, and ClinicAtlas cleans the data, geocodes coordinates, and exports a Google My Maps-ready file.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Geocoding API'],
    liveUrl: 'https://clinicatlas.netlify.app/',
    image: '/images/clinicatlas.webp',
    reversed: true,
  },
  {
    id: 'cabanalirca',
    number: '05',
    name: 'Cabana Lirca',
    subtitle: 'Mountain Cabin Booking Site',
    type: 'Client Work · Production',
    description:
      'Production booking website for a mountain cabin rental. Animated navigation, review carousel, optimised for SEO and Core Web Vitals. A real client project, shipped and live.',
    tags: ['Vue.js', 'Nuxt', 'CSS Animations', 'SEO', 'Responsive'],
    liveUrl: 'https://cabanalirca.ro/',
    image: '/images/cabanalirca.webp',
    reversed: false,
  },
]
