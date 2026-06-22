export type MatchStatus = 'LIVE' | 'HT' | 'FT' | 'SCHEDULED' | 'POSTPONED'

export interface Team {
  id: string
  name: string
  shortName: string
  logo: string
  color: string
}

export interface Competition {
  id: string
  name: string
  shortName: string
  logo: string
  country: string
}

export interface Match {
  id: string
  competition: Competition
  homeTeam: Team
  awayTeam: Team
  kickoffTime: string
  status: MatchStatus
  homeScore: number | null
  awayScore: number | null
  minute?: number
  venue: string
  homeScorers?: string[]
  awayScorers?: string[]
}

export interface Standing {
  position: number
  team: Team
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDiff: number
  points: number
  form: string[]
}

export interface Prediction {
  id: string
  userId: string
  matchId: string
  homeScore: number
  awayScore: number
  pointsEarned?: number
  isScored: boolean
  createdAt: string
}

export interface HotTake {
  id: string
  userId: string
  userName: string
  userClub: string
  content: string
  agreeCount: number
  disagreeCount: number
  createdAt: string
  trending: boolean
}

export interface LeaderboardEntry {
  rank: number
  name: string
  club: string
  predictions: number
  correct: number
  points: number
  isCurrentUser?: boolean
}

// Competitions
export const COMPETITIONS: Competition[] = [
  { id: 'epl', name: 'Premier League', shortName: 'EPL', logo: '/comps/epl.png', country: 'England' },
  { id: 'ucl', name: 'UEFA Champions League', shortName: 'UCL', logo: '/comps/ucl.png', country: 'Europe' },
  { id: 'laliga', name: 'La Liga', shortName: 'La Liga', logo: '/comps/laliga.png', country: 'Spain' },
  { id: 'npfl', name: 'Nigerian Professional Football League', shortName: 'NPFL', logo: '/comps/npfl.png', country: 'Nigeria' },
  { id: 'afcon', name: 'Africa Cup of Nations', shortName: 'AFCON', logo: '/comps/afcon.png', country: 'Africa' },
  { id: 'superEagles', name: 'Super Eagles', shortName: 'NGA', logo: '/comps/nga.png', country: 'Nigeria' },
]

// Teams
export const TEAMS: Record<string, Team> = {
  arsenal: { id: 'arsenal', name: 'Arsenal', shortName: 'ARS', logo: '', color: '#EF0107' },
  chelsea: { id: 'chelsea', name: 'Chelsea', shortName: 'CHE', logo: '', color: '#034694' },
  manCity: { id: 'manCity', name: 'Man City', shortName: 'MCI', logo: '', color: '#6CABDD' },
  liverpool: { id: 'liverpool', name: 'Liverpool', shortName: 'LIV', logo: '', color: '#C8102E' },
  manUtd: { id: 'manUtd', name: 'Man United', shortName: 'MUN', logo: '', color: '#DA291C' },
  spurs: { id: 'spurs', name: 'Spurs', shortName: 'TOT', logo: '', color: '#132257' },
  realMadrid: { id: 'realMadrid', name: 'Real Madrid', shortName: 'RMA', logo: '', color: '#FEBE10' },
  barcelona: { id: 'barcelona', name: 'Barcelona', shortName: 'BAR', logo: '', color: '#004D98' },
  enyimba: { id: 'enyimba', name: 'Enyimba FC', shortName: 'ENY', logo: '', color: '#E30B17' },
  rangers: { id: 'rangers', name: 'Rangers Int\'l', shortName: 'RAN', logo: '', color: '#005A9C' },
  heartland: { id: 'heartland', name: 'Heartland FC', shortName: 'HRT', logo: '', color: '#003B7E' },
  kanoillins: { id: 'kanoillins', name: 'Kano Pillars', shortName: 'KAN', logo: '', color: '#00923F' },
  superEagles: { id: 'superEagles', name: 'Super Eagles', shortName: 'NGA', logo: '', color: '#008751' },
  ghana: { id: 'ghana', name: 'Ghana', shortName: 'GHA', logo: '', color: '#FCD116' },
}

