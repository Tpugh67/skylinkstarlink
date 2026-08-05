import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 px-8 py-6 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} SkyLinkStarLink. All rights reserved. ·{' '}
      <Link href="/privacy" className="hover:text-slate-300 underline">
        Privacy Policy
      </Link>
    </footer>
  )
}
