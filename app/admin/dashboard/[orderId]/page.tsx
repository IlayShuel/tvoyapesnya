import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { type Order, type OrderStatus } from '@/types'
import { formatDate, formatCents } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { OrderActions } from './OrderActions'

const STATUS_CONFIG: Record<OrderStatus, { label: string; variant: 'pending' | 'generating' | 'completed' | 'default' }> = {
  pending_payment: { label: 'Awaiting Payment', variant: 'default' },
  pending: { label: 'Pending', variant: 'pending' },
  generating: { label: 'Generating', variant: 'generating' },
  completed: { label: 'Completed', variant: 'completed' },
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const { orderId } = await params

  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  if (!order || error) notFound()

  const o = order as Order
  const s = STATUS_CONFIG[o.status] ?? STATUS_CONFIG.pending

  return (
    <div className="max-w-3xl">
      {/* Back */}
      <Link
        href="/admin/dashboard"
        className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 text-sm transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to dashboard
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">{o.song_title}</h1>
          <p className="text-white/30 text-sm mt-1">Order #{o.id.slice(0, 8).toUpperCase()}</p>
        </div>
        <Badge variant={s.variant} className="flex-shrink-0">{s.label}</Badge>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="glass rounded-xl p-5">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Song Details</p>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-white/40">Genre</dt>
              <dd className="font-medium">{o.genre}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-white/40">Mood</dt>
              <dd className="font-medium">{o.mood?.join(', ')}</dd>
            </div>
          </dl>
        </div>

        <div className="glass rounded-xl p-5">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Customer</p>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-white/40">Email</dt>
              <dd className="font-medium break-all">{o.customer_email}</dd>
            </div>
            {o.amount_paid_cents && (
              <div className="flex justify-between">
                <dt className="text-white/40">Paid</dt>
                <dd className="font-medium text-green-400">{formatCents(o.amount_paid_cents)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-white/40">Date</dt>
              <dd className="font-medium">{formatDate(o.created_at)}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Lyrics */}
      <div className="glass rounded-xl p-5 mb-6">
        <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Song Brief / Lyrics</p>
        <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{o.lyrics}</p>
      </div>

      {/* Admin actions */}
      <OrderActions order={o} />
    </div>
  )
}
