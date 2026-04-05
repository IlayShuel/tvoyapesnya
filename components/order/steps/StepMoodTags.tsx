'use client'

import { cn } from '@/lib/utils'
import { MOODS, type OrderFormData } from '@/types'

interface Props {
  data: OrderFormData
  onChange: (data: Partial<OrderFormData>) => void
}

export function StepMoodTags({ data, onChange }: Props) {
  function toggleMood(mood: string) {
    const current = data.mood
    const updated = current.includes(mood)
      ? current.filter((m) => m !== mood)
      : [...current, mood]
    onChange({ mood: updated })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Pick the mood</h2>
        <p className="text-white/40 text-sm">Select one or more moods that describe your song.</p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {MOODS.map((mood) => {
          const selected = data.mood.includes(mood)
          return (
            <button
              key={mood}
              type="button"
              onClick={() => toggleMood(mood)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150',
                selected
                  ? 'bg-purple-500/20 border-purple-500/60 text-purple-300'
                  : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
              )}
            >
              {mood}
            </button>
          )
        })}
      </div>

      {data.mood.length > 0 && (
        <p className="text-white/30 text-xs">
          Selected: {data.mood.join(', ')}
        </p>
      )}
    </div>
  )
}
