// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },

  ssr: true,
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['@nuxtjs/seo', '@nuxt/fonts'],

  fonts: {
    families: [
      { name: 'DM Serif Display', provider: 'google', styles: ['italic', 'normal'] },
      { name: 'Inter', provider: 'google', weights: [300, 400, 500, 600] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500] },
    ],
  },

  seo: {
    redirectToCanonicalSiteUrl: true,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Andrei Chiorean — Frontend Engineer',
      meta: [
        { name: 'description', content: 'Frontend engineer specialising in design systems, UI craft, and polished web interfaces. Based in Cluj, Romania.' },
        { property: 'og:title', content: 'Andrei Chiorean — Frontend Engineer' },
        { property: 'og:description', content: 'Frontend engineer specialising in design systems, UI craft, and polished web interfaces.' },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#C7622A' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
})
