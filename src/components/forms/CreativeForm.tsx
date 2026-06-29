'use client'

import { useState, FormEvent } from 'react'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { Field, Input, Select, PillGroup, Textarea } from './Fields'
import FileUpload from './FileUpload'
import SuccessCard from './SuccessCard'
import {
  INDIAN_STATES, EXPERIENCE_BUCKETS,
  PHOTOGRAPHER_SPECIALIZATIONS, VIDEOGRAPHER_SPECIALIZATIONS,
} from '@/lib/constants'

/** Shared registration form for photographers & videographers (free). */
export default function CreativeForm({ role }: { role: 'photographer' | 'videographer' }) {
  const isPhotog = role === 'photographer'
  const specOptions = isPhotog ? PHOTOGRAPHER_SPECIALIZATIONS : VIDEOGRAPHER_SPECIALIZATIONS
  const videoLabel = isPhotog ? 'Showreel / Sample Video (optional)' : 'Showreel Video'

  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState<null | { title: string; message: string }>(null)
  const [specializations, setSpecializations] = useState<string[]>([])
  const [photo, setPhoto] = useState<string | null>(null)
  const [portfolio, setPortfolio] = useState<string | null>(null)
  const [video, setVideo] = useState<string | null>(null)
  const [govtId, setGovtId] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const payload = {
      role,
      full_name: fd.get('full_name'),
      gender: fd.get('gender'),
      mobile: fd.get('mobile'),
      email: fd.get('email'),
      address: fd.get('address'),
      state: fd.get('state'),
      district: fd.get('district'),
      city: fd.get('city'),
      instagram: fd.get('instagram'),
      website: fd.get('website'),
      experience: fd.get('experience'),
      specializations,
      photo_url: photo,
      portfolio_url: portfolio,
      video_url: video,
      govt_id_url: govtId,
    }
    try {
      const res = await fetch('/api/register', {
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
      setDone({ title: 'Registration Complete', message: data.message })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      toast.error('Network error. Please try again.')
      setSubmitting(false)
    }
  }

  if (done) return <SuccessCard title={done.title} message={done.message} />

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <section className="space-y-5">
        <h3 className="font-cinzel text-gold-light text-lg border-b border-gold/15 pb-2">
          Your Details
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Full Name" required>
            <Input name="full_name" required placeholder="Your full name" />
          </Field>
          <Field label="Gender">
            <Select name="gender" options={['male', 'female', 'other']} placeholder="Select gender" />
          </Field>
          <Field label="Mobile Number" required>
            <Input name="mobile" required inputMode="tel" placeholder="+91 ..." />
          </Field>
          <Field label="Email" required>
            <Input type="email" name="email" required placeholder="you@example.com" />
          </Field>
          <Field label="State" required>
            <Select name="state" required options={INDIAN_STATES} placeholder="Select your state" />
          </Field>
          <Field label="Experience">
            <Select name="experience" options={EXPERIENCE_BUCKETS} placeholder="Years of experience" />
          </Field>
          <Field label="District"><Input name="district" placeholder="District" /></Field>
          <Field label="City"><Input name="city" placeholder="City" /></Field>
        </div>
        <Field label="Address">
          <Textarea name="address" rows={2} placeholder="Your address / studio location" />
        </Field>
      </section>

      <section className="space-y-5">
        <h3 className="font-cinzel text-gold-light text-lg border-b border-gold/15 pb-2">
          Specializations
        </h3>
        <Field label={`Select your ${role} specializations`}>
          <PillGroup value={specializations} onChange={setSpecializations} options={specOptions} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Instagram / Portfolio Handle"><Input name="instagram" placeholder="@handle or URL" /></Field>
          <Field label="Website"><Input name="website" placeholder="https://" /></Field>
        </div>
      </section>

      <section className="space-y-5">
        <h3 className="font-cinzel text-gold-light text-lg border-b border-gold/15 pb-2">
          Portfolio & Verification
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          <FileUpload label="Profile Photo" kind="image" accept="image/*" value={photo} onChange={setPhoto} folder={`elite-club/${role}/photos`} />
          <FileUpload label="Portfolio (PDF / Images)" kind="auto" accept="image/*,application/pdf" value={portfolio} onChange={setPortfolio} folder={`elite-club/${role}/portfolios`} />
          <FileUpload label={videoLabel} kind="video" accept="video/*" value={video} onChange={setVideo} folder={`elite-club/${role}/videos`} />
          <FileUpload label="Government ID" kind="image" accept="image/*,application/pdf" value={govtId} onChange={setGovtId} folder={`elite-club/${role}/ids`} />
        </div>
      </section>

      <div className="pt-2">
        <p className="font-montserrat text-[10px] text-cream/35 mb-4 leading-relaxed">
          Registration is <span className="text-emerald-400">FREE</span>. Elite Club believes
          creative professionals should receive opportunities, not registration charges. Our team
          will verify your profile and start sending you booking requests.
        </p>
        <button type="submit" disabled={submitting} className="btn-gold w-full">
          {submitting ? (<><Loader2 size={16} className="animate-spin" /> Submitting…</>) : 'Submit — It’s Free'}
        </button>
      </div>
    </form>
  )
}
