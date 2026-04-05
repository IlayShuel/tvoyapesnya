'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { GENRES, type OrderFormData } from '@/types'

interface Props {
  data: OrderFormData
  onChange: (data: Partial<OrderFormData>) => void
}

export function StepSongDetails({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Song details</h2>
        <p className="text-white/40 text-sm">Give your song a title and choose a genre.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="song_title">Song Title</Label>
        <Input
          id="song_title"
          placeholder="e.g. Forever With You"
          value={data.song_title}
          onChange={(e) => onChange({ song_title: e.target.value })}
          maxLength={80}
        />
        <p className="text-white/20 text-xs text-right">{data.song_title.length}/80</p>
      </div>

      <div className="space-y-2">
        <Label>Genre</Label>
        <Select value={data.genre} onValueChange={(value) => onChange({ genre: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select a genre..." />
          </SelectTrigger>
          <SelectContent>
            {GENRES.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
