# MAPA OPERACIONAL DO SITE — Resolvver

## 1. Visão geral

Este documento descreve o funcionamento real do site a partir do código-fonte atual.

- Produto: site institucional e de captação de leads da Resolvver.
- Objetivo principal: apresentar a proposta da empresa, educar o usuário via blog e capturar interesse comercial via formulário.
- Modelo de dados: conteúdo majoritariamente estático em arquivos TypeScript dentro de `src/data`.
- Backend: apenas uma API HTTP para submissão de lead por email.
- Infra principal: Next.js 14 com App Router.

## 2. Estrutura operacional do repositório

| Área | Caminho | Papel operacional |
|---|---|---|
| App Router | `src/app` | Define páginas, layout global, API, sitemap e robots |
| Componentes | `src/components` | Blocos visuais e interativos reutilizáveis |
| Conteúdo estático | `src/data` | Textos, listas, FAQs, benefícios, depoimentos e posts do blog |
| Configuração | `src/config/site.ts` | Dados institucionais e navegação global |
| Utilitários | `src/lib` | Validação, envio de email e helpers |
| Tipos | `src/types` | Tipagem de posts, leads, FAQ e depoimentos |
| Assets públicos | `public` | Logos, fotos, mockup do app, thumbs do blog e imagens de parceiros |
| Documentação auxiliar | `README.md`, `blueprint/`, `projeto_docs/` | Contexto de projeto e materiais de apoio |

## 3. Stack técnica

| Camada | Tecnologia | Evidência |
|---|---|---|
| Framework web | Next.js 14 | `package.json`, `next.config.js` |
| UI | React 18 | `package.json` |
| Linguagem | TypeScript | `package.json`, `tsconfig.json` |
| Estilo | Tailwind CSS | `tailwind.config.ts`, `postcss.config.js`, `src/app/globals.css` |
| Validação | Zod | `src/lib/validation.ts` |
| Email | Nodemailer | `src/lib/email.ts` |
| SEO nativo | Metadata API, `sitemap.ts`, `robots.ts` | `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts` |
| Fontes | `next/font/google` com Manrope e Space Grotesk | `src/app/layout.tsx` |
| Deploy previsto | Vercel e Netlify | `README.md`, `netlify.toml` |

## 4. Mapa transversal do runtime

### 4.1 Layout global

- Arquivo: `src/app/layout.tsx`
- Responsabilidades:
  - injeta fontes globais;
  - define metadata padrão do site;
  - monta `Header`, `main` e `Footer`;
  - aplica idioma `pt-BR`.

### 4.2 Navegação global

- Fonte dos links: `src/config/site.ts`
- Consumo:
  - `src/components/layout/Navigation.tsx` no desktop;
  - `src/components/layout/Header.tsx` no mobile;
  - `src/components/layout/Footer.tsx` nos links rápidos.

### 4.3 Conteúdo estático

- Home: `src/data/home-content.ts`, `src/data/stats.ts`, `src/data/how-it-works.ts`, `src/data/benefits.ts`, `src/data/testimonials.ts`
- Sobre: `src/data/about-content.ts`
- FAQ: `src/data/faq.ts`
- Blog: `src/data/blog/posts.ts` e `src/data/blog/post-*.ts`

### 4.4 Interatividade no cliente

Os pontos realmente interativos hoje são:

- `src/components/layout/Header.tsx`
  - abre e fecha o menu mobile.
- `src/components/ui/Accordion.tsx`
  - expande e recolhe perguntas do FAQ.
- `src/components/forms/LeadForm.tsx`
  - controla formulário, valida campos e chama `/api/lead`.
- `src/components/home/Testimonials.tsx`
  - expande a grade para mostrar mais depoimentos.
- `src/app/blog/page.tsx`
  - filtra posts por categoria no cliente.

### 4.5 Backend ativo

- API: `src/app/api/lead/route.ts`
- Uso:
  - recebe `POST` em JSON;
  - valida com `leadFormSchema`;
  - envia email SMTP;
  - devolve JSON de sucesso ou erro.

Não existe banco de dados, autenticação, sessão, painel administrativo ou integração com CRM no estado atual.

## 5. Rotas do site

### 5.1 `/`

- Arquivo de entrada: `src/app/page.tsx`
- Tipo de renderização: estática no build
- Papel: landing page principal

Componentes montados:

- `src/components/home/Hero.tsx`
- `src/components/home/Stats.tsx`
- `src/components/home/HowItWorks.tsx`
- `src/components/home/AppTracking.tsx`
- `src/components/home/Benefits.tsx`
- `src/components/home/Testimonials.tsx`
- `src/components/home/MediaSection.tsx`
- `src/components/home/PartnersGrid.tsx`
- `src/components/home/Accreditations.tsx`

Fontes de dados:

