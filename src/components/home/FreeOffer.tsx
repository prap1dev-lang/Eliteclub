'use client'

import Link from 'next/link'
import { Crown } from 'lucide-react'
import { useSlots } from '@/components/useSlots'
import { FEES } from '@/lib/constants'

/**
 * Launch-offer banner — mirrors the "FREE REGISTRATION FOR 1ST 100 USERS /
 * ₹1100 (struck) / LIMITED SLOTS ONLY!" block from the brand creatives, in
 * the site's orange-on-ink theme.
 *
 * `variant="band"` is a full-width section used on the home page.
 * `variant="inline"` is a compact card for use inside forms/sidebars.
 */
export default function FreeOffer({
  variant = 'band',
  className = '',
}: {
  variant?: 'band' | 'inline'
  className?: string
}) {
  const { slots } = useSlots()
  const soldOut = !slots.free
  const struck = `₹${FEES.influencerRegistration.toLocaleString('en-IN')}`

  // ── compact inline card ─────────────────────────────────────────────
  if (variant === 'inline') {
    return (
      <div
        className={`relative overflow-hidden border border-orange-500/40 bg-gradient-to-br from-ink-2 to-ink p-5 ${className}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-orange-400/90 mb-1">
              Limited Slots Only
            </p>
            {soldOut ? (
              <p className="font-cinzel text-xl text-cream leading-none">
                Registration <span className="text-gold-gradient">{struck}</span>
              </p>
            ) : (
              <p className="font-cinzel text-2xl text-cream leading-none">
                <span className="text-gold-gradient">FREE</span>{' '}
                <span className="font-cormorant text-base text-cream/45 line-through align-middle">
                  {struck}
                </span>
              </p>
            )}
            <p className="font-cormorant text-[14px] text-cream/55 mt-1.5">
              {soldOut
                ? 'Free spots are full — standard fee now applies.'
                : `For the first 100 registrations — ${slots.remaining} left.`}
            </p>
          </div>
          <div className="w-11 h-11 rounded-full border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
            <Crown size={20} />
          </div>
        </div>
      </div>
    )
  }

  // ── full-width band ─────────────────────────────────────────────────
  return (
    <section className={`relative py-20 bg-ink overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[35vw] rounded-full bg-orange-500/10 blur-[120px]" />
      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
        <div className="border border-orange-500/30 bg-gradient-to-br from-ink-2/90 to-ink/90 backdrop-blur-sm">
          <div className="grid md:grid-cols-[1.3fr_1fr_auto] items-stretch divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* FREE REGISTRATION */}
            <div className="p-8 sm:p-10 flex flex-col justify-center">
              <h3 className="font-cinzel text-5xl sm:text-6xl leading-[0.9] text-gold-gradient">
                FREE
              </h3>
              <p className="font-cinzel text-xl sm:text-2xl text-cream tracking-wide mt-2">
                Registration
              </p>
              <p className="font-montserrat text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-cream/55 mt-3">
                For the 1st 100 Users
              </p>
            </div>

            {/* price struck */}
            <div className="p-8 sm:p-10 flex flex-col justify-center items-center text-center">
              <p className="font-cinzel text-4xl sm:text-5xl text-cream/80 line-through decoration-orange-500 decoration-2">
                {struck}
              </p>
              <p className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-cream/50 mt-3 leading-relaxed">
                For 1st 100<br />Registrations
              </p>
            </div>

            {/* limited slots badge + CTA */}
            <div className="p-8 sm:p-10 flex flex-col items-center justify-center gap-4 min-w-[200px]">
              <div className="w-24 h-24 rounded-full border-2 border-orange-500/60 flex flex-col items-center justify-center text-center">
                <Crown size={18} className="text-orange-400 mb-1" />
                <span className="font-cinzel text-[13px] leading-tight text-cream">
                  LIMITED<br />SLOTS
                </span>
                <span className="font-montserrat text-[8px] tracking-[0.2em] text-orange-400 mt-0.5">
                  ONLY!
                </span>
              </div>
              <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-cream/55 text-center">
                {soldOut ? 'Free spots full' : `${slots.remaining} free spots left`}
              </p>
              <Link href="/register/influencer" className="btn-gold !px-7 !py-3 text-[11px]">
                {soldOut ? 'Register Now' : 'Claim Free Spot'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
