'use client'

import { useState, use } from 'react'
import { Download, Share2, MessageSquare, BarChart2, Users, Target, Circle, Heart, Loader2 } from 'lucide-react'
import { SiteLayout } from '@/components/site-layout'
import { MOCK_TODAY_MATCHES, formatWAT, formatMatchDate } from '@/lib/mock-data'
import { downloadMatchCard } from '@/lib/card-generator'
import { showToast } from '@/lib/toast'
import { useApp } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TeamCrest } from '@/components/ui/team-crest'

const MOCK_AI_PREVIEW = {
  en: `Arsenal are unbeaten in their last eight league games and have conceded only three goals in that run. Bukayo Saka has been involved in most of their goals.\n\nChelsea have won their last two under a new coach, but they have struggled at the Emirates in recent seasons. Cole Palmer is their main threat going forward.\n\nArsenal start as favourites at home, though Chelsea have the players to cause problems on the break.`,
  ha: `Arsenal ba a kayar da su ba a wasanni takwas na karshe, sun ci ƙwallaye uku kacal a wannan lokacin. Bukayo Saka ya taka rawa a yawancin ƙwallayensu.\n\nChelsea sun lashe wasanni biyu na karshe a ƙarƙashin sabon koci, amma sun sha wahala a Emirates a kakaki na baya. Cole Palmer shi ne babbar barazana.\n\nArsenal su ne masu fifiko a gida, ko da yake Chelsea na da 'yan wasan da za su iya damun su.`,
}

const MOCK_STATS = [
  { label: 'Possession', home: 58, away: 42 },
  { label: 'Shots',      home: 14, away: 8  },
  { label: 'On Target',  home: 7,  away: 3  },
  { label: 'Corners',    home: 6,  away: 4  },
  { label: 'Fouls',      home: 11, away: 14 },
  { label: 'Yellow Cards', home: 1, away: 2 },
]

const MOCK_COMMENTS = [
  { id: 1, user: 'Musa K.',  club: 'Arsenal',   text: 'Saka has been our best player today by a mile.', likes: 34, time: "67'" },
  { id: 2, user: 'Tunde P.', club: 'Chelsea',   text: 'Sterling was unlucky not to equalise. That should have been 1-1.', likes: 12, time: "45'" },
  { id: 3, user: 'Amaka N.', club: 'Man City',  text: 'If Arsenal keep this up they will be hard to catch.', likes: 28, time: "30'" },
]

