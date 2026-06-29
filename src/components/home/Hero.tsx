'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { BRAND, HERO_IMAGES } from '@/lib/constants'

/**
 * Cinematic hero with a scroll-driven parallax field of model images.
 * Each floating image moves at a different speed as you scroll, creating depth.
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // different parallax speeds per layer
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -260])
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -190])
  const yReverse = useTransform(scrollYProgress, [0, 1], [0, 90])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  // placement of the six floating frames (desktop). Each maps to a HERO_IMAGES index.
  const frames = [
    { src: HERO_IMAGES[0], style: 'left-[3%] top-[16%] w-[15vw] h-[26vw]', y: yFast, rot: -5 },
    { src: HERO_IMAGES[1], style: 'left-[15%] bottom-[8%] w-[14vw] h-[22vw]', y: ySlow, rot: 4 },
    { src: HERO_IMAGES[2], style: 'left-[2%] bottom-[-4%] w-[12vw] h-[18vw]', y: yMid, rot: 6 },
    { src: HERO_IMAGES[3], style: 'right-[3%] top-[14%] w-[15vw] h-[26vw]', y: yFast, rot: 5 },
    { src: HERO_IMAGES[4], style: 'right-[15%] bottom-[8%] w-[14vw] h-[22vw]', y: ySlow, rot: -4 },
    { src: HERO_IMAGES[5], style: 'right-[2%] bottom-[-4%] w-[12vw] h-[18vw]', y: yReverse, rot: -6 },
  ]

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-ink flex items-center justify-center vignette"
    >
      {/* ambient gold glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-gold/10 blur-[120px]" />
      </div>

      {/* floating parallax model frames (hidden on small screens for clarity) */}
      <motion.div style={{ scale }} className="absolute inset-0 hidden md:block">
        {frames.map((f, i) => (
          <motion.div
            key={i}
            style={{ y: f.y, rotate: f.rot }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15 * i, ease: 'easeOut' }}
            className={`absolute ${f.style} overflow-hidden border border-gold/25 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]`}
          >
            <Image
              src={f.src}
              alt=""
              fill
              sizes="20vw"
              className="object-cover grayscale-[35%] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </motion.div>
        ))}
      </motion.div>

      {/* darkening layer so text stays legible */}
      <div className="absolute inset-0 bg-ink/45 md:bg-ink/30" />

      {/* center content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="eyebrow mb-7"
        >
          {BRAND.subtitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="font-cinzel text-[14vw] sm:text-[10vw] md:text-[88px] leading-[0.95] font-semibold"
        >
          <span className="text-gold-gradient">Reserved</span>
          <br />
          <span className="text-cream">for Rare</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hairline my-8"
        >
          <span className="font-cinzel text-gold text-sm tracking-[0.3em]">EST. INDIA</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="font-cormorant text-[19px] md:text-[22px] text-cream/75 max-w-xl mx-auto leading-relaxed"
        >
          We discover, verify, and connect India&apos;s finest creators with premium
          brands — culminating in a national championship with a{' '}
          <span className="text-gold-light font-medium">₹23 Lakh</span> prize pool.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-11"
        >
          <Link href="/register" className="btn-gold">Register Now</Link>
          <Link href="/hire" className="btn-ghost">Hire Talent</Link>
          <Link href="/#championship" className="btn-ghost">Explore Winners</Link>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gold/70"
      >
        <span className="font-montserrat text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
