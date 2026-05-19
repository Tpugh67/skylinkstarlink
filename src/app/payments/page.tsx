'use client'
import { Card, CardHeader, Badge, Button, MetricCard } from '@/components/ui'
import { TRANSACTIONS } from '@/lib/data'
import { Download, TrendingUp, TrendingDown } from 'lucide-react'

export default function PaymentsPage() {
  const income    = TRANSACTIONS.filter(t=>t.direction==='in'  && t.status==='received').reduce((s,t)=>s+t.amount,0)
  const pending   = TRANSACTIONS.filter(t=>t.direction==='in'  && t.status!=='received').reduce((s,t)=>s+t.amount,0)
  const payouts   = TRANSACTIONS.filter(t=>t.direction==='out').reduce((s,t)=>s+t.amount,0)
  const net       = income - payouts

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Payment tracking</h1>
          <p className="text-sm text-slate-500 mt-0.5">Income, payouts, and outstanding invoices</p>
        </div>
        <Button variant="default"><Download size={14} /> Export</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <MetricCard label="Revenue (MTD)"       value={`$${income.toLocaleString()}`}   sub="confirmed" />
        <MetricCard label="Outstanding"         value={`$${pending.toLocaleString()}`}  sub="pending / invoiced" />
        <MetricCard label="Contractor payouts"  value={`$${payouts.toLocaleString()}`}  sub="this month" />
        <MetricCard label="Net margin"          value={`$${net.toLocaleString()}`}       sub="revenue minus payouts" />
      </div>

      <Card>
        <CardHeader title="All transactions" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-100">
                <th className="text-left px-5 py-3 font-medium">Client / Payee</th>
                <th className="text-left px-5 py-3 font-medium">Type</th>
                <th className="text-right px-5 py-3 font-medium">Amount</th>
                <th className="text-left px-5 py-3 font-medium">Date</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {TRANSACTIONS.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-900">{t.party}</td>
                  <td className="px-5 py-3 text-slate-500">{t.type}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`font-medium ${t.direction==='in' ? 'text-green-600' : 'text-red-500'}`}>
                      {t.direction==='in' ? '+' : '-'}${t.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-500">{t.date}</td>
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
