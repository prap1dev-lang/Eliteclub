import Reveal from '@/components/Reveal'
import { JOURNEY } from '@/lib/constants'
import { Sparkles, ShieldCheck, Trophy, Handshake, Crown, TrendingUp } from 'lucide-react'

const ICONS = [Sparkles, ShieldCheck, Trophy, Handshake, Crown, TrendingUp]

export default function Journey() {
  return (
    <section className="py-24 bg-ink-2 border-y border-gold/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-16">
          <p className="eyebrow mb-4">The Platform Journey</p>
          <h2 className="font-cinzel text-3xl md:text-5xl text-cream">
            Discover → Verify → <span className="text-gold-gradient">Win</span> → Grow
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {JOURNEY.map((step, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal key={step} delay={i * 0.08}>
                <div className="lux-card p-6 text-center h-full flex flex-col items-center justify-center gap-3 hover:border-gold/40 transition-colors">
                  <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                    <Icon size={20} />
                  </div>
                  <span className="font-cinzel text-gold-light text-[15px] tracking-wide">
                    {step}
                  </span>
                  <span className="font-montserrat text-[9px] text-cream/35 tracking-[0.2em]">
                    0{i + 1}
                  </span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
