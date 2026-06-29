import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function SuccessCard({ title, message }: { title: string; message: string }) {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={40} className="text-emerald-400" />
      </div>
      <h2 className="font-cinzel text-3xl text-gold-light mb-4">{title}</h2>
      <p className="font-cormorant text-[18px] text-cream/70 max-w-md mx-auto mb-9 leading-relaxed">
        {message}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn-gold">Back to Home</Link>
        <Link href="/register" className="btn-ghost">Register Another</Link>
      </div>
    </div>
  )
}
