'use client'

import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { KwalloMark } from '@/components/ui/logo'
import { useApp } from '@/lib/lang-context'
import { t } from '@/lib/mock-data'

const SCORES_LINKS = [
  { href: '/live',         key: 'live_scores'  },
  { href: '/fixtures',     key: 'fixtures'     },
  { href: '/results',      key: 'results'      },
  { href: '/standings',    key: 'standings'    },
  { href: '/npfl',         label: 'NPFL Hub'   },
  { href: '/super-eagles', label: 'Super Eagles' },
]

const COMMUNITY_LINKS = [
  { href: '/predictions', key: 'predictions' },
  { href: '/leaderboard', key: 'leaderboard' },
  { href: '/hot-takes',   key: 'hot_takes'   },
  { href: '/profile',     key: 'profile'     },
]

const INFO_LINKS = [
  { href: '/about',   label: 'About'   },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms',   label: 'Terms'   },
  { href: '/contact', label: 'Contact' },
]

type FLink = { href: string; key?: string; label?: string }

export function Footer() {
  const { lang } = useApp()
  const txt = (l: FLink) => (l.key ? t(l.key, lang) : l.label!)

  const columns: { head: string; links: FLink[] }[] = [
    { head: t('scores', lang),    links: SCORES_LINKS },
    { head: t('community', lang), links: COMMUNITY_LINKS },
    { head: t('info', lang),      links: INFO_LINKS },
  ]

  return (
    <footer className="bg-[#F7F5F0] border-t-2 border-[#0D1B2A] mt-0">

      {/* Top wordmark bar */}
      <div className="border-b-2 border-[#0D1B2A]">
        <div className="max-w-[1100px] mx-auto px-6 py-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <KwalloMark size={56} variant="badge" className="shrink-0" />
            <span
              className="text-[64px] md:text-[96px] leading-none text-[#1B5E38] select-none"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.03em' }}
            >
              Kwallo<span className="text-[#F5A623]">.</span>
            </span>
          </div>
          <p className="text-[#6B7280] text-sm max-w-[300px] leading-relaxed self-end pb-2">
            {t('footer_tagline', lang)}
          </p>
        </div>
      </div>

      {/* Links grid */}
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Social column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6B7280] border-b-2 border-[#0D1B2A] pb-2">
              {t('follow', lang)}
            </h3>
            <div className="flex items-center gap-0">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Kwallo on X"
                className="w-10 h-10 rounded-xl border-2 border-[#0D1B2A] bg-white flex items-center justify-center text-[#0D1B2A] hover:bg-[#1B5E38] hover:text-white hover:border-[#1B5E38] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/kwallo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join Kwallo on WhatsApp"
                className="w-10 h-10 rounded-xl border-2 border-[#0D1B2A] ml-1 bg-white flex items-center justify-center text-[#0D1B2A] hover:bg-[#1B5E38] hover:text-white hover:border-[#1B5E38] transition-colors"
              >
                <MessageCircle size={15} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.head}>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6B7280] border-b-2 border-[#0D1B2A] pb-2 mb-4">
                {col.head}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[#0D1B2A]/60 hover:text-[#1B5E38] text-sm font-bold uppercase tracking-wider transition-colors">
                      {txt(link)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#D9D6CF]">
        <div className="max-w-[1100px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[#6B7280] text-xs font-medium tracking-wide">
            2026 Kwallo. All Rights Reserved.
          </span>
          <div className="flex items-center gap-0">
            <Link href="/privacy" className="text-[#6B7280] hover:text-[#1B5E38] text-xs font-semibold transition-colors px-4 border-r border-[#D9D6CF]">Privacy</Link>
            <Link href="/terms"   className="text-[#6B7280] hover:text-[#1B5E38] text-xs font-semibold transition-colors px-4">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
