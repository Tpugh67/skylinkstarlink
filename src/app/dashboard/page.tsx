'use client'
import { MetricCard, Card, CardHeader, Badge, Avatar } from '@/components/ui'
import { TRANSACTIONS, LEADS } from '@/lib/data'
import { CheckCircle, UserPlus, DollarSign, Edit3, TrendingUp } from 'lucide-react'

const ACTIVITY = [
  { icon: CheckCircle, color: 'text-green-500', label: 'Proposal sent to Acme Corp',   sub: '2 hours ago · Sales',    },
  { icon: UserPlus,    color: 'text-sky-500',   label: 'New lead from Upwork',          sub: '5 hours ago · Lead gen', },
  { icon: DollarSign,  color: 'text-amber-500', label: 'Payment received $1,200',       sub: 'Yesterday · Finance',    },
  { icon: Edit3,       color: 'text-slate-400', label: 'Proposal template updated',     sub: 'Yesterday · Ops',        },
]

const TASKS = [
  { label: 'Follow up with Reyes Media',    due: 'Today',    urgency: 'amber' },
  { label: 'CRM setup — client onboard',    due: 'Fri',      urgency: 'blue'  },
  { label: 'Invoice contractor payouts',    due: 'Sat',      urgency: 'slate' },
  { label: 'Review Shopify proposal draft', due: 'Next wk',  urgency: 'slate' },
]

export default function DashboardPage() {
  const revenue = TRANSACTIONS.filter(t => t.direction === 'in' && t.status === 'received').reduce((s, t) => s + t.amount, 0)
  const openLeads = LEADS.filter(l => l.status !== 'closed-won').length

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Overview</h1>
        <p className="text-sm text-slate-500 mt-0.5">Welcome back, Terry. Here's what's happening.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <MetricCard label="Active leads"     value={String(openLeads)}  sub="+3 this week" />
        <MetricCard label="Open proposals"   value="6"                  sub="2 awaiting reply" />
        <MetricCard label="Revenue (MTD)"    value={`$${revenue.toLocaleString()}`} sub="↑ 12% vs last mo" />
        <MetricCard label="Team members"     value="6"                  sub="contractors" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader title="Recent activity" />
          <div className="divide-y divide-slate-50">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3">
                <a.icon size={15} className={`mt-0.5 flex-shrink-0 ${a.color}`} />
                <div>
                  <p className="text-sm text-slate-800">{a.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Upcoming tasks" />
          <div className="divide-y divide-slate-50">
            {TASKS.map((t, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3">
                <div className="w-4 h-4 rounded border border-slate-300 flex-shrink-0" />
                <span className="flex-1 text-sm text-slate-800">{t.label}</span>
                <Badge status={t.urgency} label={t.due} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Recent leads" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-100">
                <th className="text-left px-5 py-3 font-medium">Client</th>
                <th className="text-left px-5 py-3 font-medium">Source</th>
                <th className="text-left px-5 py-3 font-medium">Service</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-right px-5 py-3 font-medium">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {LEADS.slice(0, 5).map(l => (
                <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-900">{l.name}</td>
                  <td className="px-5 py-3 text-slate-500">{l.source}</td>
                  <td className="px-5 py-3 text-slate-500">{l.service}</td>
                  <td className="px-5 py-3"><Badge status={l.status} /></td>
                  <td className="px-5 py-3 text-right text-slate-700">${l.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
