'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

type Chip = { label: string; value: string }

const OCCASIONS: Chip[] = [
  { label: 'День рождения', value: 'День рождения' },
  { label: 'Свадьба', value: 'Свадьба' },
  { label: 'Годовщина', value: 'Годовщина' },
  { label: 'Призыв в армию', value: 'Призыв в армию' },
  { label: 'Выпускной', value: 'Выпускной' },
  { label: 'Просто так', value: 'Просто так' },
]

const GENRES: Chip[] = [
  { label: 'Поп', value: 'Pop' },
  { label: 'Шансон', value: 'Chanson' },
  { label: 'Романтика', value: 'Romance' },
  { label: 'Рок', value: 'Rock' },
  { label: 'Удиви меня', value: 'Surprise' },
]

const MOODS: Chip[] = [
  { label: 'Весёлое 😄', value: 'Весёлое' },
  { label: 'Трогательное 🥺', value: 'Трогательное' },
  { label: 'Романтичное 💕', value: 'Романтичное' },
  { label: 'Торжественное 🎉', value: 'Торжественное' },
]

const VOICES: Chip[] = [
  { label: 'Женский 👩', value: 'Женский' },
  { label: 'Мужской 👨', value: 'Мужской' },
  { label: 'Не важно', value: 'Любой' },
]

const PACKAGES: Chip[] = [
  { label: 'Стандарт — ₽990', value: 'standard' },
  { label: 'Премиум — ₽1490 ⭐', value: 'premium' },
]

function ChipGroup({
  chips,
  selected,
  onSelect,
  multi = false,
}: {
  chips: Chip[]
  selected: string | string[]
  onSelect: (val: string) => void
  multi?: boolean
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
      {chips.map((c) => {
        const active = multi
          ? (selected as string[]).includes(c.value)
          : selected === c.value
        return (
          <button
            key={c.value}
            type="button"
            onClick={() => onSelect(c.value)}
            style={{
              padding: '0.45rem 0.95rem',
              borderRadius: '50px',
              border: active ? '2px solid var(--rose)' : '2px solid rgba(232,130,106,0.22)',
              background: active ? 'var(--rose-pale)' : 'transparent',
              color: active ? 'var(--rose)' : 'var(--textm)',
              fontWeight: active ? 700 : 500,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.18s',
              fontFamily: 'var(--font-nunito), sans-serif',
            }}
          >
            {c.label}
          </button>
        )
      })}
    </div>
  )
}

const S = {
  label: {
    display: 'block', fontSize: '0.72rem', fontWeight: 700,
    letterSpacing: '0.1em', textTransform: 'uppercase' as const,
    color: 'var(--textm)', marginBottom: '0.5rem',
  },
  group: { marginBottom: '1.1rem' },
  input: {
    width: '100%', background: 'var(--warm)',
    border: '2px solid rgba(232,130,106,0.15)', borderRadius: '12px',
    padding: '0.8rem 1rem', color: 'var(--text)',
    fontSize: '0.9rem', fontFamily: 'var(--font-nunito), sans-serif',
    outline: 'none', transition: 'border-color 0.2s',
  },
}

