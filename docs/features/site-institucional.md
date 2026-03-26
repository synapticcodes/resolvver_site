# Funcionalidades: site-institucional

Documentação viva das capacidades institucionais e de aquisição do site.

## FEAT-001 - Home de aquisição

- Status: Ativa
- Propósito: apresentar a proposta de valor da Resolvver e conduzir o usuário para a jornada de simulação.
- Fluxo principal: a rota `/` monta as seções Hero, Stats, HowItWorks, AppTracking, Benefits, Testimonials, MediaSection, PartnersGrid e Accreditations, nesta ordem.
- Regras de negócio:
  - RN-01: a home promove renegociação de dívidas com até 90% de desconto e suporte humano.
  - RN-02: os blocos visuais dependem de conteúdo versionado em `src/data/*` e assets em `public/images/*`.
  - RN-03: as CTAs principais apontam para a jornada de simulação.
- Fluxos alternativos e edge cases:
  - Quando textos, números ou mídia forem alterados, a consistência entre `src/data/*` e `siteConfig` precisa ser revisada manualmente.
- Integrações e dependências:
  - `src/app/page.tsx`
  - `src/components/home/*`
  - `src/data/home-content.ts`, `src/data/stats.ts`, `src/data/how-it-works.ts`, `src/data/benefits.ts`, `src/data/testimonials.ts`
- Validações e restrições:
  - O layout global injeta analytics e cabeçalho/rodapé para toda a experiência.
  - Metadata da página usa `buildPageMetadata`.
- Referências de implementação:
  - `src/app/page.tsx`
  - `src/app/layout.tsx`
  - `src/config/site.ts`
- TODOs para confirmar com o usuário:
  - Confirmar a fonte operacional dos números institucionais usados na home.

## FEAT-002 - Páginas institucionais, ajuda e legais

- Status: Ativa
- Propósito: sustentar confiança, explicar a empresa e responder dúvidas recorrentes fora da jornada de contato.
- Fluxo principal:
  - `/sobre` apresenta história, pilares e estatística institucional.
  - `/faq` expõe dúvidas frequentes em acordeão.
  - `/privacidade` e `/termos` dão suporte legal aos formulários e links de consentimento.
- Regras de negócio:
  - RN-01: as páginas institucionais reaproveitam o mesmo layout global e a mesma abordagem de metadata.
  - RN-02: a FAQ depende de itens estáticos em `src/data/faq.ts`.
  - RN-03: links para privacidade e termos são exigidos pelos formulários com consentimento.
- Fluxos alternativos e edge cases:
  - `/simule-seu-caso` não possui conteúdo próprio; ele só redireciona permanentemente para `/contato?modo=simulacao`.
- Integrações e dependências:
  - `src/app/sobre/page.tsx`
  - `src/app/faq/page.tsx`
  - `src/app/privacidade/page.tsx`
  - `src/app/termos/page.tsx`
  - `src/app/simule-seu-caso/page.tsx`
- Validações e restrições:
  - Alterações de URL precisam ser refletidas em sitemap, robots e navegação.
- Referências de implementação:
  - `src/data/about-content.ts`
  - `src/data/faq.ts`
  - `src/lib/metadata.ts`
  - `src/config/site.ts`
- TODOs para confirmar com o usuário:
  - Confirmar se o conteúdo das páginas legais já é a versão final aprovada pelo jurídico.
