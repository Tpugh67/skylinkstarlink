'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  Check, ArrowRight, Shield, Smartphone, Headphones, Sparkles,
  ChevronDown, Zap, Star,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Config — edit these instead of touching the JSX below.
// Stripe links come from env vars so they can change without a redeploy of code.
// Leave any of these blank until the real Stripe Payment Link exists; the
// button will gracefully fall back to the contact/quote form instead of
// showing a broken checkout to a live visitor.
// ---------------------------------------------------------------------------
const STRIPE_LINKS = {
  launch: process.env.NEXT_PUBLIC_STRIPE_WEBSITE_LAUNCH_URL || '',
  growth: process.env.NEXT_PUBLIC_STRIPE_WEBSITE_GROWTH_URL || '',
  pro:    process.env.NEXT_PUBLIC_STRIPE_WEBSITE_PRO_URL || '',
}

type Package = {
  key: keyof typeof STRIPE_LINKS
  name: string
  price: string
  tagline: string
  badge?: string
  timeline: string
  features: string[]
}

const PACKAGES: Package[] = [
  {
    key: 'launch',
    name: 'Website Launch',
    price: '$799',
    tagline: 'Best for new businesses',
    timeline: '~7–14 business days after content is received',
    features: [
      'Up to 5 professionally designed pages',
      'Mobile-responsive design',
      'Contact form',
      'Basic search-engine setup',
      'Social media links',
      'Google Maps integration when applicable',
      'Basic speed optimization',
      'One revision round',
    ],
  },
  {
    key: 'growth',
    name: 'Website Growth',
    price: '$1,499',
    tagline: 'Best for businesses focused on generating leads',
    badge: 'Most Popular',
    timeline: '~14–21 business days after content is received',
    features: [
      'Up to 10 professionally designed pages',
      'Custom design aligned with your brand',
      'Mobile-responsive development',
      'Lead-capture forms',
      'Appointment-booking integration',
      'Basic CRM or email integration',
      'Testimonials / reviews section',
      'Blog or news section',
      'Google Analytics setup',
      'Enhanced speed optimization',
      'Two revision rounds',
    ],
  },
  {
    key: 'pro',
    name: 'Website Pro',
    price: '$2,999',
    tagline: 'Best for established or growing companies',
    timeline: '~21–35 business days after content is received',
    features: [
      'Up to 20 professionally designed pages',
      'Advanced custom design',
      'Mobile-responsive development',
      'Advanced lead-generation forms',
      'CRM integration',
      'Automated email follow-up integration',
      'Appointment-booking system',
      'Client portal / protected content area',
      'Advanced analytics setup',
      'Blog or resource center',
      'Basic AI-chat integration, when applicable',
      'Three revision rounds',
      'Priority project scheduling',
    ],
  },
]

const ADDONS = [
  { name: 'Additional webpage', price: 'From $99' },
  { name: 'Logo design', price: 'Custom Quote' },
  { name: 'Website copywriting', price: 'Custom Quote' },
  { name: 'Blog setup', price: 'From $149' },
  { name: 'E-commerce functionality', price: 'Custom Quote' },
  { name: 'Online booking', price: 'From $199' },
  { name: 'CRM integration', price: 'Custom Quote' },
  { name: 'AI chatbot', price: 'Custom Quote' },
  { name: 'Email automation', price: 'From $249' },
  { name: 'Monthly maintenance', price: 'See plans below' },
  { name: 'Search-engine optimization', price: 'Custom Quote' },
  { name: 'Google Business Profile setup', price: 'From $99' },
  { name: 'Social media profile setup', price: 'From $99' },
  { name: 'Product upload service', price: 'Custom Quote' },
  { name: 'Advanced forms', price: 'From $149' },
  { name: 'Client portal', price: 'Custom Quote' },
  { name: 'Rush delivery', price: 'From $299' },
]

