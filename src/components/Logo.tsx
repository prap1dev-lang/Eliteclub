import Image from 'next/image'
import Link from 'next/link'

export default function Logo({
  size = 44,
  withText = false,
  href = '/',
}: {
  size?: number
  withText?: boolean
  href?: string | null
}) {
  const inner = (
    <span className="inline-flex items-center gap-3">
      <Image
        src="/logo.png"
        alt="Elite Club"
        width={size}
        height={size}
        priority
        className="rounded-sm"
      />
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="font-cinzel text-gold-light tracking-[0.22em] text-[15px]">
            ELITE CLUB
          </span>
          <span className="font-montserrat text-[8px] tracking-[0.35em] text-orange-400/80 mt-1">
            RESERVED FOR RARE
          </span>
        </span>
      )}
    </span>
  )
  if (!href) return inner
  return (
    <Link href={href} className="inline-flex items-center">
      {inner}
    </Link>
  )
}
