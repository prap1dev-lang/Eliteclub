import type { Metadata } from 'next'
import PartnerForm from '@/components/forms/PartnerForm'
import Reveal from '@/components/Reveal'
import { Sparkles, Eye, Handshake, Trophy } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Become a Partner | Elite Club',
  description: 'Sponsors and luxury partners gain premium visibility and direct access to India’s top creators.',
}

const BENEFITS = [
  { icon: Eye, title: 'Premium Visibility', desc: 'Brand placement across the platform, events, and the national championship.' },
  { icon: Handshake, title: 'Direct Talent Access', desc: 'Connect directly with India’s top verified creators and influencers.' },
  { icon: Trophy, title: 'Championship Presence', desc: 'Associate your brand with the prestigious ₹23 Lakh national finale.' },
  { icon: Sparkles, title: 'Exclusive Events', desc: 'Invitations to invite-only luxury networking events and auditions.' },
]

export default function PartnerPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-ink">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">Sponsors & Luxury Partners</p>
          <h1 className="font-cinzel text-4xl md:text-6xl text-cream mb-5">
            Become a <span className="text-gold-gradient">Partner</span>
          </h1>
          <p className="font-cormorant text-[19px] text-cream/60 max-w-2xl mx-auto">
            Gain premium visibility and direct access to India&apos;s finest creators. Partner with
            Elite Club to position your brand at the heart of the country&apos;s most prestigious
            talent ecosystem.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon
            return (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="lux-card p-6 h-full">
                  <Icon size={26} className="text-gold mb-4" />
                  <h3 className="font-cinzel text-lg text-cream mb-2">{b.title}</h3>
                  <p className="font-cormorant text-[16px] text-cream/60 leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="lux-card p-6 sm:p-10">
          <h2 className="font-cinzel text-2xl text-gold-light mb-6 text-center">Partnership Enquiry</h2>
          <PartnerForm />
        </div>
      </div>
    </div>
  )
}
