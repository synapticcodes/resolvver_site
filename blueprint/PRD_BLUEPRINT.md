# PRD + BLUEPRINT — Atualização de componentes (Resolvver)

## 1) Visão do produto (evidências)
- Site institucional/marketing da Resolvver para renegociação de dívidas, com páginas de Home, Sobre, FAQ, Blog, Contato e Simulação. Evidências: `src/app/*`, `src/components/*`, `src/data/*`.
- Correções solicitadas estão em `projeto_docs/Correcoes site /Correcao Site.docx` e assets em `projeto_docs/Correcoes site /Fotos b log`.
- Novo logo foi fornecido pelo usuário (imagem anexada no chat).

## 2) Objetivo desta atualização
Atualizar componentes e conteúdo do site **já existente**, sem criar novas funcionalidades, seguindo as correções descritas no documento de revisão e nos assets fornecidos.

## 3) Sitemap / Páginas atuais (evidências)
- `/` Home — `src/app/page.tsx` (Hero, Stats, HowItWorks, AppTracking, Benefits, Testimonials, Media, Partners, Accreditations)
- `/sobre` — `src/app/sobre/page.tsx`
- `/faq` — `src/app/faq/page.tsx`
- `/blog` — `src/app/blog/page.tsx`
- `/blog/[slug]` — `src/app/blog/[slug]/page.tsx`
- `/simule-seu-caso` — `src/app/simule-seu-caso/page.tsx`
- `/contato` — `src/app/contato/page.tsx`
- `/privacidade` — `src/app/privacidade/page.tsx`
- `/termos` — `src/app/termos/page.tsx`

## 4) Feature map (módulos impactados)
- **Layout**: Header/Nav e Footer (`src/components/layout/*`, `src/config/site.ts`).
- **Home**: Hero, HowItWorks, Stats (se necessário), imagens (`src/components/home/*`, `src/data/home-content.ts`).
- **Simulação**: Hero copy e placeholder de telefone (`src/app/simule-seu-caso/page.tsx`, `src/components/forms/LeadForm.tsx`).
- **Sobre**: Título/subtítulo do hero, texto “story”, imagem e estatística (`src/app/sobre/page.tsx`, `src/data/about-content.ts`).
- **Blog**: categorias, títulos e miniaturas (`src/components/blog/*`, `src/types/blog.ts`, `src/data/blog/*`).
- **Contato**: canais exibidos (telefone/whatsapp/social) (`src/app/contato/page.tsx`, `src/config/site.ts`).
- **Legal**: remoção de nota em Privacidade e Termos (`src/app/privacidade/page.tsx`, `src/app/termos/page.tsx`).
- **Assets**: logos e fotos do blog (`public/images/*`, `projeto_docs/Correcoes site /Fotos b log`).

## 5) UX/UI e conteúdo (requisitos funcionais)

### 5.1 Header / Navegação
- Remover item “Simule seu caso” da barra de navegação (manter o botão verde CTA).
- Remover a barra verde superior com a frase de “recomendar a um amigo”.
- Renomear itens:
  - “FAQ” → “Dúvidas Frequentes”
  - “Sobre” → “Sobre a Resolvver”

### 5.2 Logo
- Substituir logo atual pelo novo logo fornecido (imagem anexada no chat).
- Aplicar no header, footer e demais usos do logo (pelo menos `public/images/logo-header.png`, `public/images/logo-footer.png` e `public/images/logo.png`).
- **Não** alterar o favicon.

### 5.3 Home / Hero
- Atualizar headline para: **“UM PLANO PARA RESTAURAR SUAS FINANÇAS”** (capitalização conforme instrução).
- Headline deve permanecer em **caixa alta**.
- Atualizar o bullet “+600 mil clientes atendidos” para: **“Plano simples, feito para você.”**
- Trocar as imagens não‑blog usando os arquivos de `projeto_docs/Fotos` (substituição direta dos assets em `public/images/photos/*`).

### 5.4 Home / Como funciona
- Subtítulo: **“Saia das dívidas mais rápido do que você imagina em 4 passos simples”**.
- Remover texto “Passo 1/2/3/4” (manter apenas a bolinha com número).