- `src/data/home-content.ts`
- `src/data/stats.ts`
- `src/data/how-it-works.ts`
- `src/data/benefits.ts`
- `src/data/testimonials.ts`

Imagens utilizadas:

- Hero: `public/images/photos/1.png.webp`
- App: `public/images/app-resolvver-mock-optimized.webp`
- Parceiros: `public/images/partners/N1.png` até `N44.png`
- Acreditação: `public/images/selo-procon.png`
- Depoimentos: `public/images/testimonials/*.webp`

Funcionalidades:

- apresenta proposta de valor;
- mostra prova social e números da empresa;
- explica o processo em 4 etapas;
- reforça CTA para `/simule-seu-caso`.

### 5.2 `/sobre`

- Arquivo de entrada: `src/app/sobre/page.tsx`
- Tipo de renderização: estática no build
- Papel: página institucional da marca

Fontes de dados:

- `src/data/about-content.ts`

Imagens utilizadas:

- Hero: `public/images/photos/4.jpg`
- Story: `public/images/photos/3-optimized.webp`

Funcionalidades:

- apresenta visão, posicionamento e histórico;
- lista pilares da empresa;
- destaca estatística anual.

### 5.3 `/faq`

- Arquivo de entrada: `src/app/faq/page.tsx`
- Tipo de renderização: estática no build
- Papel: central de dúvidas

Componentes:

- `src/components/ui/Accordion.tsx`

Fontes de dados:

- `src/data/faq.ts`

Imagens utilizadas:

- Hero: `public/images/photos/2.jpg`
- CTA: `public/images/photos/5-optimized.webp`

Funcionalidades:

- renderiza 9 perguntas e respostas;
- expande um item por vez;
- fecha fluxo com CTA para simulação.

### 5.4 `/simule-seu-caso`

- Arquivo de entrada: `src/app/simule-seu-caso/page.tsx`
- Tipo de renderização: estática no build
- Papel: página de conversão principal

Componentes:

- `src/components/forms/LeadForm.tsx`

Funcionalidades:

- coleta nome, email, faixa de dívida, mensagem e consentimento;
- valida no cliente;
- envia para `/api/lead`;
- mostra feedback visual de sucesso e erro.

### 5.5 `/contato`

- Arquivo de entrada: `src/app/contato/page.tsx`
- Tipo de renderização: estática no build
- Papel: contato institucional + formulário

Componentes:

- `src/components/forms/LeadForm.tsx`
- `src/components/ui/Card.tsx`

Fontes de dados:

- `src/config/site.ts`

Funcionalidades:

- expõe email institucional e redes sociais;
- reutiliza o mesmo formulário de lead da página de simulação.

### 5.6 `/blog`

- Arquivo de entrada: `src/app/blog/page.tsx`
- Tipo de renderização: página cliente com lista local de posts
- Papel: biblioteca de conteúdo educativo

Componentes:

- `src/components/blog/CategoryFilter.tsx`
- `src/components/blog/BlogCard.tsx`

Fontes de dados:

- `src/data/blog/posts.ts`
- `src/data/blog/post-*.ts`

Imagens utilizadas:

- Hero: `public/images/photos/A.jpg`
- CTA: `public/images/photos/5-optimized.webp`
- Cards: `public/images/blog/*` por `thumbnailUrl`

Funcionalidades:

- carrega 18 posts locais;
- filtra por categoria no cliente;
- renderiza cards com título, resumo, tempo de leitura, data e thumbnail;
- encaminha o usuário para `/blog/[slug]`.

Categorias atuais:

- `conselhos-financeiros`
- `credito`

### 5.7 `/blog/[slug]`

- Arquivo de entrada: `src/app/blog/[slug]/page.tsx`
- Tipo de renderização: SSG com `generateStaticParams`
- Papel: detalhe do artigo

Fontes de dados:

- `src/data/blog/posts.ts`
- `src/data/blog/post-*.ts`

Funcionalidades:

- gera 18 páginas estáticas a partir dos slugs;
- gera metadata individual por post;
- limpa o título HTML repetido do conteúdo;
- renderiza o HTML armazenado no campo `content`;
- adiciona CTA para `/simule-seu-caso`;
- inclui botão de volta para `/blog`.

Observação operacional:

- o conteúdo do post já está salvo como string HTML, não como Markdown.
- a renderização usa `dangerouslySetInnerHTML`, então o blog depende da qualidade e segurança do HTML armazenado nos arquivos de dados.

### 5.8 `/privacidade`

- Arquivo de entrada: `src/app/privacidade/page.tsx`
- Tipo de renderização: estática no build
- Papel: conteúdo legal da política de privacidade

Funcionalidades:

- exibe texto legal estático em layout tipográfico simples.

### 5.9 `/termos`

