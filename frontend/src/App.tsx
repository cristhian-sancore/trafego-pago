import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Zap,
  MessageSquare,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  ArrowUpRight,
  RefreshCw,
  Plus,
  Send,
  Bot,
  Building2,
  Lock,
  Smartphone,
  UserCheck,
  Trash2,
  X,
  Share2,
  Flame,
  Link2,
  Copy,
  Check,
  FileText,
  Printer,
  Calendar,
  Clock,
  Sparkles,
  ShoppingBag,
  Tag
} from 'lucide-react';
import {
  Platform,
  UserRole,
  AuthUser,
  Campaign,
  AutomationRule,
  Conversation,
  Message,
  EvolutionInstance,
  NetworkConnection,
  UtmLink,
  LeadSale,
  DaypartingConfig
} from './types';

// =========================================================================
// INTERFACES & DADOS INICIAIS
// =========================================================================

export interface SystemUserRecord {
  id: string;
  name: string;
  username: string;
  password: string;
  phone: string;
  role: UserRole;
  status: 'ACTIVE' | 'BLOCKED';
  agencyName?: string;
  companyId?: string;
}

export interface ClientCompanyDetail {
  id: string;
  name: string;
  niche: string;
  document: string;
  ownerContact: string;
  whatsappContact: string;
  monthlyFee: number;
  monthlyAdBudget: number;
  status: 'ACTIVE' | 'PAST_DUE' | 'SUSPENDED';
  evolutionInstance: string;
  aiPrompt: string;
  aiAutoReply: boolean;
  clientPortalAccess: boolean;
}

const INITIAL_USERS: SystemUserRecord[] = [
  {
    id: 'usr-admin',
    name: 'Cristhian Sancore (Super Admin)',
    username: 'admin',
    password: 'admin',
    phone: '(65) 99677-2226',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE'
  },
  {
    id: 'usr-agency',
    name: 'Carlos Mendonça',
    username: 'carlos_alpha',
    password: '123',
    phone: '(11) 98888-1234',
    role: 'AGENCY_ADMIN',
    status: 'ACTIVE',
    agencyName: 'Agência Alpha Digital'
  },
  {
    id: 'usr-client',
    name: 'Fernanda Rocha',
    username: 'fernanda_moda',
    password: '123',
    phone: '(11) 97777-5678',
    role: 'CLIENT_VIEWER',
    status: 'ACTIVE',
    companyId: 'comp-1'
  }
];

const INITIAL_COMPANIES: ClientCompanyDetail[] = [
  {
    id: 'comp-1',
    name: 'Moda Express Brasil (E-commerce)',
    niche: 'Moda Feminina & Roupas',
    document: '42.981.234/0001-90',
    ownerContact: 'Fernanda Rocha (CEO)',
    whatsappContact: '+55 65 99677-2226',
    monthlyFee: 2500.0,
    monthlyAdBudget: 15000.0,
    status: 'ACTIVE',
    evolutionInstance: 'meu',
    aiPrompt: 'Você é a Sofia, consultora de vendas da Moda Express Brasil. Responda educadamente sobre produtos, tamanhos, prazo de entrega e ofereça cupom FRETEGRATIS.',
    aiAutoReply: true,
    clientPortalAccess: true
  },
  {
    id: 'comp-2',
    name: 'Dr. Sorriso Odontologia Integrada',
    niche: 'Clínica & Odontologia',
    document: '31.123.876/0001-12',
    ownerContact: 'Dr. Roberto Alves',
    whatsappContact: '+55 11 98888-7777',
    monthlyFee: 1800.0,
    monthlyAdBudget: 8000.0,
    status: 'ACTIVE',
    evolutionInstance: 'teste',
    aiPrompt: 'Você é a atendente virtual da clínica Dra. Sorriso. Agende consultas de avaliação para implantes e clareamento dental.',
    aiAutoReply: true,
    clientPortalAccess: true
  },
  {
    id: 'comp-3',
    name: 'Imobiliária Prime SP & Alphaville',
    niche: 'Imóveis de Alto Padrão',
    document: '18.456.980/0001-44',
    ownerContact: 'Marcos Vinicius',
    whatsappContact: '+55 11 97777-6666',
    monthlyFee: 3500.0,
    monthlyAdBudget: 25000.0,
    status: 'ACTIVE',
    evolutionInstance: 'meu',
    aiPrompt: 'Você é o corretor virtual Prime. Qualifique o cliente quanto a faixa de preço (acima de R$ 1.5M) e agende visita.',
    aiAutoReply: false,
    clientPortalAccess: true
  }
];

const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    companyId: 'comp-1',
    platform: 'META',
    name: '[ESCALA] Vestidos Verão - Conversão Direta',
    objective: 'Vendas / Conversão',
    status: 'ACTIVE',
    dailyBudget: 250.0,
    spendToday: 184.5,
    impressions: 14200,
    clicks: 520,
    conversions: 18,
    cpa: 10.25,
    roas: 4.8,
    autopilotStatus: 'Otimizado (ROAS Alto)',
    adCopy: '✨ Nova coleção verão com 20% OFF e Frete Grátis acima de R$ 150!',
    targetUrl: 'https://modaexpress.com.br/verao'
  },
  {
    id: 'camp-2',
    companyId: 'comp-1',
    platform: 'TIKTOK',
    name: '[UGC] Vídeo Viral Provador - Spark Ads',
    objective: 'Engajamento & Tráfego',
    status: 'ACTIVE',
    dailyBudget: 120.0,
    spendToday: 89.1,
    impressions: 28900,
    clicks: 980,
    conversions: 12,
    cpa: 7.42,
    roas: 5.4,
    autopilotStatus: 'Escalando Orçamento +15%',
    adCopy: 'Meninas, olhem o caimento desse vestido! Link na bio com cupom.',
    targetUrl: 'https://modaexpress.com.br/tiktok'
  },
  {
    id: 'camp-3',
    companyId: 'comp-1',
    platform: 'GOOGLE',
    name: '[PESQUISA] Fundo de Funil - Comprar Vestido Festa',
    objective: 'Leads & Compras',
    status: 'ACTIVE',
    dailyBudget: 150.0,
    spendToday: 145.0,
    impressions: 3400,
    clicks: 210,
    conversions: 9,
    cpa: 16.11,
    roas: 3.2,
    autopilotStatus: 'Dentro da Meta',
    adCopy: 'Vestidos de Festa em Até 10x Sem Juros | Envio Imediato',
    targetUrl: 'https://modaexpress.com.br/festa'
  },
  {
    id: 'camp-4',
    companyId: 'comp-1',
    platform: 'WHATSAPP',
    name: '[WHATSAPP] Atendimento VIP Promoção Frete Grátis',
    objective: 'Mensagens no WhatsApp',
    status: 'ACTIVE',
    dailyBudget: 80.0,
    spendToday: 55.0,
    impressions: 4300,
    clicks: 140,
    conversions: 24,
    cpa: 2.29,
    roas: 0.0,
    autopilotStatus: 'Excelente Taxa de Lead',
    adCopy: 'Clique no botão e tire suas dúvidas no WhatsApp agora mesmo!',
    targetUrl: 'https://wa.me/5565996772226'
  },
  {
    id: 'camp-5',
    companyId: 'comp-2',
    platform: 'META',
    name: '[INSTAGRAM] Implantes Dentários sem Dor - Agendamento',
    objective: 'Mensagens no WhatsApp',
    status: 'ACTIVE',
    dailyBudget: 100.0,
    spendToday: 78.4,
    impressions: 5600,
    clicks: 180,
    conversions: 15,
    cpa: 5.22,
    roas: 6.8,
    autopilotStatus: 'Alta Conversão de Agendamento',
    adCopy: 'Recupere seu sorriso com segurança. Agende sua avaliação gratuita.',
    targetUrl: 'https://wa.me/5511988887777'
  },
  {
    id: 'camp-6',
    companyId: 'comp-3',
    platform: 'GOOGLE',
    name: '[PESQUISA] Mansões e Casas em Condomínio Alphaville',
    objective: 'Leads Qualificados',
    status: 'ACTIVE',
    dailyBudget: 350.0,
    spendToday: 210.0,
    impressions: 1800,
    clicks: 95,
    conversions: 4,
    cpa: 52.5,
    roas: 8.5,
    autopilotStatus: 'Lead de Alto Padrão',
    adCopy: 'Casas Novas Alphaville 4 a 6 Suítes. Veja Fotos e Agende Visita.',
    targetUrl: 'https://primeimoveis.com.br/alphaville'
  }
];

const INITIAL_RULES: AutomationRule[] = [
  {
    id: 'rule-1',
    companyId: 'comp-1',
    name: '🛡️ Stop-Loss: Pausar Anúncio se gastar R$ 40 sem venda',
    type: 'STOP_LOSS_SPEND',
    conditionField: 'spendToday',
    operator: 'GREATER_THAN',
    thresholdValue: 40.0,
    action: 'PAUSE_AD',
    actionValue: null,
    isActive: true,
    lastTriggered: 'Hoje às 10:14'
  },
  {
    id: 'rule-2',
    companyId: 'comp-1',
    name: '🚀 Escala Inteligente: Se ROAS > 4.0x aumentar 15% verba',
    type: 'AUTO_SCALE_ROAS',
    conditionField: 'roas',
    operator: 'GREATER_THAN',
    thresholdValue: 4.0,
    action: 'INCREASE_BUDGET',
    actionValue: 15,
    isActive: true,
    lastTriggered: 'Hoje às 11:30'
  },
  {
    id: 'rule-3',
    companyId: 'comp-2',
    name: '🛡️ Stop-Loss: Pausar se Custo por Conversa > R$ 12',
    type: 'STOP_LOSS_CPA',
    conditionField: 'cpa',
    operator: 'GREATER_THAN',
    thresholdValue: 12.0,
    action: 'PAUSE_AD',
    actionValue: null,
    isActive: true,
    lastTriggered: 'Hoje às 09:20'
  }
];

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    companyId: 'comp-1',
    channel: 'WHATSAPP',
    contactName: 'Juliana Paes',
    contactPhone: '+55 (65) 99677-2226',
    originAd: '[WHATSAPP] Atendimento VIP Promoção',
    unreadCount: 1,
    lastMessage: 'Queria saber se tem o vestido vermelho no tamanho M?',
    lastMessageTime: '12:14',
    aiStatus: 'IA Respondendo',
    totalSalesValue: 0
  },
  {
    id: 'conv-2',
    companyId: 'comp-1',
    channel: 'INSTAGRAM_DM',
    contactName: '@gabriela.costa',
    contactPhone: null,
    originAd: '[ESCALA] Vestidos Verão',
    unreadCount: 0,
    lastMessage: 'Amei! Acabei de finalizar o pedido com o cupom que vc mandou 🥰',
    lastMessageTime: '11:45',
    aiStatus: 'Venda Concluída (R$ 289,00)',
    totalSalesValue: 289.0
  },
  {
    id: 'conv-3',
    companyId: 'comp-2',
    channel: 'WHATSAPP',
    contactName: 'Roberto Albuquerque',
    contactPhone: '+55 (11) 99123-4567',
    originAd: '[INSTAGRAM] Implantes Dentários',
    unreadCount: 1,
    lastMessage: 'Gostaria de agendar uma avaliação para implante na sexta-feira.',
    lastMessageTime: '13:05',
    aiStatus: 'Agendamento em Andamento',
    totalSalesValue: 0
  },
  {
    id: 'conv-4',
    companyId: 'comp-3',
    channel: 'WHATSAPP',
    contactName: 'Dr. Fernando Vasconcellos',
    contactPhone: '+55 (11) 98111-2233',
    originAd: '[PESQUISA] Casas Alphaville SP',
    unreadCount: 0,
    lastMessage: 'Pode me enviar o book completo da casa de 5 suítes no Residencial 1?',
    lastMessageTime: '10:30',
    aiStatus: 'Qualificado (Corretor Notificado)',
    totalSalesValue: 0
  }
];

