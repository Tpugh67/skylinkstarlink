'use client'
import { Card, CardHeader, Badge, Button } from '@/components/ui'
import { Plus, Check, Clock, X } from 'lucide-react'

const NOTES = [
  { title: 'Bloom CRE onboarding',    body: 'Client confirmed CRM scope. Dev to start Monday.',              date: 'Today',    author: 'Terry'  },
  { title: 'Upwork proposal batch',   body: 'VA submitted 5 proposals. Follow up in 48 hours.',              date: 'May 17',   author: 'VA'     },
  { title: 'Shopify template ready',  body: 'New proposal template reviewed and approved by founder.',       date: 'May 16',   author: 'Sales'  },
  { title: 'Stark Solutions closed',  body: 'Project signed. Dev starts next week. Collect 50% deposit.',    date: 'May 14',   author: 'Terry'  },
]

const INTEGRATIONS = [
  { name: 'Slack',          desc: 'Team messaging',                   status: 'connected' },
  { name: 'PipeDesk CRM',   desc: 'Lead & pipeline sync',             status: 'connected' },
  { name: 'Discord',        desc: 'Community & dev team',             status: 'pending'   },
  { name: 'Gmail',          desc: 'Client communication',             status: 'inactive'  },
  { name: 'Upwork',         desc: 'Lead feed',                        status: 'inactive'  },
  { name: 'Fiverr',         desc: 'Gig inquiries',                    status: 'inactive'  },
]

const statusBadge: Record<string,string> = {
  connected: 'bg-green-50 text-green-700',
  pending:   'bg-amber-50 text-amber-700',
  inactive:  'bg-slate-100 text-slate-500',
}

export default function CommsPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Communication hub</h1>
          <p className="text-sm text-slate-500 mt-0.5">Team notes and integration status</p>
        </div>
        <Button variant="primary"><Plus size={14} /> Add note</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Team notes" />
          <div className="divide-y divide-slate-50">
            {NOTES.map((n, i) => (
              <div key={i} className="px-5 py-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-900">{n.title}</span>
                  <span className="text-xs text-slate-400">{n.date}</span>
                </div>
                <p className="text-sm text-slate-500">{n.body}</p>
                <p className="text-xs text-slate-400 mt-1">— {n.author}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Integrations" />
          <div className="p-4 space-y-2">
            {INTEGRATIONS.map(int => (
              <div key={int.name} className="flex items-center justify-between px-3 py-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-slate-800">{int.name}</p>
                  <p className="text-xs text-slate-400">{int.desc}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${statusBadge[int.status]}`}>
                  {int.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
