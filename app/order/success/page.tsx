import Link from 'next/link'

export const metadata = { title: 'Заказ принят — ТвояПесня' }

export default function SuccessPage() {
  return (
    <main style={{
      minHeight: '100vh', background: 'var(--cream)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'rgba(232,130,106,0.1)', border: '2px solid rgba(232,130,106,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2.5rem', margin: '0 auto 1.5rem',
        }}>
          🎉
        </div>

        <h1 style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: '2rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.75rem',
        }}>
          Заказ принят!
        </h1>

        <p style={{ fontSize: '0.97rem', color: 'var(--textm)', lineHeight: 1.7, marginBottom: '2rem' }}>
          Спасибо за заказ. Ваша персональная песня уже в работе.
        </p>

        <div style={{
          background: 'white', borderRadius: '20px', padding: '1.75rem',
          boxShadow: '0 4px 18px rgba(92,61,46,0.07)',
          border: '1px solid rgba(232,130,106,0.1)',
          textAlign: 'left', marginBottom: '2rem',
        }}>
          {[
            { icon: '📧', title: 'Проверьте почту', desc: 'Мы отправили подтверждение заказа. Когда песня будет готова — придёт ещё одно письмо со ссылкой.' },
            { icon: '⏱️', title: 'Готово за 24–48 часов', desc: 'Наша команда создаст вашу уникальную песню и пришлёт приватную ссылку для скачивания.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '10px', flexShrink: 0,
                background: 'var(--rose-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem',
              }}>
                {icon}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)', marginBottom: '0.2rem' }}>{title}</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--textm)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Link href="/" style={{
          display: 'inline-block', padding: '0.85rem 2rem',
          border: '2px solid var(--rose)', borderRadius: '50px',
          color: 'var(--rose)', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem',
        }}>
          На главную
        </Link>
      </div>
    </main>
  )
}
