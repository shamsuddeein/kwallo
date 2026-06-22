'use client'

import { SiteLayout } from '@/components/site-layout'
import { MOCK_LEADERBOARD, t } from '@/lib/mock-data'
import { useApp } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

const MEDAL_STYLES = [
  { bg: '#FFF3D0', text: '#0D1B2A', label: '2nd'  },  // silver slot (middle-left)
  { bg: '#F5A623', text: '#0D1B2A', label: '1st'  },  // gold slot (centre-top)
  { bg: '#FFE8D6', text: '#0D1B2A', label: '3rd'  },  // bronze slot (right)
]
const PODIUM_HEIGHTS = ['h-20', 'h-28', 'h-16']

export default function LeaderboardPage() {
  const { lang } = useApp()
  const top3 = MOCK_LEADERBOARD.slice(0, 3)
  const podiumOrder = [top3[1], top3[0], top3[2]] // silver, gold, bronze

  return (
    <SiteLayout>
      {/*  Header - cream banner  */}
      <div className="max-w-[780px] mx-auto px-6 pt-10 pb-4">
        <div className="bg-[#FFF3D0] border-2 border-[#0D1B2A] rounded-2xl card-shadow px-8 py-8 text-center">
          <h1
            className="text-3xl font-extrabold text-[#0D1B2A] mb-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('leaderboard', lang)}
          </h1>
          <p
            className="text-[#6B7280] text-sm"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            June 2026, Resets July 1
          </p>
        </div>
      </div>

      <div className="max-w-[780px] mx-auto px-6 py-8 pb-24 md:pb-8">

        {/*  Podium  */}
        <div className="flex items-end justify-center gap-4 mb-10">
          {podiumOrder.map((entry, i) => {
            if (!entry) return null
            const style = MEDAL_STYLES[i]
            return (
              <div key={entry.rank} className="flex flex-col items-center gap-2">
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-full border-2 border-[#0D1B2A] card-shadow-sm flex items-center justify-center font-extrabold text-xl"
                  style={{
                    backgroundColor: style.bg,
                    color: style.text,
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {entry.name.slice(0, 1)}
                </div>
                {/* Name + pts */}
                <div className="text-center">
                  <div
                    className="font-bold text-[#0D1B2A] text-sm"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {entry.name.split(' ')[0]}
                  </div>
                  <div
                    className="font-bold text-[#1B5E38] text-lg"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {entry.points}
                  </div>
                </div>
                {/* Podium block */}
                <div
                  className={cn(
                    'w-20 rounded-t-xl border-2 border-[#0D1B2A] flex items-center justify-center font-extrabold text-lg',
                    PODIUM_HEIGHTS[i]
                  )}
                  style={{
                    backgroundColor: style.bg,
                    color: style.text,
                    fontFamily: 'var(--font-mono)',
                    boxShadow: '3px 3px 0 #0D1B2A',
                  }}
                >
                  {entry.rank}
                </div>
              </div>
            )
          })}
        </div>

        {/*  Full table  */}
        <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow overflow-hidden">
          <div className="grid grid-cols-[2.5rem_1fr_repeat(3,4rem)] gap-x-2 px-5 py-3 bg-[#1B5E38]">
            {['#', 'Player', 'Preds', 'Corr', 'Pts'].map((h, i) => (
              <div
                key={h}
                className={cn(
                  'text-xs font-bold uppercase tracking-wider',
                  i === 0 || i >= 2 ? 'text-center text-white/60' : 'text-white/60',
                  i === 4 && 'text-white'
                )}
              >
                {h === 'Preds' || h === 'Corr' ? (
                  <span className="hidden sm:block">{h}</span>
                ) : h}
              </div>
            ))}
          </div>

          {MOCK_LEADERBOARD.map((entry) => (
            <div
              key={entry.rank}
              className={cn(
                'grid grid-cols-[2.5rem_1fr_repeat(3,4rem)] gap-x-2 px-5 py-4 border-b border-[#D4D9D0] last:border-0 items-center transition-colors hover:bg-[#F7F5F0]',
                entry.isCurrentUser && 'bg-[#D4F0E0] hover:bg-[#D4F0E0]'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full border-2 border-[#0D1B2A] flex items-center justify-center text-sm font-bold mx-auto',
                  entry.rank === 1 ? 'bg-[#F5A623] text-[#0D1B2A]'
                  : entry.rank === 2 ? 'bg-[#F7F5F0] text-[#0D1B2A]'
                  : entry.rank === 3 ? 'bg-[#FFE8D6] text-[#0D1B2A]'
                  : 'bg-white text-[#9CA3AF]'
                )}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {entry.rank}
              </div>

              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-8 h-8 rounded-full border-2 border-[#0D1B2A] flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ backgroundColor: '#1B5E38' }}
                >
                  {entry.name.slice(0, 1)}
                </div>
                <div className="min-w-0">
                  <div
                    className="font-bold text-[#0D1B2A] text-sm truncate"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {entry.name}
                    {entry.isCurrentUser && (
                      <span className="ml-2 px-1.5 py-0.5 rounded-full bg-[#1B5E38] text-white text-[10px] font-bold">
                        YOU
                      </span>
                    )}
                  </div>
                  <div className="text-[#9CA3AF] text-xs">{entry.club}</div>
                </div>
              </div>

              <div className="text-center text-sm text-[#9CA3AF] hidden sm:block">
                {entry.predictions}
              </div>
              <div className="text-center text-sm text-[#1B5E38] font-semibold hidden sm:block">
                {entry.correct}
              </div>
              <div
                className="text-center font-extrabold text-[#0D1B2A] text-lg"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {entry.points}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}
