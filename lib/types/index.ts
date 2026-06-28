export type UserRole = 'founder' | 'investor' | 'developer' | 'strategic_partner' | 'service_provider'

export type MatchStatus = 'pending' | 'matched' | 'rejected'

export type MessageStatus = 'sent' | 'delivered' | 'read'

export interface User {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  city: string | null
  state: string | null
  country: string
  linkedin_url: string | null
  bio: string | null
  role: UserRole
  skills: string[]
  interests: string[]
  available_capital: number | null
  availability: 'full_time' | 'part_time' | 'weekends' | 'flexible'
  project_description: string | null
  is_verified: boolean
  is_premium: boolean
  created_at: string
  updated_at: string
}

export interface Profile extends User {
  match_score?: number
  is_liked?: boolean
}

export interface Match {
  id: string
  user_id_1: string
  user_id_2: string
  status: MatchStatus
  created_at: string
  user?: User
}

export interface Conversation {
  id: string
  participants: string[]
  last_message: Message | null
  unread_count: number
  created_at: string
  updated_at: string
  other_user?: User
}

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  content: string
  status: MessageStatus
  created_at: string
  sender?: User
}

export interface Project {
  id: string
  owner_id: string
  title: string
  description: string
  stage: 'idea' | 'mvp' | 'launched' | 'scaling'
  required_roles: UserRole[]
  investment_needed: number | null
  tags: string[]
  is_public: boolean
  created_at: string
  owner?: User
}

export interface Swipe {
  id: string
  swiper_id: string
  swiped_id: string
  direction: 'right' | 'left'
  created_at: string
}

export interface AdminStats {
  total_users: number
  active_users: number
  total_matches: number
  total_messages: number
  premium_users: number
  verified_users: number
  new_users_today: number
  new_matches_today: number
}

export const ROLE_LABELS: Record<UserRole, string> = {
  founder: 'Fundador',
  investor: 'Investidor',
  developer: 'Desenvolvedor',
  strategic_partner: 'Parceiro Estratégico',
  service_provider: 'Prestador de Serviço',
}

export const ROLE_COLORS: Record<UserRole, string> = {
  founder: '#2350E8',
  investor: '#10BE72',
  developer: '#8B5CF6',
  strategic_partner: '#F59E0B',
  service_provider: '#EC4899',
}

export const ROLE_ICONS: Record<UserRole, string> = {
  founder: '🚀',
  investor: '💰',
  developer: '💻',
  strategic_partner: '🤝',
  service_provider: '⚡',
}

export const AVAILABILITY_LABELS = {
  full_time: 'Tempo integral',
  part_time: 'Meio período',
  weekends: 'Fins de semana',
  flexible: 'Flexível',
}

export const STAGE_LABELS = {
  idea: 'Ideia',
  mvp: 'MVP',
  launched: 'Lançado',
  scaling: 'Escalando',
}

export const SKILLS = [
  'React', 'Node.js', 'Python', 'TypeScript', 'Go', 'Rust', 'AWS', 'GCP', 'Azure',
  'Product Management', 'UX/UI Design', 'Marketing Digital', 'Growth Hacking',
  'Vendas', 'Finanças', 'Operações', 'RH', 'Jurídico', 'Data Science', 'Machine Learning',
  'Blockchain', 'Mobile (iOS/Android)', 'DevOps', 'SEO', 'Copywriting', 'Branding',
]

export const INTERESTS = [
  'Fintech', 'Healthtech', 'Edtech', 'Agritech', 'Marketplace', 'SaaS', 'E-commerce',
  'Inteligência Artificial', 'Blockchain', 'IoT', 'Cleantech', 'Proptech', 'Insurtech',
  'Legaltech', 'Govtech', 'Logística', 'Moda', 'Alimentos', 'Esportes', 'Entretenimento',
]
