# Decisões

Registro de decisões técnicas já materializadas no código.

## DEC-001 - Next.js App Router com conteúdo versionado no repositório

- Status: Aceita
- Contexto: o projeto precisa publicar páginas institucionais, blog e jornadas de contato com deploy simples na Vercel.
- Decisão: usar Next.js 16 com App Router, TypeScript estrito e conteúdo estático em `src/data/*`.
- Consequências: páginas e blog podem ser gerados a partir do código; mudanças editoriais passam por revisão de repositório.
- Referências: `package.json`, `src/app/`, `src/data/`.

## DEC-002 - Centralizar contato e simulação na rota `/contato`

- Status: Aceita
- Contexto: o site atende dois públicos com necessidades diferentes: cliente já ativo e lead de simulação.
- Decisão: manter a experiência principal em `/contato`, com seleção de painel por `modo=cliente` ou `modo=simulacao`, e fazer `/simule-seu-caso` redirecionar permanentemente para essa rota.
- Consequências: a navegação e as CTAs convergem para um único ponto de entrada; regras de jornada ficam concentradas em `ContatoExperience`.
- Referências: `src/app/contato/page.tsx`, `src/app/simule-seu-caso/page.tsx`, `src/components/contact/ContatoExperience.tsx`.

## DEC-003 - Blog estático com slugs canônicos e suporte a slugs legados

- Status: Aceita
- Contexto: o blog precisa ser rápido, indexável e manter compatibilidade com URLs antigas.
- Decisão: armazenar posts em `src/data/blog/post-*.ts`, gerar params estaticamente e redirecionar slugs legados para o slug canônico.
- Consequências: o conteúdo continua acoplado ao deploy, mas a performance e o controle editorial ficam previsíveis.
- Referências: `src/data/blog/posts.ts`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`.

## DEC-004 - Tracking Wolfgang mediado por rota interna

- Status: Aceita
- Contexto: a simulação precisa registrar atribuição de mídia e encaminhar tracking sem expor diretamente a integração externa ao cliente.
- Decisão: persistir UTM/fbclid no navegador, disparar Meta Pixel no cliente e encaminhar o payload final via `/api/tracking/wolfgang`.
- Consequências: a integração externa fica centralizada no servidor e validada com Zod; falhas de tracking não devem interromper o sucesso da simulação no front-end.
- Referências: `src/lib/wolfgang-tracking.ts`, `src/components/analytics/AttributionPersistence.tsx`, `src/app/api/tracking/wolfgang/route.ts`.
