'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function AdminLogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white/40 hover:text-white">
      <LogOut className="w-4 h-4" />
      <span className="sr-only">Logout</span>
    </Button>
  )
}
