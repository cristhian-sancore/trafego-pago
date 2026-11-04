export type Platform = 'META' | 'GOOGLE' | 'TIKTOK' | 'YOUTUBE' | 'WHATSAPP' | 'LINKEDIN';

export type UserRole = 'SUPER_ADMIN' | 'AGENCY_ADMIN' | 'CLIENT_VIEWER';

export interface AuthUser {
  id: string;
  name: string;
  username: string;
  phone: string;
  role: UserRole;
  agencyName?: string;
  companyId?: string;
}

export interface Company {
  id: string;
  name: string;
  niche: string;
  document: string;
}

export interface Campaign {
  id: string;
  companyId: string;
  platform: Platform;
  name: string;
  status: 'ACTIVE' | 'PAUSED';
  dailyBudget: number;
  spendToday: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cpa: number;
  roas: number;
  autopilotStatus: string;
}

export interface AutomationRule {
  id: string;
  companyId: string;
  name: string;
  type: string;
  conditionField: string;
  operator: string;
  thresholdValue: number;
  action: string;
  actionValue: number | null;
  isActive: boolean;
  lastTriggered: string;
}

export interface Conversation {
  id: string;
  companyId: string;
  channel: 'WHATSAPP' | 'INSTAGRAM_DM' | 'TIKTOK_DM' | 'MESSENGER';
  contactName: string;
  contactPhone?: string | null;
  originAd?: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  aiStatus: string;
}

export interface Message {
  id: string;
  senderType: 'CUSTOMER' | 'AGENT' | 'AI_BOT';
  text: string;
  time: string;
}

export interface Agency {
  id: string;
  name: string;
  slug: string;
  ownerName: string;
  email: string;
  planId: string;
  planName: string;
  status: 'ACTIVE' | 'PAUSED' | 'PAST_DUE' | 'SUSPENDED';
  monthlyPrice: number;
  nextBillingDate: string;
  paymentMethod: string;
}

export interface SuperAdminData {
  totalRevenueMRR: number;
  activeAgencies: number;
  totalManagedCompanies: number;
  pendingInvoices: number;
}
