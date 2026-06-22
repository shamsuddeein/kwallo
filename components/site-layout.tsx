import { Navbar, BottomNav } from '@/components/navbar'
import { Footer } from '@/components/footer'
import type { ReactNode } from 'react'

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white pb-[76px] md:pb-0">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  )
}
