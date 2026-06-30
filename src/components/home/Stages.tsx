import Reveal from '@/components/Reveal'
import { MapPin, Landmark, Trophy, Crown, Star } from 'lucide-react'

/**
 * "Your Journey to the Top" — the signature 5-stage timeline from the brand
 * creatives: numbered medallions joined by a connector line, each with a short
 * description. Rendered in the site's orange-on-ink theme.
 */
const STAGES = [
  {
    n: '01',
    icon: MapPin,
    title: 'District Selection',
    desc: 'Take your first step by participating in your district-level selection round.',
  },
  {
    n: '02',
    icon: Landmark,
    title: 'State Competition',
    desc: 'Compete against the finest talent from across your state.',
  },
  {
    n: '03',
    icon: Trophy,
    title: 'State Winner',
    desc: 'Earn the opportunity to represent your state on the national stage.',
  },
  {
    n: '04',
    icon: Crown,
    title: 'National Grand Finale',
    desc: "Stand among India's best and compete for a ₹23 Lakh prize pool.",
  },
  {
    n: '05',
    icon: Star,
    title: 'Elite Champion',
    desc: "Become India's next Elite Champion and unlock a world of opportunities.",
  },
] as const

export default function Stages() {
  return (
    <section id="journey" className="py-24 bg-ink-2 border-y border-gold/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-16">
          <div className="hairline mb-5">
            <span className="font-cinzel text-gold text-sm tracking-[0.3em]">THE PATH</span>
          </div>
          <h2 className="font-cinzel text-3xl md:text-5xl text-cream">
            Your Journey to the <span className="text-gold-gradient">Top</span>
          </h2>
        </Reveal>

        {/* timeline */}
        <div className="relative">
          {/* connector line — desktop only */}
          <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-4">
            {STAGES.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.n} delay={i * 0.1} className="relative text-center">
                  {/* medallion */}
                  <div className="relative z-10 mx-auto w-14 h-14 rounded-full bg-ink border-2 border-orange-500/60 flex items-center justify-center text-orange-400 shadow-[0_0_30px_-8px_rgba(255,106,26,0.6)]">
                    <Icon size={22} />
                  </div>
                  <p className="font-cinzel text-2xl text-gold-gradient mt-4">{s.n}</p>
                  <h3 className="font-cinzel text-cream text-[15px] tracking-wide mt-1 leading-snug">
                    {s.title}
                  </h3>
                  <p className="font-cormorant text-[15px] text-cream/55 mt-2 leading-relaxed max-w-[220px] mx-auto">
                    {s.desc}
                  </p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
