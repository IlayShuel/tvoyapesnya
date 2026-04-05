const steps = [
  {
    num: '1',
    icon: '📝',
    title: 'Расскажите историю',
    desc: 'Заполните форму — имя, повод, три факта об этом человеке. Смешные воспоминания, любимые занятия, что делает его особенным.',
  },
  {
    num: '2',
    icon: '🎼',
    title: 'Мы создаём песню',
    desc: 'В течение 24 часов мы пишем уникальные стихи именно про этого человека и создаём мелодию в нужном стиле.',
  },
  {
    num: '3',
    icon: '📩',
    title: 'Получите на почту',
    desc: 'Готовый MP3 приходит прямо на ваш email. Включите на праздновании — и приготовьтесь к незабываемой реакции.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how"
      style={{ padding: '5.5rem 4rem', maxWidth: 1200, margin: '0 auto' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
        <div style={{ width: 24, height: 2, background: 'var(--rose)', borderRadius: 2 }} />
        <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--rose)' }}>
          Как это работает
        </span>
      </div>

      <h2 style={{
        fontFamily: 'var(--font-playfair), serif',
        fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700,
        color: 'var(--text)', lineHeight: 1.22, marginBottom: '0.75rem',
      }}>
        Три шага до <em style={{ color: 'var(--rose)', fontStyle: 'italic' }}>вашей песни</em>
      </h2>

      <p style={{ fontSize: '0.93rem', color: 'var(--textm)', lineHeight: 1.7, maxWidth: 520, marginBottom: '3rem' }}>
        Вам не нужно ничего уметь. Просто расскажите историю — остальное сделаем мы.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {steps.map((s) => (
          <div
            key={s.num}
            style={{
              background: 'white', borderRadius: '20px', padding: '2rem 1.6rem',
              boxShadow: '0 4px 18px rgba(92,61,46,0.07)',
              border: '1px solid rgba(232,130,106,0.1)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: 'linear-gradient(90deg, var(--rose), var(--rose-l))',
            }} />
            <div style={{
              position: 'absolute', top: '1.1rem', right: '1.1rem',
              width: 26, height: 26, borderRadius: '50%',
              background: 'var(--rose-pale)', color: 'var(--rose)',
              fontSize: '0.72rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {s.num}
            </div>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>{s.icon}</span>
            <p style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem',
            }}>
              {s.title}
            </p>
            <p style={{ fontSize: '0.84rem', color: 'var(--textm)', lineHeight: 1.65 }}>{s.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          #how > div:last-child { grid-template-columns: 1fr !important; }
          #how { padding: 4rem 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}
