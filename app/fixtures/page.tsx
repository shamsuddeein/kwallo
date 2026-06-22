'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { SiteLayout } from '@/components/site-layout'
import { MatchCard } from '@/components/match-card'
import { MOCK_TODAY_MATCHES, t } from '@/lib/mock-data'
import { useApp } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

const COMP_TABS = ['All', 'EPL', 'NPFL', 'UCL', 'La Liga', 'Super Eagles']

export default function FixturesPage() {
  const { lang }          = useApp()
  const [activeTab, setActiveTab] = useState('All')
  const [dayOffset, setDayOffset] = useState(0)

  const today = new Date()
  today.setDate(today.getDate() + dayOffset)
  const dateLabel =
    dayOffset === 0  ? 'Today'
    : dayOffset === 1  ? 'Tomorrow'
    : dayOffset === -1 ? 'Yesterday'
    : today.toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' })

  const scheduled = MOCK_TODAY_MATCHES.filter((m) => m.status === 'SCHEDULED' || m.status === 'LIVE')
  const filtered  = activeTab === 'All'
    ? scheduled
    : scheduled.filter((m) =>
        m.competition.shortName.toUpperCase() === activeTab.toUpperCase() ||
        (activeTab === 'Super Eagles' && m.competition.id === 'superEagles') ||
        (activeTab === 'La Liga'     && m.competition.id === 'laliga')
      )

  return (
    <SiteLayout>
      <div className="max-w-[1100px] mx-auto px-6 py-10 pb-24 md:pb-10">

        {/*  Header  */}
        <div className="flex items-center justify-between mb-10 gap-4">
          <h1
            className="text-4xl font-extrabold text-[#0D1B2A]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('fixtures', lang)}
          </h1>

          {/* Date nav pill */}
          <div className="flex items-center gap-1 bg-white border-2 border-[#0D1B2A] rounded-full p-1 card-shadow-sm">
            <button
              onClick={() => setDayOffset((d) => d - 1)}
              className="w-8 h-8 rounded-full hover:bg-[#F7F5F0] transition-colors flex items-center justify-center text-[#0D1B2A]"
              aria-label="Previous day"
            >
              <ChevronLeft size={16} />
            </button>
            <span
              className="font-bold text-[#0D1B2A] text-sm px-3 min-w-[80px] text-center"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {dateLabel}
            </span>
            <button
              onClick={() => setDayOffset((d) => d + 1)}
              className="w-8 h-8 rounded-full hover:bg-[#F7F5F0] transition-colors flex items-center justify-center text-[#0D1B2A]"
              aria-label="Next day"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/*  Competition tabs  */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-7 scrollbar-hide">
          {COMP_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'shrink-0 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors whitespace-nowrap',
                activeTab === tab
                  ? 'bg-[#1B5E38] text-white border-[#0D1B2A]'
                  : 'bg-white text-[#0D1B2A] border-[#0D1B2A] hover:bg-[#F7F5F0]'
              )}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/*  Match grid  */}
        {filtered.length === 0 ? (
          <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-14 text-center">
            <div className="w-14 h-14 rounded-full bg-[#F7F5F0] border-2 border-[#D4D9D0] flex items-center justify-center mx-auto mb-5">
              <Calendar size={22} className="text-[#9CA3AF]" />
            </div>
            <p className="font-bold text-[#0D1B2A] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              No fixtures found
            </p>
            <p className="text-[#6B7280] text-sm">Try a different date or competition.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((match, i) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  )
}
