'use client'

import Link from 'next/link'
import { useApp } from '@/lib/lang-context'
import { t, MOCK_LIVE_MATCHES } from '@/lib/mock-data'
import { TeamCrest } from '@/components/ui/team-crest'

export function Hero() {
  const { lang } = useApp()
  const match = MOCK_LIVE_MATCHES[0]

  return (
    <section className="px-4 pt-10 pb-16 overflow-hidden">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/*  Left: copy  */}
        <div className="flex flex-col gap-6">
          {/* Badge pill - plain text */}
          <div>
            <span className="inline-block bg-[#1B5E38] text-white text-xs font-bold uppercase tracking-[0.06em] px-4 py-1.5 rounded-full">
              {t('nigeria_football_hub', lang)}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-[52px] md:text-[64px] leading-[1.05] text-[#0D1B2A]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em' }}
          >
            {t('hero_line1', lang)}<br />
            <span style={{ color: '#F5A623' }}>{t('hero_line2', lang)}</span>
          </h1>

          <p className="text-[#6B7280] text-lg leading-relaxed max-w-[440px]">
            {t('hero_sub', lang)}
          </p>

          {/* Buttons - one filled primary, one quiet secondary */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/predictions"
              className="px-7 py-3.5 bg-[#1B5E38] text-white font-semibold text-sm rounded-full border-2 border-[#1B5E38] btn-press"
            >
              {t('start_predicting', lang)}
            </Link>
            <Link
              href="/live"
              className="px-7 py-3.5 bg-transparent text-[#0D1B2A] font-semibold text-sm rounded-full border-2 border-[#0D1B2A]/15 hover:border-[#0D1B2A]/40 transition-colors"
            >
              {t('see_live_scores', lang)}
            </Link>
          </div>
        </div>

        {/*  Right: floating card mockup  */}
        <div className="relative flex justify-center lg:justify-end">

          {/* Decorative shapes */}
          <div className="kw-decor hidden sm:block absolute -top-6 -right-2 w-20 h-20 rounded-full bg-[#D4F0E0] border-2 border-[#0D1B2A] z-0" />
          <div className="kw-decor hidden sm:block absolute -bottom-6 left-2 w-16 h-16 rounded-2xl bg-[#FFF3D0] border-2 border-[#0D1B2A] rotate-[15deg] z-0" />

          <div className="relative w-full max-w-[400px]">
            {/* Main match card */}
            <div className="relative z-10 bg-white border-2 border-[#0D1B2A] rounded-3xl p-6 rotate-[-2deg] shadow-[0_24px_50px_-18px_rgba(13,27,42,0.32)]">
              <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-5">{match.competition.name}</p>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 flex flex-col items-center gap-2">
                  <TeamCrest team={match.homeTeam} size={40} />
                  <p className="text-[#0D1B2A] text-center" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px' }}>{match.homeTeam.name}</p>
                </div>
                <div className="shrink-0 px-1 text-[#0D1B2A]" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '36px' }}>
                  {match.homeScore} - {match.awayScore}
                </div>
                <div className="flex-1 flex flex-col items-center gap-2">
                  <TeamCrest team={match.awayTeam} size={40} />
                  <p className="text-[#0D1B2A] text-center" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px' }}>{match.awayTeam.name}</p>
                </div>
              </div>
              <p className="text-center text-xs text-[#6B7280] mt-5">
                {match.homeScorers?.join(', ')}
              </p>
            </div>

            {/* Overlapping prediction card */}
            <div className="relative z-20 -mt-4 ml-auto w-[230px] bg-white border-2 border-[#0D1B2A] rounded-2xl px-5 py-3 rotate-[3deg] shadow-[0_16px_32px_-12px_rgba(13,27,42,0.28)]">
              <p className="text-xs text-[#6B7280] font-medium">
                Your prediction:{' '}
                <span className="text-[#0D1B2A] font-bold" style={{ fontFamily: 'var(--font-mono)' }}>2 - 1</span>{' '}
                <span className="text-[#1B5E38] font-bold">+3 pts</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
