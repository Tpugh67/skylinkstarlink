import type { Metadata } from 'next'
import WebsiteDesignClient from './WebsiteDesignClient'

export const metadata: Metadata = {
  title: 'Website Design & Development Packages | SkyLinkStarLink',
  description:
    'Professional, mobile-responsive websites starting at $799. Choose a fixed-price package or request a custom quote. Secure checkout, clear timelines, optional maintenance plans.',
  alternates: {
    canonical: 'https://skylinkstarlink.com/website-design',
  },
  openGraph: {
    title: 'Website Design & Development Packages | SkyLinkStarLink',
    description:
      'Professional, mobile-responsive websites starting at $799. Choose a fixed-price package or request a custom quote.',
    url: 'https://skylinkstarlink.com/website-design',
    siteName: 'SkyLinkStarLink',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SkyLinkStarLink — Website Design & Development Packages',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Design & Development Packages | SkyLinkStarLink',
    description:
      'Professional, mobile-responsive websites starting at $799. Choose a fixed-price package or request a custom quote.',
    images: ['/og-image.png'],
  },
}

export default function WebsiteDesignPage() {
  return <WebsiteDesignClient />
}
