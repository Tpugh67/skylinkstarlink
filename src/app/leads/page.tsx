'use client'
import { useState } from 'react'
import { Card, CardHeader, Badge, Button, MetricCard } from '@/components/ui'
import { LEADS, SOURCES } from '@/lib/data'
import { Plus, Filter } from 'lucide-react'

const STATUSES = ['all', 'new', 'contacted', 'proposal-sent', 'closed-won']

export default function LeadsPage() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? LEADS : LEADS.filter(l => l.status === filter)
  const pipeline = [
    { label: 'New',           status: 'new',           count: LEADS.filter(l=>l.status==='new').length },
    { label: 'Contacted',     status: 'contacted',      count: LEADS.filter(l=>l.status==='contacted').length },
    { label: 'Proposal sent', status: 'proposal-sent',  count: LEADS.filter(l=>l.status==='proposal-sent').length },
    { label: 'Closed won',    status: 'closed-won',     count: LEADS.filter(l=>l.status==='closed-won').length },
  ]

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Lead management</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track inbound opportunities from all channels</p>
        </div>
        <Button variant="primary"><Plus size={14} /> Add lead</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <MetricCard label="Total leads"    value={String(LEADS.length)}  />
        <MetricCard label="New this week"  value="3" sub="Upwork, Fiverr, FB" />
        <MetricCard label="Pipeline value" value={`$${LEADS.reduce((s,l)=>s+l.value,0).toLocaleString()}`} />
        <MetricCard label="Close rate"     value="18%" sub="2 of 11 closed" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="col-span-2">
          <CardHeader
            title="All leads"
            action={
              <div className="flex gap-1.5">
                {STATUSES.map(s => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`text-xs px-2.5 py-1 rounded-full transition-all ${
                      filter === s ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {s === 'all' ? 'All' : s.replace('-', ' ')}
                  </button>
                ))}
              </div>
            }
          />
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
                {filtered.map(l => (
                  <tr key={l.id} className="hover:bg-slate-50 cursor-pointer transition-colors">
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

        <div className="space-y-4">
          <Card>
            <CardHeader title="Pipeline" />
            <div className="p-4 space-y-2">
              {pipeline.map(p => (
                <div key={p.status} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-700">{p.label}</span>
                  <Badge status={p.status} label={String(p.count)} />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Lead sources" />
            <div className="p-4 space-y-3">
              {SOURCES.map(s => (
                <div key={s.name} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>{s.name}</span><span>{s.count}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