- Arquivo de entrada: `src/app/termos/page.tsx`
- Tipo de renderização: estática no build
- Papel: termos de uso do site

Funcionalidades:

- exibe texto legal estático em layout tipográfico simples.

### 5.10 `/api/lead`

- Arquivo de entrada: `src/app/api/lead/route.ts`
- Método implementado: `POST`
- Papel: endpoint de submissão de lead

Contrato de entrada:

- `name`
- `email`
- `debtAmount`
- `message`
- `consent`

Contrato de saída:

- sucesso: `{ success: true, message: 'Lead enviado com sucesso!' }`
- erro 400: validação inválida
- erro 500: falha de processamento ou email

### 5.11 `/sitemap.xml`

- Arquivo de entrada: `src/app/sitemap.ts`
- Papel: sitemap gerado em runtime com páginas fixas e todos os slugs do blog

### 5.12 `/robots.txt`

- Arquivo de entrada: `src/app/robots.ts`
- Papel: instruções de indexação e referência ao sitemap

## 6. Fluxos funcionais principais

### 6.1 Fluxo de navegação

1. O usuário entra em qualquer rota.
2. `src/app/layout.tsx` monta `Header` e `Footer`.
3. O menu usa os links definidos em `src/config/site.ts`.
4. As CTAs principais direcionam para `/simule-seu-caso`.

### 6.2 Fluxo de lead

1. O usuário preenche `LeadForm`.
2. O componente valida localmente com `leadFormSchema`.
3. O formulário envia `POST /api/lead`.
4. A API valida novamente no servidor.
5. `src/lib/email.ts` envia um email para `LEAD_EMAIL_TO`.
6. O frontend exibe mensagem de sucesso ou erro.

Arquivos-chave:

- `src/components/forms/LeadForm.tsx`
- `src/lib/validation.ts`
- `src/app/api/lead/route.ts`
- `src/lib/email.ts`
- `.env.local.example`

### 6.3 Fluxo do blog

1. Os posts são importados manualmente em `src/data/blog/posts.ts`.
2. Cada arquivo `post-*.ts` define slug, título, resumo, categoria, data, tempo de leitura, thumbnail e HTML do artigo.
3. `/blog` renderiza a listagem e filtra por categoria no cliente.
4. `/blog/[slug]` resolve o post localmente e gera a página estática correspondente.
5. `src/app/sitemap.ts` usa os mesmos slugs para gerar o sitemap.

## 7. Mapa de componentes por domínio

### 7.1 Layout

| Componente | Caminho | Papel |
|---|---|---|
| Header | `src/components/layout/Header.tsx` | logo, navegação desktop, menu mobile e CTA |
| Navigation | `src/components/layout/Navigation.tsx` | links desktop com destaque da rota ativa |
| Footer | `src/components/layout/Footer.tsx` | logo institucional, redes, links rápidos e links legais |

### 7.2 UI base

| Componente | Caminho | Papel |
|---|---|---|
| Button | `src/components/ui/Button.tsx` | botão/link reutilizável |
| Card | `src/components/ui/Card.tsx` | bloco visual com sombra e borda |
| Container | `src/components/ui/Container.tsx` | largura máxima e padding responsivo |
| Accordion | `src/components/ui/Accordion.tsx` | interação de expandir/recolher no FAQ |

### 7.3 Home

| Componente | Caminho | Papel |
|---|---|---|
| Hero | `src/components/home/Hero.tsx` | promessa principal e CTA |
| Stats | `src/components/home/Stats.tsx` | métricas resumidas |
| HowItWorks | `src/components/home/HowItWorks.tsx` | processo em 4 passos |
| AppTracking | `src/components/home/AppTracking.tsx` | reforço do app e benefícios |
| Benefits | `src/components/home/Benefits.tsx` | diferenciais da empresa |
| Testimonials | `src/components/home/Testimonials.tsx` | prova social com expansão |
| MediaSection | `src/components/home/MediaSection.tsx` | bloco institucional de confiança |
| PartnersGrid | `src/components/home/PartnersGrid.tsx` | logos de parceiros |
| Accreditations | `src/components/home/Accreditations.tsx` | selo de credibilidade |

### 7.4 Blog

| Componente | Caminho | Papel |
|---|---|---|
| CategoryFilter | `src/components/blog/CategoryFilter.tsx` | troca de categoria na listagem |
| BlogCard | `src/components/blog/BlogCard.tsx` | card de preview do post |

### 7.5 Formulário

| Componente | Caminho | Papel |
|---|---|---|
| LeadForm | `src/components/forms/LeadForm.tsx` | formulário único reaproveitado em duas páginas |

## 8. Mapa de dados e conteúdo

### 8.1 Conteúdo institucional

