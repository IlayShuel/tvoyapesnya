export type OrderStatus = 'pending_payment' | 'pending' | 'generating' | 'completed'

export interface Order {
  id: string
  created_at: string
  updated_at: string
  customer_email: string
  song_title: string
  genre: string
  mood: string[]
  lyrics: string
  status: OrderStatus
  stripe_session_id: string | null
  stripe_payment_intent: string | null
  amount_paid_cents: number | null
  mp3_storage_path: string | null
  download_token: string
  admin_notes: string | null
}

export interface OrderFormData {
  song_title: string
  genre: string
  mood: string[]
  lyrics: string
  customer_email: string
}

export const GENRES = [
  'Pop',
  'Hip-Hop',
  'R&B',
  'Country',
  'Electronic',
  'Rock',
  'Jazz',
  'Classical',
  'Folk',
  'Latin',
] as const

export const MOODS = [
  'Happy',
  'Sad',
  'Romantic',
  'Energetic',
  'Chill',
  'Motivational',
  'Melancholic',
  'Uplifting',
  'Dark',
  'Playful',
] as const
