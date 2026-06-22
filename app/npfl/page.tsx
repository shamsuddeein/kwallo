'use client'

import { SiteLayout } from '@/components/site-layout'
import { MatchCard } from '@/components/match-card'
import { MOCK_TODAY_MATCHES, MOCK_NPFL_STANDINGS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { TeamCrest } from '@/components/ui/team-crest'


const TOP_SCORERS = [
  { pos: 1, name: 'Chisom Egbuchulam', team: 'Enyimba FC',     goals: 14 },
  { pos: 2, name: 'Cyril Olisema',     team: "Rangers Int'l",  goals: 11 },
  { pos: 3, name: 'Sikiru Alimi',      team: 'Kano Pillars',   goals: 10 },
  { pos: 4, name: 'Emeka Eze',         team: 'Heartland FC',   goals: 9  },
  { pos: 5, name: 'Ibrahim Sunusi',    team: 'Kano Pillars',   goals: 8  },
]

export default function NPFLPage() {
  const npflMatches = MOCK_TODAY_MATCHES.filter((m) => m.competition.id === 'npfl')

  return (
    <SiteLayout>
      {/*  Hero banner - cream, NOT navy  */}
      <div className="max-w-[1100px] mx-auto px-6 pt-10 pb-4">
        <div className="bg-[#D4F0E0] border-2 border-[#0D1B2A] rounded-2xl card-shadow px-8 py-10 relative overflow-hidden">
          {/* Decorative shape */}
          <div
            className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-[#FFF3D0] border-2 border-[#0D1B2A] -z-10"
            aria-hidden
          />
          <div
            className="absolute right-24 -bottom-8 w-20 h-20 rounded-2xl bg-[#FFE8D6] border-2 border-[#0D1B2A] -z-10"
            style={{ transform: 'rotate(12deg)' }}
            aria-hidden
          />
          <span
            className="inline-block px-4 py-1.5 rounded-full bg-white border-2 border-[#0D1B2A] text-[#1B5E38] text-sm font-semibold mb-5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Nigeria Professional Football League
          </span>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-[#0D1B2A] leading-tight mb-3 text-balance"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The Nigerian<br />
            <span className="text-[#1B5E38]">Professional League.</span>
          </h1>
          <p className="text-[#6B7280] text-lg max-w-xl">
            Daily scores, standings and match previews for every NPFL club.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-8 pb-24 md:pb-8 space-y-12">

        {/*  Today's NPFL Matches  */}
        <section>
          <h2
            className="text-2xl font-bold text-[#0D1B2A] mb-5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Today&apos;s NPFL Matches
          </h2>
          {npflMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {npflMatches.map((m, i) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-12 text-center">
              <p className="font-bold text-[#0D1B2A] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                No NPFL matches today
              </p>
              <p className="text-[#6B7280] text-sm">Check the full fixtures for upcoming games.</p>
            </div>
          )}
        </section>

        {/*  NPFL Standings  */}
        <section>
          <h2
            className="text-2xl font-bold text-[#0D1B2A] mb-5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            NPFL Standings
          </h2>
          <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow overflow-hidden">
            <div className="grid grid-cols-[2rem_1fr_repeat(5,2.5rem)_4rem] gap-x-2 px-5 py-3 bg-[#1B5E38]">
              {['#', 'Club', 'P', 'W', 'D', 'L', 'GD', 'Pts'].map((h, i) => (
                <div
                  key={h}
                  className={cn(
                    'text-xs font-bold uppercase tracking-wider',
                    i === 0 ? 'text-center text-white/50'
                    : i === 1 ? 'text-white/50'
                    : i === 7 ? 'text-center text-white'
                    : 'text-center text-white/50'
                  )}
                >
                  {h}
                </div>
              ))}
            </div>
            {MOCK_NPFL_STANDINGS.map((row) => (
              <div
                key={row.team.id}
                className={cn(
                  'grid grid-cols-[2rem_1fr_repeat(5,2.5rem)_4rem] gap-x-2 px-5 py-3.5 border-b border-[#D4D9D0] last:border-0 items-center hover:bg-[#F7F5F0] transition-colors',
                  row.position <= 3 && 'border-l-4 border-l-[#1B5E38]'
                )}
              >
                <div
                  className="text-center text-sm font-bold text-[#9CA3AF]"
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
                <div className={cn('text-center text-sm font-semibold', row.goalDiff >= 0 ? 'text-[#1B5E38]' : 'text-[#EF4444]')}>
                  {row.goalDiff > 0 ? '+' : ''}{row.goalDiff}
                </div>
                <div
                  className="text-center font-bold text-[#0D1B2A]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {row.points}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/*  Top Scorers  */}
        <section>
          <h2
            className="text-2xl font-bold text-[#0D1B2A] mb-5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Top Scorers
          </h2>
          <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow overflow-hidden">
            {TOP_SCORERS.map((scorer, i) => (
              <div
                key={scorer.pos}
                className="flex items-center gap-4 px-5 py-4 border-b border-[#D4D9D0] last:border-0 hover:bg-[#F7F5F0] transition-colors"
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full border-2 border-[#0D1B2A] flex items-center justify-center text-sm font-bold shrink-0',
                    i === 0 ? 'bg-[#FFF3D0] text-[#0D1B2A]' : 'bg-white text-[#6B7280]'
                  )}
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {scorer.pos}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="font-semibold text-[#0D1B2A] text-sm"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {scorer.name}
                  </div>
                  <div className="text-[#6B7280] text-xs">{scorer.team}</div>
                </div>
                <div
                  className="text-xl font-bold text-[#1B5E38]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {scorer.goals}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  )
}
