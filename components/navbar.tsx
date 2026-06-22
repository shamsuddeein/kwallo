'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Home, Radio, Target, User, Zap } from 'lucide-react'
import { useApp } from '@/lib/lang-context'
import { t, MOCK_LIVE_MATCHES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { KwalloMark } from '@/components/ui/logo'

const NAV_LINKS = [
  { href: '/live',        key: 'scores'      },
  { href: '/fixtures',    key: 'fixtures'    },
  { href: '/npfl',        key: 'npfl'        },
  { href: '/predictions', key: 'predictions' },
  { href: '/hot-takes',   key: 'hot_takes'   },
]

export function Navbar() {
  const pathname = usePathname()
  const { lang, setLang, dataLight, setDataLight } = useApp()
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-50">

      {/*  Floating dark-green pill navbar  */}
      <div className="px-4 pt-4 pb-2">
        <nav className="max-w-[1100px] mx-auto bg-[#1B5E38] rounded-full flex items-center h-14 px-5 gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 pr-4 mr-1" aria-label="Kwallo home">
            <KwalloMark size={26} variant="ball" />
            <span
              className="text-white leading-none"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em', fontSize: '24px' }}
            >
              Kwallo<span className="text-[#F5A623]">.</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {NAV_LINKS.map((link) => {
              const label  = t(link.key, lang)
              const active = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-colors',
                    active ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </div>

          {/* Spacer */}
          <div className="flex-1 md:hidden" />

          {/* Right controls */}
          <div className="flex items-center gap-2">

            {/* Data-light icon toggle */}
            <button
              onClick={() => setDataLight(!dataLight)}
              aria-label="Toggle data-light mode"
              aria-pressed={dataLight}
              className={cn(
                'hidden lg:flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors',
                dataLight ? 'bg-[#F5A623] border-[#F5A623] text-[#0D1B2A]' : 'border-white/40 text-white hover:bg-white/10'
              )}
            >
              <Zap size={14} strokeWidth={2.5} />
            </button>

            {/* Language pills */}
            <div className="flex items-center border-2 border-white/40 rounded-full overflow-hidden">
              <button
                onClick={() => setLang('en')}
                className={cn(
                  'px-3 py-1 text-xs font-bold uppercase transition-colors',
                  lang === 'en' ? 'bg-white text-[#1B5E38]' : 'text-white/70 hover:text-white'
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ha')}
                className={cn(
                  'px-3 py-1 text-xs font-bold uppercase border-l-2 border-white/40 transition-colors',
                  lang === 'ha' ? 'bg-white text-[#1B5E38]' : 'text-white/70 hover:text-white'
                )}
              >
                HA
              </button>
            </div>

            {/* Auth buttons */}
            <Link
              href="/login"
              className="hidden sm:flex items-center px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white/80 hover:text-white transition-colors"
            >
              {t('login', lang)}
            </Link>
            <Link
              href="/register"
              className="hidden sm:flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-[#F5A623] text-[#0D1B2A] hover:opacity-90 transition-opacity"
            >
              {t('register', lang)}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border-2 border-white/40 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X size={16} strokeWidth={2.5} /> : <Menu size={16} strokeWidth={2.5} />}
            </button>
          </div>
        </nav>

        {/*  Mobile dropdown  */}
        {open && (
          <div className="max-w-[1100px] mx-auto mt-2 bg-white border-2 border-[#0D1B2A] rounded-2xl overflow-hidden md:hidden">
            {NAV_LINKS.map((link) => {
              const label  = t(link.key, lang)
              const active = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center px-5 py-3.5 text-sm font-bold uppercase tracking-wide border-b-2 border-[#0D1B2A]/10 last:border-0 transition-colors',
                    active ? 'bg-[#1B5E38] text-white' : 'text-[#0D1B2A]/70 hover:bg-[#0D1B2A]/5'
                  )}
                >
                  {label}
                </Link>
              )
            })}
            <div className="flex border-t-2 border-[#0D1B2A]/10">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex-1 text-center py-3.5 text-sm font-bold uppercase border-r-2 border-[#0D1B2A]/10 text-[#0D1B2A]/60 hover:bg-[#0D1B2A]/5 transition-colors"
              >
                {t('login', lang)}
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="flex-1 text-center py-3.5 text-sm font-bold uppercase bg-[#F5A623] text-[#0D1B2A] hover:opacity-90 transition-opacity"
              >
                {t('register', lang)}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/*  Live ticker - plain text on cream  */}
      {MOCK_LIVE_MATCHES.length > 0 && (
        <div className="px-4 pb-1 overflow-hidden">
          <div className="max-w-[1100px] mx-auto flex items-center gap-4">
            <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DC2626] text-white text-[10px] font-bold uppercase tracking-wider">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Live
            </span>
            <div className="overflow-hidden flex-1">
              <div className="ticker-scroll flex gap-8 w-max">
                {[...MOCK_LIVE_MATCHES, ...MOCK_LIVE_MATCHES].map((match, i) => (
                  <Link
                    key={`${match.id}-${i}`}
                    href={`/match/${match.id}`}
                    className="flex items-center gap-2 text-xs text-[#0D1B2A] hover:text-[#1B5E38] transition-colors whitespace-nowrap font-bold uppercase"
                  >
                    <span>{match.homeTeam.shortName}</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }} className="text-[#0D1B2A]">
                      {match.homeScore}-{match.awayScore}
                    </span>
                    <span>{match.awayTeam.shortName}</span>
                    <span className="text-[#DC2626]" style={{ fontFamily: 'var(--font-mono)' }}>{match.minute}&apos;</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export function BottomNav() {
  const pathname = usePathname()
  const { lang }  = useApp()

  const tabs = [
    { href: '/',            label: 'Home',                 icon: Home   },
    { href: '/live',        label: t('live_scores', lang),  icon: Radio  },
    { href: '/predictions', label: t('predictions', lang),  icon: Target },
    { href: '/profile',     label: t('profile', lang),      icon: User   },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe px-3 pb-3">
      <div className="bg-[#1B5E38] rounded-full flex overflow-hidden">
        {tabs.map((tab) => {
          const active = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href)
          const Icon   = tab.icon
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex-1 flex flex-col items-center gap-1 py-3 text-[9px] font-bold uppercase tracking-wider transition-colors',
                active ? 'bg-white/15 text-white' : 'text-white/60 hover:text-white'
              )}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              <span className="leading-none">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
