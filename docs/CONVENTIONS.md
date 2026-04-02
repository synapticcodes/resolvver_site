# Convenções

## Linguagem e stack

- Linguagem principal: TypeScript em modo estrito.
- Framework principal: Next.js 16 com App Router.
- Estilo: Tailwind CSS com composição em componentes React.
- Validação: Zod para payloads de formulário e rotas API.
- Integrações ativas no código: Nodemailer, Sentry, Google Analytics, Microsoft Clarity e tracking Wolfgang.

## Nomenclatura

- Preserve nomes de rotas e conteúdo de domínio em português quando já refletirem a experiência do usuário, como `simule-seu-caso`, `faixa_divida` e `clientesMockados`.
- Mantenha helpers utilitários e metadados compartilhados em módulos curtos e reutilizáveis, como `buildPageMetadata`, `siteConfig` e schemas em `src/lib/validation.ts`.
- Tipos ficam em `src/types/*`; conteúdo estático e catálogos ficam em `src/data/*`.

## Organização de código

- `src/app/*`: páginas, metadata, sitemap, robots e rotas API.
- `src/components/ui/*`: primitivas reaproveitáveis de interface.
- `src/components/<feature>/*`: composição visual e comportamental por área do site.
- `src/data/*`: textos, listas, posts e demais dados versionados.
- `src/lib/*`: validação, email, metadata e integrações utilitárias.
- `src/config/site.ts`: dados globais da marca, navegação, contato e analytics.

## Formulários e APIs

- Valide no cliente e no servidor sempre que houver schema correspondente em `src/lib/validation.ts`.
- Preserve mensagens de erro em pt-BR e respostas JSON consistentes com `success`/`message` ou `error`, conforme o contrato existente.
- Antes de alterar rotas API, considere a allowlist de origem e o rate limit em memória já implementados.
- Não remova o campo honeypot `website` do lead genérico sem substituir a proteção anti-spam.
- Se houver integração com Supabase, trate-o apenas como fonte de leitura; este repositório não deve criar, atualizar ou excluir dados lá.

## Conteúdo, SEO e tracking

- Metadados de páginas institucionais devem preferir `buildPageMetadata`.
- Posts do blog são definidos por arquivos TypeScript; mudanças de slug precisam considerar `legacySlugs`.
- O tracking Wolfgang depende da persistência de UTM/fbclid no cliente e do proxy server-side; não mova a URL externa para o navegador.

## Testes e validação

- O projeto não possui suíte automatizada dedicada neste momento.
- A validação padrão antes de entregar mudanças é `npm run lint`, `npm run typecheck` e, quando a alteração afetar runtime ou SEO, `npm run build`.
- `npm run check` é o atalho mais completo documentado no repositório.
