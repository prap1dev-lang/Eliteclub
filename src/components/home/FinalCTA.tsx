import Link from 'next/link'
import Reveal from '@/components/Reveal'

export default function FinalCTA() {
  return (
    <section className="relative py-32 bg-ink-2 border-t border-gold/15 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] rounded-full bg-gold/8 blur-[120px]" />
      <Reveal className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="hairline mb-7"><span className="font-cinzel text-gold text-sm tracking-[0.3em]">JOIN THE ELITE</span></div>
        <h2 className="font-cinzel text-4xl md:text-6xl text-cream leading-[1.05] mb-6">
          Your seat at the table is{' '}
          <span className="text-gold-gradient">Reserved for Rare.</span>
        </h2>
        <p className="font-cormorant text-[20px] text-cream/65 max-w-xl mx-auto mb-10">
          Register today, get verified, and begin your journey to becoming India&apos;s next
          Elite Champion.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/register" className="btn-gold">Register Now</Link>
          <Link href="/partner" className="btn-ghost">Become a Partner</Link>
        </div>
      </Reveal>
    </section>
  )
}
