import { Suspense } from 'react'
import type { Metadata } from 'next'
import FormShell from '@/components/forms/FormShell'
import InfluencerForm from '@/components/forms/InfluencerForm'

export const metadata: Metadata = {
  title: 'Influencer Registration | Elite Club',
  description: 'Register as an influencer. Compete, build your brand, and secure collaborations.',
}

export default function InfluencerRegisterPage() {
  return (
    <FormShell
      eyebrow="Influencer Registration"
      title="Become an Elite Influencer"
      subtitle="Participate in competitions, build your personal brand, and secure premium collaborations."
      feeLabel="₹1,100"
      feeNote="Registration Fee • Packages optional"
    >
      <Suspense fallback={<div className="font-cormorant text-cream/50 text-center py-10">Loading…</div>}>
        <InfluencerForm />
      </Suspense>
    </FormShell>
  )
}
