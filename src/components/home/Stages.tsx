import Reveal from '@/components/Reveal'
import { COMPETITION_STAGES } from '@/lib/constants'
import { ArrowRight } from 'lucide-react'

export default function Stages() {
  return (
    <section className="py-24 bg-ink-2 border-y border-gold/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-16">
          <p className="eyebrow mb-4">The Elite Club Competition</p>
          <h2 className="font-cinzel text-3xl md:text-5xl text-cream">
            Five Stages to <span className="text-gold-gradient">Glory</span>
          </h2>
        </Reveal>

        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4">
          {COMPETITION_STAGES.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} className="flex-1">
              <div className="flex md:flex-col items-center gap-4 h-full">
                <div className="lux-card flex-1 w-full p-6 text-center flex flex-col items-center justify-center gap-3 hover:border-gold/40 transition-colors">
                  <span className="font-cinzel text-4xl text-gold-gradient">0{s.n}</span>
                  <span className="font-cinzel text-cream text-[16px] tracking-wide leading-snug">
                    {s.title}
                  </span>
                </div>
                {i < COMPETITION_STAGES.length - 1 && (
                  <ArrowRight className="text-gold/50 rotate-90 md:rotate-0 shrink-0" size={22} />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
