'use client'

import type { ReactNode } from 'react'

export function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string
  required?: boolean
  children: ReactNode
  hint?: string
}) {
  return (
    <div>
      <label className="field-label">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      {children}
      {hint && <p className="font-montserrat text-[9px] text-cream/30 mt-1.5">{hint}</p>}
    </div>
  )
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`field ${props.className ?? ''}`} />
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`field ${props.className ?? ''}`} />
}

export function Select({
  options,
  placeholder,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: readonly string[]
  placeholder?: string
}) {
  return (
    <select {...props} className={`field ${props.className ?? ''}`}>
      <option value="">{placeholder ?? 'Select…'}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

/** Multi-select pill group (toggle on/off). */
export function PillGroup({
  options,
  value,
  onChange,
}: {
  options: readonly string[]
  value: string[]
  onChange: (next: string[]) => void
}) {
  function toggle(opt: string) {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt])
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`font-montserrat text-[11px] tracking-wide px-3 py-1.5 border transition-colors ${
              active
                ? 'border-orange-500 bg-orange-500/15 text-orange-300'
                : 'border-white/15 text-cream/60 hover:border-orange-500/50'
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
