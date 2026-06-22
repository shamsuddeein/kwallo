import { LegalPage, type LegalSection } from '@/components/legal-page'

const SECTIONS: LegalSection[] = [
  {
    heading: 'Introduction',
    body: [
      'Kwallo ("we", "us", "our") respects your privacy. This policy explains what information we collect when you use kwallo.ng, why we collect it, and the choices you have.',
      'By using Kwallo you agree to the practices described here. If you do not agree, please do not use the platform.',
    ],
  },
  {
    heading: 'Information We Collect',
    body: [
      'Account information: if you register, we collect your name, email address, password (stored encrypted) and your chosen favourite club.',
      'Activity information: your predictions, comments, hot takes, votes and points, so we can run the leaderboard and show your history.',
      'Technical information: basic device and browser data and approximate location (country level) to keep the service secure and reliable.',
      'You can browse live scores, fixtures, results and standings without an account. We only require sign-in for predictions, comments and hot takes.',
    ],
  },
  {
    heading: 'How We Use Your Information',
    body: [
      'To provide the service: show scores in your language and time zone, run the prediction game, and generate your match cards.',
      'To maintain the leaderboard and your prediction streak and history.',
      'To keep Kwallo safe: prevent abuse, spam and fraudulent activity.',
      'We do not sell your personal information to anyone.',
    ],
  },
  {
    heading: 'Local Storage and Cookies',
    body: [
      'We store small preferences in your browser, including your language choice (English or Hausa) and whether data-light mode is on. These stay on your device.',
      'If you sign in, we use a secure session cookie to keep you logged in. This cookie cannot be read by client-side scripts.',
      'You can clear this data at any time from your browser settings.',
    ],
  },
  {
    heading: 'Advertising',
    body: [
      'Kwallo may display ads through Google AdSense to keep the platform free. Advertising partners may use cookies to show relevant ads.',
      'You can manage ad personalisation through your Google account settings and your browser controls.',
    ],
  },
  {
    heading: 'Third-Party Services',
    body: [
      'We rely on football data providers for scores and fixtures, and on hosting and analytics providers to run the site. These partners process data only as needed to deliver their service.',
      'Match previews and reports are generated automatically from match data. They do not use your personal information.',
    ],
  },
  {
    heading: 'Data Security',
    body: [
      'We use industry-standard measures to protect your information, including encrypted passwords and secure connections (HTTPS).',
      'No method of transmission over the internet is fully secure, so we cannot guarantee absolute security, but we work to protect your data.',
    ],
  },
  {
    heading: 'Your Rights',
    body: [
      'You can access, update or delete your account information at any time from your profile, or by contacting us.',
      'You can switch language, turn on data-light mode, or stop using the service whenever you wish.',
    ],
  },
  {
    heading: 'Children',
    body: [
      'Kwallo is intended for football fans aged 13 and over. We do not knowingly collect information from children under 13.',
    ],
  },
  {
    heading: 'Changes to This Policy',
    body: [
      'We may update this policy from time to time. We will change the "last updated" date above and, where appropriate, notify you in the app.',
    ],
  },
  {
    heading: 'Contact Us',
    body: [
      'Questions about privacy? Reach us through the contact page or at privacy@kwallo.ng.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="How Kwallo collects, uses and protects your information. Plain and simple."
      updated="June 2026"
      sections={SECTIONS}
    />
  )
}
