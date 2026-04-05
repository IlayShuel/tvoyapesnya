const STANDARD = [
  'Уникальные стихи лично для вас',
  'Профессиональная запись с музыкой',
  'Доставка на email за 24 часа',
  'MP3 файл навсегда ваш',
  '1 бесплатная правка',
]

const PREMIUM = [
  'Уникальные стихи лично для вас',
  'Профессиональная запись с музыкой',
  'Доставка за 12 часов (срочно!)',
  '2 версии песни на выбор',
  'Видео с текстом для TikTok',
  '3 бесплатные правки',
  'MP3 + WAV файлы',
]

export function Pricing() {
  return (
    <section
      id="pricing"
      style={{
        padding: '5.5rem 4rem',
        background: 'linear-gradient(150deg, #FBE8E0, var(--cream))',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
          <div style={{ width: 24, height: 2, background: 'var(--rose)', borderRadius: 2 }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--rose)' }}>
            Цены
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700,
          color: 'var(--text)', lineHeight: 1.22, marginBottom: '3rem',
        }}>
          Выберите <em style={{ color: 'var(--rose)', fontStyle: 'italic' }}>свой пакет</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {/* Standard */}
          <div style={{
            background: 'white', borderRadius: '24px', padding: '2.25rem 2rem',
            border: '2px solid rgba(232,130,106,0.15)',
          }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--texts)', marginBottom: '0.85rem' }}>
              Стандарт
            </p>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '3.2rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1, marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '1.4rem', color: 'var(--rose)' }}>₽</span>990
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--texts)', marginBottom: '1.5rem' }}>Для одного особого момента</p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.75rem' }}>
              {STANDARD.map((f) => (
                <li key={f} style={{
                  fontSize: '0.85rem', color: 'var(--textm)',
                  padding: '0.5rem 0', borderBottom: '1px solid rgba(92,61,46,0.06)',
                  display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
                }}>
                  <span style={{ color: 'var(--rose)', fontWeight: 700, fontSize: '0.78rem', flexShrink: 0, marginTop: 1 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#order" style={{
              display: 'block', textAlign: 'center', padding: '0.95rem',
              borderRadius: '50px', fontSize: '0.92rem', fontWeight: 700,
              border: '2px solid var(--rose)', color: 'var(--rose)',
              textDecoration: 'none', transition: 'all 0.2s',
            }}>
              Заказать
            </a>
          </div>

          {/* Premium */}
          <div style={{
            background: 'white', borderRadius: '24px', padding: '2.25rem 2rem',
            border: '2px solid var(--rose)',
            boxShadow: '0 6px 30px rgba(232,130,106,0.22)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
              background: 'var(--rose)', color: 'white',
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.07em',
              textTransform: 'uppercase', padding: '0.3rem 1.2rem',
              borderRadius: '50px', whiteSpace: 'nowrap',
              boxShadow: '0 3px 12px rgba(232,130,106,0.4)',
            }}>
              ⭐ Самый популярный
            </div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--texts)', marginBottom: '0.85rem' }}>
              Премиум
            </p>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '3.2rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1, marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '1.4rem', color: 'var(--rose)' }}>₽</span>1490
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--texts)', marginBottom: '1.5rem' }}>Для незабываемого подарка</p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.75rem' }}>
              {PREMIUM.map((f) => (
                <li key={f} style={{
                  fontSize: '0.85rem', color: 'var(--textm)',
                  padding: '0.5rem 0', borderBottom: '1px solid rgba(92,61,46,0.06)',
                  display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
                }}>
                  <span style={{ color: 'var(--rose)', fontWeight: 700, fontSize: '0.78rem', flexShrink: 0, marginTop: 1 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#order" style={{
              display: 'block', textAlign: 'center', padding: '0.95rem',
              borderRadius: '50px', fontSize: '0.92rem', fontWeight: 700,
              background: 'var(--rose)', color: 'white',
              textDecoration: 'none', transition: 'all 0.2s',
              boxShadow: '0 4px 18px rgba(232,130,106,0.35)',
            }}>
              Заказать сейчас
            </a>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){ #pricing { padding: 4rem 1.5rem !important; } }`}</style>
    </section>
  )
}
