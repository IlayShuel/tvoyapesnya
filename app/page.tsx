import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Reviews } from '@/components/landing/Reviews'
import { Pricing } from '@/components/landing/Pricing'
import { FAQ } from '@/components/landing/FAQ'
import { CouponModal } from '@/components/landing/CouponModal'

export default function HomePage() {
  return (
    <main style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <CouponModal />
      <Nav />
      <Hero />
      <HowItWorks />
      <Reviews />
      <Pricing />
      <FAQ />

      <footer style={{
        background: 'var(--brown)', color: 'rgba(255,255,255,0.7)',
        padding: '3rem 2rem', textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: '1.6rem', fontWeight: 700, color: 'var(--rose-l)', marginBottom: '0.6rem',
        }}>
          🎵 ТвояПесня
        </p>
        <p style={{ fontSize: '0.83rem', marginBottom: '1.25rem' }}>
          Персональные песни, которые трогают сердце
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {[
            { href: '#how', label: 'Как это работает' },
            { href: '#pricing', label: 'Цены' },
          ].map(({ href, label }) => (
            <a key={label} href={href} style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: '0.78rem' }}>
              {label}
            </a>
          ))}
        </div>
        <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>
          © {new Date().getFullYear()} ТвояПесня · Сделано с ❤️ в Израиле
        </p>
      </footer>
    </main>
  )
}
