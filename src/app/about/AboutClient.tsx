'use client'
import {
  ArrowRight, Target, ShoppingBag, Database, Bot, Globe,
  DollarSign, Clock, ShieldCheck, MessageSquare, Sparkles,
  Search, PenTool, Rocket, LifeBuoy, Check,
} from 'lucide-react'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import { PACKAGES } from '@/lib/packages'

const WHY_US = [
  { icon: DollarSign,  title: 'Fixed, Transparent Pricing', desc: 'No hourly guesswork. Every package has a clear price and a clear scope, so you know exactly what you\'re paying for before you start.' },
  { icon: Clock,       title: 'Fast Turnaround',            desc: 'Most projects launch in 1–5 weeks depending on package, not months. We keep timelines tight without cutting corners.' },
  { icon: MessageSquare, title: 'Personal, Hands-On Support', desc: 'You work directly with our team from kickoff to launch — not a rotating cast of account managers.' },
  { icon: ShieldCheck, title: 'Built to Last',               desc: 'Mobile-responsive, performance-optimized builds on modern, reliable technology — designed to grow with your business.' },
]

const SERVICES = [
  { icon: Globe,       title: 'Website Design',   desc: 'Professional, mobile-responsive websites built on fixed-price packages, from a 5-page launch site to a full 20-page build.', href: '/website-design' },
  { icon: ShoppingBag, title: 'Shopify Development', desc: 'Custom Shopify storefronts, apps, and integrations designed to convert browsers into buyers.' },
  { icon: Database,    title: 'CRM Integration',  desc: 'PipeDesk pipelines, lead routing, and CRM workflows that keep your sales process organized and automated.' },
  { icon: Bot,         title: 'AI Automation',    desc: 'AI-powered chat, follow-up, and workflow automation that saves your team hours every week.' },
]

const PROCESS = [
  { icon: Search,   step: '1', title: 'Discovery',      desc: 'Tell us about your business and goals — choose a fixed-price package or request a custom quote.' },
  { icon: DollarSign, step: '2', title: 'Secure Checkout', desc: 'Pay securely through Stripe. No surprise invoices — the price you see is the price you pay.' },
  { icon: PenTool,  step: '3', title: 'Onboarding',      desc: 'Complete a short questionnaire covering your branding, content, features, and SEO needs.' },
  { icon: Rocket,   step: '4', title: 'Design & Build',  desc: 'Our team designs and builds your project, with revision rounds included in every package.' },
  { icon: LifeBuoy, step: '5', title: 'Launch & Support', desc: 'We launch your project and offer optional monthly maintenance to keep it running smoothly.' },
]

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteNav current="about" />

      {/* Hero / Mission */}
      <section className="max-w-4xl mx-auto text-center px-6 py-24">
        <div className="inline-flex items-center gap-2 text-xs text-sky-400 border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 rounded-full mb-8">
          <Sparkles size={11} /> About SkyLinkStarLink
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          We build the systems<br /><span className="text-sky-400">your business runs on</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          SkyLinkStarLink is a digital agency focused on one thing: giving growing businesses the
          websites, storefronts, CRM systems, and automation they need to compete — without
          agency-sized price tags or timelines.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-10 text-center">
          <div className="w-12 h-12 bg-sky-600/20 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Target size={22} className="text-sky-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-slate-400 leading-relaxed">
            Too many small and mid-sized businesses get priced out of good web design and left
            to piece together CRMs and automations on their own. Our mission is to make
            professional-grade websites, Shopify stores, CRM integrations, and AI automation
            accessible with fixed pricing, clear timelines, and real communication — so you can
            focus on running your business while we build the systems behind it.
          </p>
        </div>
      </section>

      {/* Why choose us */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">Why Choose SkyLinkStarLink</h2>
        <p className="text-slate-400 text-center mb-12">What working with us actually looks like.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WHY_US.map(item => (
            <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-sky-600/50 transition-colors">
              <div className="w-10 h-10 bg-sky-600/20 rounded-xl flex items-center justify-center mb-4">
                <item.icon size={18} className="text-sky-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">Our Services</h2>
        <p className="text-slate-400 text-center mb-12">Four core services, built around your growth.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map(s => {
            const CardInner = (
              <>
                <div className="w-10 h-10 bg-sky-600/20 rounded-xl flex items-center justify-center mb-4">
                  <s.icon size={18} className="text-sky-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400">{s.desc}</p>
              </>
            )
            return s.href ? (
              <a
                key={s.title}
                href={s.href}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-sky-600/50 transition-colors block"
              >
                {CardInner}
              </a>
            ) : (
              <div
                key={s.title}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-sky-600/50 transition-colors"
              >
                {CardInner}
              </div>
            )
          })}
        </div>
      </section>

      {/* Fixed-price packages */}
      <section id="packages" className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">Fixed-Price Packages</h2>
        <p className="text-slate-400 text-center mb-10">Clear pricing, no surprises. Need something bigger? We'll scope a custom quote.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-1">{PACKAGES.launch.name}</h3>
            <div className="text-2xl font-bold text-white mb-4">{PACKAGES.launch.priceLabel}</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2"><Check size={14} className="text-sky-400 mt-0.5 shrink-0" /> Up to 5 professionally designed pages</li>
              <li className="flex items-start gap-2"><Check size={14} className="text-sky-400 mt-0.5 shrink-0" /> Mobile-responsive design</li>
              <li className="flex items-start gap-2"><Check size={14} className="text-sky-400 mt-0.5 shrink-0" /> Contact form & basic SEO setup</li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-sky-600/50 rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-1">{PACKAGES.growth.name}</h3>
            <div className="text-2xl font-bold text-white mb-4">{PACKAGES.growth.priceLabel}</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2"><Check size={14} className="text-sky-400 mt-0.5 shrink-0" /> Up to 10 professionally designed pages</li>
              <li className="flex items-start gap-2"><Check size={14} className="text-sky-400 mt-0.5 shrink-0" /> Lead-capture forms & CRM/email integration</li>
              <li className="flex items-start gap-2"><Check size={14} className="text-sky-400 mt-0.5 shrink-0" /> Blog section & Google Analytics setup</li>
            </ul>
          </div>
        </div>
        <p className="text-center mt-8">
          <a href="/website-design" className="text-sm text-sky-400 hover:text-sky-300 transition-colors">
            See full package details and add-ons →
          </a>
        </p>
      </section>

      {/* Process */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">Our Development Process</h2>
        <p className="text-slate-400 text-center mb-12">From first message to launch day.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {PROCESS.map(p => (
            <div key={p.step} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
              <div className="w-10 h-10 bg-sky-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <p.icon size={18} className="text-sky-400" />
              </div>
              <div className="text-xs text-sky-400 font-semibold mb-1">Step {p.step}</div>
              <h3 className="font-semibold text-white mb-2 text-sm">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="text-slate-400 mb-8">
          Choose a fixed-price package, complete secure checkout, and answer a few questions —
          we'll take it from there.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <a
            href="/start"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 rounded-xl font-semibold transition-colors"
          >
            Choose a Package <ArrowRight size={16} />
          </a>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-slate-500 rounded-xl text-slate-300 transition-colors"
          >
            Schedule a Consultation
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