### 5.5 Página “Simule seu caso”
- Badge/título do selo: **“SIMULE SEU CASO”**.
- Subtítulo: **“Descubra quanto você pode economizar com nosso simulador.”**
- Placeholder de telefone: ajustar para o formato **“(xx) xxxxx-xxxx”**.

### 5.6 Estatísticas / números (pendência de evidência)
- “Retirar o símbolo de menos antes dos valores”.
- “Trocar o valor do Bradesco por R$ 5.500,00”.
- “Acordos Efetuados 8 / Acordos em Andamento 5”.
> **Observação:** não há referência clara a esses elementos no código atual; requer confirmação do local.

### 5.7 Footer
- Texto: **“Especialistas em solução de dívidas. Mais de 600 mil clientes atendidos em 7 anos de experiência.”**
- Remover Linkedin.
- Remover telefone de contato (manter email).

### 5.8 Página “Sobre”
- Título: **“Reinventamos o modo que você se livra das dívidas”**.
- Subtítulo: **“Criamos soluções claras, humanas e eficientes para ajudar você a recuperar o controle das suas finanças e obter crédito”**.
- Texto do bloco “story”: substituir pelo texto fornecido no doc (4 parágrafos completos).
- Ajustar espaçamento do bloco de texto (reduzir espaço conforme instrução).
- Atualizar estatística para **“Mais de 185 mil”** (ajustar label conforme necessário).
- Trocar imagens não‑blog usando os arquivos de `projeto_docs/Fotos` (assets já existentes em `public/images/photos/*`).

### 5.9 Blog
- Remover categoria “Sobre nós”.
- Alterar label “Crédito” para **“Créditos e Dívidas”**.
- Atualizar títulos de posts conforme lista do doc (17 títulos explícitos).
- Aplicar as fotos 1–17 conforme o documento; **foto 18 não será usada**.

### 5.10 Contato
- Remover telefone e WhatsApp.
- Remover Linkedin.
- Inserir dados genéricos (placeholders) para telefone/WhatsApp, pois serão atualizados manualmente depois.

### 5.11 Privacidade e Termos
- Remover a nota de “política/termos simplificados”.

## 6) Arquitetura técnica (impactos)
- **Rotas**: sem novas rotas; apenas ajustes de conteúdo.
- **Componentes**: Header/Footer, Hero, HowItWorks, BlogCard/CategoryFilter, LeadForm, páginas Sobre/Simule/Contato/Privacidade/Termos.
- **Dados**: `src/data/*` (home-content, about-content, blog posts).
- **Assets**: novas imagens (logo + fotos do blog).

## 7) Requisitos não-funcionais
- Manter responsividade desktop/mobile.
- Não adicionar novas dependências.
- Não alterar fluxos de formulário/API.
- Garantir que imagens novas sejam otimizadas/compatíveis com Next Image.

## 8) Critérios de aceite (alto nível)
- Header sem barra verde superior e sem item “Simule seu caso” na navegação; CTA permanece.
- Labels de navegação e FAQ atualizados (“Dúvidas Frequentes”, “Sobre a Resolvver”).
- Logo atualizado em header/footer (e demais usos).
- Hero com nova headline e bullet ajustado; imagem atualizada.
- Seção “Como funciona” com subtítulo completo e sem texto “Passo X”.
- Página “Simule seu caso” com novo selo e subtítulo; placeholder de telefone atualizado.
- Footer sem Linkedin e sem telefone; texto atualizado.
- Página “Sobre” com novo título/subtítulo e story atualizado; imagem e estatística ajustadas.
- Blog com novos títulos e thumbnails 1–18; categoria “Sobre nós” removida; “Crédito” renomeado.
- Contato sem Linkedin e sem WhatsApp (se confirmado) e telefone ajustado.
- Nota removida em Privacidade e Termos.

## 9) Riscos e lacunas
- Instruções sobre “Bradesco”, “Acordos” e “símbolo de menos” não têm correspondência no código.
- Conflito entre “remover telefone” e “arrumar o telefone”.
