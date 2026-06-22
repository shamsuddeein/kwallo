'use client'

import { useState } from 'react'
import { SiteLayout } from '@/components/site-layout'
import { MOCK_STANDINGS, MOCK_NPFL_STANDINGS, t } from '@/lib/mock-data'
import { useApp } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import { TeamCrest } from '@/components/ui/team-crest'

const LEAGUES = ['EPL', 'NPFL', 'La Liga', 'UCL']

function FormBadge({ result }: { result: string }) {
  const colorMap: Record<string, string> = {
    W: 'bg-[#1B5E38] text-white border-[#0D1B2A]',
    D: 'bg-[#FFF3D0] text-[#0D1B2A] border-[#D4D9D0]',
    L: 'bg-[#FFE8EC] text-[#EF4444] border-[#D4D9D0]',
  }
  return (
    <span
      className={cn(
        'w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center border',
        colorMap[result] ?? 'bg-[#F7F5F0] text-[#6B7280] border-[#D4D9D0]'
      )}
    >
      {result}
    </span>
  )
}

export default function StandingsPage() {
  const { lang }             = useApp()
  const [activeLeague, setActiveLeague] = useState('EPL')

  const standings = activeLeague === 'NPFL' ? MOCK_NPFL_STANDINGS : MOCK_STANDINGS

  return (
    <SiteLayout>
      <div className="max-w-[900px] mx-auto px-6 py-10 pb-24 md:pb-10">

        {/*  Header  */}
        <h1
          className="text-4xl font-extrabold text-[#0D1B2A] mb-10"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {t('standings', lang)}
        </h1>

        {/*  League tabs  */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-7 scrollbar-hide">
          {LEAGUES.map((l) => (
            <button
              key={l}
              onClick={() => setActiveLeague(l)}
              className={cn(
                'shrink-0 px-5 py-2 rounded-full text-sm font-semibold border-2 transition-colors whitespace-nowrap',
                activeLeague === l
                  ? 'bg-[#1B5E38] text-white border-[#0D1B2A]'
                  : 'bg-white text-[#0D1B2A] border-[#0D1B2A] hover:bg-[#F7F5F0]'
              )}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {l}
            </button>
          ))}
        </div>

        {/*  Table  */}
        <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-[2rem_1fr_repeat(5,2.5rem)_3rem_5rem] gap-x-2 px-5 py-3 bg-[#1B5E38]">
            <div className="text-center text-xs font-bold text-white/50 uppercase tracking-wider">#</div>
            <div className="text-xs font-bold text-white/50 uppercase tracking-wider">Club</div>
            <div className="text-center text-xs font-bold text-white/50 uppercase tracking-wider">P</div>
            <div className="text-center text-xs font-bold text-white/50 uppercase tracking-wider">W</div>
            <div className="text-center text-xs font-bold text-white/50 uppercase tracking-wider">D</div>
            <div className="text-center text-xs font-bold text-white/50 uppercase tracking-wider">L</div>
            <div className="text-center text-xs font-bold text-white/50 uppercase tracking-wider">GD</div>
            <div className="text-center text-xs font-bold text-white uppercase tracking-wider">Pts</div>
            <div className="hidden sm:block text-center text-xs font-bold text-white/50 uppercase tracking-wider">Form</div>
          </div>

          {standings.map((row) => {
            const isTop4       = row.position <= 4
            const isRelegation = row.position >= standings.length - 2
            return (
              <div
                key={row.team.id}
                className={cn(
                  'grid grid-cols-[2rem_1fr_repeat(5,2.5rem)_3rem_5rem] gap-x-2 px-5 py-3.5 border-b border-[#D4D9D0] last:border-0 items-center hover:bg-[#F7F5F0] transition-colors',
                  isTop4       && 'border-l-4 border-l-[#1B5E38]',
                  isRelegation && 'border-l-4 border-l-[#EF4444]'
                )}
              >
                <div
                  className="text-center text-sm font-bold text-[#6B7280]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {row.position}
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <TeamCrest team={row.team} size={26} />
                  <span
                    className="font-semibold text-[#0D1B2A] text-sm truncate"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {row.team.name}
                  </span>
                </div>
                <div className="text-center text-sm text-[#6B7280]">{row.played}</div>
                <div className="text-center text-sm text-[#6B7280]">{row.won}</div>
                <div className="text-center text-sm text-[#6B7280]">{row.drawn}</div>
                <div className="text-center text-sm text-[#6B7280]">{row.lost}</div>
                <div
                  className={cn(
                    'text-center text-sm font-semibold',
                    row.goalDiff > 0 ? 'text-[#1B5E38]'
                    : row.goalDiff < 0 ? 'text-[#EF4444]'
                    : 'text-[#6B7280]'
                  )}
                >
                  {row.goalDiff > 0 ? '+' : ''}{row.goalDiff}
                </div>
                <div
                  className="text-center font-bold text-[#0D1B2A] text-base"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {row.points}
                </div>
                <div className="hidden sm:flex items-center justify-center gap-0.5">
                  {row.form.map((r, j) => (
                    <FormBadge key={j} result={r} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/*  Legend  */}
        <div className="flex items-center gap-6 mt-4 text-xs text-[#9CA3AF]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#1B5E38]" />
            <span>Champions League spots</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#EF4444]" />
            <span>Relegation zone</span>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
