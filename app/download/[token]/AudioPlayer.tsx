'use client'

import { useState, useRef, useEffect } from 'react'

interface Props {
  src: string
  fileName: string
}

export function AudioPlayer({ src, fileName }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => {
      setCurrentTime(audio.currentTime)
      setProgress((audio.currentTime / audio.duration) * 100 || 0)
    }
    const onMeta = () => setDuration(audio.duration)
    const onEnd = () => { setPlaying(false); setProgress(0) }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause() } else { audio.play() }
    setPlaying(!playing)
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration
  }

  function fmt(s: number) {
    if (!isFinite(s)) return '0:00'
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
  }

  return (
    <div style={{
      background: 'white', borderRadius: '24px', padding: '2rem',
      boxShadow: '0 8px 40px rgba(92,61,46,0.1)',
      border: '1px solid rgba(232,130,106,0.1)',
    }}>
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Play button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <button
          onClick={togglePlay}
          style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--rose), var(--rose-l))',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 5px 20px rgba(232,130,106,0.45)', transition: 'transform 0.2s',
            fontSize: '1.5rem',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.07)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {playing ? '⏸' : '▶'}
        </button>
      </div>

      {/* Progress */}
      <div
        onClick={handleSeek}
        style={{
          height: 6, background: 'var(--warm2)', borderRadius: 3,
          cursor: 'pointer', marginBottom: '0.5rem', position: 'relative',
        }}
      >
        <div style={{
          height: '100%', borderRadius: 3,
          background: 'linear-gradient(90deg, var(--rose), var(--rose-l))',
          width: `${progress}%`, transition: 'width 0.3s',
        }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--texts)', marginBottom: '1.5rem' }}>
        <span>{fmt(currentTime)}</span>
        <span>{fmt(duration)}</span>
      </div>

      {/* Download */}
      <a
        href={src}
        download={fileName}
        style={{
          display: 'block', textAlign: 'center', padding: '0.95rem',
          borderRadius: '50px', fontSize: '0.92rem', fontWeight: 700,
          border: '2px solid var(--rose)', color: 'var(--rose)',
          textDecoration: 'none', transition: 'all 0.2s',
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLElement).style.background = 'var(--rose)'
          ;(e.currentTarget as HTMLElement).style.color = 'white'
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLElement).style.background = 'transparent'
          ;(e.currentTarget as HTMLElement).style.color = 'var(--rose)'
        }}
      >
        ⬇️ Скачать MP3
      </a>
    </div>
  )
}
