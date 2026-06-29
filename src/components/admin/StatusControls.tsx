'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

type Entity = 'registrations' | 'business_posts' | 'enquiries'

export function SelectAction({
  entity, id, field, value, options,
}: {
  entity: Entity
  id: string
  field: string
  value: string
  options: { value: string; label: string }[]
}) {
  const router = useRouter()
  const [val, setVal] = useState(value)
  const [saving, setSaving] = useState(false)

  async function update(next: string) {
    setSaving(true)
    setVal(next)
    try {
      const res = await fetch('/api/admin/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity, id, updates: { [field]: next } }),
      })
      if (!res.ok) {
        const d = await res.json()
        toast.error(d.error || 'Update failed')
        setVal(value)
      } else {
        toast.success('Updated')
        router.refresh()
      }
    } catch {
      toast.error('Network error')
      setVal(value)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="relative inline-flex items-center">
      <select
        value={val}
        disabled={saving}
        onChange={(e) => update(e.target.value)}
        className="field !py-1.5 !text-[13px] !w-auto pr-8"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {saving && <Loader2 size={13} className="animate-spin text-gold absolute right-2" />}
    </div>
  )
}

export function ToggleVerified({
  entity, id, value,
}: {
  entity: Entity
  id: string
  value: boolean
}) {
  const router = useRouter()
  const [on, setOn] = useState(value)
  const [saving, setSaving] = useState(false)

  async function toggle() {
    const next = !on
    setSaving(true)
    setOn(next)
    try {
      const res = await fetch('/api/admin/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity,
          id,
          updates: { is_verified: next, ...(next ? { status: 'verified' } : {}) },
        }),
      })
      if (!res.ok) {
        toast.error('Update failed')
        setOn(!next)
      } else {
        toast.success(next ? 'Marked verified' : 'Verification removed')
        router.refresh()
      }
    } catch {
      toast.error('Network error')
      setOn(!next)
    } finally {
      setSaving(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={saving}
      className={`font-montserrat text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border transition-colors inline-flex items-center gap-2 ${
        on
          ? 'border-emerald-600/50 bg-emerald-900/20 text-emerald-300'
          : 'border-gold/30 text-cream/60 hover:border-gold'
      }`}
    >
      {saving && <Loader2 size={12} className="animate-spin" />}
      {on ? '✓ Verified' : 'Mark Verified'}
    </button>
  )
}

export function NotesField({
  entity, id, value,
}: {
  entity: Entity
  id: string
  value: string | null
}) {
  const [val, setVal] = useState(value ?? '')
  const [saving, setSaving] = useState(false)
  const [dirty, setDirty] = useState(false)

  async function save() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity, id, updates: { admin_notes: val } }),
      })
      if (!res.ok) toast.error('Save failed')
      else { toast.success('Notes saved'); setDirty(false) }
    } catch {
      toast.error('Network error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-2">
      <textarea
        value={val}
        onChange={(e) => { setVal(e.target.value); setDirty(true) }}
        rows={2}
        placeholder="Internal admin notes…"
        className="field !text-[14px]"
      />
      {dirty && (
        <button onClick={save} disabled={saving} className="btn-ghost !py-2 !px-4 !text-[10px]">
          {saving ? 'Saving…' : 'Save Notes'}
        </button>
      )}
    </div>
  )
}
