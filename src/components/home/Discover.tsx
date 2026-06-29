import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { JUDGING_PARAMETERS } from '@/lib/constants'
import { Search, MapPin, Users, BadgeCheck, Sparkles } from 'lucide-react'

const SEARCH_FILTERS = [
  'State', 'District', 'City', 'Gender', 'Age', 'Followers',
  'Category', 'Experience', 'Verified Status', 'Availability', 'Languages',
]

export default function Discover() {
  return (
    <section id="discover" className="py-24 bg-ink">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <p className="eyebrow mb-4">Talent Discovery</p>
          <h2 className="font-cinzel text-3xl md:text-5xl text-cream mb-6 leading-tight">
            Find the perfect creator,{' '}
            <span className="text-gold-gradient">instantly.</span>
          </h2>
          <p className="font-cormorant text-[18px] text-cream/65 leading-relaxed mb-8">
            Brands search a verified, ranked directory of India&apos;s top talent — filtered by
            every parameter that matters. Every champion is judged on professionalism, creativity,
            public presence, communication, portfolio, brand value, and overall personality.
          </p>

          <div className="flex flex-wrap gap-2.5 mb-9">
            {SEARCH_FILTERS.map((f) => (
              <span
                key={f}
                className="font-montserrat text-[11px] tracking-wide text-cream/70 border border-gold/20 px-3 py-1.5 hover:border-gold/50 hover:text-gold transition-colors"
              >
                {f}
              </span>
            ))}
          </div>

          <Link href="/hire" className="btn-gold">
            <Search size={15} /> Start Hiring
          </Link>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: MapPin, label: 'State Rankings', value: '28 + 8 UT' },
              { icon: Users, label: 'Talent Pool', value: 'Verified' },
              { icon: BadgeCheck, label: 'Elite Badge', value: 'KYC Verified' },
              { icon: Sparkles, label: 'AI Matchmaking', value: 'Smart' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="lux-card p-6 flex flex-col gap-3">
                  <Icon size={24} className="text-gold" />
                  <div>
                    <p className="font-cinzel text-cream text-lg">{item.value}</p>
                    <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-cream/45">
                      {item.label}
                    </p>
                  </div>
                </div>
              )
            })}
            <div className="lux-card col-span-2 p-6">
              <p className="eyebrow mb-3">Judging Parameters</p>
              <div className="flex flex-wrap gap-2">
                {JUDGING_PARAMETERS.map((j) => (
                  <span key={j} className="font-cormorant text-[15px] text-gold-light/90 after:content-['•'] after:ml-2 after:text-gold/40 last:after:content-['']">
                    {j}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
