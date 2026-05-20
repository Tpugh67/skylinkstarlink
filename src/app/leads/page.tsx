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

const STATUSES = ['all', 'new', 'contacted', 'proposal-sent', 'closed-won', 'closed-lost']
const STATUS_FLOW = ['new', 'contacted', 'proposal-sent', 'closed-won']

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [live, setLive] = useState(false)
  const [updating, setUpdating] = useState<string | null>(null)
  const [selected, setSelected] = useState<Lead | null>(null)

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

  const updateStatus = async (lead: Lead, newStatus: string) => {
    setUpdating(lead.id)
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus })
      .eq('id', lead.id)
    if (!error) {
      setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: newStatus } : l))
      if (selected?.id === lead.id) setSelected({ ...lead, status: newStatus })
    }
    setUpdating(null)
  }

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
                    {s === 'all' ? 'All' : s.replace(/-/g, ' ')}
                  </button>
                ))}
              </div>
            }
          />
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-sm text-slate-400">Loading leads...</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-400">No leads yet.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-500 border-b border-slate-100">
                    <th className="text-left px-5 py-3 font-medium">Name</th>
                    <th className="text-left px-5 py-3 font-medium">Source</th>
                    <th className="text-left px-5 py-3 font-medium">Status</th>
                    <th className="text-left px-5 py-3 font-medium">Actions</th>
                    <th className="text-left px-5 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map(l => (
                    <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3">
                        <div className="font-medium text-slate-900 cursor-pointer hover:text-sky-600" onClick={() => setSelected(l)}>{l.name}</div>
                        <div className="text-xs text-slate-400">{l.email}</div>
                      </td>
                      <td className="px-5 py-3 text-slate-500 capitalize">{l.source || '—'}</td>
                      <td className="px-5 py-3"><Badge status={l.status} /></td>
                      <td className="px-5 py-3">
                        <select
                          value={l.status}
                          disabled={updating === l.id}
                          onChange={e => updateStatus(l, e.target.value)}
                          className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-700 cursor-pointer disabled:opacity-50"
                        >
                          {STATUS_FLOW.map(s => (
                            <option key={s} value={s}>{s.replace(/-/g, ' ')}</option>
                          ))}
                          <option value="closed-lost">closed lost</option>
                        </select>
                      </td>
                      <td className="px-5 py-3 text-slate-400 text-xs">{new Date(l.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>

        <div className="space-y-4">
          {selected && (
            <Card>
              <CardHeader title="Lead detail" action={<button onClick={() => setSelected(null)} className="text-xs text-slate-400 hover:text-slate-600">✕ Close</button>} />
              <div className="p-4 space-y-2 text-sm">
                <div><span className="text-slate-500">Name:</span> <span className="font-medium">{selected.name}</span></div>
                <div><span className="text-slate-500">Email:</span> <span>{selected.email}</span></div>
                <div><span className="text-slate-500">Source:</span> <span className="capitalize">{selected.source || '—'}</span></div>
                <div><span className="text-slate-500">Service:</span> <span>{selected.service || '—'}</span></div>
                <div><span className="text-slate-500">Status:</span> <Badge status={selected.status} /></div>
                {selected.message && <div><span className="text-slate-500">Message:</span><p className="text-slate-700 mt-1 text-xs">{selected.message}</p></div>}
                <div className="pt-2 space-y-1">
                  {STATUS_FLOW.map(s => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected, s)}
                      disabled={selected.status === s || updating === selected.id}
                      className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-all ${
                        selected.status === s
                          ? 'bg-sky-600 text-white font-medium'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      } disabled:opacity-50`}
                    >
                      {s.replace(/-/g, ' ')}
                    </button>
                  ))}
                  <button
                    onClick={() => updateStatus(selected, 'closed-lost')}
                    disabled={selected.status === 'closed-lost' || updating === selected.id}
                    className="w-full text-left text-xs px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50"
                  >
                    closed lost
                  </button>
                </div>
              </div>
            </Card>
          )}

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
