# Tutorial: Login com Facebook (Meta) no Painel de Tráfego Pago

Este documento descreve, passo a passo, como **configurar** a integração com a API do Facebook (Meta) e como **o usuário final** realiza o login de forma simples, sem precisar inserir credenciais manualmente.

---
## 1. Pré‑requisitos
- Conta de **Administrador** no painel (SUPER_ADMIN).
- Aplicação Meta criada no [Meta for Developers](https://developers.facebook.com/).
- **App ID** e **App Secret** da aplicação Meta.
- O backend já está configurado para ler as credenciais a partir do diretório oculto `.acesso/` (não versionado).

---
## 2. Configuração no Painel (Admin)
1. Acesse o painel e faça login como **SUPER_ADMIN**.
2. No menu lateral, selecione **Configurações → APIs**.
3. Na seção **Meta (Facebook) Ads**, preencha os campos:
   - **App ID**
   - **App Secret**
4. Clique em **Salvar**.
5. O sistema validará as credenciais e, se tudo estiver correto, exibirá a mensagem:
   > "API do META configurada com sucesso."
6. Após salvar, o botão **"Entrar com Facebook"** passa a ficar ativo nos cards de conexão dos clientes.

> **Importante:** As credenciais são gravadas em `/.acesso/api_config.json` e **não** são versionadas nem enviadas ao GitHub.

---
## 3. Fluxo do usuário final (Cliente)
1. O cliente abre o painel (não precisa de permissões de API).
2. No card da plataforma **Facebook**, o botão **Entrar com Facebook** está disponível.
3. Ao clicar, o usuário será redirecionado para a tela de **OAuth** da Meta.
4. O usuário autoriza as permissões solicitadas (geralmente **ads_read**, **ads_management**).
5. Após a autorização, a aplicação recebe o **access token**, cria a conexão automaticamente e exibe a mensagem:
   > "Conexão com Facebook criada com sucesso."
6. O cliente pode agora visualizar campanhas, métricas e gerenciar anúncios diretamente no painel.

---
## 4. Estado da UI
- **Sem credenciais configuradas:**
  - Card exibe alerta **"API do META não configurada"** e botão **"Configurar no Painel Admin"** (visível apenas para super‑admin).
- **Com credenciais configuradas:**
  - Card mostra botão **"Entrar com Facebook"** para todos os usuários.

---
## 5. Troubleshooting
| Problema | Causa provável | Como resolver |
|----------|----------------|---------------|
| 400 Bad Request ao solicitar URL de OAuth | Credenciais META não configuradas ou inválidas | Verifique `/.acesso/api_config.json`. Re‑insira App ID/Secret corretos via painel Admin e salve. |
| Usuário não vê o botão "Entrar com Facebook" | Cache do frontend desatualizado | Atualize a página ou execute `npm run build` no frontend e redeploy. |
| Erro de token expirado | Token expirado na Meta | O cliente deve refazer o login; o fluxo OAuth gera um novo token. |

---
## 6. Capturas de tela
![Tela de Configuração da API Meta no Painel Admin](/C:/Users/MEU/.gemini/antigravity/brain/4bffb63f-cdbc-47d8-949d-544a399fc7b1/.user_uploaded/media_1793825579198_2c0d919e.jpg)

---
## 7. Próximos passos
- Replicar documentação similar para **Google Ads** e **TikTok Ads**.
- Implementar testes automatizados para o endpoint `/api/oauth/meta/url`.

---
*Este tutorial foi gerado automaticamente pelo assistente de desenvolvimento. Para dúvidas, contate o suporte interno.*
