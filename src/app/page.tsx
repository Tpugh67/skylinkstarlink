import Link from 'next/link'
import { ArrowRight, Zap, Globe, BarChart3, Users, Star } from 'lucide-react'

const SERVICES = [
  { icon: Globe,    title: 'Shopify Development',   desc: 'Custom storefronts, apps, and Shopify integrations built for conversion.' },
  { icon: BarChart3,title: 'CRM & Automation',      desc: 'PipeDesk pipelines, lead workflows, and business automation systems.'     },
  { icon: Zap,      title: 'Lead Generation',        desc: 'Outreach campaigns, funnel builds, and multi-platform lead tracking.'      },
  { icon: Users,    title: 'Landing Pages',          desc: 'High-converting pages for services, funnels, and paid campaigns.'         },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
        <div className="text-lg font-bold tracking-tight">SkyLink<span className="text-sky-400">StarLink</span></div>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <Link href="#services" className="hover:text-white transition-colors">Services</Link>
          <Link href="#portfolio" className="hover:text-white transition-colors">Portfolio</Link>
          <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
        <Link
          href="/dashboard"
          className="text-xs px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 transition-colors font-medium"
        >
          Team login →
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-6 py-28">
        <div className="inline-flex items-center gap-2 text-xs text-sky-400 border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 rounded-full mb-8">
          <Star size={11} /> Digital agency · CRM · Automation · Lead gen
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          We build systems that<br />
          <span className="text-sky-400">grow your business</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">
          SkyLinkStarLink delivers Shopify development, CRM workflows, automation, and lead generation — everything you need to scale.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 rounded-xl font-semibold transition-colors">
            Get started <ArrowRight size={16} />
          </Link>
          <Link href="#services" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-slate-500 rounded-xl text-slate-300 transition-colors">
            Our services
          </Link>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">What we do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map(s => (
            <div key={s.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-sky-600/50 transition-colors">
              <div className="w-10 h-10 bg-sky-600/20 rounded-xl flex items-center justify-center mb-4">
                <s.icon size={18} className="text-sky-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to work together?</h2>
        <p className="text-slate-400 mb-8">Tell us about your project and we'll get back to you within 24 hours.</p>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left space-y-3">
          <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500" placeholder="Your name" />
          <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500" placeholder="Email address" />
          <textarea rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500 resize-none" placeholder="Tell us about your project..." />
          <button className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 rounded-lg font-semibold text-sm transition-colors">
            Send message
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-8 py-6 text-center text-xs text-slate-500">
        © 2026 SkyLinkStarLink. All rights reserved.
      </footer>
    </div>
  )
}
