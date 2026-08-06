import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PACKAGES, PackageKey } from '@/lib/packages'

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json({ error: 'Stripe is not configured yet.' }, { status: 500 })
    }

    const { packageKey } = await req.json()
    if (!packageKey || !(packageKey in PACKAGES)) {
      return NextResponse.json({ error: 'Invalid package.' }, { status: 400 })
    }
    const pkg = PACKAGES[packageKey as PackageKey]

    const stripe = new Stripe(secretKey)
    const origin = req.headers.get('origin') || `https://${req.headers.get('host')}`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: pkg.name },
            unit_amount: pkg.price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&package=${packageKey}`,
      cancel_url: `${origin}/checkout?package=${packageKey}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout session error:', err)
    return NextResponse.json({ error: 'Could not start checkout.' }, { status: 500 })
  }
}