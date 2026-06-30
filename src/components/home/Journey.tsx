import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { HERO_IMAGES } from '@/lib/constants'
import {
  BadgeCheck, Handshake, Trophy, Network, Gem, Camera, Star, TrendingUp,
} from 'lucide-react'

/**
 * "Why Join Elite Club?" — the benefits rail from the brand creatives: an
 * icon list of member benefits beside a runway model image.
 */
const BENEFITS = [
  { icon: BadgeCheck, title: 'Verified Talent Recognition' },
  { icon: Handshake, title: 'Premium Brand Collaborations' },
  { icon: Trophy, title: 'National-Level Championship' },
  { icon: Network, title: 'Exclusive Networking Opportunities' },
  { icon: Gem, title: 'Luxury Events & Experiences' },
  { icon: Camera, title: 'Professional Brand Building' },
  { icon: Star, title: 'National Recognition' },
  { icon: TrendingUp, title: 'Career Growth Opportunities' },
] as const

export default function Journey() {
  return (
    <section className="py-24 bg-ink border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        {/* benefits list */}
        <div>
          <Reveal className="mb-10">
            <h2 className="font-cinzel text-3xl md:text-5xl text-cream leading-tight">
              Why Join <span className="text-gold-gradient">Elite Club?</span>
            </h2>
            <p className="font-montserrat text-[11px] tracking-[0.35em] uppercase text-cream/45 mt-4">
              Be Seen. Be Chosen. <span className="text-orange-400">Be Rare.</span>
            </p>
          </Reveal>

          <div className="space-y-1">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon
              return (
                <Reveal key={b.title} delay={i * 0.05}>
                  <div className="flex items-center gap-5 py-3.5 border-b border-white/5 group">
                    <div className="w-11 h-11 rounded-full border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0 group-hover:bg-orange-500/10 transition-colors">
                      <Icon size={18} />
                    </div>
                    <span className="font-cinzel text-cream text-[16px] sm:text-[18px] tracking-wide">
                      {b.title}
                    </span>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* model image */}
        <Reveal delay={0.15} className="hidden lg:block">
          <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10">
            <Image
              src={HERO_IMAGES[0]}
              alt="Elite Club model on the runway"
              fill
              sizes="(max-width: 1024px) 0px, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-cinzel text-cream text-2xl">Reserved for Rare</p>
              <p className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-orange-400/90 mt-1">
                India&apos;s Premier Luxury Talent Platform
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
