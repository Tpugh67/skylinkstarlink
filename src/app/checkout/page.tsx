'use client'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Lock, Loader2 } from 'lucide-react'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import { getPackage } from '@/lib/packages'

function CheckoutInner() {
  const params = useSearchParams()
  const pkg = getPackage(params.get('package'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!pkg) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold mb-3">Package not found</h1>
        <p className="text-slate-400 mb-6">Please choose a package to continue.</p>
        <a href="/start" className="text-sky-500 hover:text-sky-400 font-semibold">Back to packages</a>
      </div>
    )
  }

  async function handlePay() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageKey: params.get('package') }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setError(data.error || 'Something went wrong starting checkout.')
        setLoading(false)
        return
      }
      window.location.href = data.url
    } catch {
      setError('Something went wrong starting checkout.')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-1">Checkout</h1>
      <p className="text-slate-400 mb-8">You're almost there.</p>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-300">{pkg.name}</span>
          <span className="font-semibold">{pkg.priceLabel}</span>
        </div>
        <div className="border-t border-slate-800 my-4" />
        <div className="flex items-center justify-between text-lg font-bold">
          <span>Total</span>
          <span>{pkg.priceLabel}</span>
        </div>
      </div>

      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-sky-600 hover:bg-sky-500 disabled:opacity-60 transition-colors text-white"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
        {loading ? 'Redirecting to secure payment...' : `Pay ${pkg.priceLabel} Securely`}
      </button>
      {error && <p className="text-sm text-red-400 text-center mt-3">{error}</p>}
      <p className="text-xs text-slate-500 text-center mt-3">Payments are processed securely by Stripe.</p>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteNav />
      <Suspense fallback={null}>
        <CheckoutInner />
      </Suspense>
      <SiteFooter />
    </div>
  )
}
