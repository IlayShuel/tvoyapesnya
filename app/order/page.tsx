import Link from 'next/link'
import { MultiStepForm } from '@/components/order/MultiStepForm'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Create Your Song — SoundCraft',
}

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-12 px-4">
      {/* Back link */}
      <div className="max-w-lg mx-auto mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/8 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Create Your <span className="gradient-text">Custom Song</span>
          </h1>
          <p className="text-white/40 text-sm">
            Fill in the details below — your track will be ready in 24–48 hours.
          </p>
        </div>

        <MultiStepForm />
      </div>
    </main>
  )
}
