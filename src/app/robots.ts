import type { MetadataRoute } from 'next'

const BASE_URL = 'https://skylinkstarlink.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/leads',
        '/proposals',
        '/payments',
        '/team',
        '/comms',
        '/settings',
        '/login',
        '/api/',
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
