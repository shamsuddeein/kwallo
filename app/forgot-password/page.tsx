'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2, MailCheck } from 'lucide-react'
import { SiteLayout } from '@/components/site-layout'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [bad,     setBad]     = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setBad(true)
      showToast('Enter a valid email address.')
      return
    }
    setBad(false); setLoading(true)
    setTimeout(() => {
      setLoading(false); setSent(true)
      showToast('Reset link sent. Check your inbox.')
    }, 1100)
  }

  return (
    <SiteLayout>
      <div className="flex items-center justify-center px-4 sm:px-6 pt-8 pb-28 md:py-12 min-h-[60vh]">
        <div className="w-full max-w-[420px]">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-[#9CA3AF] hover:text-[#0D1B2A] mb-6 transition-colors">
            <ArrowLeft size={14} />
            Back to sign in
          </Link>

          <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl p-6 sm:p-8">
            {sent ? (
              <div className="text-center">
                <MailCheck size={44} className="text-[#1B5E38] mx-auto mb-5" />
                <h1 className="text-2xl text-[#0D1B2A] mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  Check your email
                </h1>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-7">
                  If an account exists for <span className="font-semibold text-[#0D1B2A]">{email}</span>, a password reset link is on its way.
                </p>
                <Link href="/login" className="inline-flex items-center justify-center bg-[#1B5E38] text-white font-bold px-7 py-3 rounded-full border-2 border-[#0D1B2A] enabled:hover:-translate-y-0.5 transition-transform text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                  Back to sign in
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center mb-7">
                  <h1 className="text-2xl sm:text-3xl text-[#0D1B2A] mb-1.5" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                    Reset your password
                  </h1>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    Enter your email and we will send you a reset link.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label htmlFor="fp-email" className="block text-sm font-bold text-[#0D1B2A] mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>
                      Email address
                    </label>
                    <input
                      id="fp-email" type="email" autoComplete="email" value={email}
                      onChange={(e) => { setEmail(e.target.value); if (bad) setBad(false) }}
                      placeholder="you@example.com" aria-invalid={bad}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl border-2 outline-none text-sm text-[#0D1B2A] placeholder-[#9CA3AF] transition-colors',
                        bad ? 'border-[#DC2626] focus:border-[#DC2626]' : 'border-[#D4D9D0] focus:border-[#0D1B2A]'
                      )}
                    />
                  </div>
                  <button
                    type="submit" disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1B5E38] disabled:bg-[#D4D9D0] disabled:text-[#9CA3AF] text-white font-bold py-3 rounded-xl border-2 border-[#0D1B2A] enabled:hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    {loading ? 'Sending...' : 'Send reset link'}
                  </button>
                </form>

                <p className="text-center text-sm text-[#6B7280] mt-6">
                  Remembered it?{' '}
                  <Link href="/login" className="text-[#1B5E38] font-bold hover:underline">Sign in</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
