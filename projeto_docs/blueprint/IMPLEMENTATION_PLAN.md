# Implementation Plan

> Observação: não há stack definida no material. Este plano assume um site de marketing com páginas estáticas + blog. Onde necessário, indicar decisões pendentes.

## Milestones

### M0 — Decisões de base (P0)
**Objetivo:** fechar stack, hospedagem, CMS (ou conteúdo estático) e destino do formulário.
- Entregáveis: decisões registradas em `DECISIONS.md`.

### M1 — Setup do projeto (P0)
**Objetivo:** criar projeto, pipeline de build e estrutura de páginas.
- Entregáveis: repo com estrutura inicial, layout base, rotas principais.

### M2 — Conteúdo institucional (P0)
**Objetivo:** implementar Home, Sobre e FAQ com conteúdo do docx.
- Entregáveis: páginas renderizadas, responsivas.

### M3 — Simulação + formulário (P0)
**Objetivo:** implementar página de simulação e integrações básicas.
- Entregáveis: formulário funcional, validações e entrega de leads.

### M4 — Blog (P1)
**Objetivo:** publicar index + 18 artigos.
- Entregáveis: listagem com categorias e páginas de detalhe.

### M5 — Ajustes finais (P1)
**Objetivo:** SEO, acessibilidade, performance e QA.
- Entregáveis: checklist de QA completo.

## Backlog Prioritizado

### P0 (crítico)
1) **Definir stack e CMS**
   - Objetivo: escolher tecnologia e formato de conteúdo (markdown/CMS).
   - Arquivos-alvo: `blueprint/DECISIONS.md` (registro da escolha).
   - DoD: stack escolhida + justificativa + impactos.
   - Risco: refazer páginas se stack mudar depois.

2) **Modelar conteúdo base (JSON/MD)**
   - Objetivo: estruturar dados de hero, stats, passos, depoimentos, FAQ, parceiros.
   - Arquivos-alvo: `content/` (a definir) ou CMS.
   - DoD: dados versionados e consumíveis pelo front-end.
   - Risco: ausência de metadados (datas, slugs).

3) **Implementar layout global (Header/Footer)**
   - Objetivo: navegação consistente e rodapé com links.
   - Arquivos-alvo: layout base (a definir).
   - DoD: navegação com rotas funcionando.
   - Risco: conteúdo “Contato/Termos/Privacidade” não definido.

4) **Home page**
   - Objetivo: entregar página principal com todas as seções.
   - Arquivos-alvo: `/`.
   - DoD: hero, stats, passos, app, benefícios, depoimentos, mídia, parceiros, acreditações.
   - Risco: falta de mapeamento dos logos por seção.

5) **Sobre**
   - Objetivo: página institucional com texto e blocos (Tecnologia, Equipe, Segurança, Acompanhamento).
   - Arquivos-alvo: `/sobre`.
   - DoD: conteúdo completo do docx renderizado.
   - Risco: necessidade de imagens adicionais.

6) **FAQ**
   - Objetivo: 9 perguntas e respostas.
   - Arquivos-alvo: `/faq`.
   - DoD: conteúdo completo e legível, acessível.
   - Risco: necessidade de microcopy adicional.

7) **Simule seu caso + Formulário**
   - Objetivo: CTA principal + formulário de captura.
   - Arquivos-alvo: `/simule-seu-caso`.
   - DoD: formulário validado + envio para destino definido.
   - Risco: campos e destino não definidos.

### P1 (importante)
8) **Blog index**
   - Objetivo: listar artigos por categoria.
   - Arquivos-alvo: `/blog`.
   - DoD: grid/lista + filtros simples.
   - Risco: metadados incompletos nos docx.

9) **Blog detail**
   - Objetivo: páginas de detalhe para cada artigo.
   - Arquivos-alvo: `/blog/[slug]`.
   - DoD: 18 artigos publicados.
   - Risco: conversão docx -> HTML/MD sem perda de formatação.

10) **SEO + Analytics**
   - Objetivo: metadata, sitemap, tracking.
   - Arquivos-alvo: configuração geral (a definir).
   - DoD: páginas indexáveis e tracking básico.

### P2 (melhorias)
11) **Depoimentos como slider**
   - Objetivo: melhorar UX em dispositivos móveis.
   - DoD: slider acessível.

12) **Página Contato**
   - Objetivo: fornecer canais oficiais.
   - DoD: conteúdo aprovado.

13) **Termos & Privacidade**
   - Objetivo: compliance LGPD.
   - DoD: textos legais publicados.

## Tarefas detalhadas (exemplos)

- **Converter docx do blog**
  - Objetivo: transformar 18 artigos em conteúdo web.
  - Arquivos-alvo: `content/blog/*.md` (hipótese) ou CMS.
  - DoD: todos os artigos com título, categoria, slug.
  - Risco: inconsistência de títulos e categorias.

- **Mapear logos**
  - Objetivo: separar logos de “mídia”, “parceiros”, “acreditações”.
  - Arquivos-alvo: `assets/logos/`.
  - DoD: lista de logos com legenda/alt text.
  - Risco: origem dos logos não documentada.
