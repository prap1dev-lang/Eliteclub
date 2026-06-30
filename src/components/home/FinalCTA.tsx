import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { Trophy, Handshake, BadgeCheck, Camera, Megaphone, Star } from 'lucide-react'

/**
 * Closing CTA — "Join the Elite / Your seat at the table is Reserved for the
 * Rare", with a row of headline benefit chips, mirroring the brand creative.
 */
const CHIPS = [
  { icon: Trophy, label: '₹23 Lakh Prize Pool' },
  { icon: Handshake, label: 'Premium Brand Collaborations' },
  { icon: BadgeCheck, label: 'Verified Elite Recognition' },
  { icon: Camera, label: 'Professional Photoshoot' },
  { icon: Megaphone, label: 'National Media Recognition' },
  { icon: Star, label: 'Priority Elite Event Invites' },
] as const

export default function FinalCTA() {
  return (
    <section className="relative py-32 bg-ink-2 border-t border-gold/15 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] rounded-full bg-orange-500/10 blur-[120px]" />
      <Reveal className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="hairline mb-7">
          <span className="font-cinzel text-gold text-sm tracking-[0.3em]">JOIN THE ELITE</span>
        </div>
        <h2 className="font-cinzel text-4xl md:text-6xl text-cream leading-[1.05] mb-6">
          Your seat at the table is{' '}
          <span className="text-gold-gradient">Reserved for the Rare.</span>
        </h2>
        <p className="font-cormorant text-[20px] text-cream/65 max-w-xl mx-auto mb-10">
          Register today, get verified, and begin your journey from District Selection to
          becoming India&apos;s next Elite Champion.
        </p>

        {/* benefit chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-11">
          {CHIPS.map((c, i) => {
            const Icon = c.icon
            return (
              <Reveal key={c.label} delay={i * 0.05}>
                <div className="flex items-center gap-3 border border-white/10 bg-ink/60 px-4 py-3 text-left h-full hover:border-orange-500/40 transition-colors">
                  <Icon size={16} className="text-orange-400 shrink-0" />
                  <span className="font-montserrat text-[10px] tracking-[0.12em] uppercase text-cream/75 leading-tight">
                    {c.label}
                  </span>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/register/influencer" className="btn-gold">Register Now</Link>
          <Link href="/partner" className="btn-ghost">Become a Partner</Link>
        </div>
        <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-cream/45 mt-9">
          Be Seen. Be Chosen. <span className="text-orange-400">Be Rare.</span>
        </p>
      </Reveal>
    </section>
  )
}
