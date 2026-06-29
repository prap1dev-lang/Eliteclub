'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from '@/components/Reveal'
import { PRIZE_POOL, PRIZES, WINNER_PRIVILEGES } from '@/lib/constants'
import { Check } from 'lucide-react'

export default function Championship() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const glowY = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section id="championship" ref={ref} className="relative py-28 overflow-hidden bg-ink">
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 w-[50vw] h-[50vw] rounded-full bg-gold/10 blur-[130px]"
      />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-16">
          <p className="eyebrow mb-4">National Championship</p>
          <h2 className="font-cinzel text-4xl md:text-6xl text-cream mb-3">
            <span className="text-gold-gradient">{PRIZE_POOL}</span>
          </h2>
          <p className="font-cinzel text-lg md:text-xl text-cream/70 tracking-[0.15em]">
            CHAMPIONSHIP PRIZE POOL
          </p>
        </Reveal>

        {/* prize podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {PRIZES.map((p, i) => (
            <Reveal key={p.place} delay={i * 0.12}>
              <div
                className={`lux-card p-8 text-center relative ${
                  i === 0 ? 'md:-translate-y-4 border-gold/45' : ''
                }`}
              >
                <div className="text-5xl mb-4">{p.medal}</div>
                <h3 className="font-cinzel text-gold-light text-xl tracking-wide mb-2">
                  {p.place}
                </h3>
                <p className="font-cinzel text-3xl md:text-4xl text-gold-gradient">{p.amount}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* winner privileges */}
        <Reveal className="text-center mb-10">
          <div className="hairline mb-5"><span>✦</span></div>
          <h3 className="font-cinzel text-2xl md:text-4xl text-cream">Winner Privileges</h3>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4 max-w-4xl mx-auto">
          {WINNER_PRIVILEGES.map((priv, i) => (
            <Reveal key={priv} delay={i * 0.05}>
              <div className="flex items-start gap-3 py-3 border-b border-gold/10">
                <Check size={18} className="text-gold mt-1 shrink-0" />
                <span className="font-cormorant text-[18px] text-cream/80">{priv}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
