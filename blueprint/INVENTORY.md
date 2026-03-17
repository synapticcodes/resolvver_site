# INVENTORY — site_resolvver

## Tree (nível 4–6, focado no relevante)
```
.
├─ netlify.toml
├─ package.json
├─ next.config.js
├─ tailwind.config.ts
├─ public/
│  ├─ favicon-32x32.png
│  ├─ favicon-48x48.png
│  ├─ og-image.jpg
│  └─ images/
│     ├─ n-optimized.webp
│     ├─ logo-branco-optimized.webp
│     ├─ app-resolvver-mock-optimized.webp
│     ├─ selo-procon.png
│     ├─ photos/
│     │  ├─ 1.png.webp
│     │  ├─ 2.jpg
│     │  ├─ 3-optimized.webp
│     │  ├─ 4.jpg
│     │  ├─ 5-optimized.webp
│     │  └─ A.jpg
│     ├─ blog/ (1.webp ... 18.webp/.jpg/.png/.jpeg)
│     ├─ testimonials/ (*.webp)
│     └─ partners/ (N1.png ... N44.png)
├─ src/
│  ├─ app/
│  │  ├─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ globals.css
│  │  ├─ sobre/page.tsx
│  │  ├─ faq/page.tsx
│  │  ├─ blog/page.tsx
│  │  ├─ blog/[slug]/page.tsx
│  │  ├─ simule-seu-caso/page.tsx
│  │  ├─ contato/page.tsx
│  │  ├─ privacidade/page.tsx
│  │  ├─ termos/page.tsx
│  │  └─ api/lead/route.ts
│  ├─ components/
│  │  ├─ layout/ (Header.tsx, Footer.tsx, Navigation.tsx)
│  │  ├─ home/ (Hero.tsx, HowItWorks.tsx, Stats.tsx, AppTracking.tsx, Benefits.tsx, Testimonials.tsx, MediaSection.tsx, PartnersGrid.tsx, Accreditations.tsx)
│  │  ├─ blog/ (BlogCard.tsx, CategoryFilter.tsx)
│  │  ├─ forms/LeadForm.tsx
│  │  └─ ui/ (Button.tsx, Card.tsx, Container.tsx, Accordion.tsx)
│  ├─ data/
│  │  ├─ home-content.ts
│  │  ├─ about-content.ts
│  │  ├─ stats.ts
│  │  ├─ how-it-works.ts
│  │  ├─ benefits.ts
│  │  ├─ testimonials.ts
│  │  ├─ faq.ts
│  │  └─ blog/ (posts.ts, post-*.ts)
│  ├─ config/site.ts
│  ├─ lib/ (email.ts, utils.ts, validation.ts)
│  └─ types/
├─ projeto_docs/
│  ├─ Correcoes site /
│  │  ├─ Correcao Site.docx
│  │  ├─ 3f3049d0-f8fe-4355-b82e-36a9e1c541e3 2.png
│  │  └─ Fotos b log/ (1..18 imagens)
│  ├─ Cores site  Branding.docx
│  ├─ Conteudo site - aba a aba.docx
│  └─ Logo /
└─ scripts/convert-blogs.js
```

## Artefatos por categoria

- Produto/UX
  - `projeto_docs/Correcoes site /Correcao Site.docx` (lista de correções solicitadas)
  - `projeto_docs/Conteudo site - aba a aba.docx` (conteúdo base)
  - `projeto_docs/Cores site  Branding.docx` (branding/cores)
  - Status: **Incompleto** (correções estão em docx, algumas instruções sem referência direta no código)

- Frontend
  - Next.js App Router em `src/app/*` e componentes em `src/components/*`
  - Tailwind CSS em `src/app/globals.css` e `tailwind.config.ts`
  - Status: **Pronto** (site funcional)

- Backend/API
  - API route `src/app/api/lead/route.ts` (envio de lead)
  - `src/lib/email.ts`, `src/lib/validation.ts`
  - Status: **Pronto**

- Dados/Conteúdo
  - `src/data/*` (home, about, faq, blog, etc.)
  - Blog posts em `src/data/blog/post-*.ts`
  - Status: **Pronto**, porém precisa de atualização de títulos/miniaturas conforme correções

- Assets/Content
  - `public/images/*` (assets ativos do site)
  - `projeto_docs/Correcoes site /Fotos b log` (novas fotos do blog)
  - `projeto_docs/Correcoes site /3f3049d0-f8fe-4355-b82e-36a9e1c541e3 2.png` (imagem citada em correções)
  - Status: **Organizado** (ativos otimizados e originais removidos do projeto)

- Infra/DevOps
  - `netlify.toml`, `package.json`
  - Status: **Pronto**

## Observações rápidas
- Há build artifacts em `.next/` e dependências em `node_modules/` (não relevantes para o PRD).
- Existe um `projeto_docs/blueprint/` antigo, mas o output deste trabalho está em `./blueprint/` conforme regra do skill.
