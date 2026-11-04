import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Zap,
  MessageSquare,
  ShieldAlert,
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
  ExternalLink,
  ChevronDown,
  Sparkles,
  Award,
  Layers,
  Lock,
  Smartphone,
  PhoneCall,
  KeyRound,
  UserCheck,
  Search,
  Filter,
  Edit,
  Trash2,
  UserX,
  X,
  QrCode,
  Radio,
  Share2,
  Check,
  Flame,
  Clock,
  Briefcase
} from 'lucide-react';
import {
  Platform,
  UserRole,
  AuthUser,
  Campaign,
  AutomationRule,
  Conversation,
  Message,
  Agency,
  SuperAdminData,
  EvolutionInstance,
  NetworkConnection
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
  },
  {
    id: 'rule-4',
    companyId: 'comp-3',
    name: '⚠️ Alerta de Frequência: Se frequência > 3.5 notificar gestor',
    type: 'CREATIVE_FATIGUE',
    conditionField: 'frequency',
    operator: 'GREATER_THAN',
    thresholdValue: 3.5,
    action: 'SEND_NOTIFICATION',
    actionValue: null,
    isActive: true,
    lastTriggered: 'Ontem'
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
    aiStatus: 'IA Respondendo'
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
    aiStatus: 'Venda Concluída'
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
    aiStatus: 'Agendamento em Andamento'
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
    aiStatus: 'Qualificado (Corretor Notificado)'
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
    { id: 'm-23', senderType: 'CUSTOMER', text: 'Amei! Acabei de finalizar o pedido com o cupom que vc mandou 🥰', time: '11:45' }
  ],
  'conv-3': [
    { id: 'm-31', senderType: 'CUSTOMER', text: 'Olá! Vi o anúncio sobre implantes dentários.', time: '13:00' },
    { id: 'm-32', senderType: 'AI_BOT', text: 'Olá Roberto! Muito prazer. Nossa equipe especializada realiza avaliações digitais completas. Você tem preferência de horário para agendamento?', time: '13:01' },
    { id: 'm-33', senderType: 'CUSTOMER', text: 'Gostaria de agendar uma avaliação para implante na sexta-feira.', time: '13:05' }
  ],
  'conv-4': [
    { id: 'm-41', senderType: 'CUSTOMER', text: 'Boa tarde, tenho interesse na casa de Alphaville.', time: '10:28' },
    { id: 'm-42', senderType: 'AI_BOT', text: 'Excelente escolha! Excelente imóvel com acabamento de alto padrão. Gostaria de receber a planta ou prefere falar direto com nosso consultor especialista?', time: '10:29' },
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
  },
  {
    id: 'conn-4',
    companyId: 'comp-2',
    platform: 'META',
    connected: true,
    accountName: 'Dr Sorriso Clínicas Meta',
    accountId: 'act_1029384756',
    pixelOrTagId: 'pix_10293847',
    updatedAt: 'Hoje'
  },
  {
    id: 'conn-5',
    companyId: 'comp-3',
    platform: 'GOOGLE',
    connected: true,
    accountName: 'Google Ads - Prime Imóveis SP',
    accountId: '554-123-9988',
    pixelOrTagId: 'AW-77712399',
    updatedAt: 'Hoje'
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

  // Estados de Telas de Autenticação
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

  // Navegação
  const [activeTab, setActiveTab] = useState<'dashboard' | 'campaigns' | 'autopilot' | 'inbox' | 'clients' | 'integrations' | 'admin'>('dashboard');

  // Estados de Dados Principais (com LocalStorage para persistência total)
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

  // Salvar alterações nos estados principais
  useEffect(() => {
    localStorage.setItem('socialpulse_companies', JSON.stringify(clientCompanies));
  }, [clientCompanies]);

  useEffect(() => {
    localStorage.setItem('socialpulse_selected_company', selectedCompanyId);
  }, [selectedCompanyId]);

  useEffect(() => {
    localStorage.setItem('socialpulse_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('socialpulse_rules', JSON.stringify(automationRules));
  }, [automationRules]);

  useEffect(() => {
    localStorage.setItem('socialpulse_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('socialpulse_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('socialpulse_connections', JSON.stringify(connections));
  }, [connections]);

  // Instâncias reais da Evolution API
  const [evolutionInstances, setEvolutionInstances] = useState<EvolutionInstance[]>([]);
  const [loadingEvolution, setLoadingEvolution] = useState(false);
  const [testWhatsAppNumber, setTestWhatsAppNumber] = useState('');
  const [testWhatsAppMessage, setTestWhatsAppMessage] = useState('Olá! Mensagem de teste enviada diretamente pelo NexusAds!');
  const [evolutionFeedback, setEvolutionFeedback] = useState('');

  // Buscar instâncias reais da Evolution API no backend
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

  // Modais de Criação
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);
  const [isEvolutionModalOpen, setIsEvolutionModalOpen] = useState(false);

  // Form: Novo Cliente / Empresa
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyNiche, setNewCompanyNiche] = useState('');
  const [newCompanyDocument, setNewCompanyDocument] = useState('');
  const [newCompanyOwner, setNewCompanyOwner] = useState('');
  const [newCompanyWpp, setNewCompanyWpp] = useState('');
  const [newCompanyBudget, setNewCompanyBudget] = useState('5000');
  const [newCompanyFee, setNewCompanyFee] = useState('1500');
  const [newCompanyInstance, setNewCompanyInstance] = useState('meu');
  const [newCompanyAiPrompt, setNewCompanyAiPrompt] = useState('Você é o assistente virtual da empresa. Responda educadamente e ajude os clientes com informações e orçamentos.');

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

  // Form: Nova Instância Evolution
  const [newInstanceName, setNewInstanceName] = useState('');
  const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null);

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

  // Garantir conversa ativa válida
  useEffect(() => {
    if (filteredConversations.length > 0) {
      if (!filteredConversations.some(c => c.id === activeConversationId)) {
        setActiveConversationId(filteredConversations[0].id);
      }
    }
  }, [selectedCompanyId, filteredConversations]);

  // Se o usuário logado for CLIENT_VIEWER, trava na empresa dele
  useEffect(() => {
    if (currentUser?.role === 'CLIENT_VIEWER' && currentUser.companyId) {
      setSelectedCompanyId(currentUser.companyId);
    }
  }, [currentUser]);

  // Métricas calculadas em tempo real para a empresa ativa
  const totalSpend = filteredCampaigns.reduce((acc, c) => acc + c.spendToday, 0);
  const totalConversions = filteredCampaigns.reduce((acc, c) => acc + c.conversions, 0);
  const totalClicks = filteredCampaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalImpressions = filteredCampaigns.reduce((acc, c) => acc + c.impressions, 0);
  const avgCpa = totalConversions > 0 ? totalSpend / totalConversions : 0;
  const totalRevenue = filteredCampaigns.reduce((acc, c) => acc + (c.spendToday * c.roas), 0);
  const overallRoas = totalSpend > 0 ? totalRevenue / totalSpend : 0;

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
  // HANDLERS DE AÇÕES OPERACIONAIS (EMPRESAS, CAMPANHAS, REGRAS, REDES)
  // =========================================================================

  // 1. Cadastrar Novo Cliente / Empresa
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

    // Limpar formulário
    setNewCompanyName('');
    setNewCompanyNiche('');
    setNewCompanyDocument('');
    setNewCompanyOwner('');
    setNewCompanyWpp('');
  };

  // 2. Criar Nova Campanha / Anúncio
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

    // Limpar form
    setNewCampName('');
    setNewCampCopy('');
    setNewCampTarget('');
  };

  const handleToggleCampaign = (campId: string) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === campId ? { ...c, status: c.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : c))
    );
  };

  // 3. Criar Nova Regra de Piloto Automático
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

  // 4. Conectar / Adicionar Rede Social
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

  // 5. Evolution API: Teste de Envio Real de Mensagem
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
        setEvolutionFeedback(`✅ Mensagem enviada com sucesso para ${testWhatsAppNumber} através da instância '${inst}'!`);
      } else {
        setEvolutionFeedback(`❌ Erro no envio: ${data.error || 'Verifique a instância'}`);
      }
    } catch (err: any) {
      setEvolutionFeedback(`❌ Falha: ${err.message}`);
    }
  };

  // 6. Atualizar Prompt da IA da Empresa
  const handleSaveAiPrompt = (newPrompt: string) => {
    setClientCompanies(prev =>
      prev.map(c => (c.id === selectedCompanyId ? { ...c, aiPrompt: newPrompt } : c))
    );
    alert('Prompt e comportamento da IA atualizados com sucesso para esta empresa!');
  };

  // 7. Envio de Mensagem na Caixa de Entrada
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

    // Se estiver marcado para enviar no WhatsApp Real via Evolution API
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
  // GESTÃO DE USUÁRIOS PELO SUPER ADMIN
  // =========================================================================

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
  // RENDERIZAÇÃO: TELAS DE LOGIN & RECUPERAÇÃO DE SENHA
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

          {/* VIEW: LOGIN */}
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

              {/* Contas de Demonstração Rápidas */}
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

          {/* VIEW: CADASTRO */}
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

          {/* VIEW: VERIFICAR CELULAR CADASTRO */}
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

              <div className="mt-4 text-center">
                <button
                  onClick={() => setAuthView('register')}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  ← Alterar número de celular
                </button>
              </div>
            </div>
          )}

          {/* VIEW: ESQUECEU A SENHA */}
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

          {/* VIEW: REDEFINIR SENHA */}
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
  // RENDERIZAÇÃO: PAINEL PRINCIPAL (AUTENTICADO)
  // =========================================================================

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* BARRA SUPERIOR DO SISTEMA */}
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
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Tráfego Pago & Atendimento Multicanal</p>
            </div>
          </div>

          {/* SELETOR DE EMPRESAS / CLIENTES */}
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

              {/* Botão Rápido + Novo Cliente */}
              <button
                onClick={() => setIsCompanyModalOpen(true)}
                title="Cadastrar Novo Cliente"
                className="ml-2 p-1.5 bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-200 hover:text-white rounded-lg transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* USUÁRIO LOGADO & AÇÕES */}
        <div className="flex items-center gap-4">
          {/* Badge de Conexão WhatsApp Evolution */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-950/40 border border-emerald-800/60 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs text-emerald-300 font-medium">
              Evolution API: <b>{activeCompany.evolutionInstance || 'meu'}</b> (Online)
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
              title="Sair do Sistema"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* CORPO PRINCIPAL COM MENU LATERAL E CONTEÚDO */}
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
                Piloto Automático
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
                Caixa de Entrada & IA
              </div>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded">
                {filteredConversations.length}
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

          {/* CARD DA EMPRESA SELECIONADA NO MENU LATERAL */}
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

        {/* ÁREA DE CONTEÚDO PRINCIPAL */}
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
                    Métricas consolidadas de tráfego pago da empresa <b>{activeCompany.name}</b>.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsCampaignModalOpen(true)}
                    className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Novo Anúncio
                  </button>
                  <button
                    onClick={() => setIsCompanyModalOpen(true)}
                    className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Building2 className="w-4 h-4" />
                    Novo Cliente
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
                  <p className="text-[11px] text-slate-400 mt-1">Limite mensal: R$ {activeCompany.monthlyAdBudget.toLocaleString('pt-BR')}</p>
                </div>

                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium">ROAS Médio</span>
                    <Flame className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-bold text-emerald-400">{overallRoas.toFixed(2)}x</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Receita estimada: R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium">Conversões / Leads</span>
                    <Target className="w-4 h-4 text-indigo-400" />
                  </div>
                  <p className="text-2xl font-bold text-slate-100">{totalConversions}</p>
                  <p className="text-[11px] text-slate-400 mt-1">CPA Médio: R$ {avgCpa.toFixed(2)}</p>
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

              {/* LISTA RESUMIDA DE CAMPANHAS ATIVAS DA EMPRESA */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">Campanhas desta Empresa ({filteredCampaigns.length})</h3>
                    <p className="text-xs text-slate-400">Anúncios ativos no Meta Ads, Google Ads e TikTok Ads.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('campaigns')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                  >
                    Ver todas <ArrowUpRight className="w-3.5 h-3.5" />
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
                          <p className="text-xs text-slate-400">{camp.objective} • Orçamento Diário: R$ {camp.dailyBudget.toFixed(2)}</p>
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
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800 hover:bg-amber-950/60 hover:text-amber-300 hover:border-amber-800'
                              : 'bg-amber-950/60 text-amber-300 border border-amber-800 hover:bg-emerald-950/60 hover:text-emerald-300'
                          }`}
                        >
                          {camp.status === 'ACTIVE' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          {camp.status === 'ACTIVE' ? 'Ativo' : 'Pausado'}
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredCampaigns.length === 0 && (
                    <div className="py-8 text-center text-slate-500 text-sm">
                      Nenhuma campanha cadastrada para esta empresa.{' '}
                      <button onClick={() => setIsCampaignModalOpen(true)} className="text-indigo-400 font-bold underline">
                        Criar primeiro anúncio
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              ABA: CAMPANHAS & ANÚNCIOS (CRIAÇÃO E GESTÃO)
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
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Criar Nova Campanha
                </button>
              </div>

              {/* TABELA DE CAMPANHAS */}
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

                    {filteredCampaigns.length === 0 && (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-500">
                          Nenhum anúncio criado para esta empresa.{' '}
                          <button onClick={() => setIsCampaignModalOpen(true)} className="text-indigo-400 font-bold underline">
                            Criar Primeiro Anúncio Agora
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              ABA: PILOTO AUTOMÁTICO (REGRAS DE STOP-LOSS E ESCALA)
             ========================================================================= */}
          {activeTab === 'autopilot' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Piloto Automático & Otimização 24/7</h2>
                  <p className="text-xs text-slate-400">
                    Regras inteligentes que protegem seu orçamento (Stop-Loss) e escalam anúncios de alto ROAS para <b>{activeCompany.name}</b>.
                  </p>
                </div>

                <button
                  onClick={() => setIsRuleModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Nova Regra Inteligente
                </button>
              </div>

              {/* LISTA DE REGRAS */}
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

                {filteredRules.length === 0 && (
                  <div className="col-span-2 p-12 text-center text-slate-500 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl">
                    Nenhuma regra de piloto automático criada para esta empresa.{' '}
                    <button onClick={() => setIsRuleModalOpen(true)} className="text-indigo-400 font-bold underline">
                      Criar Regra de Stop-Loss Agora
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              ABA: CAIXA DE ENTRADA & AUTOATENDIMENTO COM IA (POR EMPRESA)
             ========================================================================= */}
          {activeTab === 'inbox' && (
            <div className="h-[calc(100vh-130px)] flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Caixa de Entrada Unificada & Atendimento IA</h2>
                  <p className="text-xs text-slate-400">
                    Conversas originadas de anúncios para <b>{activeCompany.name}</b> (Instância: {activeCompany.evolutionInstance}).
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/80 px-3 py-1.5 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sendRealWpp}
                      onChange={e => setSendRealWpp(e.target.checked)}
                      className="rounded"
                    />
                    Enviar também pelo WhatsApp Real (Evolution API)
                  </label>
                </div>
              </div>

              {/* LAYOUT CHAT + LISTA */}
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
                        <span className="text-[10px] text-indigo-400 font-semibold">{conv.aiStatus}</span>
                      </div>
                    </div>
                  ))}

                  {filteredConversations.length === 0 && (
                    <div className="p-8 text-center text-xs text-slate-500">
                      Nenhuma conversa registrada para esta empresa.
                    </div>
                  )}
                </div>

                {/* JANELA DE CHAT & IA */}
                <div className="col-span-8 flex flex-col h-full overflow-hidden">
                  {/* Cabeçalho da Conversa */}
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
                                {currentConv.contactPhone || 'Sem telefone'} • Anúncio de origem: {currentConv.originAd}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full flex items-center gap-1.5">
                                <Bot className="w-3.5 h-3.5" />
                                {currentConv.aiStatus}
                              </span>
                            </div>
                          </div>

                          {/* Mensagens */}
                          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/20">
                            {currentMsgs.map(m => (
                              <div
                                key={m.id}
                                className={`flex ${m.senderType === 'CUSTOMER' ? 'justify-start' : 'justify-end'}`}
                              >
                                <div
                                  className={`max-w-[70%] p-3 rounded-2xl text-xs ${
                                    m.senderType === 'CUSTOMER'
                                      ? 'bg-slate-800 text-slate-100 rounded-bl-none'
                                      : m.senderType === 'AI_BOT'
                                      ? 'bg-indigo-600/90 text-white rounded-br-none shadow-md shadow-indigo-600/20'
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
                              </div>
                            ))}
                          </div>

                          {/* Campo de Envio */}
                          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center gap-2">
                            <input
                              type="text"
                              value={newMessageText}
                              onChange={e => setNewMessageText(e.target.value)}
                              placeholder={`Responder ${currentConv.contactName}... (ou deixe a IA responder)`}
                              className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                            />
                            <button
                              type="submit"
                              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 cursor-pointer"
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

              {/* CARD DE CONFIGURAÇÃO DO PROMPT DA IA DA EMPRESA */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-slate-200">
                      Personalidade & Prompt da IA para {activeCompany.name}
                    </span>
                  </div>
                  <input
                    type="text"
                    defaultValue={activeCompany.aiPrompt}
                    onBlur={e => handleSaveAiPrompt(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <button
                  onClick={() => alert('Prompt salvo!')}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl"
                >
                  Salvar Prompt
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              ABA: CONEXÕES, REDES SOCIAIS & EVOLUTION API
             ========================================================================= */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Conectar Redes Sociais & WhatsApp (Evolution API)</h2>
                  <p className="text-xs text-slate-400">
                    Conecte as contas de anúncios da empresa <b>{activeCompany.name}</b> e gerencie as instâncias da Evolution API.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsConnectionModalOpen(true)}
                    className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Conectar Conta de Anúncios
                  </button>
                  <button
                    onClick={fetchEvolution}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingEvolution ? 'animate-spin' : ''}`} />
                    Atualizar Evolution API
                  </button>
                </div>
              </div>

              {/* CARD DESTAQUE: EVOLUTION API (WHATSAPP REAL) */}
              <div className="p-5 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-800/60 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/30">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-100">Evolution API (Servidor Local Integrado)</h3>
                      <p className="text-xs text-emerald-400">
                        Status do Servidor: <b>Online</b> (URL: <code>https://api.cristhiansancore.com.br</code>)
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-bold">
                    Instâncias Carregadas: {evolutionInstances.length}
                  </span>
                </div>

                {/* Instâncias Detectadas */}
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
                          alert(`Instância '${inst.name}' vinculada à empresa ${activeCompany.name}!`);
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-all"
                      >
                        Vincular
                      </button>
                    </div>
                  ))}
                </div>

                {/* TESTE DE DISPARO REAL DE WHATSAPP */}
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
                      Enviar no WhatsApp
                    </button>
                  </form>

                  {evolutionFeedback && (
                    <p className="text-xs mt-2 font-medium text-slate-300">{evolutionFeedback}</p>
                  )}
                </div>
              </div>

              {/* LISTA DE CONEXÕES COM REDES SOCIAIS (META, GOOGLE, TIKTOK, ETC.) */}
              <h3 className="text-base font-bold text-slate-100">Redes de Anúncios Conectadas a {activeCompany.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['META', 'GOOGLE', 'TIKTOK', 'KWAI', 'LINKEDIN'].map(plat => {
                  const conn = filteredConnections.find(c => c.platform === plat);
                  const isConn = conn?.connected;

                  return (
                    <div key={plat} className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-extrabold text-sm text-slate-100">{plat} ADS</span>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                              isConn
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            {isConn ? '🟢 Conectado' : '⚪ Desconectado'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mb-1">
                          {conn?.accountName || 'Nenhuma conta vinculada'}
                        </p>
                        {conn && (
                          <p className="text-[10px] text-slate-500 font-mono">
                            ID: {conn.accountId} • Pixel: {conn.pixelOrTagId}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                        {conn ? (
                          <button
                            onClick={() => handleToggleConnection(conn.id)}
                            className="text-xs font-semibold text-slate-300 hover:text-white"
                          >
                            {isConn ? 'Desativar' : 'Reativar'}
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-500">Não configurado</span>
                        )}

                        <button
                          onClick={() => {
                            setConnPlatform(plat as Platform);
                            setConnAccountName(conn?.accountName || '');
                            setConnAccountId(conn?.accountId || '');
                            setConnPixelId(conn?.pixelOrTagId || '');
                            setIsConnectionModalOpen(true);
                          }}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Configurar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* =========================================================================
              ABA: EMPRESAS & CLIENTES (GESTÃO DA AGÊNCIA)
             ========================================================================= */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Clientes & Contas Gerenciadas</h2>
                  <p className="text-xs text-slate-400">
                    Cadastre e administre as empresas atendidas pela sua agência.
                  </p>
                </div>

                <button
                  onClick={() => setIsCompanyModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Novo Cliente / Empresa
                </button>
              </div>

              {/* LISTA DE EMPRESAS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {clientCompanies.map(comp => (
                  <div
                    key={comp.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      selectedCompanyId === comp.id
                        ? 'bg-indigo-950/30 border-indigo-500/80 ring-2 ring-indigo-500/20'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
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
                        <span className="text-slate-400">Instância Evolution:</span>
                        <span className="font-mono text-indigo-300 font-bold">{comp.evolutionInstance}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
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
              ABA: CONTROLE DO SUPER ADMIN (GESTÃO TOTAL DE USUÁRIOS)
             ========================================================================= */}
          {activeTab === 'admin' && currentUser.role === 'SUPER_ADMIN' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Gestão Mestre de Usuários & Acessos</h2>
                  <p className="text-xs text-slate-400">
                    Controle de contas, alteração de nome, telefone, login, senhas e bloqueios.
                  </p>
                </div>

                <button
                  onClick={() => setIsCreateUserModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-amber-600/30 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Novo Usuário
                </button>
              </div>

              {/* TABELA DE USUÁRIOS */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Nome</th>
                      <th className="p-3.5">@Usuário</th>
                      <th className="p-3.5">Celular / WhatsApp</th>
                      <th className="p-3.5">Papel / Acesso</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {systemUsers.map(u => (
                      <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 font-bold text-slate-100">{u.name}</td>
                        <td className="p-3.5 font-mono text-indigo-400 font-bold">@{u.username}</td>
                        <td className="p-3.5 text-slate-300">{u.phone}</td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                              u.role === 'SUPER_ADMIN'
                                ? 'bg-amber-500/20 text-amber-300'
                                : u.role === 'AGENCY_ADMIN'
                                ? 'bg-indigo-500/20 text-indigo-300'
                                : 'bg-emerald-500/20 text-emerald-300'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                              u.status === 'ACTIVE'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-red-500/20 text-red-300'
                            }`}
                          >
                            {u.status === 'ACTIVE' ? 'Ativo' : 'Bloqueado'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditUser(u)}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleToggleUserStatus(u.id)}
                            className={`px-2.5 py-1 rounded-lg font-semibold ${
                              u.status === 'ACTIVE'
                                ? 'bg-red-950/60 text-red-300 hover:bg-red-900/60'
                                : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60'
                            }`}
                          >
                            {u.status === 'ACTIVE' ? 'Bloquear' : 'Desbloquear'}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-1 text-slate-500 hover:text-red-400"
                            title="Excluir"
                          >
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
          MODAIS OPERACIONAIS
         ========================================================================= */}

      {/* MODAL 1: CADASTRAR NOVO CLIENTE / EMPRESA */}
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
                    placeholder="Ex: Gastronomia & Delivery"
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contato / Responsável</label>
                  <input
                    type="text"
                    value={newCompanyOwner}
                    onChange={e => setNewCompanyOwner(e.target.value)}
                    placeholder="Ex: Carlos Oliveira"
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Limite Verba Tráfego (R$)</label>
                  <input
                    type="number"
                    value={newCompanyBudget}
                    onChange={e => setNewCompanyBudget(e.target.value)}
                    placeholder="5000"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Instância Evolution WhatsApp</label>
                  <select
                    value={newCompanyInstance}
                    onChange={e => setNewCompanyInstance(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
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

      {/* MODAL 2: CRIAR NOVA CAMPANHA / ANÚNCIO */}
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
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="META">Meta Ads (Instagram & Facebook)</option>
                    <option value="GOOGLE">Google Ads (Pesquisa & Display)</option>
                    <option value="TIKTOK">TikTok Ads</option>
                    <option value="WHATSAPP">WhatsApp Direto</option>
                    <option value="LINKEDIN">LinkedIn Ads</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Objetivo da Campanha</label>
                  <select
                    value={newCampObjective}
                    onChange={e => setNewCampObjective(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
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
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Orçamento Diário (R$)</label>
                <input
                  type="number"
                  required
                  value={newCampBudget}
                  onChange={e => setNewCampBudget(e.target.value)}
                  placeholder="Ex: 100"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Texto do Anúncio (Copy)</label>
                <textarea
                  rows={2}
                  value={newCampCopy}
                  onChange={e => setNewCampCopy(e.target.value)}
                  placeholder="Digite a legenda ou texto persuasivo do anúncio..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Link de Destino / Link do WhatsApp</label>
                <input
                  type="text"
                  value={newCampTarget}
                  onChange={e => setNewCampTarget(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
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

      {/* MODAL 3: CRIAR NOVA REGRA DE PILOTO AUTOMÁTICO */}
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
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
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
                    placeholder="Ex: 40"
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

              {newRuleAction === 'INCREASE_BUDGET' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Percentual de Aumento (%)</label>
                  <input
                    type="number"
                    value={newRuleActionVal}
                    onChange={e => setNewRuleActionVal(e.target.value)}
                    placeholder="15"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                  />
                </div>
              )}

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

      {/* MODAL 4: CONECTAR CONTA DE ANÚNCIOS */}
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

      {/* MODAL 5: EDITAR USUÁRIO PELO SUPER ADMIN */}
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

      {/* MODAL 6: CRIAR USUÁRIO PELO ADMIN */}
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
                  <option value="AGENCY_ADMIN">Gestor de Agência (Pode gerenciar clientes)</option>
                  <option value="CLIENT_VIEWER">Cliente Final (Somente visualização)</option>
                  <option value="SUPER_ADMIN">Super Administrador do Sistema</option>
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
