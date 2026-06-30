import Link from 'next/link'
import type { Metadata } from 'next'
import { Crown, Camera, Video, ArrowUpRight, Building2 } from 'lucide-react'
import { ROLE_META } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Register | Elite Club',
  description: 'Join Elite Club as an Influencer, Photographer, or Videographer.',
}

const ROLES = [
  { key: 'influencer', icon: Crown, ...ROLE_META.influencer },
  { key: 'photographer', icon: Camera, ...ROLE_META.photographer },
  { key: 'videographer', icon: Video, ...ROLE_META.videographer },
] as const

export default function RegisterHub() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-ink">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">Membership Registration</p>
          <h1 className="font-cinzel text-4xl md:text-6xl text-cream mb-5">
            Join the <span className="text-gold-gradient">Elite</span>
          </h1>
          <p className="font-cormorant text-[19px] text-cream/60 max-w-xl mx-auto">
            Choose how you want to be part of India&apos;s premier luxury talent ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {ROLES.map((r) => {
            const Icon = r.icon
            return (
              <Link
                key={r.key}
                href={`/register/${r.key}`}
                className="lux-card group p-8 flex flex-col hover:border-gold/45 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                    <Icon size={24} />
                  </div>
                  {r.key === 'influencer' ? (
                    <span className="flex items-baseline gap-2">
                      <span className="font-cinzel text-lg tracking-[0.15em] text-gold-gradient">FREE</span>
                      <span className="font-cormorant text-sm text-cream/40 line-through">₹1,100</span>
                    </span>
                  ) : (
                    <span
                      className={`font-cinzel text-lg tracking-[0.15em] ${
                        r.fee === 0 ? 'text-emerald-400' : 'text-gold-light'
                      }`}
                    >
                      {r.feeLabel}
                    </span>
                  )}
                </div>
                <h2 className="font-cinzel text-2xl text-cream mb-3">{r.title}</h2>
                <p className="font-cormorant text-[16px] text-cream/60 leading-relaxed flex-1">
                  {r.blurb}
                </p>
                {r.key === 'influencer' && (
                  <p className="font-montserrat text-[10px] tracking-[0.15em] uppercase text-orange-400/90 mt-3">
                    Free for the first 100 users
                  </p>
                )}
                <span className="mt-7 inline-flex items-center gap-2 font-montserrat text-[10px] tracking-[0.25em] uppercase text-gold group-hover:gap-3 transition-all">
                  Begin Registration <ArrowUpRight size={14} />
                </span>
              </Link>
            )
          })}
        </div>

        <div className="lux-card p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center text-gold shrink-0">
              <Building2 size={24} />
            </div>
            <div>
              <h3 className="font-cinzel text-xl text-cream">Are you a Business or Brand?</h3>
              <p className="font-cormorant text-[16px] text-cream/55">
                Post a requirement and hire verified talent for your campaigns.
              </p>
            </div>
          </div>
          <Link href="/hire" className="btn-gold shrink-0">Hire Talent</Link>
        </div>
      </div>
    </div>
  )
}
