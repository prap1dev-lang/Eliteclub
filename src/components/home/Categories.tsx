import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { Crown, Camera, Video, Building2, ArrowUpRight } from 'lucide-react'
import { formatINR } from '@/lib/utils'
import { FEES } from '@/lib/constants'

const CARDS = [
  {
    icon: Crown,
    title: 'Influencers',
    fee: formatINR(FEES.influencerRegistration),
    desc: 'Compete in state & national championships, build your personal brand, and secure premium collaborations.',
    href: '/register/influencer',
    cta: 'Register as Influencer',
  },
  {
    icon: Camera,
    title: 'Photographers',
    fee: 'FREE',
    desc: 'Creative professionals deserve opportunities, not charges. Get verified, listed, and booked by luxury clients.',
    href: '/register/photographer',
    cta: 'Register Free',
  },
  {
    icon: Video,
    title: 'Videographers',
    fee: 'FREE',
    desc: 'Receive premium project opportunities, corporate work, and luxury brand campaigns from verified businesses.',
    href: '/register/videographer',
    cta: 'Register Free',
  },
  {
    icon: Building2,
    title: 'Businesses & Brands',
    fee: formatINR(FEES.businessPosting),
    desc: 'Discover verified creators for campaigns and events. Post a requirement and access India’s top talent.',
    href: '/hire',
    cta: 'Hire Talent',
  },
]

export default function Categories() {
  return (
    <section className="py-24 bg-ink">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-16">
          <p className="eyebrow mb-4">Membership Categories</p>
          <h2 className="font-cinzel text-3xl md:text-5xl text-cream">
            Four Ways to <span className="text-gold-gradient">Belong</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((c, i) => {
            const Icon = c.icon
            return (
              <Reveal key={c.title} delay={i * 0.1}>
                <Link
                  href={c.href}
                  className="lux-card group p-7 h-full flex flex-col hover:border-gold/45 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                      <Icon size={22} />
                    </div>
                    <span
                      className={`font-cinzel text-sm tracking-[0.2em] ${
                        c.fee === 'FREE' ? 'text-emerald-400/90' : 'text-gold-light'
                      }`}
                    >
                      {c.fee}
                    </span>
                  </div>
                  <h3 className="font-cinzel text-xl text-cream mb-3">{c.title}</h3>
                  <p className="font-cormorant text-[16px] text-cream/60 leading-relaxed flex-1">
                    {c.desc}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-montserrat text-[10px] tracking-[0.25em] uppercase text-gold group-hover:gap-3 transition-all">
                    {c.cta} <ArrowUpRight size={14} />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
