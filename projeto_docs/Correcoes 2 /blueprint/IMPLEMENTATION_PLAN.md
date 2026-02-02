# IMPLEMENTATION PLAN

## Milestones
1) Preparar assets e ajustes visuais (Header/Hero/Footer).
2) Atualizar Blog (título duplicado + correções de conteúdo/imagem).
3) Ajustar Contato/Formulário (remover telefone/WhatsApp).
4) Inserir logos de mídia (dependente de assets).

## Backlog priorizado
### P0
- Trocar logo do header por `n.png` e aumentar tamanho.
- Remover CTA "Simule seu caso" mantendo apenas "Comece já".
- Aumentar o tamanho da figura indicada.
- Trocar logo do footer por `logo branco.png`.
- Remover telefone/WhatsApp do contato e formulário (inclui validação/envio).
- Remover título duplicado nos posts do blog.

### P1
- Corrigir palavra "folga" no post indicado.
- Substituir foto repetida por `A.jpg`.

### P2
- Substituir labels de mídia por logos (dependente de assets).

## Tarefas detalhadas
- Header
  - Objetivo: atualizar logo e tamanho.
  - Arquivos-alvo (hipótese): `src/components/layout/Header.tsx`, `public/images/`.
  - DoD: logo correto carregado e responsivo.
  - Risco: logo novo pode ter proporções diferentes.

- Hero
  - Objetivo: remover CTA secundário + aumentar figura.
  - Arquivos-alvo (hipótese): `src/components/home/Hero.tsx`.
  - DoD: apenas um CTA visível + imagem maior.
  - Risco: ambiguidade sobre qual figura aumentar.

- Media logos
  - Objetivo: trocar labels por logos.
  - Arquivos-alvo (hipótese): `src/components/home/MediaSection.tsx`, `public/images/`.
  - DoD: logos reais exibidos.
  - Risco: assets não disponíveis.

- Footer
  - Objetivo: aplicar logo branco.
  - Arquivos-alvo (hipótese): `src/components/layout/Footer.tsx`, `public/images/`.
  - DoD: logo branco visível em fundo escuro.

- Blog
  - Objetivo: remover título duplicado, corrigir palavra "folga" no post de consignado CLT, trocar imagem repetida no hero do Blog.
  - Arquivos-alvo (hipótese): `src/app/blog/[slug]/page.tsx`, `src/app/blog/page.tsx`, `src/data/blog/post-16.ts`.
  - DoD: título aparece apenas uma vez; conteúdo corrigido.
  - Risco: identificar post correto e imagem duplicada.

- Contato/Formulário
  - Objetivo: remover telefone/WhatsApp (UI e coleta).
  - Arquivos-alvo (hipótese): `src/app/contato/page.tsx`, `src/components/forms/LeadForm.tsx`, `src/lib/validation.ts`, `src/lib/email.ts`, `src/types/lead.ts`.
  - DoD: sem campos/labels/validações de telefone.