const COMPARISON_ROWS: { label: string; launch: string; growth: string; pro: string }[] = [
  { label: 'Pages',                  launch: 'Up to 5',  growth: 'Up to 10', pro: 'Up to 20' },
  { label: 'Mobile-responsive',      launch: '✓',         growth: '✓',        pro: '✓' },
  { label: 'Contact form',           launch: '✓',         growth: '✓',        pro: '✓' },
  { label: 'Lead-capture forms',     launch: '—',         growth: '✓',        pro: '✓' },
  { label: 'Booking integration',    launch: '—',         growth: '✓',        pro: '✓' },
  { label: 'CRM integration',        launch: '—',         growth: 'Basic',    pro: 'Advanced' },
  { label: 'Blog',                   launch: '—',         growth: '✓',        pro: '✓' },
  { label: 'Analytics',              launch: '—',         growth: '✓',        pro: 'Advanced' },
  { label: 'Basic SEO setup',        launch: '✓',         growth: '✓',        pro: '✓' },
  { label: 'AI integration',         launch: '—',         growth: '—',        pro: 'Basic' },
  { label: 'Revision rounds',        launch: '1',         growth: '2',        pro: '3' },
  { label: 'Estimated delivery',     launch: '7–14 days', growth: '14–21 days', pro: '21–35 days' },
  { label: 'Priority support',       launch: '—',         growth: '—',        pro: '✓' },
]

const MAINTENANCE_PLANS = [
  { name: 'Essential', price: '$99/mo', features: ['Software updates', 'Basic backups', 'Uptime monitoring', 'Security checks', 'Up to 30 min of minor content changes'] },
  { name: 'Growth',    price: '$199/mo', features: ['Everything in Essential', 'Up to 90 min of content changes', 'Monthly performance review', 'Analytics summary', 'Priority support'] },
  { name: 'Pro',       price: '$399/mo', features: ['Everything in Growth', 'Up to 3 hours of website work', 'Landing-page support', 'Conversion recommendations', 'Advanced priority support'] },
]

const FAQS = [
  { q: 'How long does a website take?', a: 'Timelines vary by package — Website Launch is typically 7–14 business days, Growth 14–21 days, and Pro 21–35 days, starting once we\'ve received your content and the project is confirmed.' },
  { q: 'What do I need to provide?', a: 'At minimum: your logo (if you have one), any existing branding, the text/content for your pages, and any photos you want used. We\'ll guide you through exactly what\'s needed in the project questionnaire after purchase.' },
  { q: 'Is hosting included?', a: 'Hosting is not included in the base packages. We\'ll advise on hosting options and can assist with setup as an add-on.' },
  { q: 'Is the domain included?', a: 'Domain registration is not included. If you don\'t already own a domain, we can help you register one.' },
  { q: 'Can you redesign my existing website?', a: 'Yes — let us know in the custom quote form and we\'ll review your current site as part of scoping the project.' },
  { q: 'Can you write the website content?', a: 'Copywriting is available as an add-on if you don\'t have content ready.' },
  { q: 'Can you build an online store?', a: 'Yes, e-commerce functionality is available — most commonly scoped as part of Website Pro or as a custom project.' },
  { q: 'Can you connect my CRM?', a: 'Yes. Basic CRM/email integration is included in Growth and Pro; more advanced integrations can be scoped as a custom project.' },
  { q: 'Will my website work on mobile devices?', a: 'Yes — every package includes fully mobile-responsive design.' },
  { q: 'How many revisions are included?', a: 'Launch includes 1 round, Growth includes 2, and Pro includes 3. A revision round is one consolidated list of requested changes.' },
  { q: 'What happens after I pay?', a: 'You\'ll be taken to a confirmation page and asked to complete a short project questionnaire so we can start planning your site.' },
  { q: 'Can I request custom features?', a: 'Yes — use the "Request a Custom Quote" option and we\'ll scope it before any additional payment is required.' },
  { q: 'Do you provide monthly maintenance?', a: 'Yes, optional maintenance plans are available after launch — see the Maintenance Plans section above.' },
  { q: 'What if my project needs more than my package includes?', a: 'We\'ll let you know and provide a quote for the additional scope before doing any extra work.' },
  { q: 'What platform will my website use?', a: 'We build on modern, reliable web technology suited to your project\'s needs — we\'ll confirm specifics during intake.' },
  { q: 'Will I own my website?', a: 'Yes, the completed website is yours.' },
  { q: 'How do refunds or cancellations work?', a: 'Because website projects reserve development time and involve immediate planning and design work, refund eligibility depends on the project stage. Full terms are available on our refund policy page.' },
]

