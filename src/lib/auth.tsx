'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export type UserRole = 'founder' | 'sales' | 'developer' | 'designer' | 'crm' | 'va'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  initials: string
}

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  founder:   ['dashboard','leads','proposals','payments','team','comms','settings'],
  sales:     ['dashboard','leads','proposals','comms'],
  developer: ['dashboard','comms'],
  designer:  ['dashboard','comms'],
  crm:       ['dashboard','leads','proposals','comms'],
  va:        ['dashboard','leads','proposals','comms'],
}

const MOCK_USERS: User[] = [
  { id: '1', name: 'Terry Pugh',      email: 'terry@skylinkstarlink.com',  role: 'founder',   initials: 'TP' },
  { id: '2', name: 'Sales Closer',    email: 'sales@skylinkstarlink.com',  role: 'sales',     initials: 'SC' },
  { id: '3', name: 'Web Developer',   email: 'dev@skylinkstarlink.com',    role: 'developer', initials: 'WD' },
  { id: '4', name: 'Graphic Designer',email: 'design@skylinkstarlink.com', role: 'designer',  initials: 'GD' },
  { id: '5', name: 'CRM Specialist',  email: 'crm@skylinkstarlink.com',    role: 'crm',       initials: 'CS' },
  { id: '6', name: 'Lead Gen VA',     email: 'va@skylinkstarlink.com',     role: 'va',        initials: 'VA' },
]

interface AuthContextType {
  user: User | null
  login: (userId: string) => void
  logout: () => Promise<void>
  can: (module: string) => boolean
  mockUsers: User[]
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user: authUser } }) => {
      if (!authUser) return
      const { data: roleRow } = await supabase
        .from('user_roles')
        .select('name, email, role, initials')
        .eq('id', authUser.id)
        .single()
      if (roleRow) {
        setUser({
          id: authUser.id,
          name: roleRow.name,
          email: roleRow.email,
          role: roleRow.role as UserRole,
          initials: roleRow.initials,
        })
      }
    })
  }, [])

  const login = (userId: string) => {
    const found = MOCK_USERS.find(u => u.id === userId)
    if (found) setUser(found)
  }

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    router.push('/login')
    router.refresh()
  }

  const can = (module: string) => {
    if (!user) return false
    return ROLE_PERMISSIONS[user.role].includes(module)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, can, mockUsers: MOCK_USERS }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
