import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { sendOrderConfirmationEmail } from '@/lib/resend'
import Stripe from 'stripe'

// Use service role client directly (no cookies needed in webhook)
function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('[webhook] signature verification failed', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const meta = session.metadata

    if (!meta) {
      console.error('[webhook] no metadata on session', session.id)
      return NextResponse.json({ error: 'No metadata' }, { status: 400 })
    }

    const supabase = getServiceClient()

    const { error } = await supabase.from('orders').insert({
      customer_email: meta.customer_email,
      song_title: meta.song_title,
      genre: meta.genre,
      mood: JSON.parse(meta.mood) as string[],
      lyrics: meta.lyrics,
      status: 'pending',
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent as string,
      amount_paid_cents: session.amount_total,
    })

    if (error) {
      console.error('[webhook] supabase insert error', error)
      return NextResponse.json({ error: 'DB insert failed' }, { status: 500 })
    }

    // Send order confirmation email (non-blocking)
    sendOrderConfirmationEmail({
      to: meta.customer_email,
      songTitle: meta.song_title,
      genre: meta.genre,
      mood: JSON.parse(meta.mood) as string[],
    }).catch((err) => console.error('[webhook] email error', err))
  }

  return NextResponse.json({ received: true })
}
