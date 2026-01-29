# ROUTES & COMPONENTS — Impacto das correções

## Rotas

- `/` Home
  - Componentes: `src/components/home/Hero.tsx`, `Stats.tsx`, `HowItWorks.tsx`, `AppTracking.tsx`, `Benefits.tsx`, `Testimonials.tsx`, `MediaSection.tsx`, `PartnersGrid.tsx`, `Accreditations.tsx`.
  - Dados: `src/data/home-content.ts`, `src/data/stats.ts`, `src/data/how-it-works.ts`.
  - Mudanças: hero headline/bullet; subtítulo de HowItWorks; remoção do texto “Passo X”; possíveis ajustes em números/estatísticas (se aplicável). Imagens não‑blog atualizadas via assets em `public/images/*`.

- `/sobre`
  - Componentes: `src/app/sobre/page.tsx`.
  - Dados: `src/data/about-content.ts`.
  - Mudanças: título/subtítulo; texto “story” completo; ajuste de espaçamento; estatística; imagens não‑blog atualizadas via assets em `public/images/*`.

- `/faq`
  - Componentes: `src/app/faq/page.tsx`, `src/components/ui/Accordion.tsx`.
  - Mudanças: renomear “FAQ” para “Dúvidas Frequentes” (navegação e textos da página, se necessário).

- `/blog`
  - Componentes: `src/app/blog/page.tsx`, `src/components/blog/BlogCard.tsx`, `src/components/blog/CategoryFilter.tsx`.
  - Dados: `src/data/blog/posts.ts`, `src/data/blog/post-*.ts`.
  - Mudanças: categorias, títulos, thumbnails do blog (fotos 1–18 conforme doc).

- `/blog/[slug]`
  - Componentes: `src/app/blog/[slug]/page.tsx`.
  - Dados: `src/data/blog/post-*.ts`.
  - Mudanças: títulos no metadata e conteúdo se for necessário refletir atualização.

- `/simule-seu-caso`
  - Componentes: `src/app/simule-seu-caso/page.tsx`, `src/components/forms/LeadForm.tsx`.
  - Mudanças: selo “SIMULE SEU CASO”, texto descritivo e placeholder de telefone.

- `/contato`
  - Componentes: `src/app/contato/page.tsx`.
  - Dados: `src/config/site.ts`.
  - Mudanças: remoção de telefone/WhatsApp/LinkedIn (a confirmar); ajuste de telefone.

- `/privacidade` e `/termos`
  - Componentes: `src/app/privacidade/page.tsx`, `src/app/termos/page.tsx`.
  - Mudanças: remoção da nota de “simplificado”.

## Layout global
- `src/components/layout/Header.tsx`
  - Remover barra verde superior.
  - Ajustar navegação (itens e rótulos).
  - Atualizar logo.

- `src/components/layout/Footer.tsx`
  - Atualizar logo.
  - Texto institucional.
  - Remover LinkedIn e telefone.

- `src/components/layout/Navigation.tsx` + `src/config/site.ts`
  - Remover item “Simule seu caso”.
  - Renomear “FAQ” e “Sobre”.

## Assets
- Logos: `public/images/logo-header.png`, `public/images/logo-footer.png`, `public/images/logo.png`, `public/images/logo-cropped.png`.
- Fotos do blog: copiar de `projeto_docs/Correcoes site /Fotos b log` para `public/images/...` e referenciar via `thumbnailUrl`.
