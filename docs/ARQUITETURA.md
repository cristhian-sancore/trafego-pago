# NexusAds | Arquitetura Multi-Tenant & Manual do Sistema

## 1. Visão Geral do Modelo de Negócios (SaaS de Revenda)
A plataforma foi desenhada no modelo **Multi-Tenant B2B**:
- **Super Admin (Você - Proprietário do SaaS)**:
  - Controle de faturamento recorrente (MRR).
  - Gestão de planos (Starter, Pro, Agency Scale).
  - Painel de liberação ou bloqueio imediato de acesso para agências inadimplentes.
- **Agência / Assinante (Seu Cliente que Paga Mensalidade)**:
  - Pode gerenciar múltiplas empresas clientes (ex: Loja de Roupas, Clínica, Imobiliária) através do seletor rápido no topo da tela.
  - Cada empresa cliente tem suas contas de anúncio, regras de piloto automático e caixa de entrada 100% isoladas.
- **Cliente da Agência (Opcional - White Label)**:
  - A agência pode fornecer um link com a própria logomarca para o cliente final apenas visualizar os relatórios e métricas consolidadas.

---

## 2. Piloto Automático (Stop-Loss & Auto-Scale)
O piloto automático monitora as campanhas continuamente através de um worker em segundo plano:
- **Stop-Loss por Gasto**: Se um anúncio gastar R$ 40,00 sem gerar nenhuma conversão, o robô pausa o anúncio e registra o log.
- **Auto-Scale por ROAS**: Se o ROAS for superior a 4.0x com volume de conversões, o robô incrementa o orçamento diário em 15%.
- **Alerta de Fadiga**: Quando a frequência de exibição do anúncio atinge níveis elevados (saturação do criativo), o sistema avisa o gestor para renovar os vídeos/imagens.

---

## 3. Caixa de Entrada Unificada (Inbox Multicanal com IA)
- Centraliza conversas originadas dos anúncios de:
  - **WhatsApp** (Click-to-WhatsApp)
  - **Instagram Direct** (Anúncios do Feed e Stories)
  - **TikTok DMs** (Spark Ads)
- Permite tanto o atendimento humano direto pelo painel quanto o **acionamento de robô com IA** treinado para responder dúvidas, tirar objeções e enviar links de checkout com cupons de desconto.

---

## 4. Deploy no Portainer via API
O sistema já conta com `docker-compose.yml` e Dockerfiles otimizados:
- PostgreSQL 16 para persistência multi-tenant.
- Redis 7 para filas de processamento do piloto automático e cache.
- Backend Node.js / TypeScript com Prisma.
- Frontend React / Vite / Tailwind com Nginx Alpine de alta performance.


## 5. Tutorial de Integração com Facebook (Meta)
Para configurar e usar o login com Facebook, consulte o tutorial completo em [FACEBOOK_LOGIN_TUTORIAL.md](docs/FACEBOOK_LOGIN_TUTORIAL.md).
