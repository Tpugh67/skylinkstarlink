'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

function ManagedSuccessInner() {
  const params = useSearchParams()
  const sessionId = params.get('session_id')
  const [status, setStatus] = useState<'checking' | 'confirmed' | 'error'>('checking')

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      return
    }
    // Subscription activation itself is confirmed via the Stripe webhook,
    // which writes to Supabase asynchronously. Here we confirm the checkout
    // session actually completed payment before showing success or firing
    // any conversion — a fetch that merely succeeds is not proof of payment.
    fetch(`/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}`)
      .then(res => res.json())
      .then(data => {
        if (data.paid) {
          setStatus('confirmed')

          // Fire the Managed Website signup conversion once per session_id,
          // using the real Stripe session ID as the transaction ID so
          // duplicate page loads (refresh, back button) can't double-count.
          const firedKey = `ga_managed_conversion_fired_${sessionId}`
          const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
          const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_MANAGED_CONVERSION_LABEL
          if (
            typeof window !== 'undefined' &&
            window.gtag &&
            adsId &&
            conversionLabel &&
            !sessionStorage.getItem(firedKey)
          ) {
            window.gtag('event', 'conversion', {
              send_to: `${adsId}/${conversionLabel}`,
              value: data.amountTotal ?? 99,
              currency: (data.currency || 'usd').toUpperCase(),
              transaction_id: sessionId,
            })
            sessionStorage.setItem(firedKey, '1')
          }
        } else {
          setStatus('error')
        }
      })
      .catch(() => setStatus('error'))
  }, [sessionId])

  if (status === 'checking') {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <Loader2 size={28} className="animate-spin text-sky-500 mx-auto mb-4" />
        <p className="text-slate-400">Confirming your subscription...</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold mb-3">We couldn't confirm that</h1>
        <p className="text-slate-400 mb-6">
          If you completed checkout, your subscription is likely still active — check your email
          for a receipt, or contact us if anything looks off.
        </p>
        <a href="/#contact" className="text-sky-500 hover:text-sky-400 font-semibold">Contact us →</a>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-6 py-24 text-center">
      <CheckCircle size={48} className="text-sky-500 mx-auto mb-6" />
      <h1 className="text-2xl font-bold mb-3">You're all set!</h1>
      <p className="text-slate-400 mb-8">
        Your managed website plan is active. Next, tell us about your business so we can start
        building.
      </p>
      <a
        href="/onboarding"
        className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 rounded-xl font-semibold transition-colors text-white"
      >
        Start Project Questionnaire <ArrowRight size={16} />
      </a>
    </div>
  )
}

export default function ManagedSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteNav />
      <Suspense fallback={null}>
        <ManagedSuccessInner />
      </Suspense>
      <SiteFooter />
    </div>
  )
}
