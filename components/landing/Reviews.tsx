'use client'

import { useState } from 'react'

const REVIEWS = [
  {
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Марина К.',
    city: 'Тель-Авив',
    text: 'Заказала для мамы на 60-летие. Когда она услышала своё имя и наши общие воспоминания в песне — расплакалась. Сказала, что это лучший подарок в её жизни.',
  },
  {
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    name: 'Анна Р.',
    city: 'Хайфа',
    text: 'Муж был в шоке. Включила на годовщине — там была история нашего первого свидания, слово в слово. Он до сих пор слушает её каждое утро.',
  },
  {
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    name: 'Елена С.',
    city: 'Ришон-ле-Цион',
    text: 'Сделали для сына перед армией. Вся семья плакала. Даже дедушка, который никогда не плачет, не удержался. Невероятно личное и трогательное.',
  },
  {
    photo: 'https://randomuser.me/api/portraits/women/90.jpg',
    name: 'Наталья В.',
    city: 'Нетания',
    text: 'Папе на юбилей — он просто не ожидал. Поставили в конце вечера и все замолчали. Потом аплодисменты. Такого эффекта не давал ни один другой подарок.',
  },
  {
    photo: 'https://randomuser.me/api/portraits/women/26.jpg',
    name: 'Оля Б.',
    city: 'Беэр-Шева',
    text: 'Заказывала для подруги на свадьбу. Она не знала — поставили сюрпризом. Невеста плакала, все гости тоже. Буду рекомендовать всем!',
  },
]

export function Reviews() {
  const [idx, setIdx] = useState(0)

  function move(dir: number) {
    setIdx((prev) => (prev + dir + REVIEWS.length) % REVIEWS.length)
  }

  const shown = [0, 1, 2].map((i) => REVIEWS[(idx + i) % REVIEWS.length])

  return (
    <section style={{ background: 'white', padding: '5.5rem 4rem', borderTop: '1px solid rgba(232,130,106,0.08)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
          <div style={{ width: 24, height: 2, background: 'var(--rose)', borderRadius: 2 }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--rose)' }}>
            Отзывы
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700,
          color: 'var(--text)', lineHeight: 1.22, marginBottom: '2.5rem',
        }}>
          Они уже <em style={{ color: 'var(--rose)', fontStyle: 'italic' }}>получили свою песню</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          {shown.map((r, i) => (
            <div key={i} style={{
              background: 'var(--warm)', borderRadius: '20px', padding: '1.75rem',
              border: '1px solid rgba(232,130,106,0.1)',
            }}>
              <div style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '2.5rem', color: 'var(--rose-l)', lineHeight: 1, marginBottom: '0.6rem',
              }}>"</div>
              <p style={{ fontSize: '0.97rem', color: 'var(--textm)', lineHeight: 1.75, marginBottom: '1.25rem', fontStyle: 'italic' }}>
                {r.text}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src={r.photo}
                  alt={r.name}
                  style={{
                    width: 46, height: 46, borderRadius: '50%',
                    objectFit: 'cover', flexShrink: 0,
                    border: '2px solid rgba(232,130,106,0.25)',
                  }}
                />
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{r.name}</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--texts)' }}>{r.city}</p>
                  <p style={{ color: '#F59E0B', fontSize: '0.78rem', marginTop: 1 }}>★★★★★</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <button onClick={() => move(-1)} style={{
            width: 40, height: 40, borderRadius: '50%',
            border: '2px solid rgba(232,130,106,0.25)', background: 'white',
            cursor: 'pointer', fontSize: '1rem', color: 'var(--textm)',
          }}>←</button>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {REVIEWS.map((_, i) => (
              <div key={i} onClick={() => setIdx(i)} style={{
                width: 8, height: 8, borderRadius: '50%', cursor: 'pointer',
                background: i === idx ? 'var(--rose)' : 'var(--warm2)',
                transform: i === idx ? 'scale(1.3)' : 'scale(1)',
                transition: 'all 0.2s',
              }} />
            ))}
          </div>
          <button onClick={() => move(1)} style={{
            width: 40, height: 40, borderRadius: '50%',
            border: '2px solid rgba(232,130,106,0.25)', background: 'white',
            cursor: 'pointer', fontSize: '1rem', color: 'var(--textm)',
          }}>→</button>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
