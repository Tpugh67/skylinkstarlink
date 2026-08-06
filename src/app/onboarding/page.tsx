'use client'
import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Upload, X } from 'lucide-react'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'

type Answers = {
  businessName: string
  industry: string
  existingWebsite: string
  domainOwned: string
  hosting: string
  brandColors: string
  fonts: string
  aboutUs: string
  services: string
  products: string
  contactInfo: string
  socialMedia: string
  features: string[]
  citiesServed: string
  targetKeywords: string
  competitors: string
  anythingElse: string
}

const EMPTY_ANSWERS: Answers = {
  businessName: '', industry: '', existingWebsite: '', domainOwned: '', hosting: '',
  brandColors: '', fonts: '', aboutUs: '', services: '', products: '', contactInfo: '',
  socialMedia: '', features: [], citiesServed: '', targetKeywords: '', competitors: '', anythingElse: '',
}

const FEATURE_OPTIONS = ['Contact form', 'Booking', 'Blog', 'E-commerce', 'CRM integration', 'Live chat']

const STEPS = ['Business', 'Branding', 'Content', 'Features', 'SEO', 'Files']

function inputClass() {
  return 'w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500'
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function FileList({ files, onRemove }: { files: File[]; onRemove: (i: number) => void }) {
  if (files.length === 0) return null
  return (
    <ul className="mt-2 space-y-1">
      {files.map((f, i) => (
        <li key={`${f.name}-${i}`} className="flex items-center justify-between text-xs text-slate-400 bg-slate-800/60 rounded-lg px-3 py-1.5">
          <span className="truncate">{f.name}</span>
          <button type="button" onClick={() => onRemove(i)} className="text-slate-500 hover:text-white ml-2">
            <X size={14} />
          </button>
        </li>
      ))}
    </ul>
  )
}

function OnboardingInner() {
  const router = useRouter()
  const params = useSearchParams()
  const packageKey = params.get('package') || ''

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS)
  const [logo, setLogo] = useState<File[]>([])
  const [photos, setPhotos] = useState<File[]>([])
  const [otherFiles, setOtherFiles] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers(a => ({ ...a, [key]: value }))
  }

  function toggleFeature(f: string) {
    setAnswers(a => ({
      ...a,
      features: a.features.includes(f) ? a.features.filter(x => x !== f) : [...a.features, f],
    }))
  }

  function addFiles(list: FileList | null, setter: (fn: (prev: File[]) => File[]) => void) {
    if (!list) return
    setter(prev => [...prev, ...Array.from(list)])
  }

  async function handleSubmit() {
    setSubmitting(true)
    // TODO: replace with a real API call that saves answers + uploads files to
    // Supabase Storage and creates the project record. For now this just
    // simulates the "create project" step so the full UX flow can be tested.
    await new Promise(r => setTimeout(r, 800))
    router.push(`/onboarding/complete?package=${packageKey}`)
  }

  const isLast = step === STEPS.length - 1

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <h1 className="text-2xl font-bold mb-1">Project Questionnaire</h1>
      <p className="text-slate-400 mb-8">
        A few quick questions so we can get started with almost no back-and-forth.
      </p>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1">
            <div className={`h-1.5 rounded-full ${i <= step ? 'bg-sky-500' : 'bg-slate-800'}`} />
            <p className={`text-[11px] mt-1.5 ${i === step ? 'text-white' : 'text-slate-500'}`}>{s}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
        {step === 0 && (
          <>
            <Field label="Business name">
              <input className={inputClass()} value={answers.businessName} onChange={e => set('businessName', e.target.value)} />
            </Field>
            <Field label="Industry">
              <input className={inputClass()} value={answers.industry} onChange={e => set('industry', e.target.value)} />
            </Field>
            <Field label="Existing website (if any)">
              <input className={inputClass()} placeholder="https://" value={answers.existingWebsite} onChange={e => set('existingWebsite', e.target.value)} />
            </Field>
            <Field label="Do you own a domain?">
              <select className={inputClass()} value={answers.domainOwned} onChange={e => set('domainOwned', e.target.value)}>
                <option value="">Select...</option>
                <option value="yes">Yes, I own one</option>
                <option value="no">No, I need help getting one</option>
                <option value="not-sure">Not sure</option>
              </select>
            </Field>
            <Field label="Do you have hosting?">
              <select className={inputClass()} value={answers.hosting} onChange={e => set('hosting', e.target.value)}>
                <option value="">Select...</option>
                <option value="yes">Yes, I have hosting</option>
                <option value="no">No, I need hosting</option>
                <option value="not-sure">Not sure</option>
              </select>
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <Field label="Upload logo">
              <label className="flex items-center justify-center gap-2 border border-dashed border-slate-700 rounded-lg py-6 cursor-pointer text-sm text-slate-400 hover:border-sky-500 hover:text-sky-400 transition-colors">
                <Upload size={16} /> Click to upload logo
                <input type="file" accept="image/*" className="hidden" onChange={e => addFiles(e.target.files, setLogo)} />
              </label>
              <FileList files={logo} onRemove={i => setLogo(f => f.filter((_, idx) => idx !== i))} />
            </Field>
            <Field label="Upload photos">
              <label className="flex items-center justify-center gap-2 border border-dashed border-slate-700 rounded-lg py-6 cursor-pointer text-sm text-slate-400 hover:border-sky-500 hover:text-sky-400 transition-colors">
                <Upload size={16} /> Click to upload photos
                <input type="file" accept="image/*" multiple className="hidden" onChange={e => addFiles(e.target.files, setPhotos)} />
              </label>
              <FileList files={photos} onRemove={i => setPhotos(f => f.filter((_, idx) => idx !== i))} />
            </Field>
            <Field label="Brand colors (if you have them)">
              <input className={inputClass()} placeholder="e.g. #0EA5E9, #1E293B" value={answers.brandColors} onChange={e => set('brandColors', e.target.value)} />
            </Field>
            <Field label="Fonts (if you have preferences)">
              <input className={inputClass()} value={answers.fonts} onChange={e => set('fonts', e.target.value)} />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field label="About Us">
              <textarea rows={3} className={inputClass()} value={answers.aboutUs} onChange={e => set('aboutUs', e.target.value)} />
            </Field>
            <Field label="Services">
              <textarea rows={3} className={inputClass()} value={answers.services} onChange={e => set('services', e.target.value)} />
            </Field>
            <Field label="Products (if applicable)">
              <textarea rows={2} className={inputClass()} value={answers.products} onChange={e => set('products', e.target.value)} />
            </Field>
            <Field label="Contact information">
              <textarea rows={2} className={inputClass()} placeholder="Phone, email, address..." value={answers.contactInfo} onChange={e => set('contactInfo', e.target.value)} />
            </Field>
            <Field label="Social media links">
              <textarea rows={2} className={inputClass()} value={answers.socialMedia} onChange={e => set('socialMedia', e.target.value)} />
            </Field>
          </>
        )}

        {step === 3 && (
          <Field label="Which features do you need?">
            <div className="grid grid-cols-2 gap-2">
              {FEATURE_OPTIONS.map(f => (
                <label key={f} className="flex items-center gap-2 text-sm text-slate-300 bg-slate-800/60 rounded-lg px-3 py-2.5 cursor-pointer">
                  <input type="checkbox" checked={answers.features.includes(f)} onChange={() => toggleFeature(f)} className="accent-sky-500" />
                  {f}
                </label>
              ))}
            </div>
          </Field>
        )}

        {step === 4 && (
          <>
            <Field label="Cities/areas you serve">
              <input className={inputClass()} value={answers.citiesServed} onChange={e => set('citiesServed', e.target.value)} />
            </Field>
            <Field label="Target keywords">
              <textarea rows={2} className={inputClass()} value={answers.targetKeywords} onChange={e => set('targetKeywords', e.target.value)} />
            </Field>
            <Field label="Competitors">
              <textarea rows={2} className={inputClass()} value={answers.competitors} onChange={e => set('competitors', e.target.value)} />
            </Field>
          </>
        )}

        {step === 5 && (
          <>
            <Field label="Files (PDFs, images, videos, documents)">
              <label className="flex items-center justify-center gap-2 border border-dashed border-slate-700 rounded-lg py-6 cursor-pointer text-sm text-slate-400 hover:border-sky-500 hover:text-sky-400 transition-colors">
                <Upload size={16} /> Click to upload files
                <input type="file" multiple className="hidden" onChange={e => addFiles(e.target.files, setOtherFiles)} />
              </label>
              <FileList files={otherFiles} onRemove={i => setOtherFiles(f => f.filter((_, idx) => idx !== i))} />
            </Field>
            <Field label="Anything else we should know?">
              <textarea rows={3} className={inputClass()} value={answers.anythingElse} onChange={e => set('anythingElse', e.target.value)} />
            </Field>
          </>
        )}
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-medium text-slate-300 disabled:opacity-0 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        {isLast ? (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-lg font-semibold bg-sky-600 hover:bg-sky-500 disabled:opacity-60 transition-colors text-white"
          >
            {submitting ? 'Creating your project...' : 'Create My Project'}
          </button>
        ) : (
          <button
            onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-lg font-semibold bg-sky-600 hover:bg-sky-500 transition-colors text-white"
          >
            Next <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteNav />
      <Suspense fallback={null}>
        <OnboardingInner />
      </Suspense>
      <SiteFooter />
    </div>
  )
}
