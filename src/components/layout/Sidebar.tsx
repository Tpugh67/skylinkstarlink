'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Avatar } from '@/components/ui'
import {
  LayoutDashboard, Filter, FileText, CreditCard, Users,
  MessageCircle, Settings, Globe, ChevronDown
} from 'lucide-react'
import clsx from 'clsx'
import { useState } from 'react'

const NAV = [
  { href: '/dashboard',  label: 'Dashboard',  icon: LayoutDashboard, module: 'dashboard'  },
  { href: '/leads',      label: 'Leads',       icon: Filter,          module: 'leads'      },
  { href: '/proposals',  label: 'Proposals',   icon: FileText,        module: 'proposals'  },
  { href: '/payments',   label: 'Payments',    icon: CreditCard,      module: 'payments'   },
  { href: '/team',       label: 'Team',        icon: Users,           module: 'team'       },
  { href: '/comms',      label: 'Comms',       icon: MessageCircle,   module: 'comms'      },
  { href: '/settings',   label: 'Settings',    icon: Settings,        module: 'settings'   },
]

export default function BackOfficeSidebar() {
  const pathname = usePathname()
  const { user, login, logout, can, mockUsers } = useAuth()
  const [showSwitcher, setShowSwitcher] = useState(false)

  return (
    <aside className="w-56 flex-shrink-0 bg-slate-950 text-white flex flex-col min-h-screen">
      {/* Brand */}
      <div className="px-4 py-5 border-b border-slate-800">
        <div className="text-sm font-bold tracking-wide text-white">SkyLinkStarLink</div>
        <div className="text-xs text-slate-400 mt-0.5">Back Office</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5">
        {NAV.map(({ href, label, icon: Icon, module }) => {
          if (!can(module)) return null
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all',
                active
                  ? 'bg-sky-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              )}
            >
              <Icon size={15} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Public site link */}
      <div className="px-2 py-2 border-t border-slate-800">
        <Link href="/" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          <Globe size={15} />
          Public site
        </Link>
      </div>

      {/* User switcher (demo) */}
      <div className="px-3 py-3 border-t border-slate-800 relative">
        <button
          onClick={() => setShowSwitcher(v => !v)}
          className="w-full flex items-center gap-2.5 hover:bg-slate-800 rounded-lg px-1 py-1.5 transition-all"
        >
          <Avatar initials={user?.initials ?? '?'} color="blue" size="sm" />
          <div className="flex-1 text-left min-w-0">
            <div className="text-xs font-medium text-white truncate">{user?.name}</div>
            <div className="text-xs text-slate-500 capitalize">{user?.role}</div>
          </div>
          <ChevronDown size={12} className="text-slate-500" />
        </button>

        {showSwitcher && (
          <div className="absolute bottom-14 left-3 right-3 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-xl z-50">
            <div className="px-3 py-2 text-xs text-slate-400 font-medium border-b border-slate-700">Switch role (demo)</div>
            {mockUsers.map(u => (
              <button
                key={u.id}
                onClick={() => { login(u.id); setShowSwitcher(false) }}
                className={clsx(
                  'w-full text-left flex items-center gap-2 px-3 py-2 text-xs transition-all hover:bg-slate-700',
                  u.id === user?.id ? 'text-sky-400' : 'text-slate-300'
                )}
              >
                <span className="font-medium w-28 truncate">{u.name}</span>
                <span className="text-slate-500 capitalize">{u.role}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}
