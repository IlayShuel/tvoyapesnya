import { OrderFormCard } from './OrderFormCard'

export function Hero() {
  return (
    <section
      id="order"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
        padding: '7rem 4rem 4rem',
        background: 'linear-gradient(150deg, #FDF6EE 0%, #FBE8E0 60%, #F5EDE4 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background circles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', borderRadius: '50%', background: 'var(--rose)', opacity: 0.08,
          width: 500, height: 500, top: -150, right: -100,
        }} />
        <div style={{
          position: 'absolute', borderRadius: '50%', background: 'var(--rose)', opacity: 0.08,
          width: 300, height: 300, bottom: -80, left: -60,
        }} />
      </div>

      {/* LEFT */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(232,130,106,0.12)', color: 'var(--rose)',
          fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', padding: '0.4rem 1.1rem',
          borderRadius: '50px', marginBottom: '1.25rem',
        }}>
          Персональные песни на русском
        </div>

        <h1 style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700,
          lineHeight: 1.18, marginBottom: '1rem', color: 'var(--text)',
        }}>
          Подарите песню,<br />которую{' '}
          <em style={{ color: 'var(--rose)', fontStyle: 'italic' }}>не забудут никогда</em>
        </h1>

        <p style={{
          fontSize: '0.97rem', color: 'var(--textm)', lineHeight: 1.75,
          marginBottom: '1.75rem', maxWidth: 440,
        }}>
          Расскажите нам историю вашего близкого —
          мы создадим <strong style={{ color: 'var(--brown)', fontWeight: 700 }}>уникальную песню лично для него.</strong>{' '}
          Настоящие слова. Настоящие эмоции.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            '⚡ Доставка 24ч',
            '🔒 Оплата Stripe',
            '✅ Гарантия',
            '❤️ Сделано в Израиле',
          ].map((t) => (
            <div key={t} style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              fontSize: '0.78rem', color: 'var(--texts)', fontWeight: 600,
              background: 'white', padding: '0.35rem 0.9rem',
              borderRadius: '50px', boxShadow: '0 2px 8px rgba(92,61,46,0.07)',
            }}>
              {t}
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div style={{
          padding: '1.25rem 1.5rem', background: 'white', borderRadius: '16px',
          borderLeft: '3px solid var(--rose)', boxShadow: '0 3px 15px rgba(92,61,46,0.07)',
          maxWidth: 440,
        }}>
          <p style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: '0.97rem', fontStyle: 'italic',
            color: 'var(--textm)', lineHeight: 1.6, marginBottom: '0.4rem',
          }}>
            "Мама расплакалась. Сказала, что это лучший подарок в её жизни."
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--texts)', fontWeight: 600 }}>
            — Марина, Тель-Авив
          </p>
        </div>
      </div>

      {/* RIGHT — order form */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <OrderFormCard />
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 900px) {
          #order {
            grid-template-columns: 1fr !important;
            padding: 6rem 1.5rem 3rem !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}
