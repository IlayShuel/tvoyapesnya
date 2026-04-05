import Link from 'next/link'

export function Nav() {
  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1rem 2.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(253,246,238,0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(232,130,106,0.15)',
      }}
    >
      <Link href="/" style={{
        fontFamily: 'var(--font-playfair), serif',
        fontSize: '1.5rem', fontWeight: 700,
        color: 'var(--rose)', textDecoration: 'none',
      }}>
        🎵 ТвояПесня
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link href="#how" style={{ color: 'var(--textm)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>
          Как это работает
        </Link>
        <Link href="#samples" style={{ color: 'var(--textm)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>
          Примеры
        </Link>
        <Link href="#pricing" style={{ color: 'var(--textm)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>
          Цены
        </Link>
        <Link href="#order" style={{
          background: 'var(--rose)', color: 'white',
          padding: '0.55rem 1.4rem', borderRadius: '50px',
          fontWeight: 700, fontSize: '0.85rem',
          textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(232,130,106,0.35)',
        }}>
          Заказать песню
        </Link>
      </div>
    </nav>
  )
}
