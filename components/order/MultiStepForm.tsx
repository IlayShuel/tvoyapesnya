'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { StepSongDetails } from './steps/StepSongDetails'
import { StepMoodTags } from './steps/StepMoodTags'
import { StepLyricsContact } from './steps/StepLyricsContact'
import { type OrderFormData } from '@/types'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'

const TOTAL_STEPS = 3

const STEP_TITLES = ['Song Details', 'Mood', 'Lyrics & Contact']

const emptyForm: OrderFormData = {
  song_title: '',
  genre: '',
  mood: [],
  lyrics: '',
  customer_email: '',
}

function isStepValid(step: number, data: OrderFormData): boolean {
  if (step === 1) return data.song_title.trim().length > 0 && data.genre.length > 0
  if (step === 2) return data.mood.length > 0
  if (step === 3)
    return (
      data.lyrics.trim().length > 0 &&
      data.customer_email.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customer_email)
    )
  return false
}

export function MultiStepForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<OrderFormData>(emptyForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function updateForm(partial: Partial<OrderFormData>) {
    setFormData((prev) => ({ ...prev, ...partial }))
  }

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error ?? 'Failed to create checkout session')
      }

      router.push(json.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const valid = isStepValid(step, formData)

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {STEP_TITLES.map((title, i) => (
            <div key={title} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i + 1 < step
                    ? 'bg-purple-500 text-white'
                    : i + 1 === step
                    ? 'bg-purple-500/20 border border-purple-500 text-purple-300'
                    : 'bg-white/5 border border-white/10 text-white/20'
                }`}
              >
                {i + 1 < step ? '✓' : i + 1}
              </div>
              <span
                className={`text-xs hidden sm:block transition-all ${
                  i + 1 === step ? 'text-white/70' : 'text-white/20'
                }`}
              >
                {title}
              </span>
              {i < STEP_TITLES.length - 1 && (
                <div className="hidden sm:block w-12 h-px bg-white/10 mx-2" />
              )}
            </div>
          ))}
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="glass rounded-2xl p-6 sm:p-8 min-h-[320px]">
        {step === 1 && <StepSongDetails data={formData} onChange={updateForm} />}
        {step === 2 && <StepMoodTags data={formData} onChange={updateForm} />}
        {step === 3 && <StepLyricsContact data={formData} onChange={updateForm} />}
      </div>

      {/* Order summary on last step */}
      {step === 3 && formData.song_title && (
        <div className="mt-4 glass rounded-xl px-5 py-4 text-sm">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Order Summary</p>
          <p className="font-semibold">{formData.song_title}</p>
          <p className="text-white/40">
            {formData.genre}
            {formData.mood.length > 0 && ` · ${formData.mood.join(', ')}`}
          </p>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
            <span className="text-white/40">Total</span>
            <span className="font-bold text-lg">$29.00</span>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 1 || loading}
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>

        {step < TOTAL_STEPS ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!valid}>
            Next
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!valid || loading} size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Redirecting...
              </>
            ) : (
              <>
                Pay $29 →
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