// Today at a fixed West Africa Time (WAT = UTC+1), as an ISO string.
// Fixed hours keep kickoff times realistic and stable between server and client.
function todayAtWAT(hour: number, minute = 0): string {
  const d = new Date()
  d.setUTCHours(hour - 1, minute, 0, 0)
  return d.toISOString()
}

// Mock live/today matches
export const MOCK_LIVE_MATCHES: Match[] = [
  {
    id: 'live-1',
    competition: COMPETITIONS[0],
    homeTeam: TEAMS.arsenal,
    awayTeam: TEAMS.chelsea,
    kickoffTime: new Date(Date.now() - 67 * 60000).toISOString(),
    status: 'LIVE',
    homeScore: 2,
    awayScore: 1,
    minute: 67,
    venue: 'Emirates Stadium',
    homeScorers: ["Saka 23'", "Martinelli 45'"],
    awayScorers: ["Sterling 31'"],
  },
  {
    id: 'live-2',
    competition: COMPETITIONS[1],
    homeTeam: TEAMS.realMadrid,
    awayTeam: TEAMS.barcelona,
    kickoffTime: new Date(Date.now() - 45 * 60000).toISOString(),
    status: 'HT',
    homeScore: 1,
    awayScore: 1,
    minute: 45,
    venue: 'Bernabeu',
    homeScorers: ["Vinicius 22'"],
    awayScorers: ["Lewandowski 40'"],
  },
]

export const MOCK_TODAY_MATCHES: Match[] = [
  ...MOCK_LIVE_MATCHES,
  {
    id: 'today-3',
    competition: COMPETITIONS[3],
    homeTeam: TEAMS.enyimba,
    awayTeam: TEAMS.rangers,
    kickoffTime: todayAtWAT(15, 0),
    status: 'SCHEDULED',
    homeScore: null,
    awayScore: null,
    venue: 'Enyimba Int\'l Stadium',
  },
  {
    id: 'today-4',
    competition: COMPETITIONS[0],
    homeTeam: TEAMS.manCity,
    awayTeam: TEAMS.liverpool,
    kickoffTime: todayAtWAT(17, 30),
    status: 'SCHEDULED',
    homeScore: null,
    awayScore: null,
    venue: 'Etihad Stadium',
  },
  {
    id: 'today-5',
    competition: COMPETITIONS[3],
    homeTeam: TEAMS.kanoillins,
    awayTeam: TEAMS.heartland,
    kickoffTime: todayAtWAT(20, 0),
    status: 'SCHEDULED',
    homeScore: null,
    awayScore: null,
    venue: 'Sani Abacha Stadium',
  },
  {
    id: 'today-6',
    competition: COMPETITIONS[5],
    homeTeam: TEAMS.superEagles,
    awayTeam: TEAMS.ghana,
    kickoffTime: new Date(Date.now() - 24 * 3600000).toISOString(),
    status: 'FT',
    homeScore: 3,
    awayScore: 1,
    venue: 'Moshood Abiola Stadium',
    homeScorers: ["Osimhen 12'", "Lookman 34'", "Chukwueze 78'"],
    awayScorers: ["Kudus 45'"],
  },
]

