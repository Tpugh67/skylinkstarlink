'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Zap, Globe, BarChart3, Users, Star, CheckCircle, Building2, Gem, GitBranch, Coffee, Bike, Cpu, BookOpen } from 'lucide-react'

const SERVICES = [
  { icon: Globe,     title: 'Shopify Development',  desc: 'Custom storefronts, apps, and Shopify integrations built for conversion.' },
  { icon: BarChart3, title: 'CRM & Automation',     desc: 'PipeDesk pipelines, lead workflows, and business automation systems.'     },
  { icon: Zap,       title: 'Lead Generation',       desc: 'Outreach campaigns, funnel builds, and multi-platform lead tracking.'      },
  { icon: Users,     title: 'Landing Pages',         desc: 'High-converting pages for services, funnels, and paid campaigns.'         },
]

// Recovered from an earlier site walkthrough video. Descriptions kept close to
// the originals; update freely with real results/links as they're confirmed.
const PROJECTS = [
  { icon: Building2, title: 'Keystone Acquisitions',   desc: 'Real estate wholesaling CRM with automated lead routing.', image: '/portfolio/keystone-acquisitions.jpg' },
  { icon: Gem,        title: 'Aurelius Jewelry',        desc: 'Custom Shopify build for a diamond retailer.', image: '/portfolio/aurelius-jewelry.jpg' },
  { icon: Gem,        title: 'GemNet',                  desc: 'B2B diamond marketplace platform.', image: '/portfolio/gemnet.jpg' },
  { icon: GitBranch,  title: 'PipeDesk',                desc: 'Deal pipeline & CRM tool for sales teams.', image: '/portfolio/pipedesk.jpg' },
  { icon: Coffee,     title: "Sampson's Grind Coffee",  desc: 'E-commerce storefront for a specialty coffee roaster.', image: '/portfolio/sampsons-grind-coffee.jpg' },
  { icon: Bike,       title: 'Ride2Earn',                desc: 'E-bike store with custom ordering flow.', image: '/portfolio/ride2earn.jpg' },
  { icon: Cpu,        title: 'Trek Robotics',            desc: 'Product site for a robotics company.', image: '/portfolio/trek-robotics.jpg' },
  { icon: BookOpen,   title: 'Kollel Ohr Shimshon',      desc: 'Site build for a religious study institution.', image: '/portfolio/kollel-ohr-shimshon.jpg' },
]

// Small strip of real screenshots shown in the hero for instant credibility.
const HERO_STRIP = [
  '/portfolio/pipedesk.jpg',
  '/portfolio/gemnet.jpg',
  '/portfolio/aurelius-jewelry.jpg',
  '/portfolio/trek-robotics.jpg',
]

export default function HomePage() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async () => {
    if (!form.name || !form.email) return
    setStatus('sending')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'website' }),
      })
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', service: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
        <div className="text-lg font-bold tracking-tight">SkyLink<span className="text-sky-400">StarLink</span></div>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <Link href="/dashboard" className="text-xs px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 transition-colors font-medium">Team login →</Link>
      </nav>
      <section className="max-w-4xl mx-auto text-center px-6 py-28">
        <div className="inline-flex items-center gap-2 text-xs text-sky-400 border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 rounded-full mb-8">
          <Star size={11} /> Digital agency · CRM · Automation · Lead gen
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">We build systems that<br /><span className="text-sky-400">grow your business</span></h1>
        <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">SkyLinkStarLink delivers Shopify development, CRM workflows, automation, and lead generation.</p>
        <div className="flex items-center justify-center gap-3">
          <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 rounded-xl font-semibold transition-colors">Get started <ArrowRight size={16} /></a>
          <a href="#services" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-slate-500 rounded-xl text-slate-300 transition-colors">Our services</a>
        </div>
        <a href="#portfolio" className="mt-14 flex items-center justify-center gap-3 flex-wrap opacity-80 hover:opacity-100 transition-opacity">
          {HERO_STRIP.map(src => (
            <img
              key={src}
              src={src}
              alt=""
              className="h-14 w-24 md:h-16 md:w-28 object-cover rounded-lg border border-slate-800"
            />
          ))}
        </a>
      </section>
      <section id="services" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">What we do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map(s => (
            <div key={s.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-sky-600/50 transition-colors">
              <div className="w-10 h-10 bg-sky-600/20 rounded-xl flex items-center justify-center mb-4"><s.icon size={18} className="text-sky-400" /></div>
              <h3 className="font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="portfolio" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">Our work</h2>
        <p className="text-slate-400 text-center mb-12">Real projects, real results.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {PROJECTS.map(p => (
            <div key={p.title} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-600/50 transition-colors">
              {p.image ? (
                <img src={p.image} alt={p.title} className="w-full aspect-video object-cover object-top border-b border-slate-800" />
              ) : (
                <div className="w-10 h-10 bg-sky-600/20 rounded-xl flex items-center justify-center mt-6 ml-6"><p.icon size={18} className="text-sky-400" /></div>
              )}
              <div className="p-6 pt-4">
                <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-400">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="contact" className="max-w-xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to work together?</h2>
        <p className="text-slate-400 mb-8">Tell us about your project and we'll get back to you within 24 hours.</p>
        {status === 'success' ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 flex flex-col items-center gap-3">
            <CheckCircle size={32} className="text-green-400" />
            <p className="text-green-300 font-semibold">We got your message!</p>
            <p className="text-slate-400 text-sm">Our team will reach out within 24 hours.</p>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left space-y-3">
            <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500" placeholder="Your name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500" placeholder="Email address *" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-sky-500" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
              <option value="">Select a service...</option>
              <option value="Shopify Development">Shopify Development</option>
              <option value="CRM & Automation">CRM & Automation</option>
              <option value="Lead Generation">Lead Generation</option>
              <option value="Landing Page">Landing Page</option>
              <option value="Other">Other</option>
            </select>
            <textarea rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500 resize-none" placeholder="Tell us about your project..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
            {status === 'error' && <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>}
            <button onClick={handleSubmit} disabled={status === 'sending' || !form.name || !form.email} className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 rounded-lg font-semibold text-sm transition-colors">
              {status === 'sending' ? 'Sending...' : 'Send message'}
            </button>
          </div>
        )}
      </section>
      <footer className="border-t border-slate-800 px-8 py-6 text-center text-xs text-slate-500">© 2026 SkyLinkStarLink. All rights reserved.</footer>
    </div>
  )
}
