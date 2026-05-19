'use client'
import { useState, useEffect, useCallback } from 'react'
import { Card, CardHeader, Badge, Button, MetricCard } from '@/components/ui'
import { Plus, RefreshCw, Wifi } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Lead = {
  id: string
  created_at: string
  name: string
  email: string
  phone?: string
  source?: string
  service?: string
  message?: string
  status: string
  assigned_to?: string
  value?: number
}

const STATUSES = ['all', 'new', 'contacted', 'proposal-sent', 'closed-won']

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [live, setLive] = useState(false)

  const fetchLeads = useCallback(async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) {
      setLeads(data)
      setLastUpdated(new Date())
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchLeads()

    // Real-time subscription
    const channel = supabase
      .channel('leads-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        fetchLeads()
      })
      .subscribe((status) => {
        setLive(status === 'SUBSCRIBED')
      })

    return () => { supabase.removeChannel(channel) }
  }, [fetchLeads])

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)

  const pipeline = [
    { label: 'New',           status: 'new',           count: leads.filter(l=>l.status==='new').length },
    { label: 'Contacted',     status: 'contacted',      count: leads.filter(l=>l.status==='contacted').length },
    { label: 'Proposal sent', status: 'proposal-sent',  count: leads.filter(l=>l.status==='proposal-sent').length },
    { label: 'Closed won',    status: 'closed-won',     count: leads.filter(l=>l.status==='closed-won').length },
  ]

  const sources = leads.reduce((acc, l) => {
    const src = l.source || 'unknown'
    acc[src] = (acc[src] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const maxSource = Math.max(...Object.values(sources), 1)

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Lead management</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-sm text-slate-500">Real-time inbound opportunities</p>
            <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${live ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
              <Wifi size={10} /> {live ? 'Live' : 'Connecting...'}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="default" onClick={fetchLeads}><RefreshCw size={14} /> Refresh</Button>
          <Button variant="primary"><Plus size={14} /> Add lead</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <MetricCard label="Total leads"    value={loading ? '...' : String(leads.length)} />
        <MetricCard label="New"            value={loading ? '...' : String(leads.filter(l=>l.status==='new').length)} sub="awaiting contact" />
        <MetricCard label="This week"      value={loading ? '...' : String(leads.filter(l => new Date(l.created_at) > new Date(Date.now() - 7*24*60*60*1000)).length)} sub="new leads" />
        <MetricCard label="Last updated"   value={lastUpdated ? lastUpdated.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) : '—'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="col-span-2">
          <CardHeader
            title="All leads"
            action={
              <div className="flex gap-1.5 flex-wrap">
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
            {loading ? (
              <div className="p-8 text-center text-sm text-slate-400">Loading leads...</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-400">
                {leads.length === 0 ? 'No leads yet. Submit the contact form to see them appear here instantly!' : 'No leads match this filter.'}
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-500 border-b border-slate-100">
                    <th className="text-left px-5 py-3 font-medium">Name</th>
                    <th className="text-left px-5 py-3 font-medium">Source</th>
                    <th className="text-left px-5 py-3 font-medium">Service</th>
                    <th className="text-left px-5 py-3 font-medium">Status</th>
                    <th className="text-left px-5 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map(l => (
                    <tr key={l.id} className="hover:bg-slate-50 cursor-pointer transition-colors">
                      <td className="px-5 py-3">
                        <div className="font-medium text-slate-900">{l.name}</div>
                        <div className="text-xs text-slate-400">{l.email}</div>
                      </td>
                      <td className="px-5 py-3 text-slate-500 capitalize">{l.source || '—'}</td>
                      <td className="px-5 py-3 text-slate-500">{l.service || '—'}</td>
                      <td className="px-5 py-3"><Badge status={l.status} /></td>
                      <td className="px-5 py-3 text-slate-400 text-xs">{new Date(l.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
              {Object.keys(sources).length === 0 ? (
                <p className="text-xs text-slate-400">No data yet</p>
              ) : Object.entries(sources).map(([name, count]) => (
                <div key={name} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span className="capitalize">{name}</span><span>{count}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: `${(count/maxSource)*100}%` }} />
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
