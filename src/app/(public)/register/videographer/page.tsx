import type { Metadata } from 'next'
import FormShell from '@/components/forms/FormShell'
import CreativeForm from '@/components/forms/CreativeForm'

export const metadata: Metadata = {
  title: 'Videographer Registration | Elite Club',
  description: 'Register free as a videographer and receive premium project opportunities.',
}

export default function VideographerRegisterPage() {
  return (
    <FormShell
      eyebrow="Videographer Registration"
      title="Register as a Videographer"
      subtitle="Receive premium project opportunities, corporate work, and luxury brand campaigns from verified businesses."
      feeLabel="FREE"
      feeNote="No registration charges, ever"
    >
      <CreativeForm role="videographer" />
    </FormShell>
  )
}
