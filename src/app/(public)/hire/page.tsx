import type { Metadata } from 'next'
import BusinessForm from '@/components/forms/BusinessForm'
import Reveal from '@/components/Reveal'
import { Search, FileText, MessageSquare, Receipt, BadgeCheck, CalendarClock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hire Talent | Elite Club Business Portal',
  description: 'Post a requirement and hire verified influencers, photographers, and videographers.',
}

const DASHBOARD_FEATURES = [
  { icon: Search, label: 'Talent Search' },
  { icon: BadgeCheck, label: 'Verified Profiles' },
  { icon: MessageSquare, label: 'Direct Messaging' },
  { icon: FileText, label: 'Contract Management' },
  { icon: Receipt, label: 'Invoices & Payments' },
  { icon: CalendarClock, label: 'Campaign Calendar' },
]

export default function HirePage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-ink">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">Business Requirement Portal</p>
          <h1 className="font-cinzel text-4xl md:text-6xl text-cream mb-5">
            Hire <span className="text-gold-gradient">Verified Talent</span>
          </h1>
          <p className="font-cormorant text-[19px] text-cream/60 max-w-2xl mx-auto">
            Discover India&apos;s finest creators for your campaigns and events. Post your
            requirement and access a curated directory of verified influencers, photographers,
            videographers, and full production teams.
          </p>
          <div className="inline-flex flex-col items-center mt-6">
            <span className="font-cinzel text-2xl tracking-[0.15em] text-gold-gradient">₹1,100</span>
            <span className="font-montserrat text-[10px] tracking-[0.15em] text-cream/40 mt-1">
              Requirement Posting Fee
            </span>
          </div>
        </div>

        <Reveal className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-16">
          {DASHBOARD_FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.label} className="lux-card p-5 flex items-center gap-3">
                <Icon size={20} className="text-gold shrink-0" />
                <span className="font-cormorant text-[16px] text-cream/75">{f.label}</span>
              </div>
            )
          })}
        </Reveal>

        <div className="lux-card p-6 sm:p-10">
          <BusinessForm />
        </div>
      </div>
    </div>
  )
}
