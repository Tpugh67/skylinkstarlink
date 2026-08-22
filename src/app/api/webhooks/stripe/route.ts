import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// This endpoint must be registered in the Stripe Dashboard (Developers > Webhooks)
// pointing at https://skylinkstarlink.com/api/webhooks/stripe
// Listen for: customer.subscription.created, customer.subscription.updated,
// customer.subscription.deleted, invoice.payment_failed

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secretKey || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe webhook not configured' }, { status: 500 })
  }

  const stripe = new Stripe(secretKey)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature!, webhookSecret)
  } catch (err) {
    console.error('[stripe-webhook] Signature verification failed', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const item = sub.items.data[0]
        const isNewManagedSite = event.type === 'customer.subscription.created'
          && sub.metadata?.product === 'managed_website'

        let managedSiteId: string | null = null

        if (isNewManagedSite) {
          // Look up the Stripe customer to get their email
          const stripeCustomer = await stripe.customers.retrieve(sub.customer as string)
          const email = !stripeCustomer.deleted ? stripeCustomer.email : null

          if (email) {
            // Find or create the customer record
            const { data: existingCustomer } = await supabase
              .from('customers')
              .select('id')
              .eq('email', email)
              .maybeSingle()

            let customerId = existingCustomer?.id
            if (!customerId) {
              const { data: newCustomer } = await supabase
                .from('customers')
                .insert([{
                  name: sub.metadata?.customer_name || null,
                  email,
                  stripe_customer_id: sub.customer as string,
                }])
                .select('id')
                .single()
              customerId = newCustomer?.id
            }

            if (customerId) {
              const { data: newSite } = await supabase
                .from('managed_sites')
                .insert([{
                  customer_id: customerId,
                  domain: sub.metadata?.domain || null,
                  business_name: sub.metadata?.business_name || null,
                  status: 'active',
                  monthly_fee: item?.price?.unit_amount ? item.price.unit_amount / 100 : 99,
                }])
                .select('id')
                .single()
              managedSiteId = newSite?.id ?? null
            }
          }
        }

        await supabase.from('subscriptions').upsert(
          {
            stripe_subscription_id: sub.id,
            status: sub.status,
            current_period_start: item ? new Date(item.current_period_start * 1000).toISOString() : null,
            current_period_end: item ? new Date(item.current_period_end * 1000).toISOString() : null,
            cancel_at_period_end: sub.cancel_at_period_end,
            mrr_cents: item?.price?.unit_amount ?? null,
            ...(managedSiteId ? { managed_site_id: managedSiteId } : {}),
          },
          { onConflict: 'stripe_subscription_id' }
        )
        break
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await supabase
          .from('subscriptions')
          .update({ status: 'canceled', cancel_at_period_end: true })
          .eq('stripe_subscription_id', sub.id)

        // Also flip the managed_sites row to cancelled, if linked
        const { data: existing } = await supabase
          .from('subscriptions')
          .select('managed_site_id')
          .eq('stripe_subscription_id', sub.id)
          .single()
        if (existing?.managed_site_id) {
          await supabase
            .from('managed_sites')
            .update({ status: 'cancelled' })
            .eq('id', existing.managed_site_id)
        }
        break
      }
      case 'invoice.payment_failed': {
        // Surface this in logs for now; a future iteration can email the admin
        console.warn('[stripe-webhook] Payment failed for invoice', event.data.object)
        break
      }
      default:
        break
    }
    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[stripe-webhook] Handler error', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
