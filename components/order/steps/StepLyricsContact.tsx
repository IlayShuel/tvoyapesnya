'use client'

import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type OrderFormData } from '@/types'

interface Props {
  data: OrderFormData
  onChange: (data: Partial<OrderFormData>) => void
}

export function StepLyricsContact({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Lyrics & contact</h2>
        <p className="text-white/40 text-sm">
          Describe what the song should be about and where to deliver it.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lyrics">Song brief / Lyrics direction</Label>
        <Textarea
          id="lyrics"
          placeholder="e.g. A love song for my wife's birthday. She loves sunsets and long walks. The tone should be warm and nostalgic..."
          value={data.lyrics}
          onChange={(e) => onChange({ lyrics: e.target.value })}
          maxLength={500}
          className="min-h-[140px]"
        />
        <p className="text-white/20 text-xs text-right">{data.lyrics.length}/500</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Your Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={data.customer_email}
          onChange={(e) => onChange({ customer_email: e.target.value })}
        />
        <p className="text-white/20 text-xs">
          We&apos;ll send your song to this address.
        </p>
      </div>
    </div>
  )
}