| Arquivo | Conteúdo |
|---|---|
| `src/config/site.ts` | nome, descrição, URL, redes, contato, navegação |
| `src/data/home-content.ts` | copies principais da home |
| `src/data/about-content.ts` | hero, story, pilares e estatística do sobre |
| `src/data/faq.ts` | lista de perguntas e respostas |
| `src/data/stats.ts` | números de prova social |
| `src/data/how-it-works.ts` | 4 etapas do processo |
| `src/data/benefits.ts` | diferenciais usados em home e app |
| `src/data/testimonials.ts` | 21 depoimentos com avatar |

### 8.2 Conteúdo do blog

Arquivos principais:

- índice e helpers: `src/data/blog/posts.ts`
- posts individuais: `src/data/blog/post-1-1.ts` até `src/data/blog/post-18.ts`

Campos de cada post:

- `slug`
- `title`
- `excerpt`
- `category`
- `readTime`
- `publishedAt`
- `content`
- `thumbnailUrl`

## 9. Mapa de imagens e assets

### 9.1 Identidade visual

| Asset | Caminho | Uso atual |
|---|---|---|
| Favicon 32 | `public/favicon-32x32.png` | ícone do site |
| Favicon 48 | `public/favicon-48x48.png` | ícone Apple |
| Logo header | `public/images/n-optimized.webp` | cabeçalho |
| Logo footer | `public/images/logo-branco-optimized.webp` | rodapé |
| OG image | `public/og-image.jpg` | compartilhamento social |

### 9.2 Imagens de páginas

| Asset | Caminho | Uso atual |
|---|---|---|
| Foto hero | `public/images/photos/1.png.webp` | home hero |
| Foto FAQ | `public/images/photos/2.jpg` | hero do FAQ |
| Foto sobre | `public/images/photos/3-optimized.webp` | bloco story do sobre |
| Foto sobre hero | `public/images/photos/4.jpg` | hero do sobre |
| Foto CTA | `public/images/photos/5-optimized.webp` | CTA do FAQ e CTA do blog |
| Foto blog hero | `public/images/photos/A.jpg` | hero da listagem do blog |
| Mock app | `public/images/app-resolvver-mock-optimized.webp` | seção AppTracking |
| Selo | `public/images/selo-procon.png` | acreditações |

### 9.3 Blog

- thumbnails por post: `public/images/blog/1.webp` até `public/images/blog/18.webp/.jpg/.png/.jpeg`
- fallback do card: `BlogCard` tem uma lista interna de 5 fotos genéricas, mas hoje a base já informa `thumbnailUrl` nos posts.

### 9.5 Limpeza de originais

- imagens antigas e versões substituídas foram removidas do projeto após a validação dos assets otimizados
- o site depende apenas dos arquivos ativos mantidos em `public/`

### 9.4 Parceiros

- diretório: `public/images/partners/`
- padrão: `N1.png` até `N44.png`
- uso: `src/components/home/PartnersGrid.tsx` gera os caminhos dinamicamente.

### 9.5 Depoimentos

- diretório: `public/images/testimonials/`
- uso: `src/data/testimonials.ts` aponta o avatar individual de cada depoimento.

## 10. SEO, indexação e descoberta

Arquivos responsáveis:

- `src/app/layout.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`

O que existe hoje:

- `title` global com template;
- descrição global;
- palavras-chave;
- Open Graph;
- Twitter Card;
- favicon;
- sitemap com rotas fixas e blog;
- robots bloqueando `/api/`.

## 11. Configuração de ambiente e operação

Variáveis esperadas:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `LEAD_EMAIL_TO`

Arquivo de referência:

- `.env.local.example`

Sem essas variáveis:

- o build ainda pode ocorrer;
- o envio de lead em runtime falha.

## 12. Build, execução e deploy

Scripts disponíveis em `package.json`:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

Situação operacional observada:

- `npm run build` compila com sucesso.
- `npm run lint` executa normalmente com configuração local de ESLint.

## 13. Observações importantes para manutenção

- O blog depende de edição manual de arquivos TypeScript, não de painel.
- O conteúdo do artigo é HTML bruto salvo em string; mudanças exigem cuidado editorial.
- O blog depende de slugs canônicos e aliases legados; ao criar novos posts, mantenha URL coerente com o título e redirecione URLs antigas quando necessário.

## 14. Arquivos-chave para qualquer intervenção futura

- Layout e navegação: `src/app/layout.tsx`, `src/components/layout/*`, `src/config/site.ts`
- Home: `src/app/page.tsx`, `src/components/home/*`, `src/data/home-content.ts`
- Formulário e lead: `src/components/forms/LeadForm.tsx`, `src/app/api/lead/route.ts`, `src/lib/validation.ts`, `src/lib/email.ts`
- Blog: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/data/blog/*`
- Legal/SEO: `src/app/privacidade/page.tsx`, `src/app/termos/page.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`
- Assets: `public/images/*`
