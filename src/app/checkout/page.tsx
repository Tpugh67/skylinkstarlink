'use client'
import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock } from 'lucide-react'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import { getPackage } from '@/lib/packages'

function CheckoutInner() {
  const router = useRouter()
  const params = useSearchParams()
  const pkg = getPackage(params.get('package'))

  if (!pkg) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold mb-3">Package not found</h1>
        <p className="text-slate-400 mb-6">Please choose a package to continue.</p>
        <a href="/start" className="text-sky-500 hover:text-sky-400 font-semibold">Back to packages</a>
      </div>
    )
  }

  function handlePay() {
    // TODO: replace with a real Stripe Checkout Session created server-side.
    // This currently simulates a successful payment for UX purposes only —
    // it does not charge anyone. Do not link this page publicly until wired up.
    router.push(`/checkout/success?package=${params.get('package')}`)
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
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-sky-600 hover:bg-sky-500 transition-colors text-white"
      >
        <Lock size={16} />
        Pay {pkg.priceLabel} Securely
      </button>
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