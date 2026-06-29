import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { PACKAGES } from '@/lib/constants'
import { formatINR } from '@/lib/utils'
import { Check, Star } from 'lucide-react'

export default function Packages() {
  return (
    <section id="packages" className="py-28 bg-ink-2 border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-16">
          <p className="eyebrow mb-4">Elite Membership Packages</p>
          <h2 className="font-cinzel text-3xl md:text-5xl text-cream mb-4">
            Elevate Your <span className="text-gold-gradient">Presence</span>
          </h2>
          <p className="font-cormorant text-[18px] text-cream/55 max-w-xl mx-auto">
            Optional add-ons for influencers seeking professional production and maximum exposure.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-7 items-start">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.12}>
              <div
                className={`lux-card relative p-8 h-full flex flex-col ${
                  pkg.highlight ? 'border-gold/50 lg:-translate-y-4 shadow-[0_30px_70px_-30px_rgba(201,168,76,0.4)]' : ''
                }`}
              >
                {pkg.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-ink font-montserrat text-[9px] tracking-[0.25em] uppercase px-4 py-1.5 flex items-center gap-1.5">
                    <Star size={11} /> Most Popular
                  </span>
                )}
                <h3 className="font-cinzel text-2xl text-gold-light mb-1">{pkg.name}</h3>
                <p className="font-cormorant text-[15px] text-cream/50 mb-5">{pkg.blurb}</p>
                <p className="font-cinzel text-4xl text-gold-gradient mb-7">
                  {formatINR(pkg.price)}
                </p>

                <ul className="space-y-3 flex-1 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check size={16} className="text-gold mt-1 shrink-0" />
                      <span className="font-cormorant text-[16px] text-cream/75">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/register/influencer?package=${pkg.id}`}
                  className={pkg.highlight ? 'btn-gold w-full' : 'btn-ghost w-full'}
                >
                  Choose {pkg.name.replace('Elite ', '')}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
