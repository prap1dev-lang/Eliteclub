'use client'

import { useState } from 'react'
import { ChevronDown, FileText, Image as ImageIcon, Video, Shield, ExternalLink } from 'lucide-react'
import { SelectAction, ToggleVerified, NotesField } from './StatusControls'
import { formatDate, formatINR } from '@/lib/utils'

const ROLE_COLOR: Record<string, string> = {
  influencer: 'text-gold-light',
  photographer: 'text-sky-300',
  videographer: 'text-violet-300',
}
const STATUS_BADGE: Record<string, string> = {
  submitted: 'bg-yellow-900/30 text-yellow-300 border-yellow-800/40',
  under_review: 'bg-blue-900/30 text-blue-300 border-blue-800/40',
  verified: 'bg-emerald-900/30 text-emerald-300 border-emerald-800/40',
  rejected: 'bg-red-900/30 text-red-300 border-red-800/40',
}
const PAY_BADGE: Record<string, string> = {
  pending: 'text-yellow-300',
  paid: 'text-emerald-300',
  waived: 'text-cream/50',
  failed: 'text-red-300',
}

function FileLink({ url, label, icon: Icon }: { url: string | null; label: string; icon: any }) {
  if (!url) return null
  return (
    <a href={url} target="_blank" rel="noreferrer"
       className="flex items-center gap-2 px-3 py-2 border border-gold/20 hover:border-gold/50 text-cream/75 hover:text-gold transition-colors font-montserrat text-[11px]">
      <Icon size={14} /> {label} <ExternalLink size={11} className="opacity-50" />
    </a>
  )
}

function Detail({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div>
      <p className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-cream/35 mb-0.5">{label}</p>
      <p className="font-cormorant text-[16px] text-cream/85 break-words">{value}</p>
    </div>
  )
}

export default function RegistrationRow({ r }: { r: any }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="lux-card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 p-4 text-left hover:bg-gold/5 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-cinzel text-cream text-[17px]">{r.full_name}</span>
            {r.is_verified && <Shield size={14} className="text-emerald-400" />}
            <span className={`font-montserrat text-[10px] uppercase tracking-wide ${ROLE_COLOR[r.role] ?? ''}`}>{r.role}</span>
          </div>
          <p className="font-cormorant text-[14px] text-cream/45 mt-0.5 truncate">
            {r.state}{r.city ? ` · ${r.city}` : ''} · {r.email} · {formatDate(r.created_at)}
          </p>
        </div>
        <span className={`hidden sm:inline font-montserrat text-[9px] tracking-wide uppercase px-2 py-1 border ${STATUS_BADGE[r.status] ?? ''}`}>
          {r.status?.replace('_', ' ')}
        </span>
        <ChevronDown size={18} className={`text-gold/60 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="border-t border-gold/10 p-5 space-y-6 bg-ink/40">
          {/* details grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
            <Detail label="Mobile" value={r.mobile} />
            <Detail label="Email" value={r.email} />
            <Detail label="Gender" value={r.gender} />
            <Detail label="Date of Birth" value={r.date_of_birth} />
            <Detail label="Age Category" value={r.age_category} />
            <Detail label="District" value={r.district} />
            <Detail label="City" value={r.city} />
            <Detail label="Category" value={r.category} />
            <Detail label="Experience" value={r.experience} />
            <Detail label="Followers" value={r.followers} />
            <Detail label="Package" value={r.package && r.package !== 'none' ? r.package : null} />
            <Detail label="Languages" value={Array.isArray(r.languages) ? r.languages.join(', ') : null} />
            <Detail label="Specializations" value={Array.isArray(r.specializations) ? r.specializations.join(', ') : null} />
            <Detail label="Address" value={r.address} />
          </div>

          {/* socials */}
          {(r.instagram || r.facebook || r.youtube || r.linkedin || r.website) && (
            <div className="flex flex-wrap gap-2">
              {[
                ['Instagram', r.instagram], ['Facebook', r.facebook], ['YouTube', r.youtube],
                ['LinkedIn', r.linkedin], ['Website', r.website],
              ].filter(([, v]) => v).map(([label, v]) => (
                <a key={label as string} href={String(v).startsWith('http') ? v as string : undefined}
                   target="_blank" rel="noreferrer"
                   className="font-montserrat text-[11px] text-gold/80 border border-gold/20 px-2.5 py-1 hover:border-gold/50">
                  {label}: {v as string}
                </a>
              ))}
            </div>
          )}

          {/* files */}
          <div className="flex flex-wrap gap-2">
            <FileLink url={r.photo_url} label="Photo" icon={ImageIcon} />
            <FileLink url={r.portfolio_url} label="Portfolio" icon={FileText} />
            <FileLink url={r.video_url} label="Video" icon={Video} />
            <FileLink url={r.govt_id_url} label="Govt ID" icon={Shield} />
          </div>

          {/* controls */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gold/10">
            <div>
              <p className="field-label">Status</p>
              <SelectAction entity="registrations" id={r.id} field="status" value={r.status}
                options={[
                  { value: 'submitted', label: 'Submitted' },
                  { value: 'under_review', label: 'Under Review' },
                  { value: 'verified', label: 'Verified' },
                  { value: 'rejected', label: 'Rejected' },
                ]} />
            </div>
            <div>
              <p className="field-label">Payment ({r.fee_amount ? formatINR(r.fee_amount) : 'Free'})</p>
              <SelectAction entity="registrations" id={r.id} field="payment_status" value={r.payment_status}
                options={[
                  { value: 'pending', label: 'Pending' },
                  { value: 'paid', label: 'Paid' },
                  { value: 'waived', label: 'Waived' },
                  { value: 'failed', label: 'Failed' },
                ]} />
            </div>
            <div className="self-end">
              <ToggleVerified entity="registrations" id={r.id} value={r.is_verified} />
            </div>
          </div>

          <div>
            <p className="field-label">Admin Notes</p>
            <NotesField entity="registrations" id={r.id} value={r.admin_notes} />
          </div>
        </div>
      )}
    </div>
  )
}
