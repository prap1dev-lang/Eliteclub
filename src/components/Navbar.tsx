'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const LINKS = [
  { href: '/#championship', label: 'Championship' },
  { href: '/#packages', label: 'Membership' },
  { href: '/#discover', label: 'Discover' },
  { href: '/hire', label: 'Hire Talent' },
  { href: '/register', label: 'Register' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink/90 backdrop-blur-md border-b border-gold/15 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <Logo size={scrolled ? 40 : 46} withText />

        <div className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-montserrat text-[11px] tracking-[0.2em] uppercase text-cream/75 hover:text-orange-400 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/register" className="btn-gold !px-7 !py-3 !text-[11px]">
            Register Now
          </Link>
        </div>

        <button
          className="lg:hidden text-orange-400"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-ink/97 backdrop-blur-md border-t border-gold/15 mt-3">
          <div className="px-6 py-6 flex flex-col gap-5">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-cinzel text-[15px] tracking-[0.15em] text-cream/85 hover:text-orange-400"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="btn-gold w-full mt-2"
            >
              Register Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
