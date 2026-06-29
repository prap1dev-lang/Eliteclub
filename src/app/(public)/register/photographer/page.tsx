import type { Metadata } from 'next'
import FormShell from '@/components/forms/FormShell'
import CreativeForm from '@/components/forms/CreativeForm'

export const metadata: Metadata = {
  title: 'Photographer Registration | Elite Club',
  description: 'Register free as a photographer and receive paid assignments from luxury clients.',
}

export default function PhotographerRegisterPage() {
  return (
    <FormShell
      eyebrow="Photographer Registration"
      title="Register as a Photographer"
      subtitle="Get a verified profile, business leads, and booking requests from premium clients — at no cost."
      feeLabel="FREE"
      feeNote="No registration charges, ever"
    >
      <CreativeForm role="photographer" />
    </FormShell>
  )
}
