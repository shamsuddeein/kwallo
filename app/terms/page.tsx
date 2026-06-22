import { LegalPage, type LegalSection } from '@/components/legal-page'

const SECTIONS: LegalSection[] = [
  {
    heading: 'Acceptance of Terms',
    body: [
      'These Terms and Conditions govern your use of Kwallo at kwallo.ng. By accessing or using the platform, you agree to be bound by them.',
      'If you do not agree with any part of these terms, please stop using Kwallo.',
    ],
  },
  {
    heading: 'Eligibility and Accounts',
    body: [
      'You must be at least 13 years old to create an account. You are responsible for keeping your login details safe and for all activity under your account.',
      'You agree to provide accurate information when registering and to keep it up to date.',
    ],
  },
  {
    heading: 'The Prediction Game',
    body: [
      'Kwallo runs a free prediction game for entertainment and bragging rights only. There is no money, no stake and no betting of any kind.',
      'Points are awarded for predictions: an exact correct scoreline earns more than a correct outcome. The leaderboard resets monthly.',
      'Predictions lock at kickoff and cannot be changed afterwards. We may correct points if a result is officially amended.',
    ],
  },
  {
    heading: 'User Content',
    body: [
      'You own the comments, hot takes and predictions you post, but you grant Kwallo a licence to display them on the platform.',
      'You are responsible for what you post. Do not post anything unlawful, hateful, abusive, misleading or that infringes the rights of others.',
      'We may remove content or suspend accounts that break these rules.',
    ],
  },
  {
    heading: 'Acceptable Use',
    body: [
      'Do not attempt to disrupt the service, scrape data at scale, or access areas of the platform you are not authorised to use.',
      'Do not use Kwallo for any unlawful purpose or to harass other users.',
    ],
  },
  {
    heading: 'Match Content and Data',
    body: [
      'Scores, fixtures and standings come from third-party data providers and are provided as accurately as possible, but we cannot guarantee they are always error-free or live up to the second.',
      'Match previews and reports are generated automatically from match data and are informational only.',
    ],
  },
  {
    heading: 'Intellectual Property',
    body: [
      'The Kwallo name, logo, design and original content belong to Kwallo. Club names and competition names belong to their respective owners.',
      'Match cards you download carry Kwallo branding and may be shared freely on social platforms such as WhatsApp.',
    ],
  },
  {
    heading: 'Disclaimers',
    body: [
      'Kwallo is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted, secure or error-free.',
      'Kwallo is not a betting service and does not offer gambling of any kind.',
    ],
  },
  {
    heading: 'Limitation of Liability',
    body: [
      'To the extent permitted by law, Kwallo is not liable for any indirect or consequential loss arising from your use of the platform.',
    ],
  },
  {
    heading: 'Changes to These Terms',
    body: [
      'We may update these terms from time to time. Continued use of Kwallo after changes means you accept the updated terms.',
    ],
  },
  {
    heading: 'Governing Law',
    body: [
      'These terms are governed by the laws of the Federal Republic of Nigeria.',
    ],
  },
  {
    heading: 'Contact Us',
    body: [
      'Questions about these terms? Reach us through the contact page or at hello@kwallo.ng.',
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      intro="The rules for using Kwallo. No betting, no money, just football and bragging rights."
      updated="June 2026"
      sections={SECTIONS}
    />
  )
}