const INITIAL_MESSAGES: Record<string, Message[]> = {
  'conv-1': [
    { id: 'm-1', senderType: 'CUSTOMER', text: 'Oi! Vi o anúncio no Insta com frete grátis!', time: '12:12' },
    { id: 'm-2', senderType: 'AI_BOT', text: 'Olá Juliana! Seja super bem-vinda à Moda Express! Sim, temos frete grátis para pedidos acima de R$ 150 hoje. Como posso te ajudar?', time: '12:12' },
    { id: 'm-3', senderType: 'CUSTOMER', text: 'Queria saber se tem o vestido vermelho no tamanho M?', time: '12:14' }
  ],
  'conv-2': [
    { id: 'm-21', senderType: 'CUSTOMER', text: 'Tem cupom de primeira compra?', time: '11:40' },
    { id: 'm-22', senderType: 'AI_BOT', text: 'Com certeza! Use o cupom BEMVINDA10 para ganhar 10% de desconto adicional!', time: '11:41' },
    { id: 'm-23', senderType: 'CUSTOMER', text: 'Amei! Acabei de finalizar o pedido com o cupom que vc mandou 🥰', time: '11:45' },
    { id: 'm-24', senderType: 'SYSTEM_SALE', text: '🎉 VENDA REGISTRADA: R$ 289,00 via PIX (Vestido Verão Rosa Floral M)', time: '11:46' }
  ],
  'conv-3': [
    { id: 'm-31', senderType: 'CUSTOMER', text: 'Olá! Vi o anúncio sobre implantes dentários.', time: '13:00' },
    { id: 'm-32', senderType: 'AI_BOT', text: 'Olá Roberto! Muito prazer. Nossa equipe especializada realiza avaliações digitais completas. Você tem preferência de horário para agendamento?', time: '13:01' },
    { id: 'm-33', senderType: 'CUSTOMER', text: 'Gostaria de agendar uma avaliação para implante na sexta-feira.', time: '13:05' }
  ],
  'conv-4': [
    { id: 'm-41', senderType: 'CUSTOMER', text: 'Boa tarde, tenho interesse na casa de Alphaville.', time: '10:28' },
    { id: 'm-42', senderType: 'AI_BOT', text: 'Excelente escolha! Imóvel com acabamento de alto padrão. Gostaria de receber a planta?', time: '10:29' },
    { id: 'm-43', senderType: 'CUSTOMER', text: 'Pode me enviar o book completo da casa de 5 suítes no Residencial 1?', time: '10:30' }
  ]
};

const INITIAL_CONNECTIONS: NetworkConnection[] = [
  {
    id: 'conn-1',
    companyId: 'comp-1',
    platform: 'META',
    connected: true,
    accountName: 'Meta Ads - Moda Express',
    accountId: 'act_98471203948',
    pixelOrTagId: 'pix_88291049281',
    updatedAt: 'Hoje'
  },
  {
    id: 'conn-2',
    companyId: 'comp-1',
    platform: 'GOOGLE',
    connected: true,
    accountName: 'Google Ads - Moda E-commerce',
    accountId: '948-281-9921',
    pixelOrTagId: 'AW-981249182',
    updatedAt: 'Ontem'
  },
  {
    id: 'conn-3',
    companyId: 'comp-1',
    platform: 'TIKTOK',
    connected: true,
    accountName: 'TikTok For Business - ModaExpressBR',
    accountId: 'adv_8721948192',
    pixelOrTagId: 'TT-C1098231',
    updatedAt: 'Hoje'
  }
];

const INITIAL_UTMS: UtmLink[] = [
  {
    id: 'utm-1',
    companyId: 'comp-1',
    title: 'Campanha Vestidos Verão - Instagram Reels',
    destinationUrl: 'https://modaexpress.com.br/verao',
    finalUrl: 'https://modaexpress.com.br/verao?utm_source=meta&utm_medium=instagram_reels&utm_campaign=escala_verao&utm_content=video_provador_1',
    source: 'meta',
    medium: 'instagram_reels',
    campaign: 'escala_verao',
    content: 'video_provador_1',
    clicks: 420,
    conversions: 18,
    createdAt: 'Hoje'
  },
  {
    id: 'utm-2',
    companyId: 'comp-1',
    title: 'Anúncio Google Pesquisa - Vestido de Festa',
    destinationUrl: 'https://modaexpress.com.br/festa',
    finalUrl: 'https://modaexpress.com.br/festa?utm_source=google&utm_medium=cpc&utm_campaign=fundo_de_funil&utm_content=anuncio_texto_1',
    source: 'google',
    medium: 'cpc',
    campaign: 'fundo_de_funil',
    content: 'anuncio_texto_1',
    clicks: 210,
    conversions: 9,
    createdAt: 'Ontem'
  }
];

const INITIAL_SALES: LeadSale[] = [
  {
    id: 'sale-1',
    companyId: 'comp-1',
    conversationId: 'conv-2',
    customerName: '@gabriela.costa',
    campaignName: '[ESCALA] Vestidos Verão',
    amount: 289.0,
    product: 'Vestido Verão Rosa Floral M',
    paymentMethod: 'PIX',
    createdAt: 'Hoje às 11:46'
  }
];

