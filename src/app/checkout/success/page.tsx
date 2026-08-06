'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowRight, Loader2, AlertTriangle } from 'lucide-react'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import { getPackage } from '@/lib/packages'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

function SuccessInner() {
  const params = useSearchParams()
  const pkg = getPackage(params.get('package'))
  const packageKey = params.get('package') || ''
  const sessionId = params.get('session_id')

  const [status, setStatus] = useState<'checking' | 'paid' | 'unverified'>('checking')

  useEffect(() => {
    if (!sessionId) {
      setStatus('unverified')
      return
    }

    fetch(`/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}`)
      .then(res => res.json())
      .then(data => {
        if (data.paid) {
          setStatus('paid')

          // Fire Google Ads conversion once per session_id (avoids double-count on refresh/back button)
          const firedKey = `ga_conversion_fired_${sessionId}`
          const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
          const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL
          if (
            typeof window !== 'undefined' &&
            window.gtag &&
            adsId &&
            conversionLabel &&
            !sessionStorage.getItem(firedKey)
          ) {
            window.gtag('event', 'conversion', {
              send_to: `${adsId}/${conversionLabel}`,
              value: data.amountTotal,
              currency: (data.currency || 'usd').toUpperCase(),
              transaction_id: sessionId,
            })
            sessionStorage.setItem(firedKey, '1')
          }
        } else {
          setStatus('unverified')
        }
      })
      .catch(() => setStatus('unverified'))
  }, [sessionId])

  if (status === 'checking') {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <Loader2 size={40} className="text-sky-500 mx-auto mb-6 animate-spin" />
        <p className="text-slate-400">Confirming your payment...</p>
      </div>
    )
  }

  if (status === 'unverified') {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <AlertTriangle size={48} className="text-amber-400 mx-auto mb-6" />
        <h1 className="text-2xl font-bold mb-3">We couldn't verify this order.</h1>
        <p className="text-slate-400 mb-8">
          If you just paid, check your email for a receipt and contact us and we'll sort it out.
          If you haven't paid yet, head back to choose a package.
        </p>
        
          <a href="/start"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold bg-sky-600 hover:bg-sky-500 transition-colors text-white"
        >
          Back to Packages
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-24 text-center">
      <CheckCircle size={56} className="text-green-400 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-3">Your order is confirmed.</h1>
      <p className="text-slate-400 mb-8">
        {pkg ? `Thanks for purchasing ${pkg.name}. ` : 'Thanks for your order. '}
        A confirmation email is on its way. Next, answer a few quick questions so we can start
        building right away.
      </p>
      
        <a href={`/onboarding?package=${packageKey}`}
        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold bg-sky-600 hover:bg-sky-500 transition-colors text-white"
      >
        Start Project Questionnaire
        <ArrowRight size={18} />
      </a>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteNav />
      <Suspense fallback={null}>
        <SuccessInner />
      </Suspense>
      <SiteFooter />
    </div>
  )
}