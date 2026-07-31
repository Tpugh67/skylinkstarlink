import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Every one of these paths (and anything nested under them) requires a logged-in session.
const PROTECTED_PREFIXES = [
  '/dashboard',
  '/leads',
  '/proposals',
  '/payments',
  '/team',
  '/comms',
  '/settings',
]

// Mirrors ROLE_PERMISSIONS in src/lib/auth.tsx. Duplicated here (rather than
// imported) because middleware runs on the Edge runtime and shouldn't pull in
// client-component React context code.
const ROLE_PERMISSIONS: Record<string, string[]> = {
  founder:   ['dashboard','leads','proposals','payments','team','comms','settings'],
  sales:     ['dashboard','leads','proposals','comms'],
  developer: ['dashboard','comms'],
  designer:  ['dashboard','comms'],
  crm:       ['dashboard','leads','proposals','comms'],
  va:        ['dashboard','leads','proposals','comms'],
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )

  if (!isProtected) {
    return NextResponse.next()
  }

  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response = NextResponse.next({ request })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          response = NextResponse.next({ request })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Logged in — now check whether this person's role actually covers this section.
  const module = pathname.split('/')[1] // e.g. '/payments/123' -> 'payments'

  const { data: roleRow } = await supabase
    .from('user_roles')
    .select('role')
    .eq('id', user.id)
    .single()

  const allowedModules = roleRow ? ROLE_PERMISSIONS[roleRow.role] ?? [] : []

  if (!allowedModules.includes(module)) {
    // Signed in, but this role doesn't cover this section — bounce to the
    // one page every role is allowed to see rather than a dead end.
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/leads/:path*',
    '/proposals/:path*',
    '/payments/:path*',
    '/team/:path*',
    '/comms/:path*',
    '/settings/:path*',
  ],
}
