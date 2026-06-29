import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

/** Page wrapper for all registration / hire forms. */
export default function FormShell({
  eyebrow,
  title,
  subtitle,
  feeLabel,
  feeNote,
  children,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  feeLabel?: string
  feeNote?: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-ink">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 font-montserrat text-[10px] tracking-[0.2em] uppercase text-cream/45 hover:text-gold mb-8"
        >
          <ArrowLeft size={14} /> All Registrations
        </Link>

        <div className="text-center mb-10">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h1 className="font-cinzel text-4xl md:text-5xl text-cream mb-3">{title}</h1>
          {subtitle && (
            <p className="font-cormorant text-[18px] text-cream/55 max-w-xl mx-auto">{subtitle}</p>
          )}
          {feeLabel && (
            <div className="inline-flex flex-col items-center mt-6">
              <span
                className={`font-cinzel text-2xl tracking-[0.15em] ${
                  feeLabel === 'FREE' ? 'text-emerald-400' : 'text-gold-gradient'
                }`}
              >
                {feeLabel}
              </span>
              {feeNote && (
                <span className="font-montserrat text-[10px] tracking-[0.15em] text-cream/40 mt-1">
                  {feeNote}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="lux-card p-6 sm:p-10">{children}</div>
      </div>
    </div>
  )
}
