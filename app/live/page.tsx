'use client'

import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import { SiteLayout } from '@/components/site-layout'
import { MatchCard } from '@/components/match-card'
import { MOCK_LIVE_MATCHES, MOCK_TODAY_MATCHES, t } from '@/lib/mock-data'
import { useApp } from '@/lib/lang-context'


export default function LivePage() {
  const { lang } = useApp()
  const [countdown, setCountdown] = useState(60)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => (c <= 1 ? 60 : c - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const liveMatches    = MOCK_LIVE_MATCHES
  const upcomingToday  = MOCK_TODAY_MATCHES.filter((m) => m.status === 'SCHEDULED').slice(0, 6)

  return (
    <SiteLayout>
      <div className="max-w-[1100px] mx-auto px-6 py-10 pb-24 md:pb-10">

        {/*  Page header  */}
        <div className="flex items-start justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="live-dot" aria-label="Live" />
              <h1
                className="text-4xl font-extrabold text-[#0D1B2A]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('live_scores', lang)}
              </h1>
            </div>
            <p className="text-[#6B7280]">
              {liveMatches.length > 0
                ? `${liveMatches.length} match${liveMatches.length > 1 ? 'es' : ''} live right now`
                : 'No matches live right now - next kick-off below'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#6B7280] bg-white border-2 border-[#D4D9D0] px-4 py-2 rounded-full shrink-0">
            <RefreshCw size={13} className={countdown < 10 ? 'animate-spin' : ''} />
            <span>
              {countdown}s
            </span>
          </div>
        </div>

        {/*  Live matches  */}
        {liveMatches.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <span className="live-dot-sm" aria-label="Live" />
              <span
                className="text-xs font-bold text-[#EF4444] tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('live_now', lang)}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveMatches.map((match, i) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-14 text-center mb-12">
            <div className="w-14 h-14 rounded-full bg-[#F7F5F0] border-2 border-[#D4D9D0] flex items-center justify-center mx-auto mb-5">
              <RefreshCw size={22} className="text-[#9CA3AF]" />
            </div>
            <h2
              className="text-xl font-bold text-[#0D1B2A] mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              No live matches right now
            </h2>
            <p className="text-[#6B7280] text-sm">Games kick off soon. Check the fixtures below.</p>
          </div>
        )}

        {/*  Coming up today  */}
        {upcomingToday.length > 0 && (
          <div>
            <h2
              className="text-2xl font-bold text-[#0D1B2A] mb-5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Coming Up Today
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingToday.map((match, i) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  )
}
