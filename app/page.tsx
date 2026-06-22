import { SiteLayout } from '@/components/site-layout'
import { Hero } from '@/components/home/hero'
import {
  LiveScoresStrip,
  TodaysMatches,
  HowItWorks,
  FeatureCards,
  NPFLSpotlight,
  HotTakesPreview,
  DownloadCTA,
} from '@/components/home/sections'

export default function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <LiveScoresStrip />
      <TodaysMatches />
      <HowItWorks />
      <FeatureCards />
      <NPFLSpotlight />
      <DownloadCTA />
      <HotTakesPreview />
    </SiteLayout>
  )
}
