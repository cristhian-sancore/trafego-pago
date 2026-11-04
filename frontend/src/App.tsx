import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Bot,
  MessageSquare,
  Sliders,
  Share2,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  Send,
  RefreshCw,
  ShieldCheck,
  CreditCard,
  Crown,
  ChevronDown,
  Sparkles,
  Zap,
  ArrowUpRight,
  Plus,
  Lock,
  Unlock,
  UserCheck,
  Eye,
  FileText,
  LogOut,
  KeyRound,
  ArrowRight,
  Phone,
  User,
  ArrowLeft,
  Smartphone,
  Check,
  Edit2,
  Trash2,
  X
} from 'lucide-react';
import { Company, Campaign, AutomationRule, Conversation, Message, Agency, SuperAdminData, AuthUser, UserRole } from './types';

interface ClientCompanyDetail extends Company {
  ownerContact: string;
  monthlyFee: number;
  monthlyAdBudget: number;
  status: 'ACTIVE' | 'PAST_DUE' | 'SUSPENDED';
  clientPortalAccess: boolean;
  clientUserEmail: string;
}

interface SystemUserRecord {
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

const INITIAL_USERS: SystemUserRecord[] = [
  {
    id: 'usr-admin',
    name: 'Cristhian Sancore',
    username: 'admin',
    password: 'admin',
    phone: '(11) 99999-0001',
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

export default function App() {
  // Autenticação
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('socialpulse_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Base de Usuários Cadastrados
  const [systemUsers, setSystemUsers] = useState<SystemUserRecord[]>(() => {
    const saved = localStorage.getItem('socialpulse_system_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  // Salva usuários no localStorage sempre que alterados
  useEffect(() => {
    localStorage.setItem('socialpulse_system_users', JSON.stringify(systemUsers));
  }, [systemUsers]);

  // Estados de Telas de Autenticação: 'login' | 'register' | 'verify_phone' | 'forgot_password' | 'reset_password_verify'
  const [authView, setAuthView] = useState<'login' | 'register' | 'verify_phone' | 'forgot_password' | 'reset_password_verify'>('login');

  // Campos de Login
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Campos de Cadastro
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [pendingUser, setPendingUser] = useState<any>(null);

  // Campos de Recuperação de Senha
  const [recoveryTarget, setRecoveryTarget] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recoveryUserFound, setRecoveryUserFound] = useState<any>(null);

  // Modal de Edição de Usuário pelo Admin
  const [editingUser, setEditingUser] = useState<SystemUserRecord | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Formulário do Admin para Criar Novo Usuário
  const [adminNewName, setAdminNewName] = useState('');
  const [adminNewUsername, setAdminNewUsername] = useState('');
  const [adminNewPhone, setAdminNewPhone] = useState('');
  const [adminNewPassword, setAdminNewPassword] = useState('');
  const [adminNewRole, setAdminNewRole] = useState<UserRole>('AGENCY_ADMIN');

  const [activeTab, setActiveTab] = useState<'dashboard' | 'campaigns' | 'autopilot' | 'inbox' | 'clients' | 'integrations' | 'admin'>('dashboard');
  
  // Lista de Empresas Clientes
  const [clientCompanies, setClientCompanies] = useState<ClientCompanyDetail[]>([
    {
      id: 'comp-1',
      name: 'Moda Express Brasil (E-commerce)',
      niche: 'Moda Feminina',
      document: '42.981.234/0001-90',
      ownerContact: 'Fernanda Rocha (CEO)',
      clientUserEmail: 'fernanda@modaexpress.com.br',
      monthlyFee: 2500.0,
      monthlyAdBudget: 8000.0,
      status: 'ACTIVE',
      clientPortalAccess: true
    },
    {
      id: 'comp-2',
      name: 'Dr. Sorriso Odontologia',
      niche: 'Clínica & Saúde',
      document: '31.123.876/0001-12',
      ownerContact: 'Dr. Roberto Alves',
      clientUserEmail: 'contato@drsorriso.com.br',
      monthlyFee: 1800.0,
      monthlyAdBudget: 4000.0,
      status: 'ACTIVE',
      clientPortalAccess: true
    },
    {
      id: 'comp-3',
      name: 'Imobiliária Prime SP',
      niche: 'Imóveis de Alto Padrão',
      document: '18.456.980/0001-44',
      ownerContact: 'Marcos Vinicius',
      clientUserEmail: 'marcos@imobiliariaprime.com.br',
      monthlyFee: 3500.0,
      monthlyAdBudget: 15000.0,
      status: 'PAST_DUE',
      clientPortalAccess: false
    }
  ]);

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('comp-1');

  // Campanhas
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 'camp-1',
      companyId: 'comp-1',
      platform: 'META',
      name: '[ESCALA] Vestidos Verão - Conversão Direta',
      status: 'ACTIVE',
      dailyBudget: 250.0,
      spendToday: 184.5,
      impressions: 14200,
      clicks: 520,
      conversions: 18,
      cpa: 10.25,
      roas: 4.8,
      autopilotStatus: 'Otimizado (ROAS Alto)'
    },
    {
      id: 'camp-2',
      companyId: 'comp-1',
      platform: 'TIKTOK',
      name: '[UGC] Vídeo Viral Provador - Spark Ads',
      status: 'ACTIVE',
      dailyBudget: 120.0,
      spendToday: 89.1,
      impressions: 28900,
      clicks: 980,
      conversions: 12,
      cpa: 7.42,
      roas: 5.4,
      autopilotStatus: 'Escalando Orçamento +15%'
    },
    {
      id: 'camp-3',
      companyId: 'comp-1',
      platform: 'GOOGLE',
      name: '[PESQUISA] Fundo de Funil - Comprar Vestido Festa',
      status: 'ACTIVE',
      dailyBudget: 150.0,
      spendToday: 145.0,
      impressions: 3400,
      clicks: 210,
      conversions: 9,
      cpa: 16.11,
      roas: 3.2,
      autopilotStatus: 'Dentro da Meta'
    },
    {
      id: 'camp-4',
      companyId: 'comp-1',
      platform: 'WHATSAPP',
      name: '[WHATSAPP] Atendimento VIP Promoção Frete Grátis',
      status: 'ACTIVE',
      dailyBudget: 80.0,
      spendToday: 55.0,
      impressions: 4300,
      clicks: 140,
      conversions: 24,
      cpa: 2.29,
      roas: 0.0,
      autopilotStatus: 'Excelente Taxa de Lead'
    },
    {
      id: 'camp-5',
      companyId: 'comp-1',
      platform: 'META',
      name: '[TESTE] Conjunto Praia - Criativo Carrossel B',
      status: 'PAUSED',
      dailyBudget: 50.0,
      spendToday: 48.0,
      impressions: 2100,
      clicks: 35,
      conversions: 0,
      cpa: 0.0,
      roas: 0.0,
      autopilotStatus: 'Pausado por Stop-Loss (Gasto sem conversão)'
    }
  ]);

  // Regras de Automação
  const [rules, setRules] = useState<AutomationRule[]>([
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
      companyId: 'comp-1',
      name: '⚠️ Alerta de Fadiga: Se frequência > 3.2 notificar gestor',
      type: 'CREATIVE_FATIGUE',
      conditionField: 'frequency',
      operator: 'GREATER_THAN',
      thresholdValue: 3.2,
      action: 'SEND_NOTIFICATION',
      actionValue: null,
      isActive: true,
      lastTriggered: 'Ontem'
    }
  ]);

  // Caixa de Entrada (Inbox)
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv-1',
      companyId: 'comp-1',
      channel: 'WHATSAPP',
      contactName: 'Juliana Paes',
      contactPhone: '+55 (11) 98765-4321',
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
      companyId: 'comp-1',
      channel: 'TIKTOK_DM',
      contactName: '@lucas_style22',
      contactPhone: null,
      originAd: '[UGC] Vídeo Viral Provador',
      unreadCount: 2,
      lastMessage: 'O frete é grátis para o Rio de Janeiro?',
      lastMessageTime: '10:20',
      aiStatus: 'Aguardando Atendente'
    }
  ]);
  const [selectedConversationId, setSelectedConversationId] = useState<string>('conv-1');
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    'conv-1': [
      { id: 'm-1', senderType: 'CUSTOMER', text: 'Oi! Vi o anúncio no Insta com frete grátis!', time: '12:12' },
      { id: 'm-2', senderType: 'AI_BOT', text: 'Olá Juliana! Seja super bem-vinda à Moda Express! Sim, temos frete grátis para pedidos acima de R$ 150 hoje. Como posso te ajudar?', time: '12:12' },
      { id: 'm-3', senderType: 'CUSTOMER', text: 'Queria saber se tem o vestido vermelho no tamanho M?', time: '12:14' }
    ]
  });
  const [inputMessage, setInputMessage] = useState('');

  // Super Admin: Agências e Faturamento do SaaS
  const [superAdminData] = useState<SuperAdminData>({
    totalRevenueMRR: 24780.0,
    activeAgencies: 42,
    totalManagedCompanies: 186,
    pendingInvoices: 3
  });
  const [agencies, setAgencies] = useState<Agency[]>([
    {
      id: 'agency-1',
      name: 'Agência Alpha Digital',
      slug: 'alpha-digital',
      ownerName: 'Carlos Mendonça',
      email: 'carlos@alphadigital.com.br',
      planId: 'plan-pro',
      planName: 'Agência Pro',
      status: 'ACTIVE',
      monthlyPrice: 497.0,
      nextBillingDate: '25/11/2026',
      paymentMethod: 'PIX Recorrente'
    },
    {
      id: 'agency-2',
      name: 'Impulso Growth Tráfego',
      slug: 'impulso-growth',
      ownerName: 'Mariana Duarte',
      email: 'mariana@impulsogrowth.com.br',
      planId: 'plan-scale',
      planName: 'Agência Scale & White-Label',
      status: 'ACTIVE',
      monthlyPrice: 997.0,
      nextBillingDate: '02/12/2026',
      paymentMethod: 'Cartão de Crédito'
    },
    {
      id: 'agency-3',
      name: 'Vendas Máximas Performance',
      slug: 'vendas-maximas',
      ownerName: 'Renato Silva',
      email: 'renato@vendasmaximas.com.br',
      planId: 'plan-starter',
      planName: 'Starter',
      status: 'PAST_DUE',
      monthlyPrice: 197.0,
      nextBillingDate: '01/11/2026',
      paymentMethod: 'Boleto (Atrasado)'
    }
  ]);

  useEffect(() => {
    if (currentUser?.role === 'CLIENT_VIEWER' && currentUser.companyId) {
      setSelectedCompanyId(currentUser.companyId);
    }
  }, [currentUser]);

  // Handler de Login por Nome de Usuário
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    const cleanUsername = loginUsername.trim().toLowerCase().replace(/^@/, '');
    const matched = systemUsers.find(
      u => u.username.toLowerCase() === cleanUsername && u.password === loginPassword
    );

    if (matched) {
      if (matched.status === 'BLOCKED') {
        setAuthError('Sua conta foi suspensa pelo Administrador. Entre em contato com o suporte.');
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
      setAuthError('Nome de usuário ou senha incorretos.');
    }
  };

  // Login Rápido (Demonstração)
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

  // Iniciar Cadastro -> Gera código e envia ao celular
  const handleStartRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    const cleanUsername = regUsername.trim().toLowerCase().replace(/^@/, '');

    if (systemUsers.some(u => u.username.toLowerCase() === cleanUsername)) {
      setAuthError('Este nome de usuário já está em uso. Escolha outro.');
      return;
    }

    if (!regPhone || regPhone.length < 10) {
      setAuthError('Informe um número de celular válido com DDD para confirmação.');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);

    setPendingUser({
      name: regName,
      username: cleanUsername,
      phone: regPhone,
      password: regPassword,
      role: 'AGENCY_ADMIN' as UserRole
    });

    setAuthSuccess(`Código de 6 dígitos gerado e enviado para ${regPhone}!`);
    setAuthView('verify_phone');
  };

  // Confirmar Código do Celular no Cadastro
  const handleConfirmRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (verificationCode !== generatedCode && verificationCode !== '123456') {
      setAuthError('Código de confirmação incorreto.');
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

  // Iniciar Recuperação de Senha por Celular ou Nome de Usuário
  const handleStartRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    const query = recoveryTarget.trim().toLowerCase().replace(/^@/, '');
    const found = systemUsers.find(
      u => u.username.toLowerCase() === query || u.phone.replace(/\D/g, '') === query.replace(/\D/g, '')
    );

    if (!found) {
      setAuthError('Nenhuma conta encontrada com este nome de usuário ou celular.');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setRecoveryUserFound(found);
    setAuthSuccess(`Código de redefinição enviado para o celular ${found.phone}!`);
    setAuthView('reset_password_verify');
  };

  // Concluir Redefinição de Senha
  const handleCompleteResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (recoveryCode !== generatedCode && recoveryCode !== '123456') {
      setAuthError('Código incorreto.');
      return;
    }

    if (newPassword.length < 3) {
      setAuthError('A nova senha deve ter pelo menos 3 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setAuthError('As senhas não coincidem.');
      return;
    }

    setSystemUsers(prev =>
      prev.map(u => (u.username === recoveryUserFound.username ? { ...u, password: newPassword } : u))
    );

    setAuthSuccess('Senha redefinida com sucesso! Você já pode fazer login.');
    setLoginUsername(recoveryUserFound.username);
    setLoginPassword(newPassword);
    setAuthView('login');
  };

  // =========================================================================
  // GESTÃO DE USUÁRIOS PELO SUPER ADMIN (ALTERAR NOME, TELEFONE, SENHA, ETC.)
  // =========================================================================
  
  // Abrir Modal de Edição de Usuário
  const handleOpenEditUser = (user: SystemUserRecord) => {
    setEditingUser({ ...user });
    setIsEditModalOpen(true);
  };

  // Salvar Alterações do Usuário Editado
  const handleSaveUserEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setSystemUsers(prev =>
      prev.map(u => (u.id === editingUser.id ? { ...editingUser } : u))
    );

    // Se o admin editou a si mesmo, atualiza também a sessão ativa
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

    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  // Alternar Bloqueio do Usuário
  const handleToggleUserStatus = (userId: string) => {
    setSystemUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          const nextStatus = u.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  // Excluir Usuário
  const handleDeleteUser = (userId: string) => {
    if (currentUser?.id === userId) {
      alert('Você não pode excluir sua própria conta de administrador.');
      return;
    }
    if (confirm('Tem certeza que deseja excluir permanentemente este usuário?')) {
      setSystemUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  // Criar Usuário pelo Admin
  const handleAdminCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = adminNewUsername.trim().toLowerCase().replace(/^@/, '');

    if (systemUsers.some(u => u.username.toLowerCase() === cleanUsername)) {
      alert('Este nome de usuário já existe.');
      return;
    }

    const newUser: SystemUserRecord = {
      id: `usr-${Date.now()}`,
      name: adminNewName,
      username: cleanUsername,
      phone: adminNewPhone,
      password: adminNewPassword,
      role: adminNewRole,
      status: 'ACTIVE'
    };

    setSystemUsers(prev => [...prev, newUser]);
    setIsCreateModalOpen(false);
    setAdminNewName('');
    setAdminNewUsername('');
    setAdminNewPhone('');
    setAdminNewPassword('');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('socialpulse_auth_user');
    setActiveTab('dashboard');
    setAuthView('login');
  };

  // Cálculos do Dashboard
  const currentCompany = clientCompanies.find(c => c.id === selectedCompanyId) || clientCompanies[0];
  const activeCampaigns = campaigns.filter(c => c.companyId === selectedCompanyId);
  const totalSpend = activeCampaigns.reduce((acc, c) => acc + c.spendToday, 0);
  const totalConversions = activeCampaigns.reduce((acc, c) => acc + c.conversions, 0);
  const totalClicks = activeCampaigns.reduce((acc, c) => acc + c.clicks, 0);
  const avgCpa = totalConversions > 0 ? totalSpend / totalConversions : 0;
  const totalRevenue = activeCampaigns.reduce((acc, c) => acc + c.spendToday * c.roas, 0);
  const overallRoas = totalSpend > 0 ? totalRevenue / totalSpend : 0;
  const totalAgencyRevenue = clientCompanies.reduce((acc, c) => acc + c.monthlyFee, 0);

  // Ações de Campanha
  const toggleCampaignStatus = (id: string) => {
    if (currentUser?.role === 'CLIENT_VIEWER') return;
    setCampaigns(prev =>
      prev.map(c => (c.id === id ? { ...c, status: c.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : c))
    );
  };

  const toggleRule = (id: string) => {
    if (currentUser?.role === 'CLIENT_VIEWER') return;
    setRules(prev => prev.map(r => (r.id === id ? { ...r, isActive: !r.isActive } : r)));
  };

  const toggleClientPortalAccess = (companyId: string) => {
    setClientCompanies(prev =>
      prev.map(c => {
        if (c.id === companyId) {
          return { ...c, clientPortalAccess: !c.clientPortalAccess };
        }
        return c;
      })
    );
  };

  const toggleClientPaymentStatus = (companyId: string) => {
    setClientCompanies(prev =>
      prev.map(c => {
        if (c.id === companyId) {
          const nextStatus = c.status === 'ACTIVE' ? 'PAST_DUE' : 'ACTIVE';
          return { ...c, status: nextStatus, clientPortalAccess: nextStatus === 'ACTIVE' };
        }
        return c;
      })
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      senderType: 'AGENT',
      text: inputMessage,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), newMsg]
    }));

    setConversations(prev =>
      prev.map(c =>
        c.id === selectedConversationId
          ? { ...c, lastMessage: inputMessage, unreadCount: 0 }
          : c
      )
    );

    setInputMessage('');
  };

  const triggerAiResponse = () => {
    const aiMsg: Message = {
      id: `m-${Date.now()}`,
      senderType: 'AI_BOT',
      text: '🤖 [IA Respondeu]: Sim! Temos o vestido vermelho no tamanho M disponível a pronta entrega! Você pode garantir o frete grátis aplicando o cupom VESTIDO10 no link: modaexpress.com.br/vestido-vermelho',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), aiMsg]
    }));

    setConversations(prev =>
      prev.map(c =>
        c.id === selectedConversationId
          ? { ...c, lastMessage: aiMsg.text, aiStatus: 'IA Enviou Oferta' }
          : c
      )
    );
  };

  const toggleAgencyStatus = (id: string) => {
    setAgencies(prev =>
      prev.map(a => {
        if (a.id === id) {
          const nextStatus = a.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  // =========================================================================
  // SE NÃO ESTIVER AUTENTICADO: TELAS DE LOGIN, CADASTRO & RECUPERAÇÃO
  // =========================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center font-black text-slate-950 text-2xl shadow-xl shadow-emerald-500/30">
              S
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">SocialPulse</h1>
            <p className="text-xs text-slate-400">
              Plataforma de Tráfego Pago, Automação & Atendimento Multicanal
            </p>
          </div>

          {authSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-600/40 text-xs text-emerald-300 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
              <span>{authSuccess}</span>
            </div>
          )}

          {authError && (
            <div className="p-3.5 rounded-2xl bg-rose-950/70 border border-rose-800/60 text-xs text-rose-300 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{authError}</span>
            </div>
          )}

          {/* 1. TELA DE LOGIN */}
          {authView === 'login' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-slate-100">Acesse sua conta</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Entre com seu nome de usuário e senha</p>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                  AUTENTICAÇÃO SEGURA
                </span>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Nome de Usuário
                  </label>
                  <div className="relative">
                    <span className="text-slate-500 font-bold absolute left-3.5 top-2.5 text-xs">@</span>
                    <input
                      type="text"
                      required
                      value={loginUsername}
                      onChange={e => setLoginUsername(e.target.value)}
                      placeholder="seu_usuario"
                      className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Senha
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthError('');
                        setAuthSuccess('');
                        setAuthView('forgot_password');
                      }}
                      className="text-[11px] text-emerald-400 hover:underline"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
                >
                  Entrar no Painel <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="text-center pt-1 border-t border-slate-800/80">
                <p className="text-xs text-slate-400">
                  Não possui cadastro?{' '}
                  <button
                    onClick={() => {
                      setAuthError('');
                      setAuthSuccess('');
                      setAuthView('register');
                    }}
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    Cadastre-se com seu celular
                  </button>
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <span className="block text-center text-[10px] uppercase font-bold text-slate-500">
                  Contas Rápidas de Teste
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => quickLogin(0)}
                    className="p-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-amber-500/30 text-center transition-all"
                  >
                    <div className="text-[11px] font-bold text-amber-400">@admin</div>
                    <div className="text-[9px] text-slate-400">Super Admin</div>
                  </button>
                  <button
                    onClick={() => quickLogin(1)}
                    className="p-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-emerald-500/30 text-center transition-all"
                  >
                    <div className="text-[11px] font-bold text-emerald-400">@carlos_alpha</div>
                    <div className="text-[9px] text-slate-400">Agência</div>
                  </button>
                  <button
                    onClick={() => quickLogin(2)}
                    className="p-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-teal-500/30 text-center transition-all"
                  >
                    <div className="text-[11px] font-bold text-teal-400">@fernanda_moda</div>
                    <div className="text-[9px] text-slate-400">Cliente</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. TELA DE CADASTRO */}
          {authView === 'register' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAuthView('login')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h2 className="text-lg font-bold text-slate-100">Criar Nova Conta</h2>
                  <p className="text-xs text-slate-400">Confirmação instantânea no seu celular</p>
                </div>
              </div>

              <form onSubmit={handleStartRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                      placeholder="Ex: João da Silva"
                      className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Nome de Usuário Escolhido
                  </label>
                  <div className="relative">
                    <span className="text-slate-500 font-bold absolute left-3.5 top-2.5 text-xs">@</span>
                    <input
                      type="text"
                      required
                      value={regUsername}
                      onChange={e => setRegUsername(e.target.value)}
                      placeholder="meu_usuario"
                      className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Celular com DDD (WhatsApp)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={regPhone}
                      onChange={e => setRegPhone(e.target.value)}
                      placeholder="(11) 98765-4321"
                      className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Crie uma Senha
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={e => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" /> Enviar Código no Celular
                </button>
              </form>
            </div>
          )}

          {/* 3. TELA DE VALIDAÇÃO DO CÓDIGO */}
          {authView === 'verify_phone' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-100">Confirmação de Celular</h2>
                <p className="text-xs text-slate-400">
                  Enviamos um código de 6 dígitos para o número <strong className="text-emerald-400">{pendingUser?.phone}</strong>
                </p>
                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 inline-block mt-2">
                  Código de Demonstração: <strong>{generatedCode || '123456'}</strong>
                </div>
              </div>

              <form onSubmit={handleConfirmRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 text-center">
                    Digite o código de 6 dígitos
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={verificationCode}
                    onChange={e => setVerificationCode(e.target.value)}
                    placeholder="000000"
                    className="w-full text-center tracking-[0.5em] font-mono text-lg font-bold bg-slate-950/70 border border-slate-800 rounded-xl py-3 text-emerald-400 placeholder-slate-600 outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Validar & Acessar Plataforma
                </button>
              </form>

              <div className="text-center">
                <button
                  onClick={() => setAuthView('register')}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ← Alterar número de celular
                </button>
              </div>
            </div>
          )}

          {/* 4. RECUPERAÇÃO DE SENHA */}
          {authView === 'forgot_password' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAuthView('login')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h2 className="text-lg font-bold text-slate-100">Recuperar Senha</h2>
                  <p className="text-xs text-slate-400">Receba o código de recuperação no celular</p>
                </div>
              </div>

              <form onSubmit={handleStartRecovery} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Nome de Usuário ou Celular Cadastrado
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={recoveryTarget}
                      onChange={e => setRecoveryTarget(e.target.value)}
                      placeholder="Ex: carlos_alpha ou (11) 98888-1234"
                      className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" /> Enviar Código no Celular
                </button>
              </form>
            </div>
          )}

          {/* 5. REDEFINIR SENHA */}
          {authView === 'reset_password_verify' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
              <div className="text-center space-y-1">
                <h2 className="text-lg font-bold text-slate-100">Redefinir Senha</h2>
                <p className="text-xs text-slate-400">
                  Código enviado para <strong className="text-emerald-400">{recoveryUserFound?.phone}</strong>
                </p>
                <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 inline-block mt-1">
                  Código de Demonstração: <strong>{generatedCode || '123456'}</strong>
                </div>
              </div>

              <form onSubmit={handleCompleteResetPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Código de 6 Dígitos
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={recoveryCode}
                    onChange={e => setRecoveryCode(e.target.value)}
                    placeholder="000000"
                    className="w-full text-center tracking-[0.4em] font-mono font-bold bg-slate-950/70 border border-slate-800 rounded-xl py-2.5 text-emerald-400 outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Salvar Nova Senha & Fazer Login
                </button>
              </form>
            </div>
          )}

          <p className="text-center text-[11px] text-slate-500">
            Ambiente seguro protegido por criptografia SSL • SocialPulse © 2026
          </p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SE ESTIVER AUTENTICADO: PAINEL COMPLETO COM CONTROLE TOTAL DE USUÁRIOS
  // =========================================================================
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-emerald-500/20">
              S
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                SocialPulse
              </span>
              <span className="text-[10px] ml-1.5 px-2 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PRO PLATFORM
              </span>
            </div>
          </div>

          {currentUser.role !== 'CLIENT_VIEWER' ? (
            <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 rounded-xl px-3 py-1.5">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <select
                value={selectedCompanyId}
                onChange={e => setSelectedCompanyId(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-200 outline-none cursor-pointer pr-2"
              >
                {clientCompanies.map(comp => (
                  <option key={comp.id} value={comp.id} className="bg-slate-900 text-slate-100">
                    {comp.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-300 font-medium">
              <Building2 className="w-3.5 h-3.5 text-teal-400" />
              <span>{currentCompany.name} (Modo Relatório)</span>
            </div>
          )}
        </div>

        {/* Informações do Usuário & Ações */}
        <div className="flex items-center gap-3">
          {currentUser.role !== 'CLIENT_VIEWER' && (
            <div className="hidden sm:flex items-center gap-2 bg-emerald-950/40 border border-emerald-600/30 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Piloto Automático: Ativo (24/7)
            </div>
          )}

          {/* Botão Painel do Administrador Geral */}
          {currentUser.role === 'SUPER_ADMIN' && (
            <button
              onClick={() => setActiveTab(activeTab === 'admin' ? 'dashboard' : 'admin')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'admin'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              {activeTab === 'admin' ? 'Voltar ao Tráfego' : 'Controle do Admin (Usuários & SaaS)'}
            </button>
          )}

          <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
            <div className="text-right hidden md:block">
              <div className="text-xs font-bold text-slate-200">
                {currentUser.name} <span className="text-emerald-400">(@{currentUser.username})</span>
              </div>
              <div className="text-[10px] text-slate-400">
                {currentUser.role === 'SUPER_ADMIN'
                  ? '👑 Super Admin'
                  : currentUser.role === 'AGENCY_ADMIN'
                  ? `🏢 ${currentUser.agencyName || 'Agência'}`
                  : '👁️ Portal do Cliente'} • {currentUser.phone}
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sair da Conta"
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:text-rose-400 text-slate-400 border border-slate-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Navegação Principal */}
      <nav className="border-b border-slate-800 bg-slate-900/40 px-6 flex gap-2 overflow-x-auto text-sm">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 font-semibold transition-all ${
            activeTab === 'dashboard'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Dashboard Geral
        </button>

        {currentUser.role !== 'CLIENT_VIEWER' && (
          <>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`flex items-center gap-2 py-3 px-4 border-b-2 font-semibold transition-all ${
                activeTab === 'campaigns'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Gestor de Campanhas
              <span className="ml-1 text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded-full">
                {activeCampaigns.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('autopilot')}
              className={`flex items-center gap-2 py-3 px-4 border-b-2 font-semibold transition-all ${
                activeTab === 'autopilot'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-4 h-4" />
              Piloto Automático
              <span className="ml-1 text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-bold">
                Ativo
              </span>
            </button>

            <button
              onClick={() => setActiveTab('inbox')}
              className={`flex items-center gap-2 py-3 px-4 border-b-2 font-semibold transition-all ${
                activeTab === 'inbox'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Caixa de Entrada & IA
            </button>

            <button
              onClick={() => setActiveTab('clients')}
              className={`flex items-center gap-2 py-3 px-4 border-b-2 font-semibold transition-all ${
                activeTab === 'clients'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Meus Clientes & Acessos
              <span className="ml-1 text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-bold">
                {clientCompanies.length} Clientes
              </span>
            </button>

            <button
              onClick={() => setActiveTab('integrations')}
              className={`flex items-center gap-2 py-3 px-4 border-b-2 font-semibold transition-all ${
                activeTab === 'integrations'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Share2 className="w-4 h-4" />
              Conexões & Redes
            </button>
          </>
        )}
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        
        {/* ABA 1: DASHBOARD GERAL */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-800/80 p-5 rounded-2xl border border-slate-800 shadow-xl">
              <div>
                <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  Visão Geral: {currentCompany.name}
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Nicho: <span className="text-emerald-400 font-semibold">{currentCompany.niche}</span> • CNPJ: {currentCompany.document} • Sincronizado em tempo real
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">Filtrando: Hoje</span>
                <button className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 font-medium">
                  <RefreshCw className="w-3.5 h-3.5" /> Atualizar Métricas
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span>INVESTIMENTO HOJE</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-slate-100">
                  R$ {totalSpend.toFixed(2)}
                </div>
                <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +12% vs ontem
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span>FATURAMENTO ESTIMADO</span>
                  <TrendingUp className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-2xl font-black text-slate-100">
                  R$ {totalRevenue.toFixed(2)}
                </div>
                <div className="text-xs text-teal-400 mt-2 flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> ROAS Médio: {overallRoas.toFixed(2)}x
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span>CPA MÉDIO (CUSTO POR VENDA)</span>
                  <Sliders className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-black text-slate-100">
                  R$ {avgCpa.toFixed(2)}
                </div>
                <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Dentro da meta (R$ 15,00)
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span>CONVERSÕES & LEADS</span>
                  <Users className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-2xl font-black text-slate-100">
                  {totalConversions} <span className="text-sm font-normal text-slate-400">conversões</span>
                </div>
                <div className="text-xs text-slate-400 mt-2">
                  {totalClicks.toLocaleString('pt-BR')} cliques no total
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <h3 className="font-bold text-sm text-slate-200">Meta Ads (Instagram + Face)</h3>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold">ROAS 4.8x</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Investimento:</span>
                    <span className="font-semibold text-slate-200">R$ 287,50</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Vendas / Leads:</span>
                    <span className="font-semibold text-slate-200">42 conversões</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>CPA Médio:</span>
                    <span className="font-semibold text-emerald-400">R$ 6,84</span>
                  </div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <h3 className="font-bold text-sm text-slate-200">TikTok Ads (Spark Ads)</h3>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold">ROAS 5.4x</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Investimento:</span>
                    <span className="font-semibold text-slate-200">R$ 89,10</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Vendas:</span>
                    <span className="font-semibold text-slate-200">12 conversões</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>CPA Médio:</span>
                    <span className="font-semibold text-emerald-400">R$ 7,42</span>
                  </div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-rose-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <h3 className="font-bold text-sm text-slate-200">Google Ads (Search + YouTube)</h3>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold">ROAS 3.2x</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Investimento:</span>
                    <span className="font-semibold text-slate-200">R$ 145,00</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Vendas:</span>
                    <span className="font-semibold text-slate-200">9 conversões</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>CPA Médio:</span>
                    <span className="font-semibold text-amber-400">R$ 16,11</span>
                  </div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABA: MEUS CLIENTES & ACESSOS */}
        {activeTab === 'clients' && currentUser.role !== 'CLIENT_VIEWER' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/30 border border-emerald-500/30 p-6 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" /> Gestão de Empresas & Clientes da sua Agência
                  </span>
                  <h2 className="text-2xl font-black text-slate-100 mt-1">
                    Controle de Acessos, Verbas e Honorários
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Defina o teto de gastos de cada cliente, convide os empresários para ver relatórios e bloqueie o acesso com 1 clique caso atrasem seus honorários.
                  </p>
                </div>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20 shrink-0 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Adicionar Novo Cliente / Empresa
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                <div className="text-xs text-slate-400 font-semibold mb-2">RECEITA DE HONORÁRIOS DA AGÊNCIA</div>
                <div className="text-2xl font-black text-emerald-400">
                  R$ {totalAgencyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
                </div>
                <div className="text-xs text-slate-400 mt-2">Cobrado mensalmente dos seus clientes</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                <div className="text-xs text-slate-400 font-semibold mb-2">TOTAL DE EMPRESAS ATIVAS</div>
                <div className="text-2xl font-black text-slate-100">
                  {clientCompanies.length} <span className="text-sm text-emerald-400 font-medium">empresas</span>
                </div>
                <div className="text-xs text-slate-400 mt-2">Com anúncios ativos no Meta, Google e TikTok</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                <div className="text-xs text-slate-400 font-semibold mb-2">VERBA TOTAL GERENCIADA</div>
                <div className="text-2xl font-black text-teal-400">
                  R$ {clientCompanies.reduce((a, b) => a + b.monthlyAdBudget, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-slate-400 mt-2">Limite consolidado de verba em anúncios</div>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-200">Empresas Clientes</h3>
                <span className="text-xs text-slate-400">{clientCompanies.length} cadastradas</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-700/60">
                    <tr>
                      <th className="py-3.5 px-4">Empresa / Contato</th>
                      <th className="py-3.5 px-4">Honorários da Agência</th>
                      <th className="py-3.5 px-4">Teto de Anúncios</th>
                      <th className="py-3.5 px-4">Portal do Cliente</th>
                      <th className="py-3.5 px-4">Status Honorários</th>
                      <th className="py-3.5 px-4 text-center">Bloquear / Liberar</th>
                      <th className="py-3.5 px-4 text-right">Acesso Direto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {clientCompanies.map(client => (
                      <tr key={client.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-200 text-xs">{client.name}</div>
                          <div className="text-[11px] text-slate-400">{client.ownerContact} • {client.clientUserEmail}</div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-emerald-400">
                          R$ {client.monthlyFee.toFixed(2)}/mês
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-300">
                          R$ {client.monthlyAdBudget.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded font-bold text-[10px] flex items-center gap-1 w-fit ${
                              client.clientPortalAccess
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-rose-500/20 text-rose-400'
                            }`}
                          >
                            {client.clientPortalAccess ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" /> Acesso Liberado
                              </>
                            ) : (
                              <>
                                <Lock className="w-3 h-3" /> Acesso Suspenso
                              </>
                            )}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleClientPaymentStatus(client.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                              client.status === 'ACTIVE'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {client.status === 'ACTIVE' ? 'EM DIA' : 'ATRASADO'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => toggleClientPortalAccess(client.id)}
                            className={`text-[11px] font-bold px-3 py-1 rounded-lg transition-all ${
                              client.clientPortalAccess
                                ? 'bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40'
                                : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-800/40'
                            }`}
                          >
                            {client.clientPortalAccess ? 'Suspender Portal' : 'Liberar Portal'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedCompanyId(client.id);
                              setActiveTab('dashboard');
                            }}
                            className="text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg border border-slate-700"
                          >
                            Abrir Tráfego →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ABA 2: GESTOR DE CAMPANHAS */}
        {activeTab === 'campaigns' && currentUser.role !== 'CLIENT_VIEWER' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100">Gerenciador Central de Anúncios</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Ligue, pause e altere orçamentos do Meta, TikTok e Google sem sair do painel.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400">Total: {activeCampaigns.length} campanhas</span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-700/60">
                    <tr>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Plataforma</th>
                      <th className="py-3.5 px-4">Campanha</th>
                      <th className="py-3.5 px-4">Orçamento Diário</th>
                      <th className="py-3.5 px-4">Gasto Hoje</th>
                      <th className="py-3.5 px-4">Conversões</th>
                      <th className="py-3.5 px-4">CPA</th>
                      <th className="py-3.5 px-4">ROAS</th>
                      <th className="py-3.5 px-4">Ação Rápida</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {activeCampaigns.map(camp => (
                      <tr key={camp.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleCampaignStatus(camp.id)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[10px] transition-all ${
                              camp.status === 'ACTIVE'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {camp.status === 'ACTIVE' ? (
                              <>
                                <Play className="w-2.5 h-2.5 fill-current" /> ATIVO
                              </>
                            ) : (
                              <>
                                <Pause className="w-2.5 h-2.5 fill-current" /> PAUSADO
                              </>
                            )}
                          </button>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                              camp.platform === 'META'
                                ? 'bg-blue-600/20 text-blue-400'
                                : camp.platform === 'TIKTOK'
                                ? 'bg-rose-600/20 text-rose-400'
                                : camp.platform === 'GOOGLE'
                                ? 'bg-amber-600/20 text-amber-400'
                                : 'bg-emerald-600/20 text-emerald-400'
                            }`}
                          >
                            {camp.platform}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-200 text-xs">{camp.name}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                            <Bot className="w-3 h-3 text-emerald-400" />
                            {camp.autopilotStatus}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-200">
                          R$ {camp.dailyBudget.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-200">
                          R$ {camp.spendToday.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-100">
                          {camp.conversions}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-emerald-400">
                          {camp.cpa > 0 ? `R$ ${camp.cpa.toFixed(2)}` : '-'}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-teal-400">
                          {camp.roas > 0 ? `${camp.roas.toFixed(1)}x` : '-'}
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleCampaignStatus(camp.id)}
                            className="text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg border border-slate-700 transition-all"
                          >
                            {camp.status === 'ACTIVE' ? 'Pausar' : 'Ativar'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ABA 3: PILOTO AUTOMÁTICO */}
        {activeTab === 'autopilot' && currentUser.role !== 'CLIENT_VIEWER' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  Piloto Automático & Stop-Loss
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Proteja a verba contra desperdício e escale anúncios vencedores sem intervenção manual.
                </p>
              </div>
              <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20">
                <Plus className="w-4 h-4" /> Criar Nova Regra
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rules.map(rule => (
                <div
                  key={rule.id}
                  className={`bg-slate-900/90 border p-5 rounded-2xl space-y-4 transition-all ${
                    rule.isActive ? 'border-emerald-500/30' : 'border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rule.isActive
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {rule.isActive ? 'MOTOR ATIVO' : 'DESATIVADO'}
                    </span>
                    <button
                      onClick={() => toggleRule(rule.id)}
                      className="text-xs font-bold text-slate-400 hover:text-white"
                    >
                      {rule.isActive ? 'Desativar' : 'Ativar'}
                    </button>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-200">{rule.name}</h3>
                    <p className="text-xs text-slate-400 mt-2">
                      Último disparo: <span className="text-slate-200">{rule.lastTriggered}</span>
                    </p>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-xl text-xs border border-slate-800 font-mono text-emerald-300">
                    IF {rule.conditionField} {rule.operator} {rule.thresholdValue} <br />
                    THEN {rule.action} {rule.actionValue ? `(${rule.actionValue}%)` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABA 4: CAIXA DE ENTRADA & IA */}
        {activeTab === 'inbox' && currentUser.role !== 'CLIENT_VIEWER' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-teal-400" />
                  Caixa de Entrada Unificada & Atendente IA
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Atenda leads do WhatsApp, Direct do Instagram e TikTok que vieram diretamente dos anúncios.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={triggerAiResponse}
                  className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs transition-all shadow-md shadow-teal-500/20"
                >
                  <Bot className="w-3.5 h-3.5" /> Testar Resposta da IA
                </button>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl grid grid-cols-1 md:grid-cols-3 min-h-[520px] overflow-hidden shadow-xl">
              <div className="border-r border-slate-800 divide-y divide-slate-800/80 overflow-y-auto">
                {conversations.map(conv => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversationId(conv.id)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedConversationId === conv.id ? 'bg-slate-800/90' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            conv.channel === 'WHATSAPP'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : conv.channel === 'INSTAGRAM_DM'
                              ? 'bg-fuchsia-500/20 text-fuchsia-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {conv.channel}
                        </span>
                        <span className="font-bold text-sm text-slate-200">{conv.contactName}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{conv.lastMessageTime}</span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-1">{conv.lastMessage}</p>

                    <div className="flex items-center justify-between mt-2 text-[10px]">
                      <span className="text-slate-500 truncate max-w-[150px]">
                        🎯 {conv.originAd}
                      </span>
                      <span className="text-teal-400 font-semibold">{conv.aiStatus}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="md:col-span-2 flex flex-col justify-between bg-slate-950/40">
                <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-200">
                      {conversations.find(c => c.id === selectedConversationId)?.contactName}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Origem: {conversations.find(c => c.id === selectedConversationId)?.originAd}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                    <span className="text-teal-300 font-semibold">Atendente IA Conectado</span>
                  </div>
                </div>

                <div className="p-4 space-y-3 overflow-y-auto max-h-[360px] flex-1">
                  {(messages[selectedConversationId] || []).map(msg => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.senderType === 'CUSTOMER' ? 'items-start' : 'items-end'
                      }`}
                    >
                      <div
                        className={`max-w-[78%] rounded-2xl p-3 text-xs leading-relaxed ${
                          msg.senderType === 'CUSTOMER'
                            ? 'bg-slate-800 text-slate-200'
                            : msg.senderType === 'AI_BOT'
                            ? 'bg-gradient-to-r from-teal-950 to-slate-800 text-teal-200 border border-teal-500/30'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 px-1">
                        {msg.senderType === 'AI_BOT' ? '🤖 Resposta IA' : msg.senderType === 'AGENT' ? 'Você' : 'Cliente'} • {msg.time}
                      </span>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={handleSendMessage}
                  className="p-3 border-t border-slate-800 bg-slate-900/60 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    placeholder="Digite sua resposta ou deixe a IA responder automaticamente..."
                    className="flex-1 bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-emerald-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold p-2.5 rounded-xl transition-all shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ABA 5: CONEXÕES & REDES SOCIAIS */}
        {activeTab === 'integrations' && currentUser.role !== 'CLIENT_VIEWER' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-100">Conexões com as Plataformas de Anúncios</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Conecte as contas oficiais via OAuth para sincronizar métricas, campanhas e caixas de entrada.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                      M
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-200">Meta Ads</h3>
                      <p className="text-[11px] text-slate-400">Facebook, Instagram & CAPI</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                    CONECTADO
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Conta vinculada: <strong>act_4920194829</strong> (Moda Express BM).
                </p>
                <button className="w-full text-xs font-semibold py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
                  Gerenciar Contas
                </button>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center font-bold">
                      T
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-200">TikTok Ads</h3>
                      <p className="text-[11px] text-slate-400">TikTok Business & Spark Ads</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                    CONECTADO
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Conta vinculada: <strong>tt_adv_883921</strong> (Moda Express TikTok).
                </p>
                <button className="w-full text-xs font-semibold py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
                  Gerenciar Contas
                </button>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold">
                      G
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-200">Google Ads</h3>
                      <p className="text-[11px] text-slate-400">Search, YouTube & Shopping</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                    CONECTADO
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Conta vinculada: <strong>CID 412-890-1123</strong>.
                </p>
                <button className="w-full text-xs font-semibold py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
                  Gerenciar Contas
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* ABA 6: PAINEL DO ADMINISTRADOR GERAL (CONTROLE TOTAL)    */}
        {/* ======================================================== */}
        {activeTab === 'admin' && currentUser.role === 'SUPER_ADMIN' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/20 border border-amber-500/30 p-6 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Crown className="w-4 h-4" /> Painel de Controle Máximo (Super Admin)
                  </span>
                  <h2 className="text-2xl font-black text-slate-100 mt-1">
                    Gestão Completa de Usuários & Assinaturas
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Você tem poder total para alterar Nome, Telefone, Usuário e Senha de qualquer pessoa cadastrada, além de bloquear ou liberar acessos.
                  </p>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20 shrink-0 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Cadastrar Novo Usuário
                </button>
              </div>
            </div>

            {/* TABELA DE GESTÃO DE TODOS OS USUÁRIOS */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <h3 className="font-bold text-sm text-slate-200">Todos os Usuários Cadastrados ({systemUsers.length})</h3>
                </div>
                <span className="text-xs text-slate-400">Controle irrestrito de credenciais</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-700/60">
                    <tr>
                      <th className="py-3.5 px-4">Nome Completo</th>
                      <th className="py-3.5 px-4">Nome de Usuário</th>
                      <th className="py-3.5 px-4">Celular (WhatsApp)</th>
                      <th className="py-3.5 px-4">Senha Atual</th>
                      <th className="py-3.5 px-4">Perfil / Papel</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Ações do Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {systemUsers.map(user => (
                      <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-200">
                          {user.name}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            @{user.username}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-300">
                          {user.phone}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-mono bg-slate-950 px-2 py-1 rounded text-amber-300 border border-slate-800">
                            {user.password}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              user.role === 'SUPER_ADMIN'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : user.role === 'AGENCY_ADMIN'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                            }`}
                          >
                            {user.role === 'SUPER_ADMIN'
                              ? '👑 Super Admin'
                              : user.role === 'AGENCY_ADMIN'
                              ? '🏢 Gestor Agência'
                              : '👁️ Cliente Leitura'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              user.status === 'ACTIVE'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {user.status === 'ACTIVE' ? 'ATIVO' : 'BLOQUEADO'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditUser(user)}
                              title="Alterar Nome, Telefone, Senha ou Papel"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-colors flex items-center gap-1 text-[11px] font-semibold"
                            >
                              <Edit2 className="w-3.5 h-3.5" /> Editar
                            </button>

                            {user.id !== currentUser.id && (
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                title="Excluir Usuário"
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* MÉTRICAS DE FATURAMENTO SAAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                <div className="text-xs text-slate-400 font-semibold mb-2">MRR (FATURAMENTO RECORRENTE)</div>
                <div className="text-2xl font-black text-amber-400">
                  R$ {superAdminData.totalRevenueMRR.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-slate-400 mt-2">Mensalidade recorrente das agências</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                <div className="text-xs text-slate-400 font-semibold mb-2">AGÊNCIAS ATIVAS (ASSINANTES)</div>
                <div className="text-2xl font-black text-slate-100">
                  {superAdminData.activeAgencies} <span className="text-sm text-emerald-400 font-medium">assinantes</span>
                </div>
                <div className="text-xs text-emerald-400 mt-2">98% de retenção mensal</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                <div className="text-xs text-slate-400 font-semibold mb-2">EMPRESAS GERENCIADAS NO SISTEMA</div>
                <div className="text-2xl font-black text-slate-100">
                  {superAdminData.totalManagedCompanies} <span className="text-sm text-slate-400 font-medium">clientes</span>
                </div>
                <div className="text-xs text-slate-400 mt-2">Distribuídas entre as agências</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                <div className="text-xs text-slate-400 font-semibold mb-2">INADIMPLÊNCIA / PENDÊNCIAS</div>
                <div className="text-2xl font-black text-rose-400">
                  {superAdminData.pendingInvoices} <span className="text-sm text-rose-300 font-medium">pendentes</span>
                </div>
                <div className="text-xs text-rose-400 mt-2">Bloqueio automático em 48h</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* MODAL 1: EDITAR QUALQUER USUÁRIO (NOME, TEL, SENHA, ETC) */}
      {/* ======================================================== */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-slate-100">Editar Dados do Usuário</h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUserEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nome de Usuário (@)</label>
                <input
                  type="text"
                  required
                  value={editingUser.username}
                  onChange={e => setEditingUser({ ...editingUser, username: e.target.value.toLowerCase().replace(/^@/, '') })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Telefone / Celular</label>
                <input
                  type="text"
                  required
                  value={editingUser.phone}
                  onChange={e => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Redefinir Senha do Usuário
                </label>
                <input
                  type="text"
                  required
                  value={editingUser.password}
                  onChange={e => setEditingUser({ ...editingUser, password: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-amber-300 outline-none focus:border-amber-500 font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Você pode digitar a nova senha diretamente aqui.
                </span>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Papel / Nível de Acesso</label>
                <select
                  value={editingUser.role}
                  onChange={e => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-amber-500"
                >
                  <option value="SUPER_ADMIN">👑 Super Admin (Controle Total)</option>
                  <option value="AGENCY_ADMIN">🏢 Gestor de Agência (Multi-Empresas)</option>
                  <option value="CLIENT_VIEWER">👁️ Cliente Final (Somente Leitura)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Status da Conta</label>
                <select
                  value={editingUser.status}
                  onChange={e => setEditingUser({ ...editingUser, status: e.target.value as 'ACTIVE' | 'BLOCKED' })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-amber-500"
                >
                  <option value="ACTIVE">🟢 Ativo e Liberado</option>
                  <option value="BLOCKED">🔴 Bloqueado / Suspenso</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: CADASTRAR NOVO USUÁRIO PELO ADMIN               */}
      {/* ======================================================== */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-slate-100">Cadastrar Novo Usuário</h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdminCreateUser} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={adminNewName}
                  onChange={e => setAdminNewName(e.target.value)}
                  placeholder="Ex: Rafael Souza"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nome de Usuário (@)</label>
                <input
                  type="text"
                  required
                  value={adminNewUsername}
                  onChange={e => setAdminNewUsername(e.target.value.toLowerCase().replace(/^@/, ''))}
                  placeholder="rafael_marketing"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Telefone / Celular (WhatsApp)</label>
                <input
                  type="text"
                  required
                  value={adminNewPhone}
                  onChange={e => setAdminNewPhone(e.target.value)}
                  placeholder="(11) 98765-4321"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Senha de Acesso</label>
                <input
                  type="text"
                  required
                  value={adminNewPassword}
                  onChange={e => setAdminNewPassword(e.target.value)}
                  placeholder="Defina a senha"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-amber-300 outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nível de Acesso (Papel)</label>
                <select
                  value={adminNewRole}
                  onChange={e => setAdminNewRole(e.target.value as UserRole)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-amber-500"
                >
                  <option value="AGENCY_ADMIN">🏢 Gestor de Agência (Multi-Empresas)</option>
                  <option value="CLIENT_VIEWER">👁️ Cliente Final (Somente Leitura)</option>
                  <option value="SUPER_ADMIN">👑 Super Admin (Controle Total)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
                >
                  Criar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-500 px-6 py-4 text-xs text-center">
        SocialPulse Platform • Gestão Unificada de Tráfego Pago & Autoatendimento • Arquitetura Multi-Tenant
      </footer>
    </div>
  );
}
