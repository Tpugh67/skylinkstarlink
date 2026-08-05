import Link from 'next/link'

type NavItem = 'services' | 'portfolio' | 'contact' | 'website-design'

export default function SiteNav({ current }: { current?: NavItem }) {
  const linkClass = 'hover:text-white transition-colors'
  const activeClass = 'text-white'

  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
      <Link href="/" className="text-lg font-bold tracking-tight">
        SkyLink<span className="text-sky-400">StarLink</span>
      </Link>
      <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
        {current === 'services' ? (
          <span className={activeClass}>Services</span>
        ) : (
          <Link href="/#services" className={linkClass}>Services</Link>
        )}
        {current === 'portfolio' ? (
          <span className={activeClass}>Portfolio</span>
        ) : (
          <Link href="/#portfolio" className={linkClass}>Portfolio</Link>
        )}
        {current === 'website-design' ? (
          <span className={activeClass}>Website Design</span>
        ) : (
          <Link href="/website-design" className={linkClass}>Website Design</Link>
        )}
        {current === 'contact' ? (
          <span className={activeClass}>Contact</span>
        ) : (
          <Link href="/#contact" className={linkClass}>Contact</Link>
        )}
      </div>
      <Link
        href="/login"
        className="text-xs px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 transition-colors font-medium"
      >
        Team login →
      </Link>
    </nav>
  )
}
