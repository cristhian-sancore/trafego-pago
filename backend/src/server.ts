import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const EVOLUTION_URL = process.env.EVOLUTION_API_URL || 'http://evolution_api:8080';
const EVOLUTION_KEY = process.env.EVOLUTION_API_KEY || '87a0a57f642e31a529b0a0a2764f8a41';

// Base de Dados do Sistema
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
    }
  ],
  companies: [
    {
      id: 'comp-1',
      agencyId: 'agency-1',
      name: 'Moda Express Brasil (E-commerce)',
      niche: 'Moda Feminina',
      document: '42.981.234/0001-90',
      monthlyBudgetLimit: 15000,
      evolutionInstance: 'meu',
      whatsappContact: '+55 (65) 9677-2226',
      aiPrompt: 'Você é a Sofia, consultora de vendas da Moda Express Brasil. Responda educadamente sobre produtos, tamanhos, prazo de entrega e ofereça cupom FRETEGRATIS.',
      aiAutoReply: true
    },
    {
      id: 'comp-2',
      agencyId: 'agency-1',
      name: 'Dr. Sorriso Odontologia Integrada',
      niche: 'Clínica & Odonto',
      document: '31.123.876/0001-12',
      monthlyBudgetLimit: 8000,
      evolutionInstance: 'teste',
      whatsappContact: '+55 (11) 98888-7777',
      aiPrompt: 'Você é a atendente virtual da Dra. Sorriso. Agende consultas de avaliação de implantes e clareamento dental.',
      aiAutoReply: true
    },
    {
      id: 'comp-3',
      agencyId: 'agency-1',
      name: 'Imobiliária Prime SP & Alphaville',
      niche: 'Imóveis de Alto Padrão',
      document: '18.456.980/0001-44',
      monthlyBudgetLimit: 25000,
      evolutionInstance: 'meu',
      whatsappContact: '+55 (11) 97777-6666',
      aiPrompt: 'Você é o consultor imobiliário Prime. Qualifique o cliente quanto a faixa de preço (acima de R$ 1.5M) e região desejada.',
      aiAutoReply: false
    }
  ],
  connections: [
    {
      id: 'conn-1',
      companyId: 'comp-1',
      platform: 'META',
      connected: true,
      accountName: 'Conta Meta Ads - Moda Express',
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
    }
  ],
  campaigns: [
    {
      id: 'camp-1',
      companyId: 'comp-1',
      platform: 'META',
      name: '[ESCALA] Vestidos Verão - Conversão Direta',
      objective: 'Vendas / Conversão',
      status: 'ACTIVE',
      dailyBudget: 250.00,
      spendToday: 184.50,
      impressions: 14200,
      clicks: 520,
      conversions: 18,
      cpa: 10.25,
      roas: 4.8,
      autopilotStatus: 'Otimizado (ROAS Alto)',
      adCopy: '✨ Nova coleção com 20% OFF e Frete Grátis acima de R$ 150!',
      targetUrl: 'https://modaexpress.com.br/verao'
    },
    {
      id: 'camp-2',
      companyId: 'comp-1',
      platform: 'TIKTOK',
      name: '[UGC] Vídeo Viral Provador - Spark Ads',
      objective: 'Engajamento & Tráfego',
      status: 'ACTIVE',
      dailyBudget: 120.00,
      spendToday: 89.10,
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
      dailyBudget: 150.00,
      spendToday: 145.00,
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
      platform: 'META',
      name: '[WHATSAPP] Atendimento VIP Promoção Frete Grátis',
      objective: 'Mensagens WhatsApp',
      status: 'ACTIVE',
      dailyBudget: 80.00,
      spendToday: 55.00,
      impressions: 4300,
      clicks: 140,
      conversions: 24,
      cpa: 2.29,
      roas: 0.0,
      autopilotStatus: 'Excelente Taxa de Lead',
      adCopy: 'Clique no botão e fale com nossas consultoras no WhatsApp!',
      targetUrl: 'https://wa.me/556596772226'
    },
    {
      id: 'camp-5',
      companyId: 'comp-2',
      platform: 'META',
      name: '[INSTAGRAM] Implantes Dentários sem Dor - Agendamento',
      objective: 'Mensagens WhatsApp',
      status: 'ACTIVE',
      dailyBudget: 100.00,
      spendToday: 78.40,
      impressions: 5600,
      clicks: 180,
      conversions: 15,
      cpa: 5.22,
      roas: 6.8,
      autopilotStatus: 'Alta Conversão de Agendamento',
      adCopy: 'Recupere seu sorriso com a equipe Dr. Sorriso. Avaliação gratuita.',
      targetUrl: 'https://wa.me/5511988887777'
    },
    {
      id: 'camp-6',
      companyId: 'comp-3',
      platform: 'GOOGLE',
      name: '[PESQUISA] Casas em Condomínio Alphaville SP',
      objective: 'Leads Qualificados',
      status: 'ACTIVE',
      dailyBudget: 350.00,
      spendToday: 210.00,
      impressions: 1800,
      clicks: 95,
      conversions: 4,
      cpa: 52.50,
      roas: 8.5,
      autopilotStatus: 'Lead de Alto Padrão',
      adCopy: 'Casas Novas Alphaville 4 a 6 Suítes. Veja Fotos e Agende Visita.',
      targetUrl: 'https://primeimoveis.com.br/alphaville'
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
      companyId: 'comp-2',
      name: '🛡️ Stop-Loss: Pausar se Custo por Mensagem > R$ 12',
      type: 'STOP_LOSS_CPA',
      conditionField: 'cpa',
      operator: 'GREATER_THAN',
      thresholdValue: 12.00,
      action: 'PAUSE_AD',
      actionValue: null,
      isActive: true,
      lastTriggered: 'Hoje às 09:20'
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
  ],
  messages: {
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
    ]
  }
};