export default function App() {
  // Autenticação
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('socialpulse_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [systemUsers, setSystemUsers] = useState<SystemUserRecord[]>(() => {
    const saved = localStorage.getItem('socialpulse_system_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  useEffect(() => {
    localStorage.setItem('socialpulse_system_users', JSON.stringify(systemUsers));
  }, [systemUsers]);

  // Telas de Autenticação
  const [authView, setAuthView] = useState<'login' | 'register' | 'verify_phone' | 'forgot_password' | 'reset_password_verify'>('login');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Cadastro e recuperação
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [pendingUser, setPendingUser] = useState<any>(null);

  const [recoveryTarget, setRecoveryTarget] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recoveryUserFound, setRecoveryUserFound] = useState<any>(null);

  // Navegação: 'dashboard' | 'campaigns' | 'autopilot' | 'inbox' | 'utms' | 'clients' | 'integrations' | 'admin'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'campaigns' | 'autopilot' | 'inbox' | 'utms' | 'clients' | 'integrations' | 'admin'>('dashboard');

  // Estados com LocalStorage
  const [clientCompanies, setClientCompanies] = useState<ClientCompanyDetail[]>(() => {
    const saved = localStorage.getItem('socialpulse_companies');
    return saved ? JSON.parse(saved) : INITIAL_COMPANIES;
  });

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(() => {
    const saved = localStorage.getItem('socialpulse_selected_company');
    return saved || 'comp-1';
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('socialpulse_campaigns');
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [automationRules, setAutomationRules] = useState<AutomationRule[]>(() => {
    const saved = localStorage.getItem('socialpulse_rules');
    return saved ? JSON.parse(saved) : INITIAL_RULES;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('socialpulse_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [messages, setMessages] = useState<Record<string, Message[]>>(() => {
    const saved = localStorage.getItem('socialpulse_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [connections, setConnections] = useState<NetworkConnection[]>(() => {
    const saved = localStorage.getItem('socialpulse_connections');
    return saved ? JSON.parse(saved) : INITIAL_CONNECTIONS;
  });

  const [utmLinks, setUtmLinks] = useState<UtmLink[]>(() => {
    const saved = localStorage.getItem('socialpulse_utms');
    return saved ? JSON.parse(saved) : INITIAL_UTMS;
  });

  const [leadSales, setLeadSales] = useState<LeadSale[]>(() => {
    const saved = localStorage.getItem('socialpulse_sales');
    return saved ? JSON.parse(saved) : INITIAL_SALES;
  });

  const [dayparting, setDayparting] = useState<DaypartingConfig>(() => {
    const saved = localStorage.getItem('socialpulse_dayparting');
    return saved
      ? JSON.parse(saved)
      : {
          companyId: 'comp-1',
          enabled: true,
          startHour: '08:00',
          endHour: '20:00',
          activeDays: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
          autoPauseWhatsApp: true
        };
  });

  // Salvar no localStorage
  useEffect(() => { localStorage.setItem('socialpulse_companies', JSON.stringify(clientCompanies)); }, [clientCompanies]);
  useEffect(() => { localStorage.setItem('socialpulse_selected_company', selectedCompanyId); }, [selectedCompanyId]);
  useEffect(() => { localStorage.setItem('socialpulse_campaigns', JSON.stringify(campaigns)); }, [campaigns]);
  useEffect(() => { localStorage.setItem('socialpulse_rules', JSON.stringify(automationRules)); }, [automationRules]);
  useEffect(() => { localStorage.setItem('socialpulse_conversations', JSON.stringify(conversations)); }, [conversations]);
  useEffect(() => { localStorage.setItem('socialpulse_messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem('socialpulse_connections', JSON.stringify(connections)); }, [connections]);
  useEffect(() => { localStorage.setItem('socialpulse_utms', JSON.stringify(utmLinks)); }, [utmLinks]);
  useEffect(() => { localStorage.setItem('socialpulse_sales', JSON.stringify(leadSales)); }, [leadSales]);
  useEffect(() => { localStorage.setItem('socialpulse_dayparting', JSON.stringify(dayparting)); }, [dayparting]);

  // Evolution API
  const [evolutionInstances, setEvolutionInstances] = useState<EvolutionInstance[]>([]);
  const [loadingEvolution, setLoadingEvolution] = useState(false);
  const [testWhatsAppNumber, setTestWhatsAppNumber] = useState('');
  const [testWhatsAppMessage, setTestWhatsAppMessage] = useState('Olá! Mensagem de teste enviada diretamente pelo NexusAds!');
  const [evolutionFeedback, setEvolutionFeedback] = useState('');

  const fetchEvolution = async () => {
    try {
      setLoadingEvolution(true);
      const res = await fetch('/api/evolution/instances');
      const data = await res.json();
      if (data.success && Array.isArray(data.instances)) {
        setEvolutionInstances(data.instances);
      }
    } catch (e) {
      console.error('Erro ao buscar Evolution API:', e);
    } finally {
      setLoadingEvolution(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchEvolution();
    }
  }, [currentUser]);

  // Conversa ativa no Inbox
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-1');
  const [newMessageText, setNewMessageText] = useState('');
  const [sendRealWpp, setSendRealWpp] = useState(false);

  // Modais de Criação & Relatório
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Form: Novo Cliente / Empresa
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyNiche, setNewCompanyNiche] = useState('');
  const [newCompanyDocument, setNewCompanyDocument] = useState('');
  const [newCompanyOwner, setNewCompanyOwner] = useState('');
  const [newCompanyWpp, setNewCompanyWpp] = useState('');
  const [newCompanyBudget, setNewCompanyBudget] = useState('5000');
  const [newCompanyFee, setNewCompanyFee] = useState('1500');
  const [newCompanyInstance, setNewCompanyInstance] = useState('meu');
  const [newCompanyAiPrompt, setNewCompanyAiPrompt] = useState('Você é o assistente virtual da empresa. Responda educadamente e ofereça suporte aos clientes.');

  // Form: Nova Campanha
  const [newCampPlatform, setNewCampPlatform] = useState<Platform>('META');
  const [newCampName, setNewCampName] = useState('');
  const [newCampObjective, setNewCampObjective] = useState('Vendas / Conversão');
  const [newCampBudget, setNewCampBudget] = useState('100');
  const [newCampCopy, setNewCampCopy] = useState('');
  const [newCampTarget, setNewCampTarget] = useState('');

  // Form: Nova Regra Automação
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleType, setNewRuleType] = useState('STOP_LOSS_SPEND');
  const [newRuleField, setNewRuleField] = useState('spendToday');
  const [newRuleOperator, setNewRuleOperator] = useState('GREATER_THAN');
  const [newRuleThreshold, setNewRuleThreshold] = useState('50');
  const [newRuleAction, setNewRuleAction] = useState('PAUSE_AD');
  const [newRuleActionVal, setNewRuleActionVal] = useState('15');

  // Form: Nova Conexão de Rede
  const [connPlatform, setConnPlatform] = useState<Platform>('META');
  const [connAccountName, setConnAccountName] = useState('');
  const [connAccountId, setConnAccountId] = useState('');
  const [connPixelId, setConnPixelId] = useState('');

  // Form: Construtor de UTM
  const [utmTitle, setUtmTitle] = useState('');
  const [utmUrl, setUtmUrl] = useState('https://minhaloja.com.br/produto');
  const [utmSource, setUtmSource] = useState('meta');
  const [utmMedium, setUtmMedium] = useState('instagram_reels');
  const [utmCampaignName, setUtmCampaignName] = useState('promocao_verao');
  const [utmContentName, setUtmContentName] = useState('video_provador_1');
  const [copiedUtm, setCopiedUtm] = useState(false);

  // Form: Registro de Venda no WhatsApp
  const [saleAmount, setSaleAmount] = useState('197.00');
  const [saleProduct, setSaleProduct] = useState('');
  const [saleMethod, setSaleMethod] = useState('PIX');

  // Gestão de Usuários (Super Admin)
  const [editingUser, setEditingUser] = useState<SystemUserRecord | null>(null);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [adminNewName, setAdminNewName] = useState('');
  const [adminNewUsername, setAdminNewUsername] = useState('');
  const [adminNewPhone, setAdminNewPhone] = useState('');
  const [adminNewPassword, setAdminNewPassword] = useState('');
  const [adminNewRole, setAdminNewRole] = useState<UserRole>('AGENCY_ADMIN');

  // Empresa selecionada
  const activeCompany = clientCompanies.find(c => c.id === selectedCompanyId) || clientCompanies[0];

  // Filtros estritos por empresa ativa!
  const filteredCampaigns = campaigns.filter(c => c.companyId === selectedCompanyId);
  const filteredRules = automationRules.filter(r => r.companyId === selectedCompanyId);
  const filteredConversations = conversations.filter(c => c.companyId === selectedCompanyId);
  const filteredConnections = connections.filter(c => c.companyId === selectedCompanyId);
  const filteredUtms = utmLinks.filter(u => u.companyId === selectedCompanyId);
  const filteredSales = leadSales.filter(s => s.companyId === selectedCompanyId);

  // Garantir conversa ativa válida
  useEffect(() => {
    if (filteredConversations.length > 0) {
      if (!filteredConversations.some(c => c.id === activeConversationId)) {
        setActiveConversationId(filteredConversations[0].id);
      }
    } else {
      setActiveConversationId('');
    }
  }, [selectedCompanyId, filteredConversations]);

  // Se o usuário logado for CLIENT_VIEWER, trava na empresa dele
  useEffect(() => {
    if (currentUser?.role === 'CLIENT_VIEWER' && currentUser.companyId) {
      setSelectedCompanyId(currentUser.companyId);
    }
  }, [currentUser]);

  // Métricas calculadas para a empresa ativa (incluindo vendas do WhatsApp!)
  const totalSpend = filteredCampaigns.reduce((acc, c) => acc + Number(c.spendToday || 0), 0);
  const totalCampaignRevenue = filteredCampaigns.reduce((acc, c) => acc + (Number(c.spendToday || 0) * Number(c.roas || 0)), 0);
  const totalWhatsAppSalesRevenue = filteredSales.reduce((acc, s) => acc + Number(s.amount || 0), 0);
  const totalRevenue = totalCampaignRevenue + totalWhatsAppSalesRevenue;
  const overallRoas = totalSpend > 0 ? totalRevenue / totalSpend : 0;
  const totalConversions = filteredCampaigns.reduce((acc, c) => acc + Number(c.conversions || 0), 0) + filteredSales.length;
  const totalClicks = filteredCampaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalImpressions = filteredCampaigns.reduce((acc, c) => acc + c.impressions, 0);
  const avgCpa = totalConversions > 0 ? totalSpend / totalConversions : 0;

  // Montagem da URL gerada pelo construtor de UTM
  const cleanBaseUrl = utmUrl.trim().replace(/\?.*$/, '');
  const generatedFinalUtmUrl = `${cleanBaseUrl}?utm_source=${encodeURIComponent(utmSource)}&utm_medium=${encodeURIComponent(utmMedium)}&utm_campaign=${encodeURIComponent(utmCampaignName)}&utm_content=${encodeURIComponent(utmContentName)}`;

  // =========================================================================
  // HANDLERS DE AUTENTICAÇÃO
  // =========================================================================

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    const clean = loginUsername.trim().toLowerCase().replace(/^@/, '');
    const matched = systemUsers.find(
      u => u.username.toLowerCase() === clean && u.password === loginPassword
    );

    if (matched) {
      if (matched.status === 'BLOCKED') {
        setAuthError('Sua conta foi suspensa pelo Administrador.');
        return;
      }
      const userAuth: AuthUser = {
        id: matched.id,
        name: matched.name,
        username: matched.username,
        phone: matched.phone,
        role: matched.role,
        agencyName: matched.agencyName,
        companyId: matched.companyId
      };
      setCurrentUser(userAuth);
      localStorage.setItem('socialpulse_auth_user', JSON.stringify(userAuth));
    } else {
      setAuthError('Nome de usuário (@) ou senha incorretos.');
    }
  };

  const quickLogin = (index: number) => {
    const selected = systemUsers[index];
    setLoginUsername(selected.username);
    setLoginPassword(selected.password);
    const userAuth: AuthUser = {
      id: selected.id,
      name: selected.name,
      username: selected.username,
      phone: selected.phone,
      role: selected.role,
      agencyName: selected.agencyName,
      companyId: selected.companyId
    };
    setCurrentUser(userAuth);
    localStorage.setItem('socialpulse_auth_user', JSON.stringify(userAuth));
  };

  const handleStartRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const clean = regUsername.trim().toLowerCase().replace(/^@/, '');

    if (systemUsers.some(u => u.username.toLowerCase() === clean)) {
      setAuthError('Este nome de usuário já está em uso.');
      return;
    }

    if (!regPhone || regPhone.length < 10) {
      setAuthError('Informe um celular com DDD válido.');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setPendingUser({
      name: regName,
      username: clean,
      phone: regPhone,
      password: regPassword,
      role: 'AGENCY_ADMIN' as UserRole
    });
    setAuthSuccess(`Código enviado via SMS/WhatsApp para ${regPhone}!`);
    setAuthView('verify_phone');
  };

  const handleConfirmRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode !== generatedCode && verificationCode !== '123456') {
      setAuthError('Código incorreto.');
      return;
    }

    const newUserRecord: SystemUserRecord = {
      id: `usr-${Date.now()}`,
      name: pendingUser.name,
      username: pendingUser.username,
      password: pendingUser.password,
      phone: pendingUser.phone,
      role: pendingUser.role,
      status: 'ACTIVE',
      agencyName: `Agência de ${pendingUser.name}`
    };

    setSystemUsers(prev => [...prev, newUserRecord]);
    const userAuth: AuthUser = {
      id: newUserRecord.id,
      name: newUserRecord.name,
      username: newUserRecord.username,
      phone: newUserRecord.phone,
      role: newUserRecord.role,
      agencyName: newUserRecord.agencyName
    };
    setCurrentUser(userAuth);
    localStorage.setItem('socialpulse_auth_user', JSON.stringify(userAuth));
  };

  const handleStartRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const query = recoveryTarget.trim().toLowerCase().replace(/^@/, '');
    const found = systemUsers.find(
      u => u.username.toLowerCase() === query || u.phone.replace(/\D/g, '') === query.replace(/\D/g, '')
    );

    if (!found) {
      setAuthError('Nenhum usuário encontrado com esse @usuário ou telefone.');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setRecoveryUserFound(found);
    setAuthSuccess(`Código enviado para o celular ${found.phone}!`);
    setAuthView('reset_password_verify');
  };

  const handleCompleteResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (recoveryCode !== generatedCode && recoveryCode !== '123456') {
      setAuthError('Código de confirmação incorreto.');
      return;
    }
    if (newPassword.length < 3) {
      setAuthError('A nova senha deve ter pelo menos 3 dígitos.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setAuthError('As senhas não coincidem.');
      return;
    }

    setSystemUsers(prev =>
      prev.map(u => (u.username === recoveryUserFound.username ? { ...u, password: newPassword } : u))
    );
    setAuthSuccess('Senha redefinida com sucesso! Faça login.');
    setLoginUsername(recoveryUserFound.username);
    setLoginPassword(newPassword);
    setAuthView('login');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('socialpulse_auth_user');
  };

  // =========================================================================
  // HANDLERS: NOVO CLIENTE, CAMPANHA, REGRA, CONEXÕES
  // =========================================================================

  const handleCreateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName) return;

    const newComp: ClientCompanyDetail = {
      id: `comp-${Date.now()}`,
      name: newCompanyName,
      niche: newCompanyNiche || 'Geral',
      document: newCompanyDocument || '00.000.000/0001-00',
      ownerContact: newCompanyOwner || 'Responsável',
      whatsappContact: newCompanyWpp || '+55 (65) 99677-2226',
      monthlyFee: Number(newCompanyFee) || 1500,
      monthlyAdBudget: Number(newCompanyBudget) || 5000,
      status: 'ACTIVE',
      evolutionInstance: newCompanyInstance || 'meu',
      aiPrompt: newCompanyAiPrompt,
      aiAutoReply: true,
      clientPortalAccess: true
    };

    setClientCompanies(prev => [...prev, newComp]);
    setSelectedCompanyId(newComp.id);
    setIsCompanyModalOpen(false);

    setNewCompanyName('');
    setNewCompanyNiche('');
    setNewCompanyDocument('');
    setNewCompanyOwner('');
    setNewCompanyWpp('');
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampName) return;

    const newCamp: Campaign = {
      id: `camp-${Date.now()}`,
      companyId: selectedCompanyId,
      platform: newCampPlatform,
      name: newCampName,
      objective: newCampObjective,
      status: 'ACTIVE',
      dailyBudget: Number(newCampBudget) || 100,
      spendToday: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      cpa: 0,
      roas: 0,
      autopilotStatus: 'Monitoramento Ativo',
      adCopy: newCampCopy,
      targetUrl: newCampTarget
    };

    setCampaigns(prev => [newCamp, ...prev]);
    setIsCampaignModalOpen(false);
    setNewCampName('');
    setNewCampCopy('');
    setNewCampTarget('');
  };

  const handleToggleCampaign = (campId: string) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === campId ? { ...c, status: c.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : c))
    );
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName) return;

    const newRule: AutomationRule = {
      id: `rule-${Date.now()}`,
      companyId: selectedCompanyId,
      name: newRuleName,
      type: newRuleType,
      conditionField: newRuleField,
      operator: newRuleOperator,
      thresholdValue: Number(newRuleThreshold) || 40,
      action: newRuleAction,
      actionValue: newRuleActionVal ? Number(newRuleActionVal) : null,
      isActive: true,
      lastTriggered: 'Recém criada'
    };

    setAutomationRules(prev => [newRule, ...prev]);
    setIsRuleModalOpen(false);
    setNewRuleName('');
  };

  const handleToggleRule = (ruleId: string) => {
    setAutomationRules(prev =>
      prev.map(r => (r.id === ruleId ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const handleSaveConnection = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = connections.find(c => c.companyId === selectedCompanyId && c.platform === connPlatform);

    if (existing) {
      setConnections(prev =>
        prev.map(c =>
          c.id === existing.id
            ? {
                ...c,
                connected: true,
                accountName: connAccountName || c.accountName,
                accountId: connAccountId || c.accountId,
                pixelOrTagId: connPixelId || c.pixelOrTagId,
                updatedAt: 'Agora'
              }
            : c
        )
      );
    } else {
      const newConn: NetworkConnection = {
        id: `conn-${Date.now()}`,
        companyId: selectedCompanyId,
        platform: connPlatform,
        connected: true,
        accountName: connAccountName || `Conta ${connPlatform}`,
        accountId: connAccountId || 'act_' + Math.floor(Math.random() * 10000000),
        pixelOrTagId: connPixelId || 'pix_' + Math.floor(Math.random() * 10000000),
        updatedAt: 'Agora'
      };
      setConnections(prev => [...prev, newConn]);
    }

    setIsConnectionModalOpen(false);
    setConnAccountName('');
    setConnAccountId('');
    setConnPixelId('');
  };

  const handleToggleConnection = (connId: string) => {
    setConnections(prev =>
      prev.map(c => (c.id === connId ? { ...c, connected: !c.connected, updatedAt: 'Agora' } : c))
    );
  };

  // Evolution API
  const handleTestEvolutionMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testWhatsAppNumber) return;

    setEvolutionFeedback('Enviando mensagem via Evolution API...');
    try {
      const inst = activeCompany.evolutionInstance || 'meu';
      const res = await fetch('/api/evolution/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instance: inst,
          number: testWhatsAppNumber,
          text: testWhatsAppMessage
        })
      });
      const data = await res.json();
      if (data.success) {
        setEvolutionFeedback(`✅ Mensagem enviada para ${testWhatsAppNumber} via '${inst}'!`);
      } else {
        setEvolutionFeedback(`❌ Erro no envio: ${data.error || 'Verifique a instância'}`);
      }
    } catch (err: any) {
      setEvolutionFeedback(`❌ Falha: ${err.message}`);
    }
  };

  const handleSaveAiPrompt = (newPrompt: string) => {
    setClientCompanies(prev =>
      prev.map(c => (c.id === selectedCompanyId ? { ...c, aiPrompt: newPrompt } : c))
    );
    alert('Prompt e comportamento da IA atualizados com sucesso para esta empresa!');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !activeConversationId) return;

    const currentMsg = newMessageText;
    const timeStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      senderType: 'AGENT',
      text: currentMsg,
      time: timeStr
    };

    setMessages(prev => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), newMsg]
    }));

    setConversations(prev =>
      prev.map(c =>
        c.id === activeConversationId ? { ...c, lastMessage: currentMsg, lastMessageTime: timeStr, unreadCount: 0 } : c
      )
    );

    setNewMessageText('');

    const activeConv = conversations.find(c => c.id === activeConversationId);
    if (sendRealWpp && activeConv?.contactPhone && activeConv.channel === 'WHATSAPP') {
      try {
        await fetch('/api/evolution/send-message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instance: activeCompany.evolutionInstance || 'meu',
            number: activeConv.contactPhone,
            text: currentMsg
          })
        });
      } catch (e) {
        console.error('Erro ao disparar via Evolution API:', e);
      }
    }
  };

  // =========================================================================
  // HANDLERS: AS 4 NOVAS FUNCIONALIDADES PROFISSIONAIS
  // =========================================================================

  // 1. Salvar Novo Link com UTM
  const handleSaveUtmLink = (e: React.FormEvent) => {
    e.preventDefault();
    const newUtm: UtmLink = {
      id: `utm-${Date.now()}`,
      companyId: selectedCompanyId,
      title: utmTitle || `Link ${utmSource} - ${utmMedium}`,
      destinationUrl: utmUrl,
      finalUrl: generatedFinalUtmUrl,
      source: utmSource,
      medium: utmMedium,
      campaign: utmCampaignName,
      content: utmContentName,
      clicks: 0,
      conversions: 0,
      createdAt: 'Hoje'
    };

    setUtmLinks(prev => [newUtm, ...prev]);
    setUtmTitle('');
    alert('Link rastreado com parâmetros UTM gerado e salvo com sucesso!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUtm(true);
    setTimeout(() => setCopiedUtm(false), 2000);
  };

  // 2. Registrar Venda no WhatsApp
  const handleRegisterSale = (e: React.FormEvent) => {
    e.preventDefault();
    const activeConv = conversations.find(c => c.id === activeConversationId);
    if (!activeConv) return;

    const parsedAmount = Number(saleAmount) || 0;
    const timeStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const newSale: LeadSale = {
      id: `sale-${Date.now()}`,
      companyId: selectedCompanyId,
      conversationId: activeConv.id,
      customerName: activeConv.contactName,
      campaignName: activeConv.originAd || 'Tráfego Direto',
      amount: parsedAmount,
      product: saleProduct || 'Produto / Serviço Geral',
      paymentMethod: saleMethod,
      createdAt: `Hoje às ${timeStr}`
    };

    setLeadSales(prev => [newSale, ...prev]);

    // Inserir mensagem de sistema no chat
    const systemSaleMsg: Message = {
      id: `m-sale-${Date.now()}`,
      senderType: 'SYSTEM_SALE',
      text: `🎉 VENDA CONFIRMADA: R$ ${parsedAmount.toFixed(2)} via ${saleMethod} (${saleProduct || 'Produto'})`,
      time: timeStr
    };

    setMessages(prev => ({
      ...prev,
      [activeConv.id]: [...(prev[activeConv.id] || []), systemSaleMsg]
    }));

    // Atualizar status da conversa
    setConversations(prev =>
      prev.map(c =>
        c.id === activeConv.id
          ? {
              ...c,
              aiStatus: `Venda Fechada (R$ ${parsedAmount.toFixed(2)})`,
              totalSalesValue: (c.totalSalesValue || 0) + parsedAmount
            }
          : c
      )
    );

    setIsSaleModalOpen(false);
    setSaleProduct('');
  };

  // 3. Disparar Resumo do Relatório no WhatsApp do Cliente
  const handleSendReportWhatsApp = async () => {
    if (!activeCompany.whatsappContact) {
      alert('Esta empresa não tem número de WhatsApp cadastrado.');
      return;
    }

    const textReport = `📊 *RELATÓRIO DE PERFORMANCE - ${activeCompany.name.toUpperCase()}*\n\n` +
      `📅 Período: Mês Atual\n` +
      `💰 Total Investido: R$ ${totalSpend.toFixed(2)}\n` +
      `📈 Faturamento Gerado: R$ ${totalRevenue.toFixed(2)}\n` +
      `🔥 Retorno (ROAS): ${overallRoas.toFixed(2)}x\n` +
      `🎯 Conversões / Vendas: ${totalConversions}\n` +
      `💬 Mensagens / Leads: ${filteredConversations.length}\n\n` +
      `Seu tráfego pago está sob gestão otimizada pela equipe! 🚀`;

    try {
      await fetch('/api/evolution/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instance: activeCompany.evolutionInstance || 'meu',
          number: activeCompany.whatsappContact,
          text: textReport
        })
      });
      alert(`Relatório resumido disparado no WhatsApp do cliente (${activeCompany.whatsappContact}) com sucesso!`);
    } catch (e: any) {
      alert(`Falha ao disparar no WhatsApp: ${e.message}`);
    }
  };

  // Super Admin Handlers
  const handleOpenEditUser = (user: SystemUserRecord) => {
    setEditingUser({ ...user });
    setIsEditUserModalOpen(true);
  };

  const handleSaveUserEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setSystemUsers(prev => prev.map(u => (u.id === editingUser.id ? { ...editingUser } : u)));

    if (currentUser?.id === editingUser.id) {
      const updatedAuth: AuthUser = {
        ...currentUser,
        name: editingUser.name,
        username: editingUser.username,
        phone: editingUser.phone,
        role: editingUser.role
      };
      setCurrentUser(updatedAuth);
      localStorage.setItem('socialpulse_auth_user', JSON.stringify(updatedAuth));
    }

    setIsEditUserModalOpen(false);
    setEditingUser(null);
  };

  const handleToggleUserStatus = (userId: string) => {
    setSystemUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, status: u.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE' } : u))
    );
  };

  const handleDeleteUser = (userId: string) => {
    if (currentUser?.id === userId) {
      alert('Você não pode excluir sua própria conta de administrador.');
      return;
    }
    if (confirm('Tem certeza que deseja excluir permanentemente este usuário?')) {
      setSystemUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const handleAdminCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = adminNewUsername.trim().toLowerCase().replace(/^@/, '');

    if (systemUsers.some(u => u.username.toLowerCase() === clean)) {
      alert('Este nome de usuário já existe.');
      return;
    }

    const newUser: SystemUserRecord = {
      id: `usr-${Date.now()}`,
      name: adminNewName,
      username: clean,
      phone: adminNewPhone,
      password: adminNewPassword || '123456',
      role: adminNewRole,
      status: 'ACTIVE',
      agencyName: adminNewRole === 'AGENCY_ADMIN' ? `Agência de ${adminNewName}` : undefined
    };

    setSystemUsers(prev => [...prev, newUser]);
    setIsCreateUserModalOpen(false);
    setAdminNewName('');
    setAdminNewUsername('');
    setAdminNewPhone('');
    setAdminNewPassword('');
    alert(`Usuário @${clean} cadastrado com sucesso!`);
  };

  // =========================================================================
  // TELAS DE LOGIN & RECUPERAÇÃO
  // =========================================================================

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                NexusAds
              </h1>
              <p className="text-xs text-slate-400 font-medium">Tráfego Pago & Atendimento Multicanal</p>
            </div>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-950/50 border border-red-800/80 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {authSuccess && (
            <div className="mb-4 p-3 bg-emerald-950/50 border border-emerald-800/80 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{authSuccess}</span>
            </div>
          )}

          {authView === 'login' && (
            <div>
              <h2 className="text-lg font-bold text-slate-100 mb-1">Acesse sua Conta</h2>
              <p className="text-xs text-slate-400 mb-5">Entre com seu @nome_de_usuario e senha.</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nome de Usuário</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold text-sm">@</span>
                    <input
                      type="text"
                      required
                      value={loginUsername}
                      onChange={e => setLoginUsername(e.target.value)}
                      placeholder="admin ou seu_usuario"
                      className="w-full pl-8 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">Senha</label>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthError('');
                        setAuthSuccess('');
                        setAuthView('forgot_password');
                      }}
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  Entrar no Painel
                </button>
              </form>

              <div className="mt-5 pt-4 border-t border-slate-800 text-center">
                <p className="text-xs text-slate-400">
                  Não possui conta?{' '}
                  <button
                    onClick={() => {
                      setAuthError('');
                      setAuthSuccess('');
                      setAuthView('register');
                    }}
                    className="text-indigo-400 font-semibold hover:text-indigo-300"
                  >
                    Cadastre-se com celular
                  </button>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center mb-2.5">
                  Acessos de Teste (1 Clique)
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => quickLogin(0)}
                    className="p-2 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-left transition-all"
                  >
                    <p className="text-[11px] font-bold text-amber-400">Super Admin</p>
                    <p className="text-[10px] text-slate-400">@admin</p>
                  </button>
                  <button
                    onClick={() => quickLogin(1)}
                    className="p-2 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-left transition-all"
                  >
                    <p className="text-[11px] font-bold text-indigo-400">Agência</p>
                    <p className="text-[10px] text-slate-400">@carlos_alpha</p>
                  </button>
                  <button
                    onClick={() => quickLogin(2)}
                    className="p-2 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-lg text-left transition-all"
                  >
                    <p className="text-[11px] font-bold text-emerald-400">Cliente</p>
                    <p className="text-[10px] text-slate-400">@fernanda_moda</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {authView === 'register' && (
            <div>
              <h2 className="text-lg font-bold text-slate-100 mb-1">Criar Nova Conta</h2>
              <p className="text-xs text-slate-400 mb-5">Confirmação obrigatória via Celular/WhatsApp.</p>

              <form onSubmit={handleStartRegister} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="Cristhian Sancore"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nome de Usuário (@)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold text-sm">@</span>
                    <input
                      type="text"
                      required
                      value={regUsername}
                      onChange={e => setRegUsername(e.target.value)}
                      placeholder="cristhian_trafego"
                      className="w-full pl-8 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Celular / WhatsApp (com DDD)</label>
                  <div className="relative">
                    <Smartphone className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={regPhone}
                      onChange={e => setRegPhone(e.target.value)}
                      placeholder="(65) 99677-2226"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Crie sua Senha</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={e => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  Enviar Código no Celular
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setAuthError('');
                    setAuthSuccess('');
                    setAuthView('login');
                  }}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  Já tem conta? <span className="text-indigo-400 font-semibold">Fazer Login</span>
                </button>
              </div>
            </div>
          )}

          {authView === 'verify_phone' && (
            <div>
              <h2 className="text-lg font-bold text-slate-100 mb-1">Confirme seu Celular</h2>
              <p className="text-xs text-slate-400 mb-4">
                Digite o código de 6 dígitos enviado para <b>{pendingUser?.phone}</b>.
              </p>

              <div className="p-3 bg-indigo-950/40 border border-indigo-800/60 rounded-xl text-xs text-indigo-300 mb-4 flex items-center justify-between">
                <span>Código gerado para teste:</span>
                <span className="font-mono font-bold text-base text-amber-300 bg-slate-950 px-2 py-0.5 rounded border border-indigo-700">
                  {generatedCode}
                </span>
              </div>

              <form onSubmit={handleConfirmRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Código de 6 Dígitos</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={verificationCode}
                    onChange={e => setVerificationCode(e.target.value)}
                    placeholder="Ex: 123456"
                    className="w-full text-center tracking-widest font-mono text-xl py-3 bg-slate-950 border border-slate-800 rounded-xl text-indigo-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  Validar e Ativar Minha Conta
                </button>
              </form>
            </div>
          )}

          {authView === 'forgot_password' && (
            <div>
              <h2 className="text-lg font-bold text-slate-100 mb-1">Recuperação de Acesso</h2>
              <p className="text-xs text-slate-400 mb-5">Informe seu @usuário ou número de celular cadastrado.</p>

              <form onSubmit={handleStartRecovery} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">@Usuário ou Celular</label>
                  <input
                    type="text"
                    required
                    value={recoveryTarget}
                    onChange={e => setRecoveryTarget(e.target.value)}
                    placeholder="@admin ou (65) 99677-2226"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  Enviar Código no Celular
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={() => setAuthView('login')}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  ← Voltar para o Login
                </button>
              </div>
            </div>
          )}

          {authView === 'reset_password_verify' && (
            <div>
              <h2 className="text-lg font-bold text-slate-100 mb-1">Crie sua Nova Senha</h2>
              <p className="text-xs text-slate-400 mb-4">
                Código enviado para <b>{recoveryUserFound?.phone}</b>.
              </p>

              <div className="p-2.5 bg-indigo-950/40 border border-indigo-800/60 rounded-xl text-xs text-indigo-300 mb-4 flex items-center justify-between">
                <span>Código gerado:</span>
                <span className="font-mono font-bold text-base text-amber-300 bg-slate-950 px-2 py-0.5 rounded border border-indigo-700">
                  {generatedCode}
                </span>
              </div>

              <form onSubmit={handleCompleteResetPassword} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Código de Confirmação</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={recoveryCode}
                    onChange={e => setRecoveryCode(e.target.value)}
                    placeholder="123456"
                    className="w-full text-center tracking-widest font-mono text-lg py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-indigo-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nova Senha</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Confirmar Nova Senha</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  Salvar Nova Senha & Entrar
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // PAINEL OPERACIONAL PRINCIPAL
  // =========================================================================

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* BARRA SUPERIOR */}
      <header className="h-16 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                  NexusAds
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Tráfego Pago & Atendimento Multicanal</p>
            </div>
          </div>

          {/* SELETOR DE EMPRESAS */}
          {currentUser.role !== 'CLIENT_VIEWER' && (
            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Cliente Selecionado</span>
                <select
                  value={selectedCompanyId}
                  onChange={e => setSelectedCompanyId(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-100 focus:outline-none cursor-pointer"
                >
                  {clientCompanies.map(c => (
                    <option key={c.id} value={c.id} className="bg-slate-900 text-slate-100">
                      {c.name} ({c.niche})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setIsCompanyModalOpen(true)}
                title="Cadastrar Novo Cliente"
                className="ml-2 p-1.5 bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-200 hover:text-white rounded-lg transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* DIREITA: BOTÃO EXPORTAR RELATÓRIO + WHATSAPP STATUS + PERFIL */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-300 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            Relatório do Cliente
          </button>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-950/40 border border-emerald-800/60 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs text-emerald-300 font-medium">
              Evolution API: <b>{activeCompany.evolutionInstance || 'meu'}</b>
            </span>
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-xs font-bold text-slate-200">{currentUser.name}</span>
                <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold bg-slate-800 text-amber-400 rounded">
                  @{currentUser.username}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                {currentUser.role === 'SUPER_ADMIN'
                  ? '👑 Super Admin'
                  : currentUser.role === 'AGENCY_ADMIN'
                  ? `🏢 ${currentUser.agencyName || 'Agência'}`
                  : '👤 Cliente Final'}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 bg-slate-900 hover:bg-red-950/60 border border-slate-800 hover:border-red-800 text-slate-400 hover:text-red-300 rounded-xl transition-all cursor-pointer"
              title="Sair"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ÁREA PRINCIPAL */}
      <div className="flex flex-1 overflow-hidden">
        {/* MENU LATERAL */}
        <aside className="w-64 border-r border-slate-800/80 bg-slate-900/40 p-4 flex flex-col justify-between shrink-0">
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Visão Geral
            </button>

            <button
              onClick={() => setActiveTab('campaigns')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'campaigns'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Target className="w-4 h-4" />
                Campanhas & Anúncios
              </div>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-800 rounded">
                {filteredCampaigns.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('autopilot')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'autopilot'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4" />
                Piloto & Horários
              </div>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 rounded">
                {filteredRules.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('inbox')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'inbox'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                Caixa & Vendas WhatsApp
              </div>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded">
                {filteredConversations.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('utms')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'utms'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Link2 className="w-4 h-4" />
                Gerador de UTMs
              </div>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-800 rounded">
                {filteredUtms.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('integrations')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'integrations'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Share2 className="w-4 h-4" />
                Conectar Redes & Evolution
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </button>

            {currentUser.role !== 'CLIENT_VIEWER' && (
              <button
                onClick={() => setActiveTab('clients')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'clients'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4" />
                  Empresas / Clientes
                </div>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-800 rounded">
                  {clientCompanies.length}
                </span>
              </button>
            )}

            {currentUser.role === 'SUPER_ADMIN' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'admin'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                    : 'text-amber-400 hover:bg-amber-950/40 hover:text-amber-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserCheck className="w-4 h-4" />
                  Usuários & Admin
                </div>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-200 rounded">
                  {systemUsers.length}
                </span>
              </button>
            )}
          </nav>

          {/* CARD DA EMPRESA SELECIONADA */}
          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Cliente Atual</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <p className="text-xs font-bold text-slate-100 truncate">{activeCompany.name}</p>
            <p className="text-[11px] text-slate-400">{activeCompany.niche}</p>
            <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Verba Mensal:</span>
              <span className="font-semibold text-slate-200">
                R$ {activeCompany.monthlyAdBudget.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950">
          {/* =========================================================================
              ABA: VISÃO GERAL (DASHBOARD)
             ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Visão Geral de Performance</h2>
                  <p className="text-xs text-slate-400">
                    Métricas consolidadas de tráfego e vendas no WhatsApp para <b>{activeCompany.name}</b>.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    Gerar Relatório
                  </button>
                  <button
                    onClick={() => setIsCampaignModalOpen(true)}
                    className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Novo Anúncio
                  </button>
                </div>
              </div>

              {/* CARDS DE MÉTRICAS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium">Investimento Hoje</span>
                    <DollarSign className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-2xl font-bold text-slate-100">
                    R$ {totalSpend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Limite mensal: R$ {activeCompany.monthlyAdBudget.toLocaleString('pt-BR')}
                  </p>
                </div>

                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium">ROAS Geral (Anúncios + WhatsApp)</span>
                    <Flame className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-bold text-emerald-400">{overallRoas.toFixed(2)}x</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Receita Total: R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium">Conversões & Vendas</span>
                    <Target className="w-4 h-4 text-indigo-400" />
                  </div>
                  <p className="text-2xl font-bold text-slate-100">{totalConversions}</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    CPA Médio: R$ {avgCpa.toFixed(2)} • {filteredSales.length} vendas via WhatsApp
                  </p>
                </div>

                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium">Cliques / Alcance</span>
                    <Users className="w-4 h-4 text-violet-400" />
                  </div>
                  <p className="text-2xl font-bold text-slate-100">{totalClicks.toLocaleString('pt-BR')}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{totalImpressions.toLocaleString('pt-BR')} impressões</p>
                </div>
              </div>

              {/* LISTA RESUMIDA DE ANÚNCIOS */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">Anúncios Ativos ({filteredCampaigns.length})</h3>
                    <p className="text-xs text-slate-400">Meta Ads, Google Ads e TikTok Ads da empresa.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('campaigns')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                  >
                    Gerenciar todos <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-slate-800">
                  {filteredCampaigns.map(camp => (
                    <div key={camp.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-1 text-[10px] font-bold rounded ${
                            camp.platform === 'META'
                              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                              : camp.platform === 'GOOGLE'
                              ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-600/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {camp.platform}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-100">{camp.name}</p>
                          <p className="text-xs text-slate-400">{camp.objective} • Orçamento: R$ {camp.dailyBudget.toFixed(2)}/dia</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-200">Gasto: R$ {camp.spendToday.toFixed(2)}</p>
                          <p className="text-[11px] text-emerald-400 font-medium">ROAS: {camp.roas.toFixed(1)}x</p>
                        </div>

                        <button
                          onClick={() => handleToggleCampaign(camp.id)}
                          className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            camp.status === 'ACTIVE'
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800 hover:bg-amber-950/60'
                              : 'bg-amber-950/60 text-amber-300 border border-amber-800 hover:bg-emerald-950/60'
                          }`}
                        >
                          {camp.status === 'ACTIVE' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          {camp.status === 'ACTIVE' ? 'Ativo' : 'Pausado'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              ABA: GERADOR DE UTMS & RASTREAMENTO PROFISSIONAL
             ========================================================================= */}
          {activeTab === 'utms' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Gerador & Rastreador de Parâmetros UTM</h2>
                  <p className="text-xs text-slate-400">
                    Crie links rastreados com parâmetros UTM para Meta Ads, Google, TikTok e WhatsApp para <b>{activeCompany.name}</b>.
                  </p>
                </div>
              </div>

              {/* CONSTRUTOR DE LINKS */}
              <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
                <h3 className="text-sm font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-indigo-400" />
                  Construtor de URL Parametrizada
                </h3>

                <form onSubmit={handleSaveUtmLink} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Título de Referência do Link</label>
                      <input
                        type="text"
                        value={utmTitle}
                        onChange={e => setUtmTitle(e.target.value)}
                        placeholder="Ex: Anúncio Vídeo Vestido Festa - Reels"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">URL de Destino (Site / Loja)</label>
                      <input
                        type="text"
                        required
                        value={utmUrl}
                        onChange={e => setUtmUrl(e.target.value)}
                        placeholder="https://suaempresa.com.br/pagina"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Origem (utm_source)</label>
                      <select
                        value={utmSource}
                        onChange={e => setUtmSource(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                      >
                        <option value="meta">Meta Ads (Facebook/Insta)</option>
                        <option value="google">Google Ads</option>
                        <option value="tiktok">TikTok Ads</option>
                        <option value="whatsapp">WhatsApp Direto</option>
                        <option value="kwai">Kwai Ads</option>
                        <option value="linkedin">LinkedIn Ads</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Meio / Posicionamento (utm_medium)</label>
                      <select
                        value={utmMedium}
                        onChange={e => setUtmMedium(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                      >
                        <option value="instagram_reels">Instagram Reels</option>
                        <option value="instagram_stories">Instagram Stories</option>
                        <option value="facebook_feed">Facebook Feed</option>
                        <option value="cpc">Google Pesquisa (CPC)</option>
                        <option value="youtube">YouTube Vídeo</option>
                        <option value="tiktok_spark">TikTok Spark Ads</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Campanha (utm_campaign)</label>
                      <input
                        type="text"
                        value={utmCampaignName}
                        onChange={e => setUtmCampaignName(e.target.value)}
                        placeholder="escala_verao_2026"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Conteúdo / Criativo (utm_content)</label>
                      <input
                        type="text"
                        value={utmContentName}
                        onChange={e => setUtmContentName(e.target.value)}
                        placeholder="video_provador_1"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* PREVIEW DO LINK GERADO */}
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-indigo-900/60 flex items-center justify-between gap-3">
                    <div className="flex-1 overflow-hidden">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">Link Final Gerado para Usar no Anúncio:</span>
                      <code className="text-xs text-emerald-400 font-mono break-all select-all">
                        {generatedFinalUtmUrl}
                      </code>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(generatedFinalUtmUrl)}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      {copiedUtm ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedUtm ? 'Copiado!' : 'Copiar Link'}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Salvar este Link Rastreado
                  </button>
                </form>
              </div>

              {/* LISTA DE LINKS GERADOS */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <h3 className="text-base font-bold text-slate-100 mb-3">Links Rastreados Salvos ({filteredUtms.length})</h3>
                <div className="divide-y divide-slate-800">
                  {filteredUtms.map(u => (
                    <div key={u.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-xs text-slate-100">{u.title}</span>
                          <span className="px-1.5 py-0.2 text-[9px] bg-slate-800 text-indigo-300 rounded uppercase font-bold">
                            {u.source} / {u.medium}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono break-all">{u.finalUrl}</p>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right text-xs">
                          <span className="font-bold text-slate-200">{u.clicks} cliques</span>
                          <p className="text-[10px] text-emerald-400">{u.conversions} conversões</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(u.finalUrl)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs"
                          title="Copiar Link"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              ABA: PILOTO AUTOMÁTICO & PROGRAMAÇÃO DE HORÁRIOS (DAYPARTING)
             ========================================================================= */}
          {activeTab === 'autopilot' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Piloto Automático & Programação de Horários</h2>
                  <p className="text-xs text-slate-400">
                    Otimização contínua com Stop-Loss, Escala e Pausa Noturna de anúncios para <b>{activeCompany.name}</b>.
                  </p>
                </div>

                <button
                  onClick={() => setIsRuleModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Nova Regra Inteligente
                </button>
              </div>

              {/* CARD DE PROGRAMAÇÃO POR HORÁRIOS (DAYPARTING) */}
              <div className="p-5 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-800/60 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-100">Programação por Horários (Dayparting)</h3>
                      <p className="text-xs text-slate-400">
                        Economize verba pausando anúncios de WhatsApp fora do horário de atendimento.
                      </p>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                    <input
                      type="checkbox"
                      checked={dayparting.enabled}
                      onChange={e => setDayparting({ ...dayparting, enabled: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-xs font-bold text-indigo-300">
                      {dayparting.enabled ? '🟢 Dayparting Ativo' : '⚪ Desativado'}
                    </span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-800/80">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Horário de Início</label>
                    <input
                      type="time"
                      value={dayparting.startHour}
                      onChange={e => setDayparting({ ...dayparting, startHour: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Horário de Término</label>
                    <input
                      type="time"
                      value={dayparting.endHour}
                      onChange={e => setDayparting({ ...dayparting, endHour: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="p-2 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 w-full text-center font-semibold">
                      Status Atual: 🟢 Anúncios em Horário de Atendimento
                    </div>
                  </div>
                </div>
              </div>

              {/* REGRAS ATIVAS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRules.map(rule => (
                  <div key={rule.id} className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-100">{rule.name}</span>
                      <button
                        onClick={() => handleToggleRule(rule.id)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                          rule.isActive
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}
                      >
                        {rule.isActive ? '🟢 Regra Ativa' : '⚪ Desativada'}
                      </button>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300 mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                      <p>
                        <b>Condição:</b> Se <code>{rule.conditionField}</code> {rule.operator === 'GREATER_THAN' ? '>' : '<'}{' '}
                        <b>{rule.thresholdValue}</b>
                      </p>
                      <p>
                        <b>Ação Imediata:</b>{' '}
                        <span className="text-indigo-400 font-semibold">
                          {rule.action === 'PAUSE_AD'
                            ? 'Pausar Anúncio Automaticamente'
                            : rule.action === 'INCREASE_BUDGET'
                            ? `Aumentar Verba em ${rule.actionValue}%`
                            : 'Notificar Gestor no WhatsApp'}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                      <span>Último disparo: {rule.lastTriggered}</span>
                      <button
                        onClick={() => setAutomationRules(prev => prev.filter(r => r.id !== rule.id))}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              ABA: CAIXA DE ENTRADA & REGISTRO DE VENDAS DO WHATSAPP
             ========================================================================= */}
          {activeTab === 'inbox' && (
            <div className="h-[calc(100vh-130px)] flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Caixa de Entrada & Vendas WhatsApp</h2>
                  <p className="text-xs text-slate-400">
                    Registre as vendas geradas nos anúncios e responda via WhatsApp Real ({activeCompany.evolutionInstance}) para <b>{activeCompany.name}</b>.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsSaleModalOpen(true)}
                    className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Registrar Venda Deste Lead
                  </button>

                  <label className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/80 px-3 py-1.5 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sendRealWpp}
                      onChange={e => setSendRealWpp(e.target.checked)}
                      className="rounded"
                    />
                    Enviar via WhatsApp Real
                  </label>
                </div>
              </div>

              {/* CHAT + LISTA */}
              <div className="flex-1 grid grid-cols-12 gap-4 overflow-hidden bg-slate-900/60 border border-slate-800 rounded-2xl">
                {/* LISTA DE CONVERSAS */}
                <div className="col-span-4 border-r border-slate-800 overflow-y-auto divide-y divide-slate-800">
                  {filteredConversations.map(conv => (
                    <div
                      key={conv.id}
                      onClick={() => setActiveConversationId(conv.id)}
                      className={`p-3.5 cursor-pointer transition-colors ${
                        activeConversationId === conv.id ? 'bg-indigo-950/40 border-l-4 border-indigo-500' : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-100">{conv.contactName}</span>
                        <span className="text-[10px] text-slate-400">{conv.lastMessageTime}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 truncate mb-1">{conv.lastMessage}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">
                          {conv.channel}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold">{conv.aiStatus}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* JANELA DE CHAT */}
                <div className="col-span-8 flex flex-col h-full overflow-hidden">
                  {filteredConversations.find(c => c.id === activeConversationId) ? (
                    (() => {
                      const currentConv = filteredConversations.find(c => c.id === activeConversationId)!;
                      const currentMsgs = messages[currentConv.id] || [];

                      return (
                        <>
                          <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
                            <div>
                              <p className="font-bold text-sm text-slate-100">{currentConv.contactName}</p>
                              <p className="text-[11px] text-slate-400">
                                {currentConv.contactPhone || 'Sem celular'} • Anúncio de origem: {currentConv.originAd}
                              </p>
                            </div>

                            <button
                              onClick={() => setIsSaleModalOpen(true)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              Registrar Venda (R$)
                            </button>
                          </div>

                          {/* Mensagens */}
                          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/20">
                            {currentMsgs.map(m => (
                              <div
                                key={m.id}
                                className={`flex ${
                                  m.senderType === 'CUSTOMER'
                                    ? 'justify-start'
                                    : m.senderType === 'SYSTEM_SALE'
                                    ? 'justify-center'
                                    : 'justify-end'
                                }`}
                              >
                                {m.senderType === 'SYSTEM_SALE' ? (
                                  <div className="px-4 py-2 bg-gradient-to-r from-amber-950 to-emerald-950 border border-amber-600/60 rounded-xl text-xs font-bold text-amber-300 text-center shadow-lg">
                                    {m.text}
                                  </div>
                                ) : (
                                  <div
                                    className={`max-w-[70%] p-3 rounded-2xl text-xs ${
                                      m.senderType === 'CUSTOMER'
                                        ? 'bg-slate-800 text-slate-100 rounded-bl-none'
                                        : m.senderType === 'AI_BOT'
                                        ? 'bg-indigo-600/90 text-white rounded-br-none shadow-md'
                                        : 'bg-emerald-600 text-white rounded-br-none'
                                    }`}
                                  >
                                    {m.senderType === 'AI_BOT' && (
                                      <p className="text-[10px] font-bold text-indigo-200 mb-1 flex items-center gap-1">
                                        <Bot className="w-3 h-3" /> Sofia (IA da Empresa)
                                      </p>
                                    )}
                                    <p>{m.text}</p>
                                    <span className="block text-[9px] opacity-70 text-right mt-1">{m.time}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Campo de Envio */}
                          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center gap-2">
                            <input
                              type="text"
                              value={newMessageText}
                              onChange={e => setNewMessageText(e.target.value)}
                              placeholder={`Responder ${currentConv.contactName}...`}
                              className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                            />
                            <button
                              type="submit"
                              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <Send className="w-3.5 h-3.5" />
                              Enviar
                            </button>
                          </form>
                        </>
                      );
                    })()
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
                      Selecione uma conversa ao lado.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              ABA: CAMPANHAS & ANÚNCIOS
             ========================================================================= */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Gerenciador de Campanhas & Anúncios</h2>
                  <p className="text-xs text-slate-400">
                    Crie, pause e acompanhe anúncios em tempo real para <b>{activeCompany.name}</b>.
                  </p>
                </div>

                <button
                  onClick={() => setIsCampaignModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Criar Nova Campanha
                </button>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Plataforma & Nome</th>
                      <th className="p-3.5">Objetivo</th>
                      <th className="p-3.5">Orçamento Diário</th>
                      <th className="p-3.5">Gasto Hoje</th>
                      <th className="p-3.5">Conversões</th>
                      <th className="p-3.5">ROAS</th>
                      <th className="p-3.5">Status Piloto</th>
                      <th className="p-3.5 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredCampaigns.map(camp => (
                      <tr key={camp.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 text-[9px] font-extrabold rounded ${
                                camp.platform === 'META'
                                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                                  : camp.platform === 'GOOGLE'
                                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-rose-600/20 text-rose-400 border border-rose-500/30'
                              }`}
                            >
                              {camp.platform}
                            </span>
                            <div>
                              <p className="font-semibold text-slate-100">{camp.name}</p>
                              {camp.adCopy && <p className="text-[10px] text-slate-400 truncate max-w-xs">{camp.adCopy}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-300">{camp.objective || 'Conversão'}</td>
                        <td className="p-3.5 font-bold text-slate-200">R$ {camp.dailyBudget.toFixed(2)}</td>
                        <td className="p-3.5 font-semibold text-slate-300">R$ {camp.spendToday.toFixed(2)}</td>
                        <td className="p-3.5 text-indigo-300 font-bold">{camp.conversions}</td>
                        <td className="p-3.5 font-bold text-emerald-400">{camp.roas > 0 ? `${camp.roas.toFixed(1)}x` : '-'}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 text-[10px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full">
                            {camp.autopilotStatus}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => handleToggleCampaign(camp.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ml-auto transition-all ${
                              camp.status === 'ACTIVE'
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800 hover:bg-amber-950/60'
                                : 'bg-amber-950/60 text-amber-300 border border-amber-800 hover:bg-emerald-950/60'
                            }`}
                          >
                            {camp.status === 'ACTIVE' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            {camp.status === 'ACTIVE' ? 'Ativo' : 'Pausado'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              ABA: CONEXÕES & EVOLUTION API
             ========================================================================= */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Conectar Redes Sociais & WhatsApp (Evolution API)</h2>
                  <p className="text-xs text-slate-400">
                    Conexões ativas para <b>{activeCompany.name}</b>.
                  </p>
                </div>

                <button
                  onClick={() => setIsConnectionModalOpen(true)}
                  className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Conectar Conta de Anúncios
                </button>
              </div>

              {/* CARD EVOLUTION API */}
              <div className="p-5 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-800/60 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-100">Evolution API (Servidor WhatsApp Integrado)</h3>
                      <p className="text-xs text-emerald-400">
                        Status do Servidor: <b>Online</b> (URL: <code>https://api.cristhiansancore.com.br</code>)
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-bold">
                    Instâncias: {evolutionInstances.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {evolutionInstances.map(inst => (
                    <div
                      key={inst.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between ${
                        activeCompany.evolutionInstance === inst.name
                          ? 'bg-emerald-950/50 border-emerald-600 ring-2 ring-emerald-500/30'
                          : 'bg-slate-950/80 border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-100">{inst.name}</span>
                          {activeCompany.evolutionInstance === inst.name && (
                            <span className="px-1.5 py-0.2 text-[9px] bg-emerald-600 text-white font-bold rounded">
                              Ativa nesta Empresa
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {inst.profileName || 'WhatsApp'} • {inst.ownerJid?.replace('@s.whatsapp.net', '') || 'Sem número'}
                        </p>
                        <span className="text-[10px] text-emerald-400 font-semibold uppercase">
                          Status: {inst.connectionStatus}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setClientCompanies(prev =>
                            prev.map(c => (c.id === selectedCompanyId ? { ...c, evolutionInstance: inst.name } : c))
                          );
                          alert(`Instância '${inst.name}' vinculada a ${activeCompany.name}!`);
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
                      >
                        Vincular
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <h4 className="text-xs font-bold text-slate-200 mb-2">Testar Envio Real pelo WhatsApp</h4>
                  <form onSubmit={handleTestEvolutionMessage} className="flex flex-col md:flex-row gap-2">
                    <input
                      type="text"
                      required
                      value={testWhatsAppNumber}
                      onChange={e => setTestWhatsAppNumber(e.target.value)}
                      placeholder="Telefone (ex: 5565996772226)"
                      className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-emerald-500 md:w-64"
                    />
                    <input
                      type="text"
                      required
                      value={testWhatsAppMessage}
                      onChange={e => setTestWhatsAppMessage(e.target.value)}
                      placeholder="Mensagem..."
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Enviar
                    </button>
                  </form>
                  {evolutionFeedback && <p className="text-xs mt-2 font-medium text-slate-300">{evolutionFeedback}</p>}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              ABA: EMPRESAS & CLIENTES
             ========================================================================= */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Clientes & Contas Gerenciadas</h2>
                  <p className="text-xs text-slate-400">Cadastre e administre as empresas atendidas pela agência.</p>
                </div>

                <button
                  onClick={() => setIsCompanyModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Novo Cliente / Empresa
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {clientCompanies.map(comp => (
                  <div
                    key={comp.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      selectedCompanyId === comp.id
                        ? 'bg-indigo-950/30 border-indigo-500/80 ring-2 ring-indigo-500/20'
                        : 'bg-slate-900/80 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold text-sm text-slate-100">{comp.name}</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded">
                        {comp.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-1">{comp.niche}</p>
                    <p className="text-[11px] text-slate-500 mb-3">CNPJ: {comp.document}</p>

                    <div className="space-y-1.5 text-xs text-slate-300 py-2 border-y border-slate-800">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Orçamento Tráfego:</span>
                        <span className="font-bold text-slate-100">R$ {comp.monthlyAdBudget.toLocaleString('pt-BR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Honorários Agência:</span>
                        <span className="font-semibold text-emerald-400">R$ {comp.monthlyFee.toLocaleString('pt-BR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">WhatsApp Evolution:</span>
                        <span className="font-mono text-indigo-300 font-bold">{comp.evolutionInstance}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={() => {
                          setSelectedCompanyId(comp.id);
                          setActiveTab('dashboard');
                        }}
                        className={`w-full py-2 rounded-xl text-xs font-semibold transition-all ${
                          selectedCompanyId === comp.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        {selectedCompanyId === comp.id ? '✓ Gerenciando Agora' : 'Selecionar Esta Empresa'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              ABA: CONTROLE DO SUPER ADMIN
             ========================================================================= */}
          {activeTab === 'admin' && currentUser.role === 'SUPER_ADMIN' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Gestão Mestre de Usuários & Acessos</h2>
                  <p className="text-xs text-slate-400">Controle completo de contas, @usuários, telefones e senhas.</p>
                </div>

                <button
                  onClick={() => setIsCreateUserModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-amber-600/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Novo Usuário
                </button>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Nome</th>
                      <th className="p-3.5">@Usuário</th>
                      <th className="p-3.5">Celular</th>
                      <th className="p-3.5">Papel</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {systemUsers.map(u => (
                      <tr key={u.id} className="hover:bg-slate-800/40">
                        <td className="p-3.5 font-bold text-slate-100">{u.name}</td>
                        <td className="p-3.5 font-mono text-indigo-400 font-bold">@{u.username}</td>
                        <td className="p-3.5 text-slate-300">{u.phone}</td>
                        <td className="p-3.5 font-bold">{u.role}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${u.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button onClick={() => handleOpenEditUser(u)} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold">
                            Editar
                          </button>
                          <button onClick={() => handleToggleUserStatus(u.id)} className="px-2.5 py-1 bg-red-950/60 text-red-300 rounded-lg font-semibold">
                            {u.status === 'ACTIVE' ? 'Bloquear' : 'Desbloquear'}
                          </button>
                          <button onClick={() => handleDeleteUser(u.id)} className="p-1 text-slate-500 hover:text-red-400">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          MODAL: RELATÓRIO EXECUTIVO WHITE-LABEL DO CLIENTE (PDF / IMPRESSÃO)
         ========================================================================= */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative my-8 print:p-0 print:border-none print:bg-white print:text-black">
            {/* BARRA DE AÇÃO DO RELATÓRIO */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 print:hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Visualização de Relatório Executivo</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Imprimir / Salvar PDF
                </button>
                <button
                  onClick={handleSendReportWhatsApp}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Enviar no WhatsApp do Cliente
                </button>
                <button onClick={() => setIsReportModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* CORPO DO RELATÓRIO (FORMATADO PARA CLIENTE) */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
                <div>
                  <h1 className="text-2xl font-black text-slate-100">Relatório Executivo de Tráfego Pago</h1>
                  <p className="text-sm font-semibold text-indigo-400">{activeCompany.name}</p>
                  <p className="text-xs text-slate-400">{activeCompany.niche} • CNPJ: {activeCompany.document}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Gestão de Tráfego & Performance</p>
                  <p className="text-sm font-bold text-slate-200">{currentUser.agencyName || 'Agência Alpha Digital'}</p>
                  <p className="text-[11px] text-slate-500">Emissão: {new Date().toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              {/* CARDS RESUMO DO RELATÓRIO */}
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
                  <span className="text-[11px] text-slate-400 block mb-1">Total Investido</span>
                  <p className="text-xl font-bold text-slate-100">R$ {totalSpend.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
                  <span className="text-[11px] text-slate-400 block mb-1">Faturamento Gerado</span>
                  <p className="text-xl font-bold text-emerald-400">R$ {totalRevenue.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
                  <span className="text-[11px] text-slate-400 block mb-1">Retorno sobre Gasto (ROAS)</span>
                  <p className="text-xl font-bold text-emerald-400">{overallRoas.toFixed(2)}x</p>
                </div>
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
                  <span className="text-[11px] text-slate-400 block mb-1">Total Conversões / Vendas</span>
                  <p className="text-xl font-bold text-indigo-400">{totalConversions}</p>
                </div>
              </div>

              {/* TABELA DE DESEMPENHO POR CAMPANHA */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Desempenho por Anúncio & Canal</h4>
                <div className="border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">Campanha</th>
                        <th className="p-2.5">Canal</th>
                        <th className="p-2.5">Investimento</th>
                        <th className="p-2.5">Cliques</th>
                        <th className="p-2.5">Conversões</th>
                        <th className="p-2.5">ROAS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredCampaigns.map(c => (
                        <tr key={c.id}>
                          <td className="p-2.5 font-semibold text-slate-200">{c.name}</td>
                          <td className="p-2.5 font-bold text-indigo-400">{c.platform}</td>
                          <td className="p-2.5">R$ {c.spendToday.toFixed(2)}</td>
                          <td className="p-2.5">{c.clicks}</td>
                          <td className="p-2.5 font-bold text-slate-100">{c.conversions}</td>
                          <td className="p-2.5 font-bold text-emerald-400">{c.roas.toFixed(1)}x</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* VENDAS REGISTRADAS NO WHATSAPP */}
              {filteredSales.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                    Vendas Confirmadas pelo WhatsApp ({filteredSales.length})
                  </h4>
                  <div className="border border-slate-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="p-2.5">Cliente</th>
                          <th className="p-2.5">Produto</th>
                          <th className="p-2.5">Pagamento</th>
                          <th className="p-2.5">Campanha de Origem</th>
                          <th className="p-2.5 text-right">Valor</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {filteredSales.map(s => (
                          <tr key={s.id}>
                            <td className="p-2.5 font-bold text-slate-100">{s.customerName}</td>
                            <td className="p-2.5 text-slate-300">{s.product}</td>
                            <td className="p-2.5 text-indigo-400 font-semibold">{s.paymentMethod}</td>
                            <td className="p-2.5 text-slate-400">{s.campaignName}</td>
                            <td className="p-2.5 text-right font-bold text-emerald-400">R$ {s.amount.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: REGISTRAR VENDA NO WHATSAPP
         ========================================================================= */}
      {isSaleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                Registrar Venda Deste Lead
              </h3>
              <button onClick={() => setIsSaleModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSale} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Valor Total da Venda (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={saleAmount}
                  onChange={e => setSaleAmount(e.target.value)}
                  placeholder="Ex: 250.00"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-lg font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Produto / Serviço Vendido</label>
                <input
                  type="text"
                  required
                  value={saleProduct}
                  onChange={e => setSaleProduct(e.target.value)}
                  placeholder="Ex: Vestido Festa Rosa M ou Avaliação Implante"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Forma de Pagamento</label>
                <select
                  value={saleMethod}
                  onChange={e => setSaleMethod(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                >
                  <option value="PIX">PIX (À Vista)</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Boleto Bancário">Boleto Bancário</option>
                  <option value="Link de Pagamento">Link de Pagamento (MercadoPago/Stripe/Asaas)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer mt-2"
              >
                Confirmar Venda e Somar no ROAS
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CRIAR NOVO CLIENTE */}
      {isCompanyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-400" />
                Cadastrar Novo Cliente / Empresa
              </h3>
              <button onClick={() => setIsCompanyModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCompany} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome da Empresa / Razão Social</label>
                <input
                  type="text"
                  required
                  value={newCompanyName}
                  onChange={e => setNewCompanyName(e.target.value)}
                  placeholder="Ex: Pizzaria Forno Nobre"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nicho de Mercado</label>
                  <input
                    type="text"
                    required
                    value={newCompanyNiche}
                    onChange={e => setNewCompanyNiche(e.target.value)}
                    placeholder="Gastronomia"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">CNPJ ou CPF</label>
                  <input
                    type="text"
                    value={newCompanyDocument}
                    onChange={e => setNewCompanyDocument(e.target.value)}
                    placeholder="00.000.000/0001-00"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contato Responsável</label>
                  <input
                    type="text"
                    value={newCompanyOwner}
                    onChange={e => setNewCompanyOwner(e.target.value)}
                    placeholder="Carlos Silva"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp de Contato</label>
                  <input
                    type="text"
                    value={newCompanyWpp}
                    onChange={e => setNewCompanyWpp(e.target.value)}
                    placeholder="(65) 99999-8888"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Verba Mensal de Anúncios (R$)</label>
                  <input
                    type="number"
                    value={newCompanyBudget}
                    onChange={e => setNewCompanyBudget(e.target.value)}
                    placeholder="5000"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Instância WhatsApp Evolution</label>
                  <select
                    value={newCompanyInstance}
                    onChange={e => setNewCompanyInstance(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="meu">meu (Cristhian - Ativo)</option>
                    <option value="teste">teste</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer mt-2"
              >
                Cadastrar Empresa e Selecionar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CRIAR CAMPANHA */}
      {isCampaignModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" />
                Criar Novo Anúncio para {activeCompany.name}
              </h3>
              <button onClick={() => setIsCampaignModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Plataforma</label>
                  <select
                    value={newCampPlatform}
                    onChange={e => setNewCampPlatform(e.target.value as Platform)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="META">Meta Ads (Instagram & Facebook)</option>
                    <option value="GOOGLE">Google Ads (Pesquisa & Display)</option>
                    <option value="TIKTOK">TikTok Ads</option>
                    <option value="WHATSAPP">WhatsApp Direto</option>
                    <option value="LINKEDIN">LinkedIn Ads</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Objetivo</label>
                  <select
                    value={newCampObjective}
                    onChange={e => setNewCampObjective(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="Vendas / Conversão">Vendas / Conversão no Site</option>
                    <option value="Mensagens no WhatsApp">Mensagens no WhatsApp</option>
                    <option value="Geração de Leads">Geração de Leads Qualificados</option>
                    <option value="Tráfego / Cliques">Tráfego & Cliques no Link</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome da Campanha</label>
                <input
                  type="text"
                  required
                  value={newCampName}
                  onChange={e => setNewCampName(e.target.value)}
                  placeholder="Ex: [ESCALA] Promoção Fim de Semana - 30% OFF"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Orçamento Diário (R$)</label>
                <input
                  type="number"
                  required
                  value={newCampBudget}
                  onChange={e => setNewCampBudget(e.target.value)}
                  placeholder="100"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Texto do Anúncio (Copy)</label>
                <textarea
                  rows={2}
                  value={newCampCopy}
                  onChange={e => setNewCampCopy(e.target.value)}
                  placeholder="Digite a legenda persuasiva do anúncio..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Link de Destino / Link do WhatsApp</label>
                <input
                  type="text"
                  value={newCampTarget}
                  onChange={e => setNewCampTarget(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer mt-2"
              >
                Publicar e Ativar Campanha
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CRIAR REGRA AUTOMAÇÃO */}
      {isRuleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" />
                Criar Regra de Piloto Automático
              </h3>
              <button onClick={() => setIsRuleModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome da Regra</label>
                <input
                  type="text"
                  required
                  value={newRuleName}
                  onChange={e => setNewRuleName(e.target.value)}
                  placeholder="Ex: 🛡️ Stop-Loss: Pausar se gastar R$ 45 sem venda"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Métrica Monitorada</label>
                  <select
                    value={newRuleField}
                    onChange={e => setNewRuleField(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="spendToday">Gasto Hoje (R$)</option>
                    <option value="cpa">Custo por Conversão / CPA (R$)</option>
                    <option value="roas">Retorno sobre Gasto / ROAS (x)</option>
                    <option value="frequency">Frequência do Anúncio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Operador</label>
                  <select
                    value={newRuleOperator}
                    onChange={e => setNewRuleOperator(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="GREATER_THAN">Maior que (&gt;)</option>
                    <option value="LESS_THAN">Menor que (&lt;)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Valor Limite</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newRuleThreshold}
                    onChange={e => setNewRuleThreshold(e.target.value)}
                    placeholder="40"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Ação Imediata</label>
                  <select
                    value={newRuleAction}
                    onChange={e => setNewRuleAction(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="PAUSE_AD">Pausar Anúncio (Stop-Loss)</option>
                    <option value="INCREASE_BUDGET">Aumentar Verba (%)</option>
                    <option value="SEND_NOTIFICATION">Notificar Gestor no WhatsApp</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer mt-2"
              >
                Salvar Regra no Piloto Automático
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CONECTAR CONTA DE ANÚNCIOS */}
      {isConnectionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-indigo-400" />
                Conectar Conta de Anúncios ({connPlatform})
              </h3>
              <button onClick={() => setIsConnectionModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveConnection} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome de Identificação da Conta</label>
                <input
                  type="text"
                  required
                  value={connAccountName}
                  onChange={e => setConnAccountName(e.target.value)}
                  placeholder={`Ex: Conta Oficial ${connPlatform}`}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">ID da Conta de Anúncios</label>
                <input
                  type="text"
                  required
                  value={connAccountId}
                  onChange={e => setConnAccountId(e.target.value)}
                  placeholder="Ex: act_98124981 ou 123-456-7890"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">ID do Pixel / Tag de Conversão</label>
                <input
                  type="text"
                  value={connPixelId}
                  onChange={e => setConnPixelId(e.target.value)}
                  placeholder="Ex: pix_8819238 ou AW-1928371"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer mt-2"
              >
                Testar & Ativar Conexão
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR USUÁRIO SUPER ADMIN */}
      {isEditUserModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100">Editar Usuário</h3>
              <button onClick={() => setIsEditUserModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUserEdit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome de Usuário (@)</label>
                <input
                  type="text"
                  required
                  value={editingUser.username}
                  onChange={e => setEditingUser({ ...editingUser, username: e.target.value.toLowerCase().replace(/^@/, '') })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Telefone / WhatsApp</label>
                <input
                  type="text"
                  required
                  value={editingUser.phone}
                  onChange={e => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nova Senha (opcional)</label>
                <input
                  type="password"
                  placeholder="Deixe em branco para não alterar"
                  onChange={e => {
                    if (e.target.value) setEditingUser({ ...editingUser, password: e.target.value });
                  }}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Papel</label>
                  <select
                    value={editingUser.role}
                    onChange={e => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                    <option value="AGENCY_ADMIN">AGENCY_ADMIN</option>
                    <option value="CLIENT_VIEWER">CLIENT_VIEWER</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={editingUser.status}
                    onChange={e => setEditingUser({ ...editingUser, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="ACTIVE">Ativo</option>
                    <option value="BLOCKED">Bloqueado</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl text-xs cursor-pointer mt-2"
              >
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CRIAR USUÁRIO SUPER ADMIN */}
      {isCreateUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100">Criar Novo Usuário</h3>
              <button onClick={() => setIsCreateUserModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdminCreateUser} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={adminNewName}
                  onChange={e => setAdminNewName(e.target.value)}
                  placeholder="Nome do usuário"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">@Usuário</label>
                <input
                  type="text"
                  required
                  value={adminNewUsername}
                  onChange={e => setAdminNewUsername(e.target.value)}
                  placeholder="ex: rodrigo_digital"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Telefone / WhatsApp</label>
                <input
                  type="text"
                  required
                  value={adminNewPhone}
                  onChange={e => setAdminNewPhone(e.target.value)}
                  placeholder="(65) 99999-8888"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Senha Inicial</label>
                <input
                  type="password"
                  required
                  value={adminNewPassword}
                  onChange={e => setAdminNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nível de Acesso</label>
                <select
                  value={adminNewRole}
                  onChange={e => setAdminNewRole(e.target.value as UserRole)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                >
                  <option value="AGENCY_ADMIN">Gestor de Agência</option>
                  <option value="CLIENT_VIEWER">Cliente Final</option>
                  <option value="SUPER_ADMIN">Super Administrador</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl text-xs cursor-pointer mt-2"
              >
                Cadastrar Usuário
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
