import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-Memory Database / Mock Store for Rapid Development & Demonstration
export const db = {
  superAdmin: {
    totalRevenueMRR: 24780.00,
    activeAgencies: 42,
    totalManagedCompanies: 186,
    pendingInvoices: 3
  },
  plans: [
    { id: 'plan-starter', name: 'Starter', price: 197.00, maxCompanies: 3, autopilot: true, inboxAi: false, whiteLabel: false },
    { id: 'plan-pro', name: 'Agência Pro', price: 497.00, maxCompanies: 10, autopilot: true, inboxAi: true, whiteLabel: false },
    { id: 'plan-scale', name: 'Agência Scale & White-Label', price: 997.00, maxCompanies: 999, autopilot: true, inboxAi: true, whiteLabel: true }
  ],
  agencies: [
    {
      id: 'agency-1',
      name: 'Agência Alpha Digital',
      slug: 'alpha-digital',
      ownerName: 'Carlos Mendonça',
      email: 'carlos@alphadigital.com.br',
      planId: 'plan-pro',
      planName: 'Agência Pro',
      status: 'ACTIVE',
      monthlyPrice: 497.00,
      nextBillingDate: '2026-11-25',
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
      monthlyPrice: 997.00,
      nextBillingDate: '2026-12-02',
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
      monthlyPrice: 197.00,
      nextBillingDate: '2026-11-01',
      paymentMethod: 'Boleto (Atrasado)'
    }
  ],
  companies: [
    { id: 'comp-1', agencyId: 'agency-1', name: 'Moda Express Brasil (E-commerce)', niche: 'Moda Feminina', document: '42.981.234/0001-90' },
    { id: 'comp-2', agencyId: 'agency-1', name: 'Dr. Sorriso Odontologia', niche: 'Clínica & Saúde', document: '31.123.876/0001-12' },
    { id: 'comp-3', agencyId: 'agency-1', name: 'Imobiliária Prime SP', niche: 'Imóveis de Alto Padrão', document: '18.456.980/0001-44' }
  ],
  campaigns: [
    {
      id: 'camp-1',
      companyId: 'comp-1',
      platform: 'META',
      name: '[ESCALA] Vestidos Verão - Conversão Direta',
      status: 'ACTIVE',
      dailyBudget: 250.00,
      spendToday: 184.50,
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
      dailyBudget: 120.00,
      spendToday: 89.10,
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
      dailyBudget: 150.00,
      spendToday: 145.00,
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
      platform: 'META',
      name: '[WHATSAPP] Atendimento VIP Promoção Frete Grátis',
      status: 'ACTIVE',
      dailyBudget: 80.00,
      spendToday: 55.00,
      impressions: 4300,
      clicks: 140,
      conversions: 24, // Leads de WhatsApp
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
      dailyBudget: 50.00,
      spendToday: 48.00,
      impressions: 2100,
      clicks: 35,
      conversions: 0,
      cpa: 0.0,
      roas: 0.0,
      autopilotStatus: 'Pausado por Stop-Loss (Gasto sem conversão)'
    }
  ],
  automationRules: [
    {
      id: 'rule-1',
      companyId: 'comp-1',
      name: '🛡️ Stop-Loss: Pausar Anúncio se gastar R$ 40 sem venda',
      type: 'STOP_LOSS_SPEND',
      conditionField: 'spendToday',
      operator: 'GREATER_THAN',
      thresholdValue: 40.00,
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
  ],
  conversations: [
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
  ],
  messages: {
    'conv-1': [
      { id: 'm-1', senderType: 'CUSTOMER', text: 'Oi! Vi o anúncio no Insta com frete grátis!', time: '12:12' },
      { id: 'm-2', senderType: 'AI_BOT', text: 'Olá Juliana! Seja super bem-vinda à Moda Express! Sim, temos frete grátis para pedidos acima de R$ 150 hoje. Como posso te ajudar?', time: '12:12' },
      { id: 'm-3', senderType: 'CUSTOMER', text: 'Queria saber se tem o vestido vermelho no tamanho M?', time: '12:14' }
    ]
  }
};

// -------------------------------------------------------------
// ROTAS DO SUPER ADMIN (Você: Gestão de Agências e Assinaturas)
// -------------------------------------------------------------

// Visão Geral de Faturamento do SaaS
app.get('/api/admin/metrics', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: db.superAdmin,
    plans: db.plans,
    agencies: db.agencies
  });
});

// Alterar Status da Agência (Bloquear / Desbloquear / Cancelar)
app.patch('/api/admin/agencies/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const agency = db.agencies.find(a => a.id === id);
  if (!agency) return res.status(404).json({ error: 'Agência não encontrada' });
  agency.status = status;
  res.json({ success: true, message: `Status da agência atualizado para ${status}`, agency });
});

// -------------------------------------------------------------
// ROTAS DA AGÊNCIA (Seletor de Empresas, Campanhas, Métricas)
// -------------------------------------------------------------

// Listar empresas da Agência
app.get('/api/companies', (req: Request, res: Response) => {
  res.json({ success: true, companies: db.companies });
});

