import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { song_title, genre, mood, lyrics, customer_email, price_cents } = body

    if (!song_title || !genre || !mood?.length || !lyrics || !customer_email) {
      return NextResponse.json({ error: 'Заполните все поля' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    const priceInCents = Number(price_cents) || parseInt(process.env.SONG_PRICE_CENTS ?? '2900', 10)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: priceInCents,
            product_data: {
              name: song_title,
              description: `${genre} · ${(mood as string[]).join(', ')}`,
            },
          },
        },
      ],
      metadata: {
        song_title,
        genre,
        mood: JSON.stringify(mood),
        lyrics: (lyrics as string).slice(0, 500),
        customer_email,
      },
      success_url: `${appUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/#order`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[checkout]', err)
    return NextResponse.json({ error: 'Ошибка сервера. Попробуйте ещё раз.' }, { status: 500 })
  }
}
