import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Create Next.js Backend',
  description: 'Production-ready Next.js backend generator with 365 templates',
  
  ignoreDeadLinks: true,
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'GitHub', link: 'https://github.com/prem015/create-nextjs-backend' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/getting-started' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/prem015/create-nextjs-backend' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Prem'
    },

    search: {
      provider: 'local'
    }
  }
})