'use client'

import { useState, useEffect } from 'react'

const VALID_CODE = 'СКИДКА10'

export function CouponModal() {
  const [visible, setVisible] = useState(false)
  const [code, setCode] = useState('')
  const [applied, setApplied] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Don't show if already applied this session
    if (localStorage.getItem('coupon_applied')) return
    const timer = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  function handleApply() {
    if (code.trim().toUpperCase() === VALID_CODE) {
      localStorage.setItem('coupon_applied', '0.10')
      setApplied(true)
      setError(false)
      setTimeout(() => setVisible(false), 2000)
    } else {
      setError(true)
    }
  }

  function handleClose() {
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(61, 35, 20, 0.4)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.3s ease',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        background: 'white',
        borderRadius: '24px',
        padding: '2.5rem',
        width: '90%', maxWidth: 420,
        boxShadow: '0 20px 60px rgba(92,61,46,0.2)',
        border: '1px solid rgba(232,130,106,0.15)',
        textAlign: 'center',
        animation: 'slideUp 0.35s ease',
      }}>
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.2rem', color: 'var(--texts)', padding: '0.25rem',
          }}
        >×</button>

        {/* Gift icon */}
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎁</div>

        <h2 style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: '1.5rem', fontWeight: 700,
          color: 'var(--text)', marginBottom: '0.5rem',
        }}>
          Специальное предложение!
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--textm)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
          Введите промокод и получите
        </p>
        <div style={{
          display: 'inline-block',
          background: 'var(--rose-pale)', color: 'var(--rose)',
          fontWeight: 800, fontSize: '1.6rem',
          padding: '0.3rem 1rem', borderRadius: '12px',
          marginBottom: '1.5rem',
          fontFamily: 'var(--font-playfair), serif',
        }}>
          −10% на заказ
        </div>

        {applied ? (
          <div style={{
            background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: '12px', padding: '1rem',
            color: '#16a34a', fontWeight: 700, fontSize: '1rem',
          }}>
            ✓ Скидка применена!
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                value={code}
                onChange={(e) => { setCode(e.target.value); setError(false) }}
                onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                placeholder="Введите промокод..."
                style={{
                  flex: 1, background: 'var(--warm)',
                  border: `2px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(232,130,106,0.15)'}`,
                  borderRadius: '12px', padding: '0.8rem 1rem',
                  fontSize: '0.95rem', fontFamily: 'var(--font-nunito), sans-serif',
                  color: 'var(--text)', outline: 'none',
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}
              />
              <button
                onClick={handleApply}
                style={{
                  background: 'var(--rose)', color: 'white',
                  border: 'none', borderRadius: '12px',
                  padding: '0 1.25rem', fontWeight: 700,
                  fontSize: '0.9rem', cursor: 'pointer',
                  fontFamily: 'var(--font-nunito), sans-serif',
                  whiteSpace: 'nowrap',
                }}
              >
                Применить
              </button>
            </div>

            {error && (
              <p style={{ fontSize: '0.82rem', color: '#ef4444', marginBottom: '0.5rem' }}>
                Неверный промокод. Попробуйте ещё раз.
              </p>
            )}

            <p style={{ fontSize: '0.75rem', color: 'var(--texts)' }}>
              Попробуйте: <strong style={{ color: 'var(--rose)', cursor: 'pointer' }} onClick={() => setCode('СКИДКА10')}>СКИДКА10</strong>
            </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translate(-50%, calc(-50% + 20px)) } to { opacity: 1; transform: translate(-50%, -50%) } }
      `}</style>
    </>
  )
}