// -------------------------------------------------------------
// ROTAS DE INTEGRAÇÃO COM EVOLUTION API (WHATSAPP REAL)
// -------------------------------------------------------------

// Listar Instâncias da Evolution API
app.get('/api/evolution/instances', async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${EVOLUTION_URL}/instance/fetchInstances`, {
      headers: { apikey: EVOLUTION_KEY }
    });
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erro ao consultar Evolution API', details: await response.text() });
    }
    const data = await response.json();
    res.json({ success: true, instances: data });
  } catch (err: any) {
    res.status(500).json({ error: 'Falha ao conectar com a Evolution API', details: err.message });
  }
});

// Criar Nova Instância na Evolution API
app.post('/api/evolution/create-instance', async (req: Request, res: Response) => {
  try {
    const { instanceName } = req.body;
    if (!instanceName) return res.status(400).json({ error: 'instanceName é obrigatório' });

    const response = await fetch(`${EVOLUTION_URL}/instance/create`, {
      method: 'POST',
      headers: {
        apikey: EVOLUTION_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        instanceName,
        qrcode: true,
        integration: 'WHATSAPP-BAILEYS'
      })
    });
    const data = await response.json();
    res.json({ success: true, result: data });
  } catch (err: any) {
    res.status(500).json({ error: 'Falha ao criar instância na Evolution API', details: err.message });
  }
});

// Obter QR Code ou Status de Conexão da Instância
app.get('/api/evolution/connect/:instance', async (req: Request, res: Response) => {
  try {
    const { instance } = req.params;
    const response = await fetch(`${EVOLUTION_URL}/instance/connect/${instance}`, {
      headers: { apikey: EVOLUTION_KEY }
    });
    const data = await response.json();
    res.json({ success: true, connection: data });
  } catch (err: any) {
    res.status(500).json({ error: 'Falha ao obter QR code da instância', details: err.message });
  }
});

// Enviar Mensagem Real de WhatsApp via Evolution API
app.post('/api/evolution/send-message', async (req: Request, res: Response) => {
  try {
    const { instance, number, text } = req.body;
    if (!instance || !number || !text) {
      return res.status(400).json({ error: 'Campos instance, number e text são obrigatórios' });
    }

    const cleanNumber = number.replace(/\D/g, '');
    const response = await fetch(`${EVOLUTION_URL}/message/sendText/${instance}`, {
      method: 'POST',
      headers: {
        apikey: EVOLUTION_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        number: cleanNumber,
        options: { delay: 1200, presence: 'composing' },
        textMessage: { text }
      })
    });

    const data = await response.json();
    res.json({ success: true, result: data });
  } catch (err: any) {
    res.status(500).json({ error: 'Erro ao enviar mensagem via Evolution API', details: err.message });
  }
});

// -------------------------------------------------------------
// ROTAS DE GESTÃO DE EMPRESAS / CLIENTES DA AGÊNCIA
// -------------------------------------------------------------

// Listar Empresas
app.get('/api/companies', (req: Request, res: Response) => {
  res.json({ success: true, companies: db.companies });
});

// Cadastrar Nova Empresa / Cliente
app.post('/api/companies', (req: Request, res: Response) => {
  const { name, niche, document, monthlyBudgetLimit, evolutionInstance, whatsappContact, aiPrompt } = req.body;
  if (!name) return res.status(400).json({ error: 'Nome da empresa é obrigatório' });

  const newCompany = {
    id: `comp-${Date.now()}`,
    agencyId: 'agency-1',
    name,
    niche: niche || 'Geral',
    document: document || '',
    monthlyBudgetLimit: Number(monthlyBudgetLimit) || 5000,
    evolutionInstance: evolutionInstance || 'meu',
    whatsappContact: whatsappContact || '',
    aiPrompt: aiPrompt || 'Você é o assistente virtual da empresa. Responda educadamente e ajude o cliente com informações sobre os produtos/serviços.',
    aiAutoReply: true
  };

  db.companies.push(newCompany);
  res.status(201).json({ success: true, company: newCompany });
});

// Atualizar Configuração de IA e Evolution da Empresa
app.patch('/api/companies/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const company = db.companies.find(c => c.id === id);
  if (!company) return res.status(404).json({ error: 'Empresa não encontrada' });

  Object.assign(company, req.body);
  res.json({ success: true, company });
});

// -------------------------------------------------------------
// CONEXÕES COM REDES SOCIAIS (Meta, Google, TikTok, etc.)
// -------------------------------------------------------------

app.get('/api/connections/:companyId', (req: Request, res: Response) => {
  const { companyId } = req.params;
  const list = db.connections.filter(c => c.companyId === companyId);
  res.json({ success: true, connections: list });
});

app.post('/api/connections', (req: Request, res: Response) => {
  const { companyId, platform, accountName, accountId, pixelOrTagId } = req.body;
  const existing = db.connections.find(c => c.companyId === companyId && c.platform === platform);

  if (existing) {
    existing.connected = true;
    existing.accountName = accountName || existing.accountName;
    existing.accountId = accountId || existing.accountId;
    existing.pixelOrTagId = pixelOrTagId || existing.pixelOrTagId;
    existing.updatedAt = 'Agora';
    return res.json({ success: true, connection: existing });
  }

  const newConn = {
    id: `conn-${Date.now()}`,
    companyId,
    platform,
    connected: true,
    accountName: accountName || `Conta ${platform}`,
    accountId: accountId || 'act_' + Math.floor(Math.random() * 100000000),
    pixelOrTagId: pixelOrTagId || 'pix_' + Math.floor(Math.random() * 100000000),
    updatedAt: 'Agora'
  };

  db.connections.push(newConn);
  res.json({ success: true, connection: newConn });
});

app.patch('/api/connections/:id/toggle', (req: Request, res: Response) => {
  const { id } = req.params;
  const conn = db.connections.find(c => c.id === id);
  if (!conn) return res.status(404).json({ error: 'Conexão não encontrada' });
  conn.connected = !conn.connected;
  conn.updatedAt = 'Agora';
  res.json({ success: true, connection: conn });
});

// -------------------------------------------------------------
// CAMPANHAS & ANÚNCIOS (Criação, Edição, Pausa)
// -------------------------------------------------------------

app.get('/api/campaigns/:companyId', (req: Request, res: Response) => {
  const { companyId } = req.params;
  const list = db.campaigns.filter(c => c.companyId === companyId);
  res.json({ success: true, campaigns: list });
});

app.post('/api/campaigns', (req: Request, res: Response) => {
  const { companyId, platform, name, objective, dailyBudget, adCopy, targetUrl } = req.body;
  if (!name || !companyId) return res.status(400).json({ error: 'Nome e empresa são obrigatórios' });

  const newCampaign = {
    id: `camp-${Date.now()}`,
    companyId,
    platform: platform || 'META',
    name,
    objective: objective || 'Conversão / Vendas',
    status: 'ACTIVE' as const,
    dailyBudget: Number(dailyBudget) || 100,
    spendToday: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    cpa: 0,
    roas: 0,
    autopilotStatus: 'Ativo e Monitorando',
    adCopy: adCopy || '',
    targetUrl: targetUrl || ''
  };

  db.campaigns.push(newCampaign);
  res.status(201).json({ success: true, campaign: newCampaign });
});

app.patch('/api/campaigns/:id/toggle', (req: Request, res: Response) => {
  const { id } = req.params;
  const campaign = db.campaigns.find(c => c.id === id);
  if (!campaign) return res.status(404).json({ error: 'Campanha não encontrada' });
  campaign.status = campaign.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
  res.json({ success: true, campaign });
});

// -------------------------------------------------------------
// PILOTO AUTOMÁTICO (Regras)
// -------------------------------------------------------------

app.get('/api/automations/:companyId', (req: Request, res: Response) => {
  const { companyId } = req.params;
  const rules = db.automationRules.filter(r => r.companyId === companyId);
  res.json({ success: true, rules });
});

app.post('/api/automations', (req: Request, res: Response) => {
  const { companyId, name, type, conditionField, operator, thresholdValue, action, actionValue } = req.body;
  if (!name || !companyId) return res.status(400).json({ error: 'Nome e empresa são obrigatórios' });

  const newRule = {
    id: `rule-${Date.now()}`,
    companyId,
    name,
    type: type || 'STOP_LOSS_SPEND',
    conditionField: conditionField || 'spendToday',
    operator: operator || 'GREATER_THAN',
    thresholdValue: Number(thresholdValue) || 50,
    action: action || 'PAUSE_AD',
    actionValue: actionValue ? Number(actionValue) : null,
    isActive: true,
    lastTriggered: 'Recém criada'
  };

  db.automationRules.push(newRule);
  res.status(201).json({ success: true, rule: newRule });
});

app.patch('/api/automations/:id/toggle', (req: Request, res: Response) => {
  const { id } = req.params;
  const rule = db.automationRules.find(r => r.id === id);
  if (!rule) return res.status(404).json({ error: 'Regra não encontrada' });
  rule.isActive = !rule.isActive;
  res.json({ success: true, rule });
});

// -------------------------------------------------------------
// CAIXA DE ENTRADA & AUTOATENDIMENTO (Filtrado por Empresa)
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

app.post('/api/inbox/conversations/:id/messages', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, senderType = 'AGENT', sendRealWhatsApp = false } = req.body;

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

  const conv = db.conversations.find(c => c.id === id);
  if (conv) {
    conv.lastMessage = text;
    conv.unreadCount = 0;

    // Se solicitado e houver telefone e for canal WhatsApp, dispara via Evolution API
    if (sendRealWhatsApp && conv.contactPhone && conv.channel === 'WHATSAPP') {
      try {
        const comp = db.companies.find(cp => cp.id === conv.companyId);
        const inst = comp?.evolutionInstance || 'meu';
        const cleanNumber = conv.contactPhone.replace(/\D/g, '');
        await fetch(`${EVOLUTION_URL}/message/sendText/${inst}`, {
          method: 'POST',
          headers: {
            apikey: EVOLUTION_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            number: cleanNumber,
            options: { delay: 1000 },
            textMessage: { text }
          })
        });
      } catch (e) {
        console.error('Falha ao enviar via Evolution API no background:', e);
      }
    }
  }

  res.json({ success: true, message: newMessage });
});

// Métricas do Super Admin
app.get('/api/admin/metrics', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: db.superAdmin,
    plans: db.plans,
    agencies: db.agencies
  });
});

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    system: 'Plataforma Tráfego Pago & Atendimento Multicanal',
    version: '1.1.0',
    evolutionConnected: true,
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`🚀 Backend da Plataforma de Tráfego Pago rodando na porta ${port}`);
});
