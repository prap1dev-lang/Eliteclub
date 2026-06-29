'use client'

import { useRef, useState } from 'react'
import { uploadToCloudinary, isCloudinaryConfigured, type UploadKind } from '@/lib/cloudinary'
import { UploadCloud, CheckCircle2, Loader2, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function FileUpload({
  label,
  kind = 'auto',
  accept,
  folder = 'elite-club',
  required = false,
  value,
  onChange,
}: {
  label: string
  kind?: UploadKind
  accept?: string
  folder?: string
  required?: boolean
  value: string | null
  onChange: (url: string | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [progress, setProgress] = useState<number | null>(null)
  const [fileName, setFileName] = useState('')

  async function handleFile(file: File) {
    if (!isCloudinaryConfigured()) {
      toast.error('Cloudinary not configured yet — add keys to .env.local')
      return
    }
    setFileName(file.name)
    setProgress(0)
    try {
      const url = await uploadToCloudinary(file, {
        folder,
        kind,
        onProgress: (p) => setProgress(p),
      })
      onChange(url)
      setProgress(100)
      toast.success(`${label} uploaded`)
    } catch (e: any) {
      toast.error(e?.message || 'Upload failed')
      setProgress(null)
      setFileName('')
      onChange(null)
    }
  }

  const uploading = progress !== null && progress < 100
  const done = value && progress === 100

  return (
    <div>
      <label className="field-label">
        {label} {required && <span className="text-gold">*</span>}
      </label>

      {!value ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full border border-dashed border-gold/30 hover:border-gold/60 bg-ink px-4 py-6 flex flex-col items-center justify-center gap-2 transition-colors disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 size={22} className="text-gold animate-spin" />
              <span className="font-montserrat text-[11px] tracking-wide text-cream/60">
                Uploading {progress}% — {fileName}
              </span>
            </>
          ) : (
            <>
              <UploadCloud size={22} className="text-gold/70" />
              <span className="font-montserrat text-[11px] tracking-wide text-cream/55">
                Click to upload
              </span>
              {accept && (
                <span className="font-montserrat text-[9px] text-cream/30">{accept}</span>
              )}
            </>
          )}
        </button>
      ) : (
        <div className="w-full border border-gold/30 bg-ink px-4 py-3 flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 min-w-0">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span className="font-cormorant text-[15px] text-cream/80 truncate">
              {fileName || 'Uploaded'}
            </span>
          </span>
          <button
            type="button"
            onClick={() => {
              onChange(null)
              setProgress(null)
              setFileName('')
              if (inputRef.current) inputRef.current.value = ''
            }}
            className="text-cream/40 hover:text-gold shrink-0"
            aria-label="Remove"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleFile(f)
        }}
      />
    </div>
  )
}
