import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

export default function StatCard({
  label, value, icon: Icon, href, accent,
}: {
  label: string
  value: number | string
  icon: LucideIcon
  href?: string
  accent?: boolean
}) {
  const inner = (
    <div className={`lux-card p-6 ${href ? 'hover:border-gold/45 transition-colors' : ''}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-cream/45 mb-2">
            {label}
          </p>
          <p className={`font-cinzel text-3xl ${accent ? 'text-gold-gradient' : 'text-cream'}`}>
            {value}
          </p>
        </div>
        <div className="w-11 h-11 rounded-full border border-gold/25 flex items-center justify-center text-gold shrink-0">
          <Icon size={20} />
        </div>
      </div>
    </div>
  )
  return href ? <Link href={href}>{inner}</Link> : inner
}
