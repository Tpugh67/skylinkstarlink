import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const LEADS_LIMIT = 5
const LEADS_WINDOW_SECONDS = 10 * 60

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    const { allowed } = await checkRateLimit(`leads:${ip}`, LEADS_LIMIT, LEADS_WINDOW_SECONDS)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { name, email, phone, message, source, service } = body
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
    }
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { data, error } = await supabase
      .from('leads')
      .insert([{ name, email, phone, message, source: source || 'website', service, status: 'new', assigned_to: 'VA' }])
      .select().single()
    if (error) return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
    return NextResponse.json({ success: true, lead: data })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