export default function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id }   = use(params)
  const { lang } = useApp()

  const [comment,      setComment]      = useState('')
  const [predHome,     setPredHome]     = useState('')
  const [predAway,     setPredAway]     = useState('')
  const [voted,        setVoted]        = useState<string | null>(null)
  const [commentLikes, setCommentLikes] = useState<Record<number, number>>({})
  const [saving,       setSaving]       = useState(false)

  const match    = MOCK_TODAY_MATCHES.find((m) => m.id === id) ?? MOCK_TODAY_MATCHES[0]
  const isLive   = match.status === 'LIVE' || match.status === 'HT'
  const hasScore = match.homeScore !== null && match.awayScore !== null

  async function handleDownload() {
    if (saving) return
    setSaving(true)
    try {
      await downloadMatchCard(match)
      showToast('Card downloaded. Share it on WhatsApp.')
    } catch {
      showToast('Could not generate the card. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  function handleShare() {
    const text = hasScore
      ? `${match.homeTeam.name} ${match.homeScore}-${match.awayScore} ${match.awayTeam.name} | kwallo.ng/match/${match.id} via Kwallo`
      : `${match.homeTeam.name} vs ${match.awayTeam.name} - ${formatWAT(match.kickoffTime)} | kwallo.ng/match/${match.id} via Kwallo`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const headerBg = isLive ? '#D4F0E0' : match.status === 'FT' ? '#E8F0FF' : '#FFF3D0'

  return (
    <SiteLayout>
      {/*  Match hero header  */}
      <div
        className="border-b-2 border-[#0D1B2A] px-6 pt-10 pb-10"
        style={{ backgroundColor: headerBg }}
      >
        <div className="max-w-[800px] mx-auto">

          {/* Competition + status */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span
              className="px-3 py-1 rounded-full bg-white border-2 border-[#0D1B2A] text-[#6B7280] text-xs font-bold tracking-wide"
            >
              {match.competition.name.toUpperCase()}
            </span>
            {isLive && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B5E38] text-white text-xs font-bold">
                <span className="live-dot-sm" />
                LIVE {match.minute}&apos;
              </span>
            )}
            {match.status === 'HT' && (
              <span className="px-3 py-1 rounded-full bg-[#F5A623] border-2 border-[#0D1B2A] text-[#0D1B2A] text-xs font-bold">HT</span>
            )}
            {match.status === 'FT' && (
              <span className="px-3 py-1 rounded-full bg-[#1B5E38] text-white text-xs font-bold">FULL TIME</span>
            )}
          </div>

          {/* Teams + Score row */}
          <div className="flex items-center justify-between gap-4 mb-3">
            {/* Home team */}
            <div className="flex-1 flex flex-col items-center gap-3">
              <TeamCrest team={match.homeTeam} size={64} />
              <span
                className="font-bold text-[#0D1B2A] text-center text-balance"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {match.homeTeam.name}
              </span>
            </div>

            {/* Score / KO time */}
            <div className="text-center shrink-0 px-4">
              {hasScore ? (
                <>
                  <div
                    className="text-5xl md:text-6xl font-bold text-[#0D1B2A]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {match.homeScore}-{match.awayScore}
                  </div>
                  {match.homeScorers && (
                    <div className="mt-2 text-[#6B7280] text-xs text-center leading-snug">
                      {match.homeScorers.join(', ')}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div
                    className="text-2xl font-bold text-[#1B5E38]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {formatWAT(match.kickoffTime)}
                  </div>
                  <div className="text-[#9CA3AF] text-sm mt-1">{formatMatchDate(match.kickoffTime)}</div>
                </>
              )}
            </div>

            {/* Away team */}
            <div className="flex-1 flex flex-col items-center gap-3">
              <TeamCrest team={match.awayTeam} size={64} />
              <span
                className="font-bold text-[#0D1B2A] text-center text-balance"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {match.awayTeam.name}
              </span>
            </div>
          </div>

          {/* Venue */}
          {match.venue && (
            <p className="text-center text-[#9CA3AF] text-xs mb-8">{match.venue}</p>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleDownload}
              disabled={saving}
              className="flex items-center gap-2 bg-[#1B5E38] text-white font-semibold px-5 py-2.5 rounded-full border-2 border-[#0D1B2A] hover:opacity-90 transition-opacity text-sm disabled:opacity-60"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
              {saving ? 'Saving' : 'Download Match Card'}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-white text-[#0D1B2A] font-semibold px-5 py-2.5 rounded-full border-2 border-[#0D1B2A] card-shadow-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-0 transition-transform text-sm"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <Share2 size={14} />
              Share on WhatsApp
            </button>
            {match.status === 'SCHEDULED' && (
              <button
                className="flex items-center gap-2 bg-[#FFF3D0] text-[#0D1B2A] font-semibold px-5 py-2.5 rounded-full border-2 border-[#0D1B2A] card-shadow-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-0 transition-transform text-sm"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <Target size={14} />
                Predict This Match
              </button>
            )}
          </div>
        </div>
      </div>

      {/*  Tabs  */}
      <div className="max-w-[800px] mx-auto px-6 py-8 pb-24 md:pb-8">
        <Tabs defaultValue="overview">
          <TabsList className="bg-white border-2 border-[#0D1B2A] rounded-full p-1 mb-6 flex gap-1 w-full overflow-x-auto scrollbar-hide">
            {[
              { value: 'overview',    label: 'Overview',    icon: <BarChart2 size={13} />   },
              { value: 'stats',       label: 'Stats',       icon: <BarChart2 size={13} />   },
              { value: 'lineups',     label: 'Lineups',     icon: <Users size={13} />       },
              { value: 'predictions', label: 'Predict',     icon: <Target size={13} />      },
              { value: 'comments',    label: 'Comments',    icon: <MessageSquare size={13} />},
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-full text-xs sm:text-sm font-semibold data-[state=active]:bg-[#1B5E38] data-[state=active]:text-white text-[#6B7280] data-[state=active]:shadow-none whitespace-nowrap px-3 py-2"
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/*  Overview  */}
          <TabsContent value="overview">
            {hasScore && (match.homeScorers?.length || match.awayScorers?.length) && (
              <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-5 mb-4">
                <h3
                  className="font-bold text-[#0D1B2A] mb-4 text-sm uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Goal Scorers
                </h3>
                <div className="flex gap-6">
                  <div className="flex-1 space-y-2">
                    {match.homeScorers?.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#0D1B2A]">
                        <Circle size={6} className="fill-[#1B5E38] text-[#1B5E38] shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                  <div className="w-px bg-[#D4D9D0]" />
                  <div className="flex-1 space-y-2">
                    {match.awayScorers?.map((s, i) => (
                      <div key={i} className="flex items-center justify-end gap-2 text-sm text-[#0D1B2A]">
                        {s}
                        <Circle size={6} className="fill-[#1B5E38] text-[#1B5E38] shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-5">
              <div className="flex items-center gap-2 mb-4">
                <h3
                  className="font-bold text-[#0D1B2A]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {hasScore ? 'Match Report' : 'Match Preview'}
                </h3>
              </div>
              <div>
                {(lang === 'ha' ? MOCK_AI_PREVIEW.ha : MOCK_AI_PREVIEW.en)
                  .split('\n\n')
                  .map((para, i) => (
                    <p key={i} className="text-[#0D1B2A] leading-relaxed text-sm mb-3 last:mb-0">
                      {para}
                    </p>
                  ))}
              </div>
            </div>
          </TabsContent>

          {/*  Stats  */}
          <TabsContent value="stats">
            <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <span
                  className="font-bold text-[#0D1B2A] text-sm"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {match.homeTeam.shortName}
                </span>
                <span className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">Stats</span>
                <span
                  className="font-bold text-[#0D1B2A] text-sm"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {match.awayTeam.shortName}
                </span>
              </div>

              {MOCK_STATS.map((stat) => {
                const homeWidth = Math.round((stat.home / (stat.home + stat.away)) * 100)
                return (
                  <div key={stat.label} className="mb-5">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span
                        className="font-bold text-[#1B5E38]"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {stat.home}
                      </span>
                      <span className="text-[#6B7280] text-xs">{stat.label}</span>
                      <span
                        className="font-bold text-[#6B7280]"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {stat.away}
                      </span>
                    </div>
                    <div className="flex h-2 gap-0.5 rounded-full overflow-hidden bg-[#F7F5F0] border border-[#D4D9D0]">
                      <div
                        className="bg-[#1B5E38] rounded-l-full transition-all"
                        style={{ width: `${homeWidth}%` }}
                      />
                      <div className="bg-[#D4D9D0] flex-1 rounded-r-full" />
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>

          {/*  Lineups  */}
          <TabsContent value="lineups">
            <div className="grid md:grid-cols-2 gap-4">
              {[match.homeTeam, match.awayTeam].map((team) => (
                <div key={team.id} className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <TeamCrest team={team} size={28} />
                    <span
                      className="font-bold text-[#0D1B2A]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {team.name}
                    </span>
                  </div>

                  {['GK', 'CB', 'CB', 'LB', 'RB', 'CM', 'CM', 'CAM', 'LW', 'RW', 'ST'].map((pos, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-2.5 border-b border-[#D4D9D0] last:border-0"
                    >
                      <span
                        className="w-6 text-center text-sm font-bold text-[#9CA3AF]"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-[#6B7280] text-xs font-semibold w-8">{pos}</span>
                      <span className="text-sm text-[#0D1B2A] font-medium">Player {i + 1}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </TabsContent>

          {/*  Predictions  */}
          <TabsContent value="predictions">
            <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-5 mb-4">
              <h3
                className="font-bold text-[#0D1B2A] mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Who will win?
              </h3>
              <div className="flex gap-2">
                {[
                  { label: match.homeTeam.shortName + ' Win', value: 'home', pct: 52, bg: '#D4F0E0' },
                  { label: 'Draw',                             value: 'draw', pct: 22, bg: '#FFF3D0' },
                  { label: match.awayTeam.shortName + ' Win', value: 'away', pct: 26, bg: '#FFE8EC' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setVoted(opt.value)}
                    className={cn(
                      'flex-1 py-4 rounded-2xl border-2 text-sm font-semibold transition-all',
                      voted === opt.value
                        ? 'border-[#0D1B2A] card-shadow'
                        : 'border-[#D4D9D0] hover:border-[#0D1B2A]'
                    )}
                    style={{ backgroundColor: voted === opt.value ? opt.bg : 'white' }}
                  >
                    <div style={{ fontFamily: 'var(--font-display)' }}>{opt.label}</div>
                    {voted && (
                      <div className="text-[#6B7280] text-xs mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
                        {opt.pct}%
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {match.status === 'SCHEDULED' && (
              <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-5">
                <h3
                  className="font-bold text-[#0D1B2A] mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Predict the Score
                </h3>
                <p className="text-[#9CA3AF] text-xs mb-5">Exact score = 3 pts, Correct winner = 1 pt</p>

                <div className="flex items-center justify-center gap-5 mb-5">
                  <div className="text-center">
                    <div className="text-xs text-[#6B7280] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                      {match.homeTeam.shortName}
                    </div>
                    <input
                      type="number" min="0" max="20"
                      value={predHome}
                      onChange={(e) => setPredHome(e.target.value)}
                      className="w-16 h-14 text-center text-2xl font-bold border-2 border-[#0D1B2A] rounded-2xl focus:outline-none focus:border-[#1B5E38] bg-[#F7F5F0]"
                      style={{ fontFamily: 'var(--font-mono)' }}
                      placeholder="0"
                    />
                  </div>
                  <span
                    className="text-2xl font-bold text-[#D4D9D0]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    -
                  </span>
                  <div className="text-center">
                    <div className="text-xs text-[#6B7280] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                      {match.awayTeam.shortName}
                    </div>
                    <input
                      type="number" min="0" max="20"
                      value={predAway}
                      onChange={(e) => setPredAway(e.target.value)}
                      className="w-16 h-14 text-center text-2xl font-bold border-2 border-[#0D1B2A] rounded-2xl focus:outline-none focus:border-[#1B5E38] bg-[#F7F5F0]"
                      style={{ fontFamily: 'var(--font-mono)' }}
                      placeholder="0"
                    />
                  </div>
                </div>

                <button
                  className="w-full bg-[#1B5E38] text-white font-bold py-3 rounded-full border-2 border-[#0D1B2A] card-shadow-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-0 transition-transform"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Submit Prediction
                </button>
              </div>
            )}
          </TabsContent>

          {/*  Comments  */}
          <TabsContent value="comments">
            <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-5 mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts on this match... (login required)"
                className="w-full text-sm text-[#0D1B2A] placeholder-[#9CA3AF] resize-none outline-none h-20 mb-3 bg-transparent"
              />
              <div className="flex justify-between items-center border-t border-[#D4D9D0] pt-3">
                <span className="text-xs text-[#9CA3AF]">{comment.length}/280</span>
                <button
                  disabled={comment.trim().length === 0}
                  className="px-5 py-2 rounded-full bg-[#1B5E38] text-white text-xs font-bold border-2 border-[#0D1B2A] card-shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Post
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {MOCK_COMMENTS.map((c) => (
                <div
                  key={c.id}
                  className="bg-white border-2 border-[#0D1B2A] rounded-2xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#1B5E38] border-2 border-[#0D1B2A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {c.user.slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0D1B2A]">{c.user}</p>
                      <p className="text-xs text-[#9CA3AF]">{c.club}, {c.time}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#0D1B2A] leading-relaxed mb-3">{c.text}</p>
                  <button
                    onClick={() => setCommentLikes((prev) => ({ ...prev, [c.id]: (prev[c.id] ?? c.likes) + 1 }))}
                    className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-[#EF4444] transition-colors"
                  >
                    <Heart size={12} strokeWidth={1.5} />
                    <span style={{ fontFamily: 'var(--font-mono)' }}>
                      {commentLikes[c.id] ?? c.likes}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </SiteLayout>
  )
}
