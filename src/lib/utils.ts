import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a number as Indian Rupees, e.g. 1100 → "₹1,100". */
export function formatINR(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN')
}

/** Compute an Elite Club age category label from a date of birth. */
export function ageCategoryFromDOB(dob: string): string {
  if (!dob) return ''
  const birth = new Date(dob)
  if (isNaN(birth.getTime())) return ''
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const m = now.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--

  if (age < 16) return 'Below 16 (not eligible)'
  if (age <= 20) return 'Elite Teen (16-20)'
  if (age <= 25) return 'Emerging Creator (21-25)'
  if (age <= 30) return 'Professional Creator (26-30)'
  if (age <= 40) return 'Elite Professional (31-40)'
  return 'Legacy Creator (41+)'
}

export function formatDate(d: string | Date): string {
  const date = typeof d === 'string' ? new Date(d) : d
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
