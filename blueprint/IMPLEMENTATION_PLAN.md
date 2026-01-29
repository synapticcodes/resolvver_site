# IMPLEMENTATION PLAN — Atualizações do site

## Milestones

### M1 — Navegação, layout e branding (P0)
Entregáveis: header/footer atualizados, navegação correta, novo logo aplicado.

### M2 — Conteúdo das páginas principais (P0/P1)
Entregáveis: home, sobre, simule, contato e faq com textos revisados.

### M3 — Blog, assets e legal (P0/P1)
Entregáveis: blog com novos títulos/miniaturas, legal sem nota, assets organizados.

---

## Backlog priorizado

### P0 — Obrigatório
1) **Atualizar navegação e header**
- Objetivo: remover item “Simule seu caso” da barra, remover barra verde superior, renomear links.
- Arquivos-alvo: `src/components/layout/Header.tsx`, `src/components/layout/Navigation.tsx`, `src/config/site.ts`.
- DoD: header sem barra verde; nav sem “Simule seu caso”; labels “Dúvidas Frequentes” e “Sobre a Resolvver”.
- Risco: texto duplicado em mobile/desktop (ver nav + CTA).

2) **Atualizar logo (branding)**
- Objetivo: substituir logo por novo arquivo (header/footer e demais usos). **Não** alterar favicon.
- Arquivos-alvo: `public/images/logo-header.png`, `public/images/logo-footer.png`, `public/images/logo.png`, `public/images/logo-cropped.png`.
- DoD: novo logo visível no header/footer; assets antigos substituídos/atualizados; favicon mantido.
- Risco: falta de especificação de formato/tamanho do logo.

3) **Home: headline e bullet**
- Objetivo: atualizar headline e bullet “+600 mil clientes atendidos”.
- Arquivos-alvo: `src/data/home-content.ts`, `src/components/home/Hero.tsx`.
- DoD: headline = “UM PLANO PARA RESTAURAR SUAS FINANÇAS” (caixa alta); bullet = “Plano simples, feito para você.”
- Risco: necessidade de revisão de quebra de linha (responsividade).

4) **Home: HowItWorks**
- Objetivo: ajustar subtítulo e remover texto “Passo X”.
- Arquivos-alvo: `src/data/home-content.ts`, `src/components/home/HowItWorks.tsx`.
- DoD: subtítulo completo com “em 4 passos simples”; apenas bolinha com número.

5) **Simule seu caso: texto e placeholder**
- Objetivo: atualizar selo e descrição, ajustar placeholder de telefone.
- Arquivos-alvo: `src/app/simule-seu-caso/page.tsx`, `src/components/forms/LeadForm.tsx`.
- DoD: badge “SIMULE SEU CASO”; descrição nova; placeholder no formato solicitado.

6) **Footer: texto e remoções**
- Objetivo: atualizar texto institucional e remover LinkedIn + telefone.
- Arquivos-alvo: `src/components/layout/Footer.tsx`, `src/config/site.ts`.
- DoD: texto atualizado; ícone LinkedIn removido; telefone não exibido.

7) **Sobre: título, subtítulo, story e estatística**
- Objetivo: substituir textos e ajustar espaçamento; atualizar estatística; trocar foto.
- Arquivos-alvo: `src/data/about-content.ts`, `src/app/sobre/page.tsx`.
- DoD: título/subtítulo conforme doc; story com 4 parágrafos novos; estatística “Mais de 185 mil”; imagem atualizada.
- Risco: falta de confirmação de imagem.

8) **Privacidade/Termos: remover nota**
- Objetivo: remover bloco final de “nota simplificada”.
- Arquivos-alvo: `src/app/privacidade/page.tsx`, `src/app/termos/page.tsx`.
- DoD: páginas sem nota extra ao final.

9) **Blog: categorias, títulos e thumbnails**
- Objetivo: atualizar labels e títulos; inserir imagens 1–18.
- Arquivos-alvo: `src/components/blog/CategoryFilter.tsx`, `src/components/blog/BlogCard.tsx`, `src/types/blog.ts`, `src/data/blog/post-*.ts`, `public/images/...`.
- DoD: categorias sem “Sobre nós”; label “Crédito” → “Créditos e Dívidas”; posts com `thumbnailUrl` apontando para fotos 1–17; títulos atualizados; **foto 18 não usada**.
- Risco: mapeamento de fotos para posts precisa seguir a ordem do documento.

### P1 — Desejável
10) **Contato: canais e telefone**
- Objetivo: remover WhatsApp/LinkedIn e inserir dados genéricos de telefone (placeholders).
- Arquivos-alvo: `src/app/contato/page.tsx`, `src/config/site.ts`.
- DoD: canais exibidos conforme decisão final; telefone/WhatsApp com placeholders genéricos (serão atualizados manualmente).

11) **Imagens não‑blog (hero/sobre/faq/blog-hero/cta/app/procon)**
- Objetivo: substituir assets existentes com os arquivos de `projeto_docs/Fotos` (mesmos nomes).
- Arquivos-alvo: `public/images/photos/*`, `public/images/app-resolvver-mock.png`, `public/images/app-resolvver.png`, `public/images/selo-procon.png`, `public/images/selo-procon.jpeg`.
- DoD: imagens novas visíveis nas páginas que usam esses assets; Next Image carregando.

### P2 — Ajustes complementares
12) **Revisão de números/valores não mapeados**
- Objetivo: **fora do escopo** (será feito manualmente).
- Arquivos-alvo: a confirmar.
- DoD: removido deste ciclo.

---

## Definição de pronto (global)
- Todas as alterações visuais refletidas no site sem erros de build.
- Textos e imagens conferidos com o documento de correções.
- Navegação e responsividade preservadas.
