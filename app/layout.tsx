import type { Metadata } from 'next'
import { Playfair_Display, Nunito } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ТвояПесня — Персональная песня за 24 часа',
  description: 'Закажите уникальную песню, написанную специально для вас. Профессиональное качество, доставка за 24 часа.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body
        className={`${nunito.variable} ${playfair.variable}`}
        style={{ fontFamily: 'var(--font-nunito), Nunito, sans-serif' }}
      >
        {children}
      </body>
    </html>
  )
}
