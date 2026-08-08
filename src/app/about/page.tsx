import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About Us | SkyLinkStarLink Digital Agency',
  description:
    'SkyLinkStarLink builds websites, Shopify stores, CRM integrations, and AI automation for growing businesses. Fixed-price packages starting at $799. Learn about our mission and process.',
  alternates: {
    canonical: 'https://skylinkstarlink.com/about',
  },
  openGraph: {
    title: 'About Us | SkyLinkStarLink Digital Agency',
    description:
      'We build websites, Shopify stores, CRM integrations, and AI automation for growing businesses — with fixed, transparent pricing.',
    url: 'https://skylinkstarlink.com/about',
    siteName: 'SkyLinkStarLink',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SkyLinkStarLink — About Us',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | SkyLinkStarLink Digital Agency',
    description:
      'We build websites, Shopify stores, CRM integrations, and AI automation for growing businesses — with fixed, transparent pricing.',
    images: ['/og-image.png'],
  },
}

export default function AboutPage() {
  return <AboutClient />
}
