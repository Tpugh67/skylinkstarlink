'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowRight } from 'lucide-react'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import { getPackage } from '@/lib/packages'

function SuccessInner() {
  const params = useSearchParams()
  const pkg = getPackage(params.get('package'))
  const packageKey = params.get('package') || ''

  return (
    <div className="max-w-lg mx-auto px-6 py-24 text-center">
      <CheckCircle size={56} className="text-green-400 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-3">Your order is confirmed.</h1>
      <p className="text-slate-400 mb-8">
        {pkg ? `Thanks for purchasing ${pkg.name}. ` : 'Thanks for your order. '}
        A confirmation email is on its way. Next, answer a few quick questions so we can start
        building right away.
      </p>
      <a
        href={`/onboarding?package=${packageKey}`}
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
