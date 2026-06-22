import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kwallo - Nigeria's Football Platform",
    short_name: 'Kwallo',
    description: 'Live scores, predictions and shareable match cards for NPFL, EPL, UCL and the Super Eagles. In English and Hausa.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#F7F5F0',
    theme_color: '#1B5E38',
    categories: ['sports', 'news'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  }
}