export const MOCK_STANDINGS: Standing[] = [
  { position: 1, team: TEAMS.manCity, played: 34, won: 25, drawn: 5, lost: 4, goalsFor: 76, goalsAgainst: 34, goalDiff: 42, points: 80, form: ['W','W','W','D','W'] },
  { position: 2, team: TEAMS.arsenal, played: 34, won: 24, drawn: 4, lost: 6, goalsFor: 72, goalsAgainst: 28, goalDiff: 44, points: 76, form: ['W','W','D','W','W'] },
  { position: 3, team: TEAMS.liverpool, played: 34, won: 22, drawn: 6, lost: 6, goalsFor: 68, goalsAgainst: 31, goalDiff: 37, points: 72, form: ['D','W','W','W','D'] },
  { position: 4, team: TEAMS.chelsea, played: 34, won: 18, drawn: 8, lost: 8, goalsFor: 54, goalsAgainst: 40, goalDiff: 14, points: 62, form: ['L','W','W','D','W'] },
  { position: 5, team: TEAMS.spurs, played: 34, won: 16, drawn: 7, lost: 11, goalsFor: 49, goalsAgainst: 45, goalDiff: 4, points: 55, form: ['W','L','D','W','L'] },
  { position: 6, team: TEAMS.manUtd, played: 34, won: 10, drawn: 8, lost: 16, goalsFor: 32, goalsAgainst: 52, goalDiff: -20, points: 38, form: ['L','L','D','W','L'] },
]

export const MOCK_NPFL_STANDINGS: Standing[] = [
  { position: 1, team: TEAMS.enyimba, played: 30, won: 18, drawn: 6, lost: 6, goalsFor: 52, goalsAgainst: 24, goalDiff: 28, points: 60, form: ['W','W','D','W','W'] },
  { position: 2, team: TEAMS.kanoillins, played: 30, won: 16, drawn: 8, lost: 6, goalsFor: 44, goalsAgainst: 26, goalDiff: 18, points: 56, form: ['W','D','W','W','D'] },
  { position: 3, team: TEAMS.rangers, played: 30, won: 14, drawn: 9, lost: 7, goalsFor: 40, goalsAgainst: 28, goalDiff: 12, points: 51, form: ['D','W','W','D','W'] },
  { position: 4, team: TEAMS.heartland, played: 30, won: 12, drawn: 10, lost: 8, goalsFor: 36, goalsAgainst: 30, goalDiff: 6, points: 46, form: ['W','D','D','W','L'] },
]

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Musa Abdullahi', club: 'Arsenal', predictions: 42, correct: 28, points: 71 },
  { rank: 2, name: 'Chinwe Obi', club: 'Chelsea', predictions: 38, correct: 24, points: 63 },
  { rank: 3, name: 'Yusuf Ibrahim', club: 'Man City', predictions: 45, correct: 22, points: 58 },
  { rank: 4, name: 'Amaka Nwosu', club: 'Liverpool', predictions: 30, correct: 19, points: 52 },
  { rank: 5, name: 'Emeka Dike', club: 'Enyimba', predictions: 36, correct: 18, points: 48 },
  { rank: 6, name: 'You', club: 'Rangers', predictions: 28, correct: 15, points: 41, isCurrentUser: true },
]

export const MOCK_HOT_TAKES: HotTake[] = [
  {
    id: 'ht-1',
    userId: 'u1',
    userName: 'Musa K.',
    userClub: 'Arsenal',
    content: 'Osimhen is the best African striker of this generation. Better than Drogba was at the same age.',
    agreeCount: 847,
    disagreeCount: 312,
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    trending: true,
  },
  {
    id: 'ht-2',
    userId: 'u2',
    userName: 'Tunde P.',
    userClub: 'Chelsea',
    content: 'NPFL needs VAR before they even think about promotion to continental football. The referees are a disgrace.',
    agreeCount: 1204,
    disagreeCount: 156,
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
    trending: true,
  },
  {
    id: 'ht-3',
    userId: 'u3',
    userName: 'Fatima A.',
    userClub: 'Kano Pillars',
    content: 'Kano Pillars winning the NPFL title this season is already written. The form table does not lie.',
    agreeCount: 433,
    disagreeCount: 678,
    createdAt: new Date(Date.now() - 8 * 3600000).toISOString(),
    trending: false,
  },
  {
    id: 'ht-4',
    userId: 'u4',
    userName: 'Emeka D.',
    userClub: 'Enyimba',
    content: 'Super Eagles can win AFCON 2025. The squad depth is there, the coach just needs to stop overthinking his lineup.',
    agreeCount: 2103,
    disagreeCount: 441,
    createdAt: new Date(Date.now() - 12 * 3600000).toISOString(),
    trending: true,
  },
]

