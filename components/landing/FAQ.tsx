'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'Насколько персональной будет песня?',
    a: 'Каждая песня пишется с нуля специально для вас. Мы используем имя, историю и детали, которые вы нам рассказали. Никаких шаблонов.',
  },
  {
    q: 'Что если мне не понравится результат?',
    a: 'Мы предлагаем бесплатные правки — 1 для стандартного пакета, 3 для премиума. Напишите нам — переделаем.',
  },
  {
    q: 'Как быстро я получу песню?',
    a: 'Стандарт — в течение 24 часов. Премиум — в течение 12 часов. Готовый MP3 придёт прямо на ваш email.',
  },
  {
    q: 'Это реальные певцы или ИИ?',
    a: 'Мы используем передовые технологии искусственного интеллекта. Качество профессиональное — большинство слушателей не отличают от живой записи.',
  },
  {
    q: 'Могу ли я использовать песню публично?',
    a: 'Да. Песня полностью ваша. Включайте на праздниках, выкладывайте в соцсетях, отправляйте близким.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ padding: '5rem 4rem', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
        <div style={{ width: 24, height: 2, background: 'var(--rose)', borderRadius: 2 }} />
        <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--rose)' }}>
          Вопросы
        </span>
      </div>

      <h2 style={{
        fontFamily: 'var(--font-playfair), serif',
        fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700,
        color: 'var(--text)', lineHeight: 1.22, marginBottom: '2.5rem',
      }}>
        Часто <em style={{ color: 'var(--rose)', fontStyle: 'italic' }}>спрашивают</em>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {FAQS.map((faq, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '14px', overflow: 'hidden',
            border: '1px solid rgba(232,130,106,0.1)',
          }}>
            <div
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                padding: '1.1rem 1.4rem', fontWeight: 600, color: 'var(--text)',
                fontSize: '0.93rem', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                userSelect: 'none',
              }}
            >
              {faq.q}
              <span style={{
                fontSize: '1.3rem', color: 'var(--rose)', fontWeight: 300,
                transition: 'transform 0.2s', flexShrink: 0,
                transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
              }}>+</span>
            </div>

            <div style={{
              maxHeight: open === i ? 200 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.35s ease, padding 0.2s',
              padding: open === i ? '0 1.4rem 1.1rem' : '0 1.4rem',
              fontSize: '0.87rem', color: 'var(--textm)', lineHeight: 1.7,
            }}>
              {faq.a}
            </div>
          </div>
        ))}
      </div>

      <style>{`@media(max-width:900px){ section { padding: 4rem 1.5rem !important; } }`}</style>
    </section>
  )
}