// Métricas Consolidadas de Tráfego Pago
app.get('/api/metrics/:companyId', (req: Request, res: Response) => {
  const { companyId } = req.params;
  const companyCampaigns = db.campaigns.filter(c => c.companyId === companyId);

  const totalSpend = companyCampaigns.reduce((acc, c) => acc + c.spendToday, 0);
  const totalConversions = companyCampaigns.reduce((acc, c) => acc + c.conversions, 0);
  const totalClicks = companyCampaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalImpressions = companyCampaigns.reduce((acc, c) => acc + c.impressions, 0);
  const avgCpa = totalConversions > 0 ? totalSpend / totalConversions : 0;
  
  // ROAS médio ponderado
  const totalRevenue = companyCampaigns.reduce((acc, c) => acc + (c.spendToday * c.roas), 0);
  const overallRoas = totalSpend > 0 ? (totalRevenue / totalSpend) : 0;

  res.json({
    success: true,
    summary: {
      totalSpend: Number(totalSpend.toFixed(2)),
      totalRevenue: Number(totalRevenue.toFixed(2)),
      overallRoas: Number(overallRoas.toFixed(2)),
      avgCpa: Number(avgCpa.toFixed(2)),
      totalConversions,
      totalClicks,
      totalImpressions,
      activeCampaignsCount: companyCampaigns.filter(c => c.status === 'ACTIVE').length
    },
    platformBreakdown: {
      meta: {
        spend: companyCampaigns.filter(c => c.platform === 'META').reduce((a, b) => a + b.spendToday, 0),
        conversions: companyCampaigns.filter(c => c.platform === 'META').reduce((a, b) => a + b.conversions, 0)
      },
      tiktok: {
        spend: companyCampaigns.filter(c => c.platform === 'TIKTOK').reduce((a, b) => a + b.spendToday, 0),
        conversions: companyCampaigns.filter(c => c.platform === 'TIKTOK').reduce((a, b) => a + b.conversions, 0)
      },
      google: {
        spend: companyCampaigns.filter(c => c.platform === 'GOOGLE').reduce((a, b) => a + b.spendToday, 0),
        conversions: companyCampaigns.filter(c => c.platform === 'GOOGLE').reduce((a, b) => a + b.conversions, 0)
      }
    }
  });
});

// Listar Campanhas
app.get('/api/campaigns/:companyId', (req: Request, res: Response) => {
  const { companyId } = req.params;
  const list = db.campaigns.filter(c => c.companyId === companyId);
  res.json({ success: true, campaigns: list });
});

// Pausar / Ativar Campanha
app.patch('/api/campaigns/:id/toggle', (req: Request, res: Response) => {
  const { id } = req.params;
  const campaign = db.campaigns.find(c => c.id === id);
  if (!campaign) return res.status(404).json({ error: 'Campanha não encontrada' });
  
  campaign.status = campaign.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
  res.json({ success: true, message: `Campanha alterada para ${campaign.status}`, campaign });
});

// Ajustar Orçamento Diário
app.patch('/api/campaigns/:id/budget', (req: Request, res: Response) => {
  const { id } = req.params;
  const { dailyBudget } = req.body;
  const campaign = db.campaigns.find(c => c.id === id);
  if (!campaign) return res.status(404).json({ error: 'Campanha não encontrada' });
  
  campaign.dailyBudget = Number(dailyBudget);
  res.json({ success: true, message: 'Orçamento atualizado com sucesso', campaign });
});

// -------------------------------------------------------------
// PILOTO AUTOMÁTICO (Regras Inteligentes)
// -------------------------------------------------------------

app.get('/api/automations/:companyId', (req: Request, res: Response) => {
  const { companyId } = req.params;
  const rules = db.automationRules.filter(r => r.companyId === companyId);
  res.json({ success: true, rules });
});

app.post('/api/automations', (req: Request, res: Response) => {
  const newRule = {
    id: `rule-${Date.now()}`,
    ...req.body,
    isActive: true,
    lastTriggered: 'Recém criada'
  };
  db.automationRules.push(newRule);
  res.json({ success: true, rule: newRule });
});

app.patch('/api/automations/:id/toggle', (req: Request, res: Response) => {
  const { id } = req.params;
  const rule = db.automationRules.find(r => r.id === id);
  if (!rule) return res.status(404).json({ error: 'Regra não encontrada' });
  rule.isActive = !rule.isActive;
  res.json({ success: true, rule });
});

// -------------------------------------------------------------
// CAIXA DE ENTRADA & AUTOATENDIMENTO (WhatsApp, Instagram, TikTok)
// -------------------------------------------------------------

app.get('/api/inbox/:companyId/conversations', (req: Request, res: Response) => {
  const { companyId } = req.params;
  const conversations = db.conversations.filter(c => c.companyId === companyId);
  res.json({ success: true, conversations });
});

app.get('/api/inbox/conversations/:id/messages', (req: Request, res: Response) => {
  const { id } = req.params;
  const messages = (db.messages as any)[id] || [];
  res.json({ success: true, messages });
});

// Enviar Mensagem (Humano ou Simulação de IA)
app.post('/api/inbox/conversations/:id/messages', (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, senderType = 'AGENT' } = req.body;

  if (!(db.messages as any)[id]) {
    (db.messages as any)[id] = [];
  }

  const newMessage = {
    id: `m-${Date.now()}`,
    senderType,
    text,
    time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  };

  (db.messages as any)[id].push(newMessage);

  // Se o usuário humano respondeu, atualiza a última mensagem na conversa
  const conv = db.conversations.find(c => c.id === id);
  if (conv) {
    conv.lastMessage = text;
    conv.unreadCount = 0;
  }

  res.json({ success: true, message: newMessage });
});

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    system: 'Plataforma Tráfego Pago & Atendimento Multicanal',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`🚀 Backend da Plataforma de Tráfego Pago rodando na porta ${port}`);
});

