import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { type Order } from '@/types'
import { AudioPlayer } from './AudioPlayer'
import Link from 'next/link'

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export default async function DownloadPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const supabase = getServiceClient()

  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('download_token', token)
    .eq('status', 'completed')
    .single()

  if (!order || error) notFound()

  const o = order as Order

  const { data: signedUrlData } = await supabase.storage
    .from('songs')
    .createSignedUrl(o.mp3_storage_path!, 60 * 60 * 24 * 7)

  if (!signedUrlData?.signedUrl) notFound()

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(150deg, #FDF6EE 0%, #FBE8E0 60%, #F5EDE4 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
    }}>
      <div style={{ width: '100%', maxWidth: 440, textAlign: 'center' }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'inline-block', marginBottom: '2rem',
          fontFamily: 'var(--font-playfair), serif',
          fontSize: '1.4rem', fontWeight: 700, color: 'var(--rose)', textDecoration: 'none',
        }}>
          🎵 ТвояПесня
        </Link>

        {/* Song info */}
        <div style={{
          width: 80, height: 80, borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(232,130,106,0.2), rgba(242,169,138,0.2))',
          border: '1px solid rgba(232,130,106,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2.5rem', margin: '0 auto 1.25rem',
        }}>
          🎵
        </div>

        <h1 style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: '1.75rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem',
        }}>
          {o.song_title}
        </h1>
        <p style={{ color: 'var(--texts)', fontSize: '0.875rem', marginBottom: '2rem' }}>
          {o.genre}{o.mood?.length > 0 && ` · ${o.mood.join(', ')}`}
        </p>

        {/* Audio player */}
        <AudioPlayer src={signedUrlData.signedUrl} fileName={`${o.song_title}.mp3`} />

        <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--texts)' }}>
          Ваша персональная песня от ТвояПесня
        </p>
      </div>
    </main>
  )
}
