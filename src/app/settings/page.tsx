'use client'
import { Card, CardHeader, Button } from '@/components/ui'
import { Save } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage company info, commissions, and integrations</p>
      </div>

      <Card className="mb-4">
        <CardHeader title="Company info" />
        <div className="p-5 space-y-4">
          {[
            { label: 'Company name',  value: 'SkyLinkStarLink' },
            { label: 'Owner',         value: 'Terry Pugh'       },
            { label: 'Website',       value: 'skylinkstarlink.com' },
            { label: 'PipeDesk URL',  value: 'app.pipedesk.io/skylinkstarlink' },
          ].map(f => (
            <div key={f.label} className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm text-slate-500 col-span-1">{f.label}</label>
              <input
                defaultValue={f.value}
                className="col-span-2 text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-900"
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-4">
        <CardHeader title="Commission rules" />
        <div className="p-5 space-y-3">
          {[
            { label: 'Sales closer commission',      value: '15%' },
            { label: 'VA lead bonus (per closed)',   value: '$50' },
            { label: 'CRM specialist milestone pay', value: 'Per project' },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between py-2.5 px-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-700">{r.label}</span>
              <span className="text-sm font-semibold text-slate-900">{r.value}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-6">
        <CardHeader title="Future integrations" />
        <div className="p-5">
          <p className="text-sm text-slate-500 mb-3">Planned integrations per your strategy doc:</p>
          <div className="grid grid-cols-2 gap-2">
            {['Supabase Auth','Stripe Billing','PipeDesk CRM','Slack','Discord','Gmail','Upwork API','Fiverr API'].map(i => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-500 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                {i}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Button variant="primary"><Save size={14} /> Save changes</Button>
    </div>
  )
}