// Hausa translations
export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    'live_scores': 'Live Scores',
    'fixtures': 'Fixtures',
    'results': 'Results',
    'standings': 'Standings',
    'predictions': 'Predictions',
    'hot_takes': 'Hot Takes',
    'leaderboard': 'Leaderboard',
    'profile': 'Profile',
    'login': 'Login',
    'register': 'Register',
    'download_card': 'Download Match Card',
    'share_whatsapp': 'Share on WhatsApp',
    'live_now': 'LIVE NOW',
    'todays_matches': "Today's Matches",
    'top_predictors': 'Top Predictors This Month',
    'npfl_spotlight': 'Nigerian League - NPFL',
    'fan_hot_takes': 'Fan Hot Takes',
    'start_predicting': 'Start Predicting',
    'see_live_scores': 'See Live Scores',
    'nigeria_football_hub': "Nigeria's Football Hub",
    'language': 'Language',
    'data_light': 'Data-Light',
    'scores': 'Scores',
    'npfl': 'NPFL',
    'hero_line1': 'Scores. Predictions.',
    'hero_line2': 'Match Cards.',
    'hero_sub': 'Live scores for EPL, NPFL, UCL and Super Eagles. Predict matches, download shareable cards, and debate with fans - in English and Hausa.',
    'all_fixtures': 'All Fixtures',
    'how_title': 'How Kwallo Works',
    'how_t1': 'Follow the match',
    'how_t2': 'Make your call',
    'how_t3': 'Share the card',
    'how_1': 'See live scores and standings for every competition you care about.',
    'how_2': 'Predict match scores, earn points, and compete on the leaderboard.',
    'how_3': 'Download a match card and share it directly to your WhatsApp status.',
    'features_title': 'Made for Nigerian football',
    'f_scores_t': 'Live Scores',
    'f_scores_d': 'EPL, NPFL, UCL and the Super Eagles, updated live.',
    'f_predict_t': 'Predictions',
    'f_predict_d': 'Predict scores before kickoff and earn points when you get them right.',
    'f_cards_t': 'Match Cards',
    'f_cards_d': 'Save a match card and post it to your WhatsApp status.',
    'f_npfl_t': 'NPFL Coverage',
    'f_npfl_d': 'Nigerian league scores and standings, updated every day.',
    'f_hausa_t': 'Hausa Language',
    'f_hausa_d': 'Read every page in English or Hausa.',
    'npfl_title': 'Nigerian Football',
    'npfl_sub': 'Scores, standings and previews for every NPFL match.',
    'see_npfl_hub': 'See NPFL Hub',
    'npfl_standings': 'NPFL Standings',
    'cta_title': 'Share your match cards',
    'cta_sub': 'Pick any match, download the card, and post it to your WhatsApp status.',
    'download_a_card': 'Download a Card',
    'see_how': 'See How It Works',
    'see_all': 'See all',
    'agree': 'Agree',
    'disagree': 'Disagree',
    'trending': 'Trending',
    'footer_tagline': 'Live scores, predictions, and match cards - built for Nigerian fans, in English and Hausa.',
    'follow': 'Follow',
    'community': 'Community',
    'info': 'Info',
  },
  ha: {
    'live_scores': 'Sakamakon Wasanni',
    'fixtures': 'Jadawalin Wasanni',
    'results': 'Sakamakon Karshe',
    'standings': 'Teburin Matsayi',
    'predictions': 'Hasashe',
    'hot_takes': "Ra'ayoyin Masu Zafi",
    'leaderboard': 'Jerin Masu Nasara',
    'profile': 'Bayani Na',
    'login': 'Shiga',
    'register': 'Yi Rajista',
    'download_card': 'Sauke Katunan Wasa',
    'share_whatsapp': 'Raba a WhatsApp',
    'live_now': 'LIVE YANZU',
    'todays_matches': 'Wasannin Yau',
    'top_predictors': 'Mafi Kyawun Masu Hasashe',
    'npfl_spotlight': 'Gasar Najeriya - NPFL',
    'fan_hot_takes': "Ra'ayoyin Magoya Baya",
    'start_predicting': 'Fara Hasashe',
    'see_live_scores': 'Duba Sakamako',
    'nigeria_football_hub': 'Gidan Kwallon Najeriya',
    'language': 'Harshe',
    'data_light': 'Tanƙwara Data',
    'scores': 'Sakamako',
    'npfl': 'NPFL',
    'hero_line1': 'Sakamako. Hasashe.',
    'hero_line2': 'Katunan Wasa.',
    'hero_sub': 'Sakamako kai tsaye na EPL, NPFL, UCL da Super Eagles. Yi hasashen wasanni, sauke katuna masu raba, kuma ka tattauna da magoya baya - cikin Turanci da Hausa.',
    'all_fixtures': 'Dukan Wasanni',
    'how_title': 'Yadda Kwallo Ke Aiki',
    'how_t1': 'Bi wasan',
    'how_t2': 'Yi hasashenka',
    'how_t3': 'Raba katin',
    'how_1': 'Duba sakamako kai tsaye da teburin matsayi na kowace gasa da kake so.',
    'how_2': 'Yi hasashen sakamako, samu maki, kuma ka yi gasa a jerin nasara.',
    'how_3': 'Sauke katin wasa kuma ka raba shi kai tsaye zuwa matsayin WhatsApp dinka.',
    'features_title': 'An yi shi don kwallon Najeriya',
    'f_scores_t': 'Sakamako Kai Tsaye',
    'f_scores_d': 'EPL, NPFL, UCL da Super Eagles, ana sabuntawa kai tsaye.',
    'f_predict_t': 'Hasashe',
    'f_predict_d': 'Yi hasashen sakamako kafin wasa, ka samu maki idan ka yi daidai.',
    'f_cards_t': 'Katunan Wasa',
    'f_cards_d': 'Ajiye katin wasa kuma ka sa shi a matsayin WhatsApp dinka.',
    'f_npfl_t': 'Labarin NPFL',
    'f_npfl_d': 'Sakamako da teburin gasar Najeriya, ana sabuntawa kullum.',
    'f_hausa_t': 'Harshen Hausa',
    'f_hausa_d': 'Karanta kowane shafi cikin Turanci ko Hausa.',
    'npfl_title': 'Kwallon Najeriya',
    'npfl_sub': 'Sakamako, teburi da dubawa na kowane wasan NPFL.',
    'see_npfl_hub': 'Duba Cibiyar NPFL',
    'npfl_standings': 'Teburin NPFL',
    'cta_title': 'Raba katunan wasanka',
    'cta_sub': 'Zabi kowane wasa, sauke katin, kuma ka sa shi a matsayin WhatsApp dinka.',
    'download_a_card': 'Sauke Katin',
    'see_how': 'Duba Yadda Yake Aiki',
    'see_all': 'Duba duka',
    'agree': 'Na yarda',
    'disagree': 'Ban yarda ba',
    'trending': 'Mai Tashi',
    'footer_tagline': 'Sakamako kai tsaye, hasashe, da katunan wasa - an gina don magoya bayan Najeriya, cikin Turanci da Hausa.',
    'follow': 'Bi',
    'community': "Al'umma",
    'info': 'Bayani',
  },
}

export function t(key: string, lang: 'en' | 'ha' = 'en'): string {
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key
}

export function formatWAT(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleTimeString('en-NG', {
    timeZone: 'Africa/Lagos',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }) + ' WAT'
}

export function formatMatchDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-NG', {
    timeZone: 'Africa/Lagos',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}
