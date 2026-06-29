/**
 * Unsigned, direct-from-browser uploads to Cloudinary.
 * Requires a Cloudinary **unsigned** upload preset (Settings → Upload).
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    CLOUD_NAME &&
      UPLOAD_PRESET &&
      !CLOUD_NAME.includes('YOUR_') &&
      !UPLOAD_PRESET.includes('YOUR_')
  )
}

export type UploadKind = 'image' | 'video' | 'raw' | 'auto'

/**
 * Upload a single file to Cloudinary. Returns the secure URL.
 * `onProgress` is called 0..100.
 */
export async function uploadToCloudinary(
  file: File,
  opts: { folder?: string; kind?: UploadKind; onProgress?: (pct: number) => void } = {}
): Promise<string> {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      'Cloudinary is not configured. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to .env.local'
    )
  }

  const kind = opts.kind ?? 'auto'
  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${kind}/upload`

  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', UPLOAD_PRESET as string)
  if (opts.folder) form.append('folder', opts.folder)

  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', endpoint)
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && opts.onProgress) {
        opts.onProgress(Math.round((e.loaded / e.total) * 100))
      }
    }
    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText)
        if (xhr.status >= 200 && xhr.status < 300 && res.secure_url) {
          resolve(res.secure_url as string)
        } else {
          reject(new Error(res?.error?.message || `Upload failed (${xhr.status})`))
        }
      } catch {
        reject(new Error('Upload failed: invalid response'))
      }
    }
    xhr.onerror = () => reject(new Error('Upload failed: network error'))
    xhr.send(form)
  })
}
