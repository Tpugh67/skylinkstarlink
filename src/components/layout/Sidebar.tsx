'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Avatar } from '@/components/ui'
import {
  LayoutDashboard, Filter, FileText, CreditCard, Users,
  MessageCircle, Settings, Globe, ChevronDown, LogOut
} from 'lucide-react'
import clsx from 'clsx'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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
  const { user, can } = useAuth()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <aside className="w-56 flex-shrink-0 bg-slate-950 text-white flex flex-col min-h-screen">
      <div className="px-4 py-5 border-b border-slate-800">
        <div className="text-sm font-bold tracking-wide text-white">SkyLinkStarLink</div>
        <div className="text-xs text-slate-400 mt-0.5">Back Office</div>
      </div>

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

      <div className="px-2 py-2 border-t border-slate-800">
        <Link href="/" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          <Globe size={15} />
          Public site
        </Link>
      </div>

      <div className="px-3 py-3 border-t border-slate-800 relative">
        <button
          onClick={() => setShowMenu(v => !v)}
          className="w-full flex items-center gap-2.5 hover:bg-slate-800 rounded-lg px-1 py-1.5 transition-all"
        >
          <Avatar initials={user?.initials ?? '?'} color="blue" size="sm" />
          <div className="flex-1 text-left min-w-0">
            <div className="text-xs font-medium text-white truncate">{user?.name}</div>
            <div className="text-xs text-slate-500 capitalize">{user?.role}</div>
          </div>
          <ChevronDown size={12} className="text-slate-500" />
        </button>

        {showMenu && (
          <div className="absolute bottom-14 left-3 right-3 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-xl z-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-3 text-sm text-red-400 hover:bg-slate-700 transition-all"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
