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
  Mail,
  UserCheck,
  Eye,
  FileText,
  LogOut,
  KeyRound,
  ArrowRight
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

// Contas cadastradas para login
const DEMO_USERS = [
  {
    email: 'admin@socialpulse.com.br',
    password: 'admin',
    user: {
      id: 'usr-admin',
      name: 'Cristhian Sancore',
      email: 'admin@socialpulse.com.br',
      role: 'SUPER_ADMIN' as UserRole
    }
  },
  {
    email: 'carlos@alphadigital.com.br',
    password: '123',
    user: {
      id: 'usr-agency',
      name: 'Carlos Mendonça',
      email: 'carlos@alphadigital.com.br',
      role: 'AGENCY_ADMIN' as UserRole,
      agencyName: 'Agência Alpha Digital'
    }
  },
  {
    email: 'fernanda@modaexpress.com.br',
    password: '123',
    user: {
      id: 'usr-client',
      name: 'Fernanda Rocha',
      email: 'fernanda@modaexpress.com.br',
      role: 'CLIENT_VIEWER' as UserRole,
      companyId: 'comp-1'
    }
  }
];

export default function App() {
  // Autenticação
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('socialpulse_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

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

  // Se o usuário for cliente com empresa específica, forçar a seleção da empresa dele
  useEffect(() => {
    if (currentUser?.role === 'CLIENT_VIEWER' && currentUser.companyId) {
      setSelectedCompanyId(currentUser.companyId);
    }
  }, [currentUser]);

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const matched = DEMO_USERS.find(
      u => u.email.toLowerCase() === loginEmail.trim().toLowerCase() && u.password === loginPassword
    );

    if (matched) {
      setCurrentUser(matched.user);
      localStorage.setItem('socialpulse_auth_user', JSON.stringify(matched.user));
    } else {
      setLoginError('E-mail ou senha incorretos. Use uma das opções de acesso rápido abaixo para testar.');
    }
  };

  // Login Rápido (Demo)
  const quickLogin = (index: number) => {
    const selected = DEMO_USERS[index];
    setLoginEmail(selected.email);
    setLoginPassword(selected.password);
    setCurrentUser(selected.user);
    localStorage.setItem('socialpulse_auth_user', JSON.stringify(selected.user));
  };

  // Logout Handler
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('socialpulse_auth_user');
    setActiveTab('dashboard');
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
  // SE NÃO ESTIVER AUTENTICADO: TELA DE LOGIN PROFISSIONAL
  // =========================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10 space-y-6">
          {/* Logo & Headline */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center font-black text-slate-950 text-2xl shadow-xl shadow-emerald-500/30">
              S
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">SocialPulse</h1>
            <p className="text-xs text-slate-400">
              Plataforma de Tráfego Pago, Automação & Atendimento Multicanal
            </p>
          </div>

          {/* Card de Login */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Acesse sua conta</h2>
              <p className="text-xs text-slate-400 mt-0.5">Entre com seu e-mail e senha cadastrados</p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-xs text-rose-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  E-mail de Acesso
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com.br"
                    className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Senha
                  </label>
                  <a href="#" className="text-[11px] text-emerald-400 hover:underline">
                    Esqueceu?
                  </a>
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

            {/* Separador */}
            <div className="relative flex items-center justify-center pt-2">
              <div className="border-t border-slate-800 w-full"></div>
              <span className="bg-slate-900 px-3 text-[10px] uppercase font-bold text-slate-500 shrink-0">
                Acesso Rápido de Teste
              </span>
            </div>

            {/* Botões de Acesso Rápido */}
            <div className="space-y-2">
              <button
                onClick={() => quickLogin(0)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5" /> Super Admin (Você)
                  </div>
                  <div className="text-[10px] text-slate-400">admin@socialpulse.com.br (Controle Total & SaaS)</div>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded">Entrar</span>
              </button>

              <button
                onClick={() => quickLogin(1)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" /> Gestor de Agência
                  </div>
                  <div className="text-[10px] text-slate-400">carlos@alphadigital.com.br (Multi-Empresas)</div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">Entrar</span>
              </button>

              <button
                onClick={() => quickLogin(2)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-teal-500/40 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> Cliente Final (Portal)
                  </div>
                  <div className="text-[10px] text-slate-400">fernanda@modaexpress.com.br (Modo Leitura)</div>
                </div>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded">Entrar</span>
              </button>
            </div>
          </div>

          <p className="text-center text-[11px] text-slate-500">
            Ambiente seguro protegido por criptografia SSL • SocialPulse © 2026
          </p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SE ESTIVER AUTENTICADO: PAINEL COMPLETO
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

          {/* Seletor Rápido de Empresa (Desabilitado se for cliente com empresa fixa) */}
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
          {/* Badge de Piloto Automático */}
          {currentUser.role !== 'CLIENT_VIEWER' && (
            <div className="hidden sm:flex items-center gap-2 bg-emerald-950/40 border border-emerald-600/30 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Piloto Automático: Ativo (24/7)
            </div>
          )}

          {/* Botão Dono do SaaS (Apenas para Super Admin) */}
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
              {activeTab === 'admin' ? 'Voltar ao Tráfego' : 'Painel do Dono do SaaS'}
            </button>
          )}

          {/* Usuário Logado & Logout */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
            <div className="text-right hidden md:block">
              <div className="text-xs font-bold text-slate-200">{currentUser.name}</div>
              <div className="text-[10px] text-slate-400">
                {currentUser.role === 'SUPER_ADMIN'
                  ? '👑 Super Admin'
                  : currentUser.role === 'AGENCY_ADMIN'
                  ? `🏢 ${currentUser.agencyName || 'Agência'}`
                  : '👁️ Portal do Cliente'}
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
        
        {/* ======================================================== */}
        {/* ABA 1: DASHBOARD GERAL                                   */}
        {/* ======================================================== */}
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

            {/* Cards de Métricas Consolidadas */}
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

            {/* Comparativo por Rede Social */}
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

        {/* ======================================================== */}
        {/* ABA: MEUS CLIENTES & ACESSOS (CONTROLE DA AGÊNCIA)       */}
        {/* ======================================================== */}
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

            {/* Resumo Financeiro da Agência com os Clientes */}
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

            {/* Tabela de Clientes Gerenciados */}
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

        {/* ======================================================== */}
        {/* ABA 2: GESTOR DE CAMPANHAS                               */}
        {/* ======================================================== */}
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

        {/* ======================================================== */}
        {/* ABA 3: PILOTO AUTOMÁTICO                                 */}
        {/* ======================================================== */}
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

        {/* ======================================================== */}
        {/* ABA 4: CAIXA DE ENTRADA & IA                             */}
        {/* ======================================================== */}
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

        {/* ======================================================== */}
        {/* ABA 5: CONEXÕES & REDES SOCIAIS                          */}
        {/* ======================================================== */}
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
        {/* ABA 6: SUPER ADMIN (PAINEL DO DONO DO SAAS)              */}
        {/* ======================================================== */}
        {activeTab === 'admin' && currentUser.role === 'SUPER_ADMIN' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/20 border border-amber-500/30 p-6 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Crown className="w-4 h-4" /> Painel do Proprietário do SaaS
                  </span>
                  <h2 className="text-2xl font-black text-slate-100 mt-1">
                    Gestão de Agências & Assinaturas Recorrentes
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Monitore faturamento em tempo real, cobranças automáticas via PIX/Cartão e libere ou bloqueie o acesso de qualquer agência.
                  </p>
                </div>
                <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20 shrink-0">
                  + Cadastrar Nova Agência / Revenda
                </button>
              </div>
            </div>

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

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-200">Agências Assinantes Cadastradas</h3>
                <span className="text-xs text-slate-400">Total: {agencies.length} agências</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-700/60">
                    <tr>
                      <th className="py-3.5 px-4">Agência / Responsável</th>
                      <th className="py-3.5 px-4">Plano Contratado</th>
                      <th className="py-3.5 px-4">Valor Mensal</th>
                      <th className="py-3.5 px-4">Forma de Pagamento</th>
                      <th className="py-3.5 px-4">Próximo Vencimento</th>
                      <th className="py-3.5 px-4">Status da Assinatura</th>
                      <th className="py-3.5 px-4 text-right">Ação de Acesso</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {agencies.map(agency => (
                      <tr key={agency.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-200 text-xs">{agency.name}</div>
                          <div className="text-[11px] text-slate-400">{agency.ownerName} • {agency.email}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-800 text-amber-300 border border-amber-500/20">
                            {agency.planName}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-100">
                          R$ {agency.monthlyPrice.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">
                          {agency.paymentMethod}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-400">
                          {agency.nextBillingDate}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              agency.status === 'ACTIVE'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : agency.status === 'PAST_DUE'
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-rose-500/20 text-rose-400'
                            }`}
                          >
                            {agency.status === 'ACTIVE'
                              ? 'ATIVO / EM DIA'
                              : agency.status === 'PAST_DUE'
                              ? 'FATURA ATRASADA'
                              : 'ACESSO BLOQUEADO'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => toggleAgencyStatus(agency.id)}
                            className={`text-[11px] font-bold px-3 py-1 rounded-lg transition-all ${
                              agency.status === 'ACTIVE'
                                ? 'bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40'
                                : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-800/40'
                            }`}
                          >
                            {agency.status === 'ACTIVE' ? 'Bloquear Acesso' : 'Liberar Acesso'}
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
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-500 px-6 py-4 text-xs text-center">
        SocialPulse Platform • Gestão Unificada de Tráfego Pago & Autoatendimento • Arquitetura Multi-Tenant
      </footer>
    </div>
  );
}
