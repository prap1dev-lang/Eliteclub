import { AlertTriangle } from 'lucide-react'

export default function NotConfigured() {
  return (
    <div className="lux-card p-6 mb-8 border-amber-700/40 bg-amber-900/10">
      <div className="flex items-start gap-3">
        <AlertTriangle size={20} className="text-amber-400 mt-0.5 shrink-0" />
        <div>
          <p className="font-cinzel text-amber-300 text-lg mb-1">Supabase not connected</p>
          <p className="font-cormorant text-[16px] text-cream/65 leading-relaxed">
            Add your Supabase keys to <code className="text-gold">.env.local</code> and run the
            SQL in <code className="text-gold">supabase-schema.sql</code> to start receiving and
            managing live submissions. See <code className="text-gold">SETUP.md</code> for the full
            walkthrough.
          </p>
        </div>
      </div>
    </div>
  )
}
