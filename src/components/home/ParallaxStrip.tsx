'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HERO_IMAGES } from '@/lib/constants'

/**
 * A full-bleed horizontal band of model images that drifts sideways as the
 * user scrolls past it — a second, lighter parallax moment mid-page.
 */
export default function ParallaxStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x1 = useTransform(scrollYProgress, [0, 1], ['2%', '-22%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-15%', '5%'])

  const row = [...HERO_IMAGES, ...HERO_IMAGES]

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-ink">
      <div className="text-center mb-14 px-6">
        <div className="hairline mb-5"><span>✦</span></div>
        <h2 className="font-cinzel text-3xl md:text-5xl text-cream">
          A Stage for <span className="text-gold-gradient">India&apos;s Finest</span>
        </h2>
        <p className="font-cormorant text-[18px] text-cream/55 mt-4 max-w-xl mx-auto">
          Verified creators. Premium brands. One prestigious ecosystem.
        </p>
      </div>

      <motion.div style={{ x: x1 }} className="flex gap-5 mb-5 w-max">
        {row.map((src, i) => (
          <div
            key={`a-${i}`}
            className="relative w-[160px] h-[210px] sm:w-[230px] sm:h-[300px] shrink-0 overflow-hidden border border-white/10"
          >
            <Image src={src} alt="" fill sizes="(max-width: 640px) 160px, 230px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>
        ))}
      </motion.div>

      <motion.div style={{ x: x2 }} className="flex gap-5 w-max">
        {row.reverse().map((src, i) => (
          <div
            key={`b-${i}`}
            className="relative w-[160px] h-[210px] sm:w-[230px] sm:h-[300px] shrink-0 overflow-hidden border border-white/10"
          >
            <Image src={src} alt="" fill sizes="(max-width: 640px) 160px, 230px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>
        ))}
      </motion.div>
    </section>
  )
}
