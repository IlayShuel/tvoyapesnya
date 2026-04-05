import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { type Order, type OrderStatus } from '@/types'
import { formatDate } from '@/lib/utils'
import { ChevronRight, Music, Clock, Loader2, CheckCircle2 } from 'lucide-react'

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; variant: 'pending' | 'generating' | 'completed' | 'default' }
> = {
  pending_payment: { label: 'Awaiting Payment', variant: 'default' },
  pending: { label: 'Pending', variant: 'pending' },
  generating: { label: 'Generating', variant: 'generating' },
  completed: { label: 'Completed', variant: 'completed' },
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const resolvedParams = await searchParams
  const activeFilter = resolvedParams.status ?? 'all'

  let query = supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (activeFilter !== 'all' && activeFilter !== 'pending_payment') {
    query = query.eq('status', activeFilter)
  } else if (activeFilter === 'pending_payment') {
    query = query.eq('status', 'pending_payment')
  }

  const { data: orders, error } = await query

  // Stats
  const { data: stats } = await supabase
    .from('orders')
    .select('status')
    .neq('status', 'pending_payment')

  const pending = stats?.filter((o) => o.status === 'pending').length ?? 0
  const generating = stats?.filter((o) => o.status === 'generating').length ?? 0
  const completed = stats?.filter((o) => o.status === 'completed').length ?? 0

  const FILTERS = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'generating', label: 'Generating' },
    { value: 'completed', label: 'Completed' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-white/30 text-sm mt-1">Manage and fulfill customer song orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Pending', value: pending, icon: Clock, color: 'text-yellow-400' },
          { label: 'Generating', value: generating, icon: Loader2, color: 'text-blue-400' },
          { label: 'Completed', value: completed, icon: CheckCircle2, color: 'text-green-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-white/40 text-xs">{label}</span>
            </div>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map((f) => (
          <Link
            key={f.value}
            href={f.value === 'all' ? '/admin/dashboard' : `/admin/dashboard?status=${f.value}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              activeFilter === f.value
                ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                : 'bg-white/5 border-white/10 text-white/40 hover:text-white/60'
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {/* Orders table */}
      {!orders || orders.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <Music className="w-8 h-8 text-white/10 mx-auto mb-3" />
          <p className="text-white/30 text-sm">No orders yet</p>
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-white/30 font-medium">Song</th>
                  <th className="text-left px-5 py-3 text-white/30 font-medium hidden md:table-cell">
                    Customer
                  </th>
                  <th className="text-left px-5 py-3 text-white/30 font-medium hidden lg:table-cell">
                    Genre
                  </th>
                  <th className="text-left px-5 py-3 text-white/30 font-medium">Status</th>
                  <th className="text-left px-5 py-3 text-white/30 font-medium hidden md:table-cell">
                    Date
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {(orders as Order[]).map((order) => {
                  const s = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium">{order.song_title}</p>
                        <p className="text-white/30 text-xs mt-0.5">
                          {order.mood?.slice(0, 2).join(', ')}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-white/50 hidden md:table-cell">
                        {order.customer_email}
                      </td>
                      <td className="px-5 py-4 text-white/50 hidden lg:table-cell">
                        {order.genre}
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant={s.variant}>{s.label}</Badge>
                      </td>
                      <td className="px-5 py-4 text-white/30 hidden md:table-cell text-xs">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/dashboard/${order.id}`}
                          className="flex items-center text-white/30 hover:text-white/60 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
