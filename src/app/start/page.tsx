import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'

export const metadata: Metadata = {
  title: 'Choose Your Package | SkyLink & Starlink',
  description: 'Select a package to get started — website, Shopify store, CRM automation, AI automation, or a custom build.',
}

type Tile = {
  key: string
  name: string
  price: string
  tagline: string
  features: string[]
  badge?: string
  href: string
  cta: string
}

const TILES: Tile[] = [
  {
    key: 'launch',
    name: '5-Page Website',
    price: '$799',
    tagline: 'Best for new businesses',
    features: ['Up to 5 pages', 'Mobile-responsive', 'Contact form', 'Basic SEO setup'],
    href: '/checkout?package=launch',
    cta: 'Select & Checkout',
  },
  {
    key: 'growth',
    name: '10-Page Website',
    price: '$1,499',
    tagline: 'Best for lead-focused businesses',
    badge: 'Most Popular',
    features: ['Up to 10 pages', 'Lead-capture forms', 'CRM/email integration', 'Booking integration'],
    href: '/checkout?package=growth',
    cta: 'Select & Checkout',
  },
  {
    key: 'shopify',
    name: 'Shopify Store',
    price: 'Custom Quote',
    tagline: 'Full e-commerce build-out',
    features: ['Product catalog setup', 'Payment & shipping config', 'Theme customization', 'Launch support'],
    href: '/website-design#custom-quote',
    cta: 'Request a Quote',
  },
  {
    key: 'crm',
    name: 'CRM & Automation',
    price: 'Custom Quote',
    tagline: 'Streamline how you manage leads',
    features: ['CRM setup & migration', 'Pipeline automation', 'Email/SMS follow-up', 'Team training'],
    href: '/website-design#custom-quote',
    cta: 'Request a Quote',
  },
  {
    key: 'ai',
    name: 'AI Automation',
    price: 'Custom Quote',
    tagline: 'Save hours with automated workflows',
    features: ['AI chat / support agents', 'Workflow automation', 'Data & lead routing', 'Custom integrations'],
    href: '/website-design#custom-quote',
    cta: 'Request a Quote',
  },
  {
    key: 'custom',
    name: 'Custom Development',
    price: 'Custom Quote',
    tagline: 'Something more specific in mind',
    features: ['Custom web apps', 'Third-party integrations', 'Scoped project plan', 'Flexible timeline'],
    href: '/website-design#custom-quote',
    cta: 'Request a Quote',
  },
]

export default function StartPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteNav />

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Choose Your Package</h1>
        <p className="text-slate-400">
          Pick the option that fits your project. Fixed-price packages go straight to checkout —
          custom projects start with a quick quote request.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TILES.map(tile => (
          <div
            key={tile.key}
            className="relative flex flex-col bg-slate-900 border border-slate-800 rounded-2xl p-6"
          >
            {tile.badge && (
              <span className="absolute -top-3 left-6 bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {tile.badge}
              </span>
            )}
            <h2 className="text-lg font-bold mb-1">{tile.name}</h2>
            <p className="text-slate-400 text-sm mb-4">{tile.tagline}</p>
            <p className="text-2xl font-bold mb-4">{tile.price}</p>
            <ul className="space-y-2 mb-6 flex-1">
              {tile.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-sky-500 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={tile.href}
              className="block w-full text-center py-3 rounded-xl font-semibold bg-sky-600 hover:bg-sky-500 transition-colors text-white"
            >
              {tile.cta}
            </Link>
          </div>
        ))}
      </section>

      <SiteFooter />
    </div>
  )
}
