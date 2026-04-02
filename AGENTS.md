# AGENTS.md

## Projeto

Este repositório contém o site institucional da Resolvver, com páginas de aquisição, blog estático, jornada de contato/simulação e rotas API para leads, busca de clientes e tracking.

## Como trabalhar

- Instalar dependências: `npm install`
- Rodar ambiente local: `npm run dev`
- Rodar lint: `npm run lint`
- Rodar typecheck: `npm run typecheck`
- Rodar validação completa: `npm run check`
- Rodar build/produção local: `npm run build` e `npm run start`

## Regras globais

- Preserve a estrutura do App Router e concentre conteúdo versionado em `src/data`.
- Reaproveite `src/lib/metadata.ts` e `src/config/site.ts` antes de criar metadados ou constantes duplicadas.
- Mudanças em formulários e rotas API devem manter validação com Zod, mensagens em pt-BR, verificação de origem e rate limit já existentes.
- O fluxo de tracking Wolfgang só deve acontecer após sucesso da simulação e depende de `WOLFGANG_TRACK_URL` e `NEXT_PUBLIC_WOLFGANG_META_PIXEL_ID`.
- Não trate `src/data/clientes.ts` como fonte real de produção; hoje a busca de cliente usa dados mockados.
- Não adicione, altere ou exclua dados no Supabase; qualquer uso de Supabase neste projeto deve ser somente leitura.

## Consultar quando necessário

- `docs/CONVENTIONS.md`: convenções de código, organização e validação
- `docs/CORRECTIONS.md`: armadilhas, bugs recorrentes e prevenções
- `docs/DECISIONS.md`: decisões técnicas já refletidas no código
- `docs/features/`: fluxos e regras por módulo
