import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Dedicated subscription checkout for the $0-upfront managed website offer.
// Completely separate from /api/checkout, which remains the one-time
// $799/$1,499 purchase flow and is untouched by this file.

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    const priceId = process.env.STRIPE_MANAGED_PRICE_ID
    if (!secretKey || !priceId) {
      return NextResponse.json({ error: 'Managed checkout is not configured yet.' }, { status: 500 })
    }

    const { name, email, businessName, domain } = await req.json()
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required.' }, { status: 400 })
    }

    const stripe = new Stripe(secretKey)
    const origin = req.headers.get('origin') || `https://${req.headers.get('host')}`

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        metadata: {
          product: 'managed_website',
          customer_name: name,
          business_name: businessName || '',
          domain: domain || '',
        },
      },
      success_url: `${origin}/managed/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/managed`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[checkout/managed] Stripe checkout session error:', err)
    return NextResponse.json({ error: 'Could not start checkout.' }, { status: 500 })
  }
}
