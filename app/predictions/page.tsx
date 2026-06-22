'use client'

import { useState } from 'react'
import { Flame, Lock, Target, CheckCircle2 } from 'lucide-react'
import { SiteLayout } from '@/components/site-layout'
import { MOCK_TODAY_MATCHES, t, formatWAT } from '@/lib/mock-data'
import { useApp } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface PredictionInput {
  home: string
  away: string
  submitted: boolean
}

const PAST_PREDICTIONS = [
  { match: 'Arsenal vs Chelsea',      prediction: '2-1', result: '2-1', points: 3, date: 'June 20' },
  { match: 'Super Eagles vs Ghana',   prediction: '2-0', result: '3-1', points: 1, date: 'June 19' },
  { match: 'Enyimba vs Rangers',      prediction: '1-0', result: '0-0', points: 0, date: 'June 18' },
  { match: 'Man City vs Liverpool',   prediction: '2-2', result: '1-0', points: 0, date: 'June 17' },
]

const STAT_BG = ['#D4F0E0', '#FFF3D0', '#FFE8D6']

export default function PredictionsPage() {
  const { lang } = useApp()
  const upcoming  = MOCK_TODAY_MATCHES.filter((m) => m.status === 'SCHEDULED')
  const [predictions, setPredictions] = useState<Record<string, PredictionInput>>({})

  function updatePred(id: string, side: 'home' | 'away', value: string) {
    setPredictions((prev) => {
      const existing = prev[id] ?? { home: '', away: '', submitted: false }
      return { ...prev, [id]: { ...existing, [side]: value } }
    })
  }

  function submitPred(id: string) {
    setPredictions((prev) => {
      const existing = prev[id] ?? { home: '', away: '', submitted: false }
      return { ...prev, [id]: { ...existing, submitted: true } }
    })
  }

  const totalPoints  = PAST_PREDICTIONS.reduce((a, b) => a + b.points, 0)
  const correctCount = PAST_PREDICTIONS.filter((p) => p.points > 0).length
  const streak = 2

  return (
    <SiteLayout>
      <div className="max-w-[780px] mx-auto px-6 py-8 pb-24 md:pb-8">

        {/*  Page header  */}
        <div className="flex items-center justify-between mb-6">
          <h1
            className="text-3xl font-extrabold text-[#0D1B2A]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('predictions', lang)}
          </h1>
          <div
            className="flex items-center gap-1.5 bg-[#FFF3D0] border-2 border-[#0D1B2A] card-shadow-sm text-[#0D1B2A] px-4 py-2 rounded-full text-sm font-bold"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <Flame size={14} className="text-[#F5A623]" />
            {streak} streak
          </div>
        </div>

        {/*  Stats row  */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: 'Total Points',       value: String(totalPoints),    bg: STAT_BG[0] },
            { label: 'Correct',            value: String(correctCount),   bg: STAT_BG[1] },
            { label: 'Current Streak',     value: `${streak}`,            bg: STAT_BG[2] },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border-2 border-[#0D1B2A] rounded-2xl card-shadow p-4 text-center"
              style={{ backgroundColor: stat.bg }}
            >
              <div
                className="text-3xl font-extrabold text-[#0D1B2A] mb-1"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {stat.value}
              </div>
              <div className="text-[#6B7280] text-xs font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/*  Tabs  */}
        <Tabs defaultValue="predict">
          <TabsList className="bg-white border-2 border-[#0D1B2A] rounded-full p-1 mb-6 w-full card-shadow-sm">
            {[
              { value: 'predict', label: 'Predict Now'    },
              { value: 'history', label: 'My Predictions' },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex-1 rounded-full text-sm font-semibold data-[state=active]:bg-[#1B5E38] data-[state=active]:text-white text-[#6B7280] data-[state=active]:shadow-none py-2"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/*  Predict Now  */}
          <TabsContent value="predict">
            {upcoming.length === 0 ? (
              <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-[#F7F5F0] border-2 border-[#0D1B2A] flex items-center justify-center mx-auto mb-3">
                  <Target size={20} className="text-[#9CA3AF]" />
                </div>
                <p
                  className="font-bold text-[#0D1B2A] mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  No upcoming matches
                </p>
                <p className="text-[#6B7280] text-sm">Check back before the next kick-off.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcoming.map((match) => {
                  const pred     = predictions[match.id] ?? { home: '', away: '', submitted: false }
                  const isLocked = match.status !== 'SCHEDULED'
                  return (
                    <div
                      key={match.id}
                      className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-5"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="px-3 py-1 rounded-full bg-[#F7F5F0] border border-[#D4D9D0] text-[#6B7280] text-xs font-bold"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {match.competition.shortName}
                        </span>
                        <span
                          className="text-[#F5A623] text-sm font-bold"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {formatWAT(match.kickoffTime)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span
                          className="font-bold text-[#0D1B2A] flex-1 text-sm"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {match.homeTeam.name}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          {pred.submitted || isLocked ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-[#F7F5F0] border-2 border-[#D4D9D0] rounded-xl">
                              {isLocked && <Lock size={12} className="text-[#9CA3AF]" />}
                              <span
                                className="font-bold text-[#0D1B2A]"
                                style={{ fontFamily: 'var(--font-mono)' }}
                              >
                                {pred.home || '?'} - {pred.away || '?'}
                              </span>
                            </div>
                          ) : (
                            <>
                              <input
                                type="number"
                                min="0"
                                max="20"
                                value={pred.home}
                                onChange={(e) => updatePred(match.id, 'home', e.target.value)}
                                className="w-12 h-12 text-center text-xl font-bold border-2 border-[#D4D9D0] rounded-xl focus:border-[#0D1B2A] outline-none"
                                style={{ fontFamily: 'var(--font-mono)' }}
                                placeholder="0"
                              />
                              <span className="text-[#D4D9D0] text-xl font-bold">-</span>
                              <input
                                type="number"
                                min="0"
                                max="20"
                                value={pred.away}
                                onChange={(e) => updatePred(match.id, 'away', e.target.value)}
                                className="w-12 h-12 text-center text-xl font-bold border-2 border-[#D4D9D0] rounded-xl focus:border-[#0D1B2A] outline-none"
                                style={{ fontFamily: 'var(--font-mono)' }}
                                placeholder="0"
                              />
                            </>
                          )}
                        </div>
                        <span
                          className="font-bold text-[#0D1B2A] flex-1 text-right text-sm"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {match.awayTeam.name}
                        </span>
                      </div>

                      {!pred.submitted && !isLocked && (
                        <button
                          onClick={() => submitPred(match.id)}
                          disabled={!pred.home || !pred.away}
                          className={cn(
                            'w-full font-bold py-2.5 rounded-xl border-2 transition-all text-sm',
                            pred.home && pred.away
                              ? 'bg-[#1B5E38] text-white border-[#1B5E38] card-shadow-sm hover:translate-y-[-1px]'
                              : 'bg-[#F7F5F0] text-[#9CA3AF] border-[#D4D9D0] cursor-not-allowed'
                          )}
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          Lock In Prediction
                        </button>
                      )}
                      {pred.submitted && (
                        <div className="flex items-center justify-center gap-2 py-2 text-sm text-[#1B5E38] font-semibold">
                          <CheckCircle2 size={16} />
                          Prediction locked!
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </TabsContent>

          {/*  History  */}
          <TabsContent value="history">
            <div className="space-y-3">
              {PAST_PREDICTIONS.map((pred, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-[#0D1B2A] rounded-2xl card-shadow p-4 flex items-center gap-4"
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full border-2 border-[#0D1B2A] flex items-center justify-center text-sm font-bold shrink-0',
                      pred.points === 3 ? 'bg-[#D4F0E0] text-[#1B5E38]'
                      : pred.points === 1 ? 'bg-[#FFF3D0] text-[#0D1B2A]'
                      : 'bg-white text-[#9CA3AF]'
                    )}
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {pred.points > 0 ? '+' + pred.points : '0'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-bold text-[#0D1B2A] text-sm"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {pred.match}
                    </div>
                    <div className="text-[#6B7280] text-xs mt-0.5">
                      Predicted: <span className="font-bold text-[#0D1B2A]">{pred.prediction}</span>
                      {', '}
                      Result: <span className="font-bold text-[#0D1B2A]">{pred.result}</span>
                    </div>
                  </div>
                  <div className="text-[#9CA3AF] text-xs shrink-0">{pred.date}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SiteLayout>
  )
}
