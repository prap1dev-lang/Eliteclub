'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { BRAND, HERO_IMAGES } from '@/lib/constants'

/**
 * Cinematic hero — "Are you ready to STAND AMONG THE ELITE?" Mirrors the brand
 * creative: a big split serif headline, the "Thousands will apply" plaque, a
 * highlighted journey paragraph, and CTAs, framed by floating model images.
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const yFast = useTransform(scrollYProgress, [0, 1], [0, -240])
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -110])
  const yReverse = useTransform(scrollYProgress, [0, 1], [0, 90])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 130])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  // Floating parallax frames flanking the headline (mobile + desktop).
  const frames = [
    { src: HERO_IMAGES[0], cls: 'left-[2%] top-[10%] w-[30vw] h-[40vw] md:left-[3%] md:top-[12%] md:w-[15vw] md:h-[26vw]', y: yFast, rot: -4 },
    { src: HERO_IMAGES[3], cls: 'right-[2%] top-[10%] w-[30vw] h-[40vw] md:right-[3%] md:top-[10%] md:w-[15vw] md:h-[26vw]', y: yFast, rot: 4 },
    { src: HERO_IMAGES[1], cls: 'left-[1%] bottom-[6%] w-[26vw] h-[34vw] md:left-[6%] md:bottom-[8%] md:w-[12vw] md:h-[20vw]', y: ySlow, rot: 3 },
    { src: HERO_IMAGES[4], cls: 'right-[1%] bottom-[6%] w-[26vw] h-[34vw] md:right-[6%] md:bottom-[8%] md:w-[12vw] md:h-[20vw]', y: yReverse, rot: -3 },
  ]

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-ink flex items-center justify-center vignette"
    >
      {/* ambient orange glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-orange-500/10 blur-[120px]" />
      </div>

      {/* floating parallax model frames */}
      <motion.div style={{ scale }} className="absolute inset-0">
        {frames.map((f, i) => (
          <motion.div
            key={i}
            style={{ y: f.y, rotate: f.rot }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.12 * i, ease: 'easeOut' }}
            className={`absolute overflow-hidden border border-white/15 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ${f.cls}`}
          >
            <Image
              src={f.src}
              alt=""
              fill
              sizes="(max-width: 768px) 30vw, 15vw"
              className="object-cover contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </motion.div>
        ))}
      </motion.div>

      {/* darkening layer so text stays legible */}
      <div className="absolute inset-0 bg-ink/65 md:bg-ink/35" />

      {/* center content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 text-center px-5 sm:px-6 max-w-3xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="eyebrow !text-[9px] sm:!text-[11px] mb-6 px-4"
        >
          {BRAND.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-cinzel text-cream/80 text-base sm:text-lg tracking-[0.3em] mb-2"
        >
          ARE YOU READY TO
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-cinzel text-[12vw] sm:text-[10vw] md:text-[84px] leading-[0.92] font-semibold"
        >
          <span className="text-gold-gradient">Stand Among</span>
          <br />
          <span className="text-cream">the Elite?</span>
        </motion.h1>

        {/* plaque */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="inline-block mt-7 border-y border-orange-500/40 px-6 py-2.5"
        >
          <p className="font-cinzel text-[13px] sm:text-[15px] tracking-[0.18em] text-cream/85">
            <span className="text-orange-400">THOUSANDS</span> WILL APPLY.
            ONLY A <span className="text-orange-400">SELECT FEW</span> WILL RISE.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="font-cormorant text-[17px] sm:text-[20px] text-cream/75 max-w-xl mx-auto leading-relaxed mt-7"
        >
          Register today to begin your journey through{' '}
          <span className="text-orange-300">District Selection</span>,{' '}
          <span className="text-orange-300">State Competition</span>, the{' '}
          <span className="text-orange-300">National Grand Finale</span>, and the chance to
          become India&apos;s next <span className="text-orange-300">Elite Champion</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-9"
        >
          <Link href="/register/influencer" className="btn-gold">Register Now</Link>
          <Link href="/hire" className="btn-ghost">Hire Talent</Link>
          <Link href="/#championship" className="btn-ghost">Explore Winners</Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-cream/45 mt-6"
        >
          Free registration for the 1st 100 users
        </motion.p>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-orange-400/80"
      >
        <span className="font-montserrat text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