function StripeButton({ pkg, label }: { pkg: Package; label: string }) {
  const url = STRIPE_LINKS[pkg.key]
  if (url) {
    return (
      <a
        href={url}
        className="block w-full text-center py-3 rounded-xl font-semibold bg-sky-600 hover:bg-sky-500 transition-colors text-white"
      >
        {label}
      </a>
    )
  }
  // No Stripe link configured yet — route to the quote/contact form instead
  // of showing a broken checkout. No error text shown to visitors.
  return (
    <a
      href="#custom-quote"
      className="block w-full text-center py-3 rounded-xl font-semibold bg-sky-600 hover:bg-sky-500 transition-colors text-white"
    >
      {label}
    </a>
  )
}

export default function WebsiteDesignPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', business: '', details: '' })
  const [quoteStatus, setQuoteStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const submitQuote = async () => {
    if (!quoteForm.name || !quoteForm.email) return
    setQuoteStatus('sending')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quoteForm.name,
          email: quoteForm.email,
          service: 'Custom Website Project',
          message: `Business: ${quoteForm.business}\n\n${quoteForm.details}`,
          source: 'website-design-custom-quote',
        }),
      })
      if (res.ok) {
        setQuoteStatus('success')
        setQuoteForm({ name: '', email: '', business: '', details: '' })
      } else {
        setQuoteStatus('error')
      }
    } catch {
      setQuoteStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
        <Link href="/" className="text-lg font-bold tracking-tight">
          SkyLink<span className="text-sky-400">StarLink</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
          <Link href="/#portfolio" className="hover:text-white transition-colors">Portfolio</Link>
          <span className="text-white">Website Design</span>
          <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
        <Link href="/dashboard" className="text-xs px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 transition-colors font-medium">
          Team login →
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-6 py-24">
        <div className="inline-flex items-center gap-2 text-xs text-sky-400 border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 rounded-full mb-8">
          <Sparkles size={11} /> Website Design & Development
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          A Professional Website Built to Grow Your Business
        </h1>
        <p className="text-lg text-slate-400 max-w-xl mx-auto mb-4">
          SkyLinkStarLink designs modern, mobile-friendly websites that help businesses establish
          credibility, attract customers, capture leads, and grow online.
        </p>
        <p className="text-sm text-slate-500 mb-10">
          Secure payments powered by Stripe · Mobile-responsive design · Clear project process
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#packages" className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 rounded-xl font-semibold transition-colors">
            Choose Your Website Package <ArrowRight size={16} />
          </a>
          <a href="#custom-quote" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-slate-500 rounded-xl text-slate-300 transition-colors">
            Request a Custom Quote
          </a>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: Smartphone, label: 'Modern Responsive Design' },
            { icon: Shield,     label: 'Secure Stripe Checkout' },
            { icon: Zap,        label: 'Business-Focused Development' },
            { icon: Headphones, label: 'Post-Launch Support' },
          ].map(item => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <item.icon size={20} className="text-sky-400" />
              <span className="text-xs text-slate-400">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* More than a website */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">More Than Just a Website</h2>
        <p className="text-slate-400">
          A SkyLinkStarLink website is designed to support your business goals. We combine
          professional design, mobile performance, lead capture, search-ready structure, and
          scalable technology so your website can continue growing with your company.
        </p>
      </section>

      {/* Packages */}
      <section id="packages" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">Website Packages</h2>
        <p className="text-slate-400 text-center mb-12">Choose the package that fits where your business is today.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map(pkg => (
            <div
              key={pkg.key}
              className={`relative bg-slate-900 border rounded-2xl p-6 flex flex-col ${
                pkg.badge ? 'border-sky-500' : 'border-slate-800'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={10} /> {pkg.badge}
                </div>
              )}
              <h3 className="font-semibold text-lg text-white mt-2">{pkg.name}</h3>
              <p className="text-xs text-slate-500 mb-4">{pkg.tagline}</p>
              <div className="text-3xl font-bold text-white mb-1">{pkg.price}</div>
              <p className="text-xs text-slate-500 mb-6">{pkg.timeline}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {pkg.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check size={15} className="text-sky-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <StripeButton pkg={pkg} label={`Purchase ${pkg.name}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">Compare Packages</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900 text-slate-400">
                <th className="text-left px-4 py-3 font-medium">Feature</th>
                <th className="text-center px-4 py-3 font-medium">Launch</th>
                <th className="text-center px-4 py-3 font-medium">Growth</th>
                <th className="text-center px-4 py-3 font-medium">Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {COMPARISON_ROWS.map(row => (
                <tr key={row.label} className="hover:bg-slate-900/50">
                  <td className="px-4 py-3 text-slate-300">{row.label}</td>
                  <td className="px-4 py-3 text-center text-slate-400">{row.launch}</td>
                  <td className="px-4 py-3 text-center text-slate-400">{row.growth}</td>
                  <td className="px-4 py-3 text-center text-slate-400">{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add-ons */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">Add-Ons</h2>
        <p className="text-slate-400 text-center mb-10">Extend any package with additional services.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {ADDONS.map(addon => (
            <div key={addon.name} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-3">
              <span className="text-sm text-slate-300">{addon.name}</span>
              <span className="text-xs text-sky-400 shrink-0">{addon.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Custom quote */}
      <section id="custom-quote" className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-2">Need Something More Advanced?</h2>
          <p className="text-slate-400 text-center mb-8">
            SkyLinkStarLink also builds e-commerce stores, custom CRM systems, membership
            websites, customer portals, booking platforms, AI automations, dashboards, and
            custom business software.
          </p>
          {quoteStatus === 'success' ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
              <p className="text-green-300 font-semibold">Request received!</p>
              <p className="text-slate-400 text-sm mt-1">We'll review your project and follow up within 24 hours.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500"
                placeholder="Your name *"
                value={quoteForm.name}
                onChange={e => setQuoteForm(f => ({ ...f, name: e.target.value }))}
              />
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500"
                placeholder="Email address *"
                type="email"
                value={quoteForm.email}
                onChange={e => setQuoteForm(f => ({ ...f, email: e.target.value }))}
              />
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500"
                placeholder="Business name"
                value={quoteForm.business}
                onChange={e => setQuoteForm(f => ({ ...f, business: e.target.value }))}
              />
              <textarea
                rows={4}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500 resize-none"
                placeholder="Tell us about your project..."
                value={quoteForm.details}
                onChange={e => setQuoteForm(f => ({ ...f, details: e.target.value }))}
              />
              {quoteStatus === 'error' && <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>}
              <button
                onClick={submitQuote}
                disabled={quoteStatus === 'sending' || !quoteForm.name || !quoteForm.email}
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 rounded-lg font-semibold text-sm transition-colors"
              >
                {quoteStatus === 'sending' ? 'Sending...' : 'Request a Custom Quote'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Maintenance plans */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">Optional Monthly Maintenance</h2>
        <p className="text-slate-400 text-center mb-10">Keep your website updated, secure, and performing well after launch.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MAINTENANCE_PLANS.map(plan => (
            <div key={plan.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-1">{plan.name} Maintenance</h3>
              <div className="text-2xl font-bold text-white mb-4">{plan.price}</div>
              <ul className="space-y-2">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check size={14} className="text-sky-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 text-center mt-6">
          Maintenance plans are optional and never added to a purchase automatically.
        </p>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={faq.q} className="border border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-white hover:bg-slate-900/50 transition-colors"
                aria-expanded={openFaq === i}
              >
                {faq.q}
                <ChevronDown size={16} className={`text-slate-500 transition-transform shrink-0 ml-3 ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-slate-400">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Build Your Business Website?</h2>
        <p className="text-slate-400 mb-8">
          Choose a package, pay securely through Stripe, and complete the project questionnaire.
          SkyLinkStarLink will review your information and guide you through the next steps.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <a href="#packages" className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 rounded-xl font-semibold transition-colors">
            Choose a Website Package <ArrowRight size={16} />
          </a>
          <a href="#custom-quote" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-slate-500 rounded-xl text-slate-300 transition-colors">
            Request a Custom Quote
          </a>
        </div>
        <p className="text-xs text-slate-500">Secure checkout powered by Stripe</p>
      </section>

      <footer className="border-t border-slate-800 px-8 py-6 text-center text-xs text-slate-500">
  © 2026 SkyLinkStarLink. All rights reserved. · <Link href="/privacy" className="hover:text-slate-300 underline">Privacy Policy</Link>
</footer>
    </div>
  )
}
