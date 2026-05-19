'use client'
import { Card, CardHeader, Badge, Button, Avatar } from '@/components/ui'
import { TEAM } from '@/lib/data'
import { UserPlus } from 'lucide-react'
import { ROLE_PERMISSIONS } from '@/lib/auth'

const ALL_MODULES = ['dashboard','leads','proposals','payments','team','comms','settings']

export default function TeamPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Team & roles</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage team members and access permissions</p>
        </div>
        <Button variant="primary"><UserPlus size={14} /> Invite member</Button>
      </div>

      <Card className="mb-4">
        <CardHeader title="Team members" />
        <div className="divide-y divide-slate-50">
          {TEAM.map(m => (
            <div key={m.id} className="flex items-center gap-4 px-5 py-4">
              <Avatar initials={m.initials} color={m.color} size="lg" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">{m.name}</p>
                <p className="text-xs text-slate-500">{m.title}</p>
              </div>
              <div className="text-xs text-slate-400">{m.pay}</div>
              <Badge status={m.role} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Role permissions" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-100">
                <th className="text-left px-5 py-3 font-medium">Module</th>
                <th className="text-center px-3 py-3 font-medium">Founder</th>
                <th className="text-center px-3 py-3 font-medium">Sales</th>
                <th className="text-center px-3 py-3 font-medium">Developer</th>
                <th className="text-center px-3 py-3 font-medium">Designer</th>
                <th className="text-center px-3 py-3 font-medium">CRM</th>
                <th className="text-center px-3 py-3 font-medium">VA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ALL_MODULES.map(mod => (
                <tr key={mod} className="hover:bg-slate-50">
                  <td className="px-5 py-3 capitalize font-medium text-slate-700">{mod}</td>
                  {(['founder','sales','developer','designer','crm','va'] as const).map(role => (
                    <td key={role} className="px-3 py-3 text-center">
                      {ROLE_PERMISSIONS[role].includes(mod)
                        ? <span className="text-green-500 text-base">✓</span>
                        : <span className="text-slate-200">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
