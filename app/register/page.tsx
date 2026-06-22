'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'
import { SiteLayout } from '@/components/site-layout'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const CLUBS = [
  'Arsenal', 'Chelsea', 'Man City', 'Liverpool', 'Man United', 'Spurs',
  'Enyimba', 'Kano Pillars', "Rangers Int'l", 'Heartland FC',
  'Barcelona', 'Real Madrid', 'Other',
]

const LABEL_CLS = 'block text-sm font-bold text-[#0D1B2A] mb-1.5'

type BadField = 'name' | 'email' | 'password' | 'club' | null

export default function RegisterPage() {
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [club,     setClub]     = useState('')
  const [lang,     setLang]     = useState<'en' | 'ha'>('en')
  const [showPw,   setShowPw]   = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [badField, setBadField] = useState<BadField>(null)
  const [success,  setSuccess]  = useState(false)

  const pwStrength = password.length === 0
    ? null
    : password.length < 6  ? 'weak'
    : password.length < 10 ? 'medium'
    : 'strong'

  function fail(field: BadField, msg: string) {
    setBadField(field); setError(msg); showToast(msg)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name)                     return fail('name', 'Please enter your name.')
    if (!email)                    return fail('email', 'Please enter your email address.')
    if (!EMAIL_RE.test(email))     return fail('email', 'That email address does not look right.')
    if (!password)                 return fail('password', 'Please choose a password.')
    if (password.length < 6)       return fail('password', 'Password must be at least 6 characters.')
    if (!club)                     return fail('club', 'Pick your favourite club.')

    setError(''); setBadField(null); setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showToast('Account created. Welcome to Kwallo!')
      setSuccess(true)
    }, 1200)
  }

  const fieldCls = (bad: boolean) =>
    cn(
      'w-full px-4 py-3 rounded-xl border-2 outline-none text-sm text-[#0D1B2A] placeholder-[#9CA3AF] transition-colors',
      bad ? 'border-[#DC2626] focus:border-[#DC2626]' : 'border-[#D4D9D0] focus:border-[#0D1B2A]'
    )
  const clear = (f: BadField) => { if (badField === f) { setBadField(null); setError('') } }

  if (success) {
    return (
      <SiteLayout>
        <div className="flex items-center justify-center px-4 sm:px-6 pt-8 pb-28 md:py-12 min-h-[60vh]">
          <div className="w-full max-w-[420px] bg-[#D4F0E0] border-2 border-[#0D1B2A] rounded-2xl p-8 sm:p-10 text-center">
            <CheckCircle2 size={48} className="text-[#1B5E38] mx-auto mb-5" />
            <h2 className="text-2xl sm:text-3xl text-[#0D1B2A] mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Welcome to Kwallo!
            </h2>
            <p className="text-[#6B7280] text-sm mb-7 leading-relaxed">
              Your account is live. Start predicting and climb the leaderboard.
            </p>
            <Link
              href="/predictions"
              className="inline-flex items-center gap-2 bg-[#1B5E38] text-white font-bold px-7 py-3 rounded-full border-2 border-[#0D1B2A] enabled:hover:-translate-y-0.5 transition-transform"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Start Predicting
            </Link>
          </div>
        </div>
      </SiteLayout>
    )
  }

  return (
    <SiteLayout>
      <div className="flex items-start justify-center px-4 sm:px-6 pt-8 pb-28 md:py-12">
        <div className="w-full max-w-[420px]">

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#9CA3AF] hover:text-[#0D1B2A] mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>

          <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl p-6 sm:p-8">
            <div className="text-center mb-7">
              <div className="inline-flex items-center gap-2 bg-[#FFF3D0] border-2 border-[#0D1B2A] rounded-full px-4 py-1.5 mb-5">
                <span className="font-bold text-[#0D1B2A] text-sm tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
                  Kwallo
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl text-[#0D1B2A] mb-1.5" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Join Kwallo
              </h1>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Free forever. Predict matches, earn points, share cards.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className={LABEL_CLS} style={{ fontFamily: 'var(--font-display)' }}>Your name</label>
                <input
                  id="name" type="text" autoComplete="name" value={name}
                  onChange={(e) => { setName(e.target.value); clear('name') }}
                  placeholder="Musa Abdullahi" aria-invalid={badField === 'name'}
                  className={fieldCls(badField === 'name')}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="reg-email" className={LABEL_CLS} style={{ fontFamily: 'var(--font-display)' }}>Email address</label>
                <input
                  id="reg-email" type="email" autoComplete="email" value={email}
                  onChange={(e) => { setEmail(e.target.value); clear('email') }}
                  placeholder="you@example.com" aria-invalid={badField === 'email'}
                  className={fieldCls(badField === 'email')}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="reg-pw" className={LABEL_CLS} style={{ fontFamily: 'var(--font-display)' }}>Password</label>
                <div className="relative">
                  <input
                    id="reg-pw" type={showPw ? 'text' : 'password'} autoComplete="new-password" value={password}
                    onChange={(e) => { setPassword(e.target.value); clear('password') }}
                    placeholder="At least 6 characters" aria-invalid={badField === 'password'}
                    className={cn(fieldCls(badField === 'password'), 'pr-11')}
                  />
                  <button
                    type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#0D1B2A] transition-colors"
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {pwStrength && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex gap-1 flex-1">
                      {['weak', 'medium', 'strong'].map((level) => (
                        <div
                          key={level}
                          className={cn(
                            'flex-1 h-1.5 rounded-full border border-[#D4D9D0] transition-colors',
                            pwStrength === 'weak'   && level === 'weak'   ? 'bg-[#DC2626] border-[#DC2626]' :
                            pwStrength === 'medium' && (level === 'weak' || level === 'medium') ? 'bg-[#F5A623] border-[#F5A623]' :
                            pwStrength === 'strong' ? 'bg-[#1B5E38] border-[#1B5E38]' :
                            'bg-[#F7F5F0]'
                          )}
                        />
                      ))}
                    </div>
                    <span className={cn(
                      'text-xs font-bold capitalize',
                      pwStrength === 'weak' ? 'text-[#DC2626]' : pwStrength === 'medium' ? 'text-[#F5A623]' : 'text-[#1B5E38]'
                    )}>
                      {pwStrength}
                    </span>
                  </div>
                )}
              </div>

              {/* Favourite club */}
              <div>
                <label className={LABEL_CLS} style={{ fontFamily: 'var(--font-display)' }}>Favourite club</label>
                <div className={cn('flex flex-wrap gap-2', badField === 'club' && 'ring-2 ring-[#DC2626]/40 rounded-xl p-1 -m-1')}>
                  {CLUBS.map((c) => (
                    <button
                      key={c} type="button"
                      onClick={() => { setClub(c); clear('club') }}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-colors',
                        club === c
                          ? 'bg-[#1B5E38] text-white border-[#0D1B2A]'
                          : 'bg-white text-[#6B7280] border-[#D4D9D0] hover:border-[#0D1B2A]'
                      )}
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language preference */}
              <div>
                <label className={LABEL_CLS} style={{ fontFamily: 'var(--font-display)' }}>Preferred language</label>
                <div className="flex gap-2">
                  {([['en', 'English'], ['ha', 'Hausa']] as const).map(([code, label]) => (
                    <button
                      key={code} type="button" onClick={() => setLang(code)}
                      className={cn(
                        'flex-1 py-2.5 rounded-xl border-2 text-sm font-bold transition-colors',
                        lang === code
                          ? 'border-[#0D1B2A] bg-[#1B5E38] text-white'
                          : 'border-[#D4D9D0] text-[#6B7280] hover:border-[#0D1B2A]'
                      )}
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div role="alert" className="bg-[#FFE8EC] border-2 border-[#DC2626] rounded-xl px-4 py-2.5 text-sm text-[#DC2626] font-semibold">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1B5E38] disabled:bg-[#D4D9D0] disabled:text-[#9CA3AF] text-white font-bold py-3 rounded-xl border-2 border-[#0D1B2A] enabled:hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? 'Creating account...' : 'Create Account - Free'}
              </button>
            </form>

            <p className="text-center text-sm text-[#6B7280] mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-[#1B5E38] font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
