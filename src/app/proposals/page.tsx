'use client'
import { Card, CardHeader, Badge, Button, MetricCard } from '@/components/ui'
import { PROPOSALS, TEMPLATES } from '@/lib/data'
import { Plus, FileText } from 'lucide-react'

export default function ProposalsPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Proposal center</h1>
          <p className="text-sm text-slate-500 mt-0.5">Reusable templates and active proposals</p>
        </div>
        <Button variant="primary"><Plus size={14} /> New template</Button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <MetricCard label="Templates"       value={String(TEMPLATES.length)} />
        <MetricCard label="Sent this month" value={String(PROPOSALS.filter(p=>p.status!=='draft').length)} />
        <MetricCard label="Close rate"      value="38%" sub="all time" />
      </div>

      <Card className="mb-4">
        <CardHeader title="Active proposals" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-100">
                <th className="text-left px-5 py-3 font-medium">Client</th>
                <th className="text-left px-5 py-3 font-medium">Template</th>
                <th className="text-right px-5 py-3 font-medium">Value</th>
                <th className="text-left px-5 py-3 font-medium">Sent</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {PROPOSALS.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 cursor-pointer transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-900">{p.client}</td>
                  <td className="px-5 py-3 text-slate-500">{p.template}</td>
                  <td className="px-5 py-3 text-right text-slate-700">${p.value.toLocaleString()}</td>
                  <td className="px-5 py-3 text-slate-500">{p.sent}</td>
                  <td className="px-5 py-3"><Badge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardHeader title="Reusable templates" action={<Button variant="default"><Plus size={14} /> Add</Button>} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-100">
                <th className="text-left px-5 py-3 font-medium">Template name</th>
                <th className="text-left px-5 py-3 font-medium">Category</th>
                <th className="text-left px-5 py-3 font-medium">Last used</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {TEMPLATES.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 cursor-pointer transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-slate-400" />
                      <span className="font-medium text-slate-900">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-500">{t.category}</td>
                  <td className="px-5 py-3 text-slate-500">{t.lastUsed}</td>
                  <td className="px-5 py-3"><Badge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
