'use client'
import { Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, Mail, Users, LayoutDashboard } from 'lucide-react'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import { getPackage } from '@/lib/packages'

function CompleteInner() {
  const params = useSearchParams()
  const pkg = getPackage(params.get('package'))

  // TODO: replace with the real project number returned when the project
  // row is created in Supabase. This is a placeholder for UX purposes.
  const projectNumber = useMemo(() => `SL-${Math.floor(1000 + Math.random() * 9000)}`, [])

  return (
    <div className="max-w-lg mx-auto px-6 py-24 text-center">
      <CheckCircle2 size={56} className="text-green-400 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-2">Project Created!</h1>
      <p className="text-slate-400 mb-1">Project #{projectNumber}</p>
      {pkg && <p className="text-slate-400 mb-8">{pkg.name}</p>}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left space-y-4 mb-8">
        <div className="flex items-start gap-3">
          <Users size={18} className="text-sky-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-slate-300">Our team has been notified and will begin reviewing your project details.</p>
        </div>
        <div className="flex items-start gap-3">
          <Mail size={18} className="text-sky-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-slate-300">A confirmation email with your project details is on its way.</p>
        </div>
      </div>

      <a
        href="/dashboard"
        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold bg-sky-600 hover:bg-sky-500 transition-colors text-white"
      >
        <LayoutDashboard size={18} />
        Open Client Portal
      </a>
    </div>
  )
}

export default function OnboardingCompletePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteNav />
      <Suspense fallback={null}>
        <CompleteInner />
      </Suspense>
      <SiteFooter />
    </div>
  )
}