export function OrderFormCard() {
  const router = useRouter()
  const [occasion, setOccasion] = useState('День рождения')
  const [genre, setGenre] = useState('Pop')
  const [mood, setMood] = useState<string[]>(['Трогательное'])
  const [voice, setVoice] = useState('Женский')
  const [forWhom, setForWhom] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [pkg, setPkg] = useState('premium')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function toggleMood(val: string) {
    setMood((prev) =>
      prev.includes(val) ? prev.filter((m) => m !== val) : [...prev, val]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!forWhom.trim() || !description.trim() || !email.trim()) {
      setError('Пожалуйста, заполните все поля')
      return
    }
    setLoading(true)
    setError(null)

    const lyrics = `Повод: ${occasion}. Голос: ${voice}.\n${description}`
    const songTitle = `Песня для ${forWhom}`
    const basePrice = pkg === 'premium' ? 149000 : 99000
    const discount = parseFloat(localStorage.getItem('coupon_applied') ?? '0')
    const priceInCents = Math.round(basePrice * (1 - discount))

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        song_title: songTitle,
        genre,
        mood: mood.length ? mood : ['Трогательное'],
        lyrics,
        customer_email: email,
        price_cents: priceInCents,
      }),
    })

    const json = await res.json()
    if (!res.ok) {
      setError(json.error ?? 'Что-то пошло не так. Попробуйте ещё раз.')
      setLoading(false)
      return
    }
    router.push(json.url)
  }

  return (
    <div style={{
      background: 'white', borderRadius: '24px', padding: '2.25rem',
      boxShadow: '0 8px 40px rgba(92,61,46,0.12)',
      border: '1px solid rgba(232,130,106,0.1)',
    }}>
      <p style={{
        fontFamily: 'var(--font-playfair), serif',
        fontSize: '1.35rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem',
      }}>
        🎵 Создать персональную песню
      </p>
      <p style={{ fontSize: '0.82rem', color: 'var(--texts)', marginBottom: '1.5rem' }}>
        Заполните форму — мы напишем песню за 24 часа
      </p>

      <form onSubmit={handleSubmit}>
        <div style={S.group}>
          <label style={S.label}>Повод</label>
          <ChipGroup chips={OCCASIONS} selected={occasion} onSelect={setOccasion} />
        </div>

        <div style={S.group}>
          <label style={S.label}>Жанр</label>
          <ChipGroup chips={GENRES} selected={genre} onSelect={setGenre} />
        </div>

        <div style={S.group}>
          <label style={S.label}>Настроение</label>
          <ChipGroup chips={MOODS} selected={mood} onSelect={toggleMood} multi />
        </div>

        <div style={S.group}>
          <label style={S.label}>Голос</label>
          <ChipGroup chips={VOICES} selected={voice} onSelect={setVoice} />
        </div>

        <div style={S.group}>
          <label style={S.label}>Для кого?</label>
          <input
            style={S.input}
            placeholder="Имя человека..."
            value={forWhom}
            onChange={(e) => setForWhom(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = 'var(--rose)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(232,130,106,0.15)')}
          />
        </div>

        <div style={S.group}>
          <label style={S.label}>Расскажите об этом человеке 💬</label>
          <textarea
            style={{ ...S.input, minHeight: '80px', resize: 'vertical', lineHeight: '1.6' }}
            placeholder="3–5 вещей: любимое занятие, смешная история, что делает его особенным..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            onFocus={(e) => (e.target.style.borderColor = 'var(--rose)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(232,130,106,0.15)')}
          />
        </div>

        <div style={S.group}>
          <label style={S.label}>Ваш email</label>
          <input
            type="email"
            style={S.input}
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = 'var(--rose)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(232,130,106,0.15)')}
          />
        </div>

        <div style={S.group}>
          <label style={S.label}>Пакет</label>
          <ChipGroup chips={PACKAGES} selected={pkg} onSelect={setPkg} />
        </div>

        {error && (
          <div style={{
            background: 'rgba(232,130,106,0.1)', border: '1px solid rgba(232,130,106,0.3)',
            borderRadius: '10px', padding: '0.75rem 1rem',
            fontSize: '0.84rem', color: 'var(--rose)', marginBottom: '0.75rem',
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', background: loading ? 'var(--rose-l)' : 'var(--rose)',
            color: 'white', border: 'none', padding: '1.05rem',
            borderRadius: '50px', fontSize: '1rem', fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-nunito), sans-serif',
            boxShadow: '0 5px 22px rgba(232,130,106,0.4)',
            transition: 'all 0.2s', letterSpacing: '0.02em', marginTop: '0.35rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          }}
        >
          {loading ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Переходим к оплате...
            </>
          ) : (
            '🎵 Создать мою песню'
          )}
        </button>

        <div style={{
          textAlign: 'center', fontSize: '0.75rem', color: 'var(--texts)',
          marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap',
        }}>
          <span>🔒 Безопасная оплата</span>
          <span>⚡ Доставка за 24ч</span>
          <span>✅ Гарантия качества</span>
        </div>
      </form>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
