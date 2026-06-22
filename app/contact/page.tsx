'use client'

import { useState } from 'react'
import { Mail, MessageCircle, Clock, Send, Loader2 } from 'lucide-react'
import { SiteLayout } from '@/components/site-layout'
import { showToast } from '@/lib/toast'

const FAQ = [
  { q: 'Is Kwallo free?', a: 'Yes. Scores, predictions and match cards are completely free. We may show ads to keep it that way.' },
  { q: 'Do you take bets?', a: 'No. The prediction game is for points and bragging rights only. There is no money and no betting.' },
  { q: 'How do I download a match card?', a: 'Open any match and tap Download Match Card. A shareable image saves to your device.' },
  { q: 'Can I use Kwallo in Hausa?', a: 'Yes. Use the EN / HA switch in the top bar to change language. Your choice is remembered.' },
]

const DETAILS = [
  { Icon: Mail,          label: 'Email',    value: 'hello@kwallo.ng' },
  { Icon: MessageCircle, label: 'WhatsApp', value: 'Message us on WhatsApp' },
  { Icon: Clock,         label: 'Response', value: 'Usually within 48 hours' },
]

export default function ContactPage() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !message) {
      showToast('Please fill in your name, email and message.')
      return
    }
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setName(''); setEmail(''); setSubject(''); setMessage('')
      showToast('Message sent. We will get back to you soon.')
    }, 1100)
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border-2 border-[#D9D6CF] focus:border-[#1B5E38] outline-none text-sm text-[#0D1B2A] placeholder-[#9CA3AF] transition-colors bg-white'

  return (
    <SiteLayout>
      {/* Hero */}
      <div className="max-w-[1000px] mx-auto px-6 pt-10 pb-2">
        <div className="bg-[#E8F0FF] border-2 border-[#0D1B2A] rounded-2xl px-8 py-10">
          <h1 className="text-4xl md:text-5xl text-[#0D1B2A] mb-3 leading-[1.05]" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Get in touch
          </h1>
          <p className="text-[#0D1B2A]/70 leading-relaxed max-w-[560px]">
            Questions, feedback, or a partnership idea? Send us a message and the Kwallo team will get back to you.
          </p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-12 pb-24 md:pb-12 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white border-2 border-[#0D1B2A] rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="c-name" className="block text-sm font-bold text-[#0D1B2A] mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Name</label>
              <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="c-email" className="block text-sm font-bold text-[#0D1B2A] mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Email</label>
              <input id="c-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="c-subject" className="block text-sm font-bold text-[#0D1B2A] mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Subject</label>
            <input id="c-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What is this about?" className={inputClass} />
          </div>
          <div className="mb-5">
            <label htmlFor="c-message" className="block text-sm font-bold text-[#0D1B2A] mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>Message</label>
            <textarea id="c-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us more" rows={5} className={`${inputClass} resize-none`} />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 bg-[#1B5E38] text-white font-semibold px-6 py-3 rounded-full border-2 border-[#1B5E38] btn-press text-sm disabled:opacity-60"
          >
            {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} strokeWidth={2.5} />}
            {sending ? 'Sending' : 'Send Message'}
          </button>
        </form>

        {/* Details + FAQ */}
        <div className="space-y-6">
          <div className="bg-[#D4F0E0] border-2 border-[#0D1B2A] rounded-2xl p-6">
            <h2 className="text-lg text-[#0D1B2A] mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Reach us directly</h2>
            <ul className="space-y-4">
              {DETAILS.map(({ Icon, label, value }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="w-9 h-9 shrink-0 rounded-full border-2 border-[#0D1B2A] bg-white flex items-center justify-center text-[#1B5E38]">
                    <Icon size={16} strokeWidth={2.5} />
                  </span>
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#0D1B2A]/50">{label}</span>
                    <span className="block text-sm font-semibold text-[#0D1B2A]">{value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border-2 border-[#0D1B2A] rounded-2xl p-6">
            <h2 className="text-lg text-[#0D1B2A] mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Quick answers</h2>
            <div className="space-y-4">
              {FAQ.map(({ q, a }) => (
                <div key={q}>
                  <p className="text-sm font-bold text-[#0D1B2A]" style={{ fontFamily: 'var(--font-display)' }}>{q}</p>
                  <p className="text-sm text-[#0D1B2A]/70 leading-relaxed mt-1">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
