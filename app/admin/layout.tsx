import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Music, LogOut } from 'lucide-react'
import { AdminLogoutButton } from './LogoutButton'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // The login page doesn't need auth check — middleware handles redirect
  // But we still need the layout to render for /admin/login
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // For non-login admin pages — middleware already redirects, but double-check
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {user && (
        <nav className="border-b border-white/5 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Music className="w-4 h-4 text-purple-400" />
              </div>
              <span className="font-semibold text-sm">SoundCraft Admin</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-white/30 text-xs hidden sm:block">{user.email}</span>
              <AdminLogoutButton />
            </div>
          </div>
        </nav>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</div>
    </div>
  )
}
