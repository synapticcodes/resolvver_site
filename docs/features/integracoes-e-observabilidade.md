# Funcionalidades: integracoes-e-observabilidade

Documentação viva das integrações técnicas e capacidades transversais do site.

## FEAT-001 - Captura de lead genérico por email

- Status: Ativa
- Propósito: receber formulários genéricos de lead e encaminhá-los por email para o canal operacional configurado.
- Fluxo principal: `LeadForm` valida os campos no cliente, envia para `/api/lead`, a rota valida novamente e usa Nodemailer para disparar o email.
- Regras de negócio:
  - RN-01: nome e email são obrigatórios; mensagem é opcional e limitada; consentimento precisa ser `true`.
  - RN-02: o campo `website` funciona como honeypot e deve permanecer vazio.
  - RN-03: a rota só aceita origens da allowlist e aplica rate limit de 5 requisições por 10 minutos.
  - RN-04: a entrega do email depende de `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` e `LEAD_EMAIL_TO`.
- Fluxos alternativos e edge cases:
  - JSON inválido ou payload malformado retornam 400.
  - Falha de SMTP retorna 500 e não expõe detalhes sensíveis ao cliente.
- Integrações e dependências:
  - `src/components/forms/LeadForm.tsx`
  - `src/app/api/lead/route.ts`
  - `src/lib/email.ts`
  - `src/lib/validation.ts`
- Validações e restrições:
  - O runtime da rota é `nodejs`.
  - O HTML do email escapa valores do usuário antes de interpolar no template.
- Referências de implementação:
  - `src/types/lead.ts`
  - `README.md`
- TODOs para confirmar com o usuário:
  - Confirmar onde esse formulário genérico ainda está ativo na experiência pública.

## FEAT-002 - Tracking Wolfgang e persistência de atribuição

- Status: Ativa
- Propósito: preservar origem de mídia, disparar eventos compatíveis com Meta Pixel e encaminhar tracking de simulação para o endpoint externo.
- Fluxo principal: `AttributionPersistence` guarda UTM/fbclid na entrada do site; após sucesso da simulação, o front monta o payload, dispara eventos Meta e envia para `/api/tracking/wolfgang`.
- Regras de negócio:
  - RN-01: o envio do tracking só acontece depois de a simulação ser confirmada com sucesso.
  - RN-02: `fbp` é gerado localmente quando ausente; `fbc` depende de `fbclid` em querystring ou storage.
  - RN-03: o `source` fixo do payload é `site_resolvver_contato_simulacao`.
  - RN-04: a rota interna exige `WOLFGANG_TRACK_URL`; sem essa variável, responde 503.
- Fluxos alternativos e edge cases:
  - Falhas de tracking no cliente são registradas no console e não revertem a confirmação da simulação.
  - Se o upstream externo responder erro, a rota devolve 502 ao chamador interno.
- Integrações e dependências:
  - `src/components/analytics/AttributionPersistence.tsx`
  - `src/lib/wolfgang-tracking.ts`
  - `src/app/api/tracking/wolfgang/route.ts`
- Validações e restrições:
  - O Meta Pixel só é inicializado quando `NEXT_PUBLIC_WOLFGANG_META_PIXEL_ID` está presente.
  - O payload do proxy é validado com Zod antes do encaminhamento externo.
- Referências de implementação:
  - `src/app/api/tracking/wolfgang/route.ts`
  - `src/components/contact/ContatoExperience.tsx`
- TODOs para confirmar com o usuário:
  - Confirmar se há outros eventos de mídia além de `Lead` e `PreencheuFormulario` que precisam ser suportados.

## FEAT-003 - SEO técnico e descoberta

- Status: Ativa
- Propósito: garantir indexação básica, compartilhamento social e consistência de URLs públicas.
- Fluxo principal: o layout global define metadata base; páginas usam `buildPageMetadata` ou metadata própria; `robots.ts` e `sitemap.ts` expõem regras de descoberta.
- Regras de negócio:
  - RN-01: `/api/*` deve ficar bloqueado em `robots`.
  - RN-02: o sitemap inclui páginas estáticas principais e todos os posts do blog.
  - RN-03: a data de `siteConfig.lastUpdated` influencia o `lastModified` das páginas estáticas.
- Fluxos alternativos e edge cases:
  - URLs filtradas do blog geram canonical específico apenas quando a categoria é válida.
- Integrações e dependências:
  - `src/app/layout.tsx`
  - `src/lib/metadata.ts`
  - `src/app/robots.ts`
  - `src/app/sitemap.ts`
  - `src/config/site.ts`
- Validações e restrições:
  - Mudanças em rotas públicas exigem revisão manual do sitemap e da navegação.
- Referências de implementação:
  - `src/app/blog/page.tsx`
  - `src/app/blog/[slug]/page.tsx`
- TODOs para confirmar com o usuário:
  - Confirmar a política desejada para indexação de páginas legais no sitemap.
