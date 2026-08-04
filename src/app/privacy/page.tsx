import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | SkyLinkStarLink',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
        <Link href="/" className="text-lg font-bold tracking-tight">
          SkyLink<span className="text-sky-400">StarLink</span>
        </Link>
        <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">← Back home</Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-10">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-10 text-sm text-amber-200">
          This is a starting template covering standard practices. Review it with a legal
          professional before relying on it, especially if you collect additional data types
          or operate in jurisdictions with specific requirements (e.g. GDPR, CCPA).
        </div>

        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Information We Collect</h2>
            <p>When you use our contact form, request a custom quote, or purchase a website
            package, we collect the information you provide directly — such as your name,
            email address, business name, and project details. When you make a purchase, payment
            is processed by Stripe; we do not store your full card details on our servers.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">How We Use Your Information</h2>
            <p>We use the information you provide to respond to inquiries, deliver purchased
            services, process payments, and communicate with you about your project. We do not
            sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Cookies & Analytics</h2>
            <p>We may use Google Analytics and Google Ads tools to understand how visitors use
            our site and to measure the effectiveness of our advertising. These services may use
            cookies or similar technologies to collect anonymized usage data. You can control
            cookies through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Third-Party Services</h2>
            <p>We use third-party services to operate our business, including Stripe (payment
            processing), Supabase (data storage), and Netlify (website hosting). Each of these
            providers has its own privacy practices governing the data they process on our behalf.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Data Retention</h2>
            <p>We retain information you provide for as long as needed to deliver our services,
            respond to your inquiries, and comply with legal obligations.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal information
            by contacting us using the information below.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Contact Us</h2>
            <p>Questions about this policy can be directed to us through our
            <Link href="/#contact" className="text-sky-400 hover:underline"> contact form</Link>.</p>
          </section>
        </div>
      </div>

      <footer className="border-t border-slate-800 px-8 py-6 text-center text-xs text-slate-500">
        © 2026 SkyLinkStarLink. All rights reserved.
      </footer>
    </div>
  )
}
