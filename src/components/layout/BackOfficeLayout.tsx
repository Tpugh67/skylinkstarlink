'use client'
import { AuthProvider } from '@/lib/auth'
import Sidebar from '@/components/layout/Sidebar'

export default function BackOfficeLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </AuthProvider>
  )
}
