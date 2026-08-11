import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const LEADS_LIMIT = 5
const LEADS_WINDOW_SECONDS = 10 * 60

async function sendLeadNotificationEmail(lead: Record<string, any>): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.LEAD_NOTIFICATION_EMAIL
  if (!apiKey || !toEmail) {
    console.error('[leads] Email notification skipped: RESEND_API_KEY or LEAD_NOTIFICATION_EMAIL not configured')
    return false
  }

  const fromEmail = process.env.LEAD_NOTIFICATION_FROM || 'SkyLinkStarLink Leads <leads@skylinkstarlink.com>'

  const html = `
    <h2>New lead from skylinkstarlink.com</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(lead.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(lead.email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(lead.phone || '—')}</td></tr>
      <tr><td><strong>Service</strong></td><td>${escapeHtml(lead.service || '—')}</td></tr>
      <tr><td><strong>Message</strong></td><td>${escapeHtml(lead.message || '—')}</td></tr>
      <tr><td><strong>Source</strong></td><td>${escapeHtml(lead.source || '—')}</td></tr>
      <tr><td><strong>UTM Source</strong></td><td>${escapeHtml(lead.utm_source || '—')}</td></tr>
      <tr><td><strong>UTM Medium</strong></td><td>${escapeHtml(lead.utm_medium || '—')}</td></tr>
      <tr><td><strong>UTM Campaign</strong></td><td>${escapeHtml(lead.utm_campaign || '—')}</td></tr>
      <tr><td><strong>Landing Page</strong></td><td>${escapeHtml(lead.landing_page || '—')}</td></tr>
      <tr><td><strong>Submitted</strong></td><td>${lead.created_at}</td></tr>
    </table>
  `

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        reply_to: lead.email,
        subject: `New lead: ${lead.name}${lead.service ? ` (${lead.service})` : ''}`,
        html,
      }),
    })
    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      console.error('[leads] Resend API error', res.status, errText)
      return false
    }
    return true
  } catch (err) {
    console.error('[leads] Email send threw an exception', err)
    return false
  }
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

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
    const {
      name, email, phone, message, source, service,
      utm_source, utm_medium, utm_campaign, landing_page,
    } = body
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Step 1: persist the lead. This is the critical path — if this fails,
    // the visitor must see an error, never a success message.
    const { data, error } = await supabase
      .from('leads')
      .insert([{
        name, email, phone, message,
        source: source || 'website',
        service,
        status: 'new',
        assigned_to: 'VA',
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        landing_page: landing_page || null,
      }])
      .select().single()

    if (error) {
      console.error('[leads] Supabase insert failed', error)
      return NextResponse.json(
        { error: 'Failed to save your message. Please try again.' },
        { status: 500 }
      )
    }

    // Step 2: attempt the email notification. The lead is already safely
    // stored, so an email failure here must never turn the response into
    // an error for the visitor — but we do record whether it went out so
    // it's visible in the admin dashboard if it silently failed.
    const emailSent = await sendLeadNotificationEmail(data)
    if (emailSent) {
      await supabase.from('leads').update({ email_notified: true }).eq('id', data.id)
    }

    return NextResponse.json({ success: true, lead: data, emailSent })
  } catch (err) {
    console.error('[leads] Unhandled server error', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
