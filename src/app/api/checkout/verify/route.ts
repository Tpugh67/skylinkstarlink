import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function GET(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json({ error: 'Stripe is not configured yet.' }, { status: 500 })
    }

    const sessionId = req.nextUrl.searchParams.get('session_id')
    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session_id.' }, { status: 400 })
    }

    const stripe = new Stripe(secretKey)
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    const paid = session.payment_status === 'paid'
    const amountTotal = session.amount_total ? session.amount_total / 100 : null

    return NextResponse.json({ paid, amountTotal, currency: session.currency })
  } catch (err) {
    console.error('Stripe session verify error:', err)
    return NextResponse.json({ paid: false, error: 'Could not verify payment.' }, { status: 500 })
  }
}
