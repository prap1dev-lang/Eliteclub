'use client'

import { useState, FormEvent } from 'react'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { Field, Input, Textarea } from './Fields'
import SuccessCard from './SuccessCard'

export default function PartnerForm() {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState<null | { title: string; message: string }>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const payload = {
      kind: 'partner',
      name: fd.get('name'),
      email: fd.get('email'),
      mobile: fd.get('mobile'),
      company: fd.get('company'),
      message: fd.get('message'),
    }
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Something went wrong.')
        setSubmitting(false)
        return
      }
      setDone({ title: 'Thank You', message: data.message })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      toast.error('Network error. Please try again.')
      setSubmitting(false)
    }
  }

  if (done) return <SuccessCard title={done.title} message={done.message} />

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Your Name" required><Input name="name" required placeholder="Full name" /></Field>
        <Field label="Company / Brand"><Input name="company" placeholder="Organisation" /></Field>
        <Field label="Email" required><Input type="email" name="email" required placeholder="you@example.com" /></Field>
        <Field label="Mobile Number"><Input name="mobile" inputMode="tel" placeholder="+91 ..." /></Field>
      </div>
      <Field label="How would you like to partner with us?">
        <Textarea name="message" rows={5} placeholder="Tell us about your brand and partnership interest…" />
      </Field>
      <button type="submit" disabled={submitting} className="btn-gold w-full">
        {submitting ? (<><Loader2 size={16} className="animate-spin" /> Sending…</>) : 'Submit Enquiry'}
      </button>
    </form>
  )
}
