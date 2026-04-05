'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { type Order } from '@/types'
import { Upload, Loader2, CheckCircle2, Music2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'generating', label: 'Generating' },
  { value: 'completed', label: 'Completed' },
]

export function OrderActions({ order }: { order: Order }) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [status, setStatus] = useState(order.status === 'pending_payment' ? 'pending' : order.status)
  const [file, setFile] = useState<File | null>(null)
  const [notes, setNotes] = useState(order.admin_notes ?? '')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  function handleFile(f: File) {
    if (!f.type.includes('audio') && !f.name.endsWith('.mp3')) {
      setError('Please upload an MP3 file.')
      return
    }
    setFile(f)
    setError(null)
  }

  async function handleSubmit() {
    setLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData()
    formData.append('status', status)
    formData.append('admin_notes', notes)
    if (file) formData.append('mp3', file)

    const res = await fetch(`/api/orders/${order.id}/complete`, {
      method: 'POST',
      body: formData,
    })

    const json = await res.json()

    if (!res.ok) {
      setError(json.error ?? 'Something went wrong')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
    router.refresh()
  }

  return (
    <div className="glass rounded-xl p-5 space-y-5">
      <p className="text-white/30 text-xs uppercase tracking-widest">Admin Actions</p>

      {/* Status update */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">Update Status</label>
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setStatus(opt.value as Order['status'])}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-medium border transition-all',
                status === opt.value
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                  : 'bg-white/5 border-white/10 text-white/40 hover:text-white/60'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* MP3 upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">Upload MP3 File</label>

        {order.mp3_storage_path ? (
          <div className="flex items-center gap-3 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3">
            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="text-sm text-green-300 truncate">{order.mp3_storage_path.split('/').pop()}</span>
          </div>
        ) : null}

        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            const f = e.dataTransfer.files[0]
            if (f) handleFile(f)
          }}
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all',
            dragging
              ? 'border-purple-500/60 bg-purple-500/5'
              : file
              ? 'border-green-500/40 bg-green-500/5'
              : 'border-white/10 hover:border-white/20'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".mp3,audio/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleFile(f)
            }}
          />
          {file ? (
            <div className="flex items-center justify-center gap-2 text-green-300">
              <Music2 className="w-4 h-4" />
              <span className="text-sm font-medium">{file.name}</span>
            </div>
          ) : (
            <div>
              <Upload className="w-6 h-6 text-white/20 mx-auto mb-2" />
              <p className="text-sm text-white/30">
                Drag & drop MP3 here, or <span className="text-purple-400">browse</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Admin notes */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">Admin Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Internal notes about this order..."
          className="flex w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-0 resize-none min-h-[80px]"
        />
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Order updated successfully! Customer notified.
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Upload className="mr-2 w-4 h-4" />
            Save & Notify Customer
          </>
        )}
      </Button>
    </div>
  )
}
