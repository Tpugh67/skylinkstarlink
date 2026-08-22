import type { Metadata } from 'next'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'

export const metadata: Metadata = {
  title: 'Terms of Service | SkyLinkStarLink',
  description: 'The terms governing SkyLinkStarLink website purchases and managed website subscriptions.',
  alternates: {
    canonical: 'https://skylinkstarlink.com/terms',
  },
}

export default function TermsPage() {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteNav />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-10">Last updated: {today}</p>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-10 text-sm text-amber-200 space-y-2">
          <p>
            <strong>This is a draft, not a finished legal document.</strong> It covers the general
            shape of both service offerings honestly, but the specific numbers and clauses marked{' '}
            <code className="bg-amber-500/20 px-1 rounded">[TBD]</code> below have been deliberately
            left unfilled — they were not invented, per your instruction, and need your decisions
            plus review by a licensed attorney before this page is relied upon or published live.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">1. Overview</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            These Terms govern two distinct offerings from SkyLinkStarLink ("we," "us," "our"):
            (a) one-time website purchase packages, where the completed website becomes the
            customer's outright property upon full payment, and (b) the Managed Website plan,
            described in Section 3 below, where SkyLinkStarLink retains ownership of the website
            design and code for as long as the customer remains subscribed.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">2. One-Time Website Purchases</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            For customers purchasing a fixed-price website package (e.g. the 5-Page or 10-Page
            packages), full payment transfers ownership of the completed website design and code
            to the customer upon project delivery. SkyLinkStarLink retains no ongoing ownership
            claim over one-time purchases.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Hosting, maintenance, and ongoing support for one-time purchases are not included
            unless separately purchased, and are billed and governed independently of this
            Section.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">3. Managed Website Plan</h2>

          <h3 className="font-semibold text-white mb-2 mt-5">3.1 What's Included</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            For a monthly subscription fee, SkyLinkStarLink will design, build, host, and maintain
            a website for the customer's business at $0 upfront. This includes ongoing hosting,
            routine maintenance, security updates, and uptime monitoring for the duration of the
            subscription.
          </p>

          <h3 className="font-semibold text-white mb-2 mt-5">3.2 Ownership During the Subscription</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            While the Managed Website plan is active, SkyLinkStarLink owns the website design and
            underlying code created for the customer under this plan. The customer receives a
            license to use the website for their business for as long as the subscription remains
            active and in good standing, but does not own the design or code itself during this
            period.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Notwithstanding the above, the customer retains full ownership at all times of:
          </p>
          <ul className="text-slate-300 text-sm leading-relaxed list-disc pl-5 mt-2 space-y-1">
            <li>Their domain name</li>
            <li>Their business or trade name</li>
            <li>Their logo and trademarks</li>
            <li>Their customer data</li>
            <li>Original photos, copy, and other content they supply</li>
          </ul>

          <h3 className="font-semibold text-white mb-2 mt-5">3.3 Cancellation</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            The customer may cancel the Managed Website plan at any time, subject to:
            a minimum initial subscription term of <code className="bg-slate-800 px-1 rounded text-amber-300">[TBD]</code>,
            and a cancellation notice period of <code className="bg-slate-800 px-1 rounded text-amber-300">[TBD]</code>.
            Upon cancellation, hosting and maintenance services will end, and the website will be
            taken offline unless the customer completes a buyout under Section 3.4 or transitions
            to a one-time purchase arrangement.
          </p>

          <h3 className="font-semibold text-white mb-2 mt-5">3.4 Buyout / Ownership Transfer</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            The customer may, at any time, purchase full ownership of the website design and code
            for a one-time buyout fee, calculated as{' '}
            <code className="bg-slate-800 px-1 rounded text-amber-300">[TBD — buyout formula]</code>.
            Upon payment of the buyout fee, SkyLinkStarLink will transfer ownership of the design
            and code to the customer, and the Managed Website subscription will convert to a
            standard hosting/maintenance arrangement or terminate, at the customer's election.
          </p>

          <h3 className="font-semibold text-white mb-2 mt-5">3.5 Non-Payment</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            If a subscription payment fails and is not resolved within <code className="bg-slate-800 px-1 rounded text-amber-300">[TBD]</code> days,
            SkyLinkStarLink reserves the right to suspend hosting for the affected website until
            payment is resolved.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">4. Payments</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            All payments are processed securely through Stripe. SkyLinkStarLink does not store
            full payment card details. Managed Website subscriptions bill automatically on a
            monthly basis until cancelled in accordance with Section 3.3.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">5. Service Availability</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            While SkyLinkStarLink aims to keep Managed Websites online and performant at all
            times, we do not guarantee uninterrupted availability. Scheduled maintenance and
            unforeseen technical issues may result in temporary downtime.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">6. Limitation of Liability</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            To the maximum extent permitted by law, SkyLinkStarLink's total liability arising out
            of these Terms or the services provided shall not exceed the amount paid by the
            customer in the <code className="bg-slate-800 px-1 rounded text-amber-300">[TBD]</code> preceding
            the claim.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">7. Changes to These Terms</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            SkyLinkStarLink may update these Terms from time to time. Continued use of our
            services after changes take effect constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">8. Contact</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Questions about these Terms can be sent via our <a href="/#contact" className="text-sky-400 hover:text-sky-300 underline">contact form</a>.
          </p>
        </section>
      </div>

      <SiteFooter />
    </div>
  )
}
