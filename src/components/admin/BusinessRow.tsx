'use client'

import { useState } from 'react'
import { ChevronDown, ExternalLink, Image as ImageIcon } from 'lucide-react'
import { SelectAction, ToggleVerified, NotesField } from './StatusControls'
import { formatDate, formatINR } from '@/lib/utils'

const STATUS_BADGE: Record<string, string> = {
  submitted: 'bg-yellow-900/30 text-yellow-300 border-yellow-800/40',
  under_review: 'bg-blue-900/30 text-blue-300 border-blue-800/40',
  approved: 'bg-emerald-900/30 text-emerald-300 border-emerald-800/40',
  fulfilled: 'bg-purple-900/30 text-purple-300 border-purple-800/40',
  rejected: 'bg-red-900/30 text-red-300 border-red-800/40',
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

export default function BusinessRow({ r }: { r: any }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="lux-card overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center gap-4 p-4 text-left hover:bg-gold/5 transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-cinzel text-cream text-[17px]">{r.company_name}</span>
            {r.business_type && <span className="font-montserrat text-[10px] uppercase tracking-wide text-gold/70">{r.business_type}</span>}
          </div>
          <p className="font-cormorant text-[14px] text-cream/45 mt-0.5 truncate">
            {r.contact_name} · {r.email} · {formatDate(r.created_at)}
          </p>
        </div>
        <span className={`hidden sm:inline font-montserrat text-[9px] tracking-wide uppercase px-2 py-1 border ${STATUS_BADGE[r.status] ?? ''}`}>
          {r.status?.replace('_', ' ')}
        </span>
        <ChevronDown size={18} className={`text-gold/60 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="border-t border-gold/10 p-5 space-y-6 bg-ink/40">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
            <Detail label="Contact" value={r.contact_name} />
            <Detail label="Email" value={r.email} />
            <Detail label="Mobile" value={r.mobile} />
            <Detail label="State" value={r.state} />
            <Detail label="City" value={r.city} />
            <Detail label="Budget" value={r.budget} />
            <Detail label="Hiring For" value={Array.isArray(r.hiring_for) ? r.hiring_for.join(', ') : null} />
            <Detail label="Website" value={r.website} />
          </div>

          {r.requirement && (
            <div>
              <p className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-cream/35 mb-1">Requirement</p>
              <p className="font-cormorant text-[16px] text-cream/80 leading-relaxed whitespace-pre-wrap">{r.requirement}</p>
            </div>
          )}

          {r.logo_url && (
            <a href={r.logo_url} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-2 px-3 py-2 border border-gold/20 hover:border-gold/50 text-cream/75 hover:text-gold transition-colors font-montserrat text-[11px]">
              <ImageIcon size={14} /> Logo <ExternalLink size={11} className="opacity-50" />
            </a>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gold/10">
            <div>
              <p className="field-label">Status</p>
              <SelectAction entity="business_posts" id={r.id} field="status" value={r.status}
                options={[
                  { value: 'submitted', label: 'Submitted' },
                  { value: 'under_review', label: 'Under Review' },
                  { value: 'approved', label: 'Approved' },
                  { value: 'fulfilled', label: 'Fulfilled' },
                  { value: 'rejected', label: 'Rejected' },
                ]} />
            </div>
            <div>
              <p className="field-label">Payment ({formatINR(r.fee_amount ?? 0)})</p>
              <SelectAction entity="business_posts" id={r.id} field="payment_status" value={r.payment_status}
                options={[
                  { value: 'pending', label: 'Pending' },
                  { value: 'paid', label: 'Paid' },
                  { value: 'waived', label: 'Waived' },
                  { value: 'failed', label: 'Failed' },
                ]} />
            </div>
            <div className="self-end">
              <ToggleVerified entity="business_posts" id={r.id} value={r.is_verified} />
            </div>
          </div>

          <div>
            <p className="field-label">Admin Notes</p>
            <NotesField entity="business_posts" id={r.id} value={r.admin_notes} />
          </div>
        </div>
      )}
    </div>
  )
}
