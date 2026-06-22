'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react'
import { SiteLayout } from '@/components/site-layout'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [badField, setBadField] = useState<'email' | 'password' | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email address.'); setBadField('email')
      showToast('Please enter your email address.'); return
    }
    if (!EMAIL_RE.test(email)) {
      setError('That email address does not look right.'); setBadField('email')
      showToast('Enter a valid email address.'); return
    }
    if (!password) {
      setError('Please enter your password.'); setBadField('password')
      showToast('Please enter your password.'); return
    }
    setError(''); setBadField(null); setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showToast('Welcome back to Kwallo.')
      router.push('/')
    }, 1200)
  }

  const fieldCls = (bad: boolean) =>
    cn(
      'w-full px-4 py-3 rounded-xl border-2 outline-none text-sm text-[#0D1B2A] placeholder-[#9CA3AF] transition-colors',
      bad ? 'border-[#DC2626] focus:border-[#DC2626]' : 'border-[#D4D9D0] focus:border-[#0D1B2A]'
    )

  return (
    <SiteLayout>
      <div className="flex items-center justify-center px-4 sm:px-6 pt-8 pb-28 md:py-12 min-h-[60vh]">
        <div className="w-full max-w-[420px]">

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#9CA3AF] hover:text-[#0D1B2A] mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>

          {/* Card */}
          <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl p-6 sm:p-8">

            {/* Brand pill + heading */}
            <div className="text-center mb-7">
              <div className="inline-flex items-center gap-2 bg-[#D4F0E0] border-2 border-[#0D1B2A] rounded-full px-4 py-1.5 mb-5">
                <span className="font-bold text-[#0D1B2A] text-sm tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
                  Kwallo
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl text-[#0D1B2A] mb-1.5" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Welcome back
              </h1>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Sign in to predict, score and climb the leaderboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#0D1B2A] mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (badField === 'email') { setBadField(null); setError('') } }}
                  placeholder="you@example.com"
                  aria-invalid={badField === 'email'}
                  className={fieldCls(badField === 'email')}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="login-pw" className="block text-sm font-bold text-[#0D1B2A]" style={{ fontFamily: 'var(--font-display)' }}>
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs text-[#1B5E38] hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="login-pw"
                    type={showPw ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); if (badField === 'password') { setBadField(null); setError('') } }}
                    placeholder="Your password"
                    aria-invalid={badField === 'password'}
                    className={cn(fieldCls(badField === 'password'), 'pr-11')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#0D1B2A] transition-colors"
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div role="alert" className="bg-[#FFE8EC] border-2 border-[#DC2626] rounded-xl px-4 py-2.5 text-sm text-[#DC2626] font-semibold">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1B5E38] disabled:bg-[#D4D9D0] disabled:text-[#9CA3AF] text-white font-bold py-3 rounded-xl border-2 border-[#0D1B2A] transition-all enabled:hover:-translate-y-0.5 active:translate-y-0 text-sm mt-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-[#D4D9D0]" />
              <span className="text-xs text-[#9CA3AF] font-medium">OR</span>
              <div className="flex-1 h-px bg-[#D4D9D0]" />
            </div>

            {/* WhatsApp sign-in */}
            <button
              type="button"
              onClick={() => showToast('WhatsApp sign-in is coming soon.')}
              className="w-full flex items-center justify-center gap-2 border-2 border-[#D4D9D0] hover:border-[#0D1B2A] text-[#0D1B2A] font-bold py-3 rounded-xl transition-colors text-sm"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Continue with WhatsApp
            </button>

            <p className="text-center text-sm text-[#6B7280] mt-6">
              New to Kwallo?{' '}
              <Link href="/register" className="text-[#1B5E38] font-bold hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
