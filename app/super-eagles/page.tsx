'use client'

import { SiteLayout } from '@/components/site-layout'
import { MatchCard } from '@/components/match-card'
import { MOCK_TODAY_MATCHES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const SQUAD = [
  { pos: 'GK',  name: 'Francis Uzoho',        club: 'Omonia Nicosia', caps: 32 },
  { pos: 'GK',  name: 'Stanley Nwabali',       club: 'Chippa United',  caps: 8  },
  { pos: 'CB',  name: 'William Troost-Ekong',  club: 'Watford',        caps: 74 },
  { pos: 'CB',  name: 'Semi Ajayi',            club: 'West Brom',      caps: 31 },
  { pos: 'RB',  name: 'Calvin Bassey',         club: 'Fulham',         caps: 21 },
  { pos: 'LB',  name: 'Zaidu Sanusi',          club: 'Porto',          caps: 19 },
  { pos: 'CM',  name: 'Frank Onyeka',          club: 'Brentford',      caps: 28 },
  { pos: 'CM',  name: 'Alex Iwobi',            club: 'Fulham',         caps: 62 },
  { pos: 'CAM', name: 'Kelechi Iheanacho',     club: 'Sevilla',        caps: 55 },
  { pos: 'RW',  name: 'Samuel Chukwueze',      club: 'AC Milan',       caps: 39 },
  { pos: 'LW',  name: 'Ademola Lookman',       club: 'Atalanta',       caps: 24 },
  { pos: 'ST',  name: 'Victor Osimhen',        club: 'Galatasaray',    caps: 47 },
]

const POS_COLORS: Record<string, string> = {
  GK: 'bg-[#FFF3D0] text-[#0D1B2A] border-[#F5A623]',
  CB: 'bg-[#D4F0E0] text-[#1B5E38] border-[#1B5E38]',
  RB: 'bg-[#D4F0E0] text-[#1B5E38] border-[#1B5E38]',
  LB: 'bg-[#D4F0E0] text-[#1B5E38] border-[#1B5E38]',
  CM: 'bg-[#E8F0FF] text-[#0D1B2A] border-[#0D1B2A]',
  CAM: 'bg-[#E8F0FF] text-[#0D1B2A] border-[#0D1B2A]',
  RW: 'bg-[#FFE8EC] text-[#EF4444] border-[#EF4444]',
  LW: 'bg-[#FFE8EC] text-[#EF4444] border-[#EF4444]',
  ST: 'bg-[#FFE8EC] text-[#EF4444] border-[#EF4444]',
}

const RECENT_RESULTS = MOCK_TODAY_MATCHES.filter((m) => m.competition.id === 'superEagles')

export default function SuperEaglesPage() {
  return (
    <SiteLayout>
      {/*  Hero - cream, no navy  */}
      <div className="max-w-[1100px] mx-auto px-6 pt-10 pb-4">
        <div className="bg-[#E8F0FF] border-2 border-[#0D1B2A] rounded-2xl card-shadow px-8 py-10 relative overflow-hidden">
          {/* Nigerian green accent strip on left */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#008751] rounded-l-2xl" aria-hidden />
          {/* Decorative shapes */}
          <div
            className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-[#D4F0E0] border-2 border-[#0D1B2A] -z-10"
            aria-hidden
          />
          <div className="flex items-center gap-4 mb-6 pl-4">
            <div
              className="w-16 h-16 rounded-full border-2 border-[#0D1B2A] card-shadow-sm flex items-center justify-center font-extrabold text-white shrink-0"
              style={{ backgroundColor: '#008751', fontFamily: 'var(--font-display)' }}
            >
              NGA
            </div>
            <div>
              <h1
                className="text-4xl font-extrabold text-[#0D1B2A]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Super Eagles
              </h1>
              <p className="text-[#6B7280]">Nigeria National Football Team</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-3 pl-4">
            {[
              { label: 'FIFA Ranking', value: '33' },
              { label: 'AFCON Titles', value: '3'  },
              { label: 'Caps Leader',  value: 'Okocha (73)' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white border-2 border-[#0D1B2A] card-shadow-sm rounded-xl px-4 py-3 min-w-[100px]"
              >
                <div className="text-[#9CA3AF] text-xs mb-0.5">{stat.label}</div>
                <div
                  className="text-[#0D1B2A] font-bold text-sm"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-8 pb-24 md:pb-8 space-y-12">

        {/*  Recent Results  */}
        <section>
          <h2
            className="text-2xl font-bold text-[#0D1B2A] mb-5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Recent Results
          </h2>
          {RECENT_RESULTS.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RECENT_RESULTS.map((m, i) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-12 text-center">
              <p
                className="font-bold text-[#0D1B2A] mb-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                No recent results
              </p>
              <p className="text-[#6B7280] text-sm">Check back after the next Super Eagles match.</p>
            </div>
          )}
        </section>

        {/*  Current Squad  */}
        <section>
          <h2
            className="text-2xl font-bold text-[#0D1B2A] mb-5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Current Squad
          </h2>
          <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow overflow-hidden">
            <div className="grid grid-cols-[3.5rem_1fr_1fr_3.5rem] px-5 py-3 bg-[#1B5E38]">
              {['Pos', 'Player', 'Club', 'Caps'].map((h, i) => (
                <div
                  key={h}
                  className={cn(
                    'text-xs font-bold uppercase tracking-wider text-white/60',
                    i === 3 && 'text-center'
                  )}
                >
                  {h}
                </div>
              ))}
            </div>
            {SQUAD.map((player, i) => (
              <div
                key={i}
                className="grid grid-cols-[3.5rem_1fr_1fr_3.5rem] px-5 py-3.5 border-b border-[#D4D9D0] last:border-0 items-center hover:bg-[#F7F5F0] transition-colors"
              >
                <div>
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-xs font-bold border',
                      POS_COLORS[player.pos] ?? 'bg-[#F7F5F0] text-[#6B7280] border-[#D4D9D0]'
                    )}
                  >
                    {player.pos}
                  </span>
                </div>
                <div
                  className="font-semibold text-[#0D1B2A] text-sm"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {player.name}
                </div>
                <div className="text-[#6B7280] text-sm">{player.club}</div>
                <div
                  className="text-center font-bold text-[#0D1B2A] text-sm"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {player.caps}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  )
}
