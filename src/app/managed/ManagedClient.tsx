'use client'
import { useState } from 'react'
import { Check, ArrowRight, Loader2, Globe, Server, Wrench, ShieldCheck } from 'lucide-react'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'

const INCLUDES = [
  { icon: Globe, title: 'We build it', desc: 'A professional, mobile-responsive website designed for your business.' },
  { icon: Server, title: 'We host it', desc: 'Fast, reliable hosting included — no separate hosting bill, ever.' },
  { icon: Wrench, title: 'We maintain it', desc: 'Updates, security patches, and technical upkeep handled for you.' },
  { icon: ShieldCheck, title: 'We keep it running', desc: 'Uptime monitoring and support, so you never have to think about it.' },
]

const YOU_KEEP = [
  'Your domain name',
  'Your business / trade name',
  'Your logo & trademarks',
  'Your customer data',
  'Your original photos & content',
]

export default function ManagedClient() {
  const [form, setForm] = useState({ name: '', email: '', businessName: '', domain: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!form.name || !form.email) return
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/checkout/managed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setError(data.error || 'Something went wrong starting checkout.')
        setStatus('error')
        return
      }
      window.location.href = data.url
    } catch {
      setError('Something went wrong starting checkout.')
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteNav />

      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center px-6 pt-20 pb-14">
        <div className="inline-flex items-center gap-2 text-xs text-sky-400 border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 rounded-full mb-6">
          $0 Upfront Website
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          A professional website,<br /><span className="text-sky-400">$0 to start</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-xl mx-auto mb-3">
          We build it. We host it. We maintain it. We keep it running.
        </p>
        <p className="text-slate-400 max-w-xl mx-auto">
          You focus on your business. Starting at <span className="text-white font-semibold">$99/month</span>.
        </p>
      </section>

      {/* What's included */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INCLUDES.map(item => (
            <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="w-10 h-10 bg-sky-600/20 rounded-xl flex items-center justify-center mb-4">
                <item.icon size={18} className="text-sky-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What you keep */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-lg font-bold mb-4">What's always yours</h2>
          <p className="text-sm text-slate-400 mb-5">
            While your site is under our managed plan, SkyLinkStarLink owns the design and code —
            but these stay yours, no matter what:
          </p>
          <ul className="space-y-2.5">
            {YOU_KEEP.map(item => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                <Check size={16} className="text-sky-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500 mt-5">
            After an initial 6-month term, cancel anytime with 30 days' notice — or buy out your
            site for $799 to own it outright at any time. Full terms apply —
            see our <a href="/terms" className="text-sky-400 hover:text-sky-300 underline">Terms of Service</a>.
          </p>
        </div>
      </section>

      {/* Signup form */}
      <section className="max-w-md mx-auto px-6 pb-24">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-1">Get started today</h2>
          <p className="text-sm text-slate-400 mb-6">$0 upfront build fee. $99/month, 6-month initial term.</p>

          <div className="space-y-3">
            <label htmlFor="managed-name" className="sr-only">Your name</label>
            <input
              id="managed-name"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500"
              placeholder="Your name *"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
            <label htmlFor="managed-email" className="sr-only">Email address</label>
            <input
              id="managed-email"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500"
              placeholder="Email address *"
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
            <label htmlFor="managed-business" className="sr-only">Business name (optional)</label>
            <input
              id="managed-business"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500"
              placeholder="Business name (optional)"
              value={form.businessName}
              onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))}
            />
            <label htmlFor="managed-domain" className="sr-only">Domain, if you have one (optional)</label>
            <input
              id="managed-domain"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500"
              placeholder="Domain, if you have one (optional)"
              value={form.domain}
              onChange={e => setForm(f => ({ ...f, domain: e.target.value }))}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={status === 'loading' || !form.name || !form.email}
            className="w-full mt-5 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-sky-600 hover:bg-sky-500 disabled:opacity-60 transition-colors text-white"
          >
            {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
            {status === 'loading' ? 'Starting checkout...' : 'Start My Website'}
          </button>
          {status === 'error' && (
            <p className="text-red-400 text-xs text-center mt-3">
              {error || "We couldn't start checkout — please try again."}
            </p>
          )}
          <p className="text-xs text-slate-500 text-center mt-3">
            No upfront build fee. Billing starts today at $99/month for an initial 6-month term,
            then month-to-month with 30 days' notice to cancel.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
