import clsx from 'clsx'

// Badge
const badgeMap: Record<string, string> = {
  new:          'bg-blue-50 text-blue-700',
  contacted:    'bg-amber-50 text-amber-700',
  'proposal-sent': 'bg-indigo-50 text-indigo-700',
  'closed-won': 'bg-green-50 text-green-700',
  'closed-lost':'bg-red-50 text-red-700',
  sent:         'bg-blue-50 text-blue-700',
  awaiting:     'bg-amber-50 text-amber-700',
  accepted:     'bg-green-50 text-green-700',
  draft:        'bg-slate-100 text-slate-600',
  active:       'bg-green-50 text-green-700',
  received:     'bg-green-50 text-green-700',
  paid:         'bg-green-50 text-green-700',
  pending:      'bg-amber-50 text-amber-700',
  invoiced:     'bg-blue-50 text-blue-700',
  connected:    'bg-green-50 text-green-700',
  founder:      'bg-sky-100 text-sky-800',
  sales:        'bg-green-50 text-green-700',
  developer:    'bg-amber-50 text-amber-700',
  crm:          'bg-purple-50 text-purple-700',
  designer:     'bg-pink-50 text-pink-700',
  va:           'bg-slate-100 text-slate-600',
}

export function Badge({ status, label }: { status: string; label?: string }) {
  return (
    <span className={clsx('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', badgeMap[status] ?? 'bg-slate-100 text-slate-600')}>
      {label ?? status.replace('-', ' ')}
    </span>
  )
}

// Avatar
const avatarColors: Record<string, string> = {
  blue:   'bg-blue-100 text-blue-700',
  green:  'bg-green-100 text-green-700',
  amber:  'bg-amber-100 text-amber-700',
  purple: 'bg-purple-100 text-purple-700',
  pink:   'bg-pink-100 text-pink-700',
  slate:  'bg-slate-100 text-slate-600',
}

export function Avatar({ initials, color = 'blue', size = 'md' }: { initials: string; color?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'sm' ? 'w-7 h-7 text-xs' : size === 'lg' ? 'w-10 h-10 text-sm' : 'w-8 h-8 text-xs'
  return (
    <div className={clsx('rounded-full flex items-center justify-center font-semibold flex-shrink-0', sz, avatarColors[color] ?? avatarColors.blue)}>
      {initials}
    </div>
  )
}

// Button
export function Button({ children, variant = 'default', onClick, className, disabled }: {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'ghost'
  onClick?: () => void
  className?: string
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
        variant === 'primary' && 'bg-sky-600 text-white hover:bg-sky-700 active:scale-[0.98]',
        variant === 'default' && 'border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-[0.98]',
        variant === 'ghost'   && 'text-slate-500 hover:text-slate-700 hover:bg-slate-100',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  )
}

// Card
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('bg-white border border-slate-200 rounded-xl', className)}>
      {children}
    </div>
  )
}

// Metric Card
export function MetricCard({ label, value, sub, color = 'default' }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  )
}

// Section header inside a card
export function CardHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      {action}
    </div>
  )
}
