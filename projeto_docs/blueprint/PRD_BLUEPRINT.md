# PRD + Blueprint (Resolvver)

> Fonte principal: `Conteudo site - aba a aba.docx` e `Cores site  Branding.docx`.
> Regra de evidência: o que não está nos arquivos foi marcado como **Hipótese** ou **Pergunta em Aberto**.

## 1) Visão do produto (evidências)
- A Resolvver é uma empresa de bem-estar financeiro, com foco em renegociação/reorganização de dívidas.
- Proposta central: resolver dívidas com descontos que podem chegar a 90%, reorganização em um único plano com parcelas e carência.
- Processo acompanhado via aplicativo, com suporte humano e transparência.
- Provas sociais: +600 mil clientes, +7 anos, +R$1bi em dívidas liquidadas.
- Conteúdo educativo via blog.

**Evidências**: `Conteudo site - aba a aba.docx`.

## 2) Sitemap / Páginas
**Páginas/abas mencionadas no conteúdo:**
- Home
- Sobre a Resolvver
- Perguntas Frequentes
- Simule seu caso
- Blog
- Contato (apenas link no rodapé/menu; conteúdo não detalhado)

**Evidências**: `Conteudo site - aba a aba.docx`.

## 3) Feature Map por módulo

### Home
- Hero com headline/subheadline e CTAs ("Comece já" e "Simule seu caso").
- Indicadores (600 mil clientes, 7+ anos, R$1bi em dívidas liquidadas).
- Seção “Como funciona” (4 passos).
- Seção “Acompanhe tudo em tempo real no App Resolvver”.
- Benefícios em lista (atendimento humano, especialistas, processo no app, transparência).
- Depoimentos (muitos clientes com nome/cidade/UF e frase).
- Seção “Estamos na mídia”.
- Seção “Nossos parceiros” (logos).
- Acreditações (Selo do Procon).
- Rodapé com links (Sobre, FAQ, Blog, Contato, Termos, Privacidade).

**Evidências**: `Conteudo site - aba a aba.docx`, pasta `parceiros/`.

### Sobre
- Texto institucional (missão, cuidado humano, clareza e segurança).
- Blocos: Tecnologia, Equipe humana, Segurança, Acompanhamento.
- Estatística: mais de 185 mil pessoas/ano (menciona “todos os anos”).

**Evidências**: `Conteudo site - aba a aba.docx`.

### Perguntas Frequentes (FAQ)
- 9 perguntas e respostas sobre: o que faz, tipos de dívida, não é empréstimo, processo, desconto/carência, prazo, acompanhamento, confiança, legalidade.

**Evidências**: `Conteudo site - aba a aba.docx`.

### Simule seu caso
- Promessa: “Liquidamos suas dívidas com até 90% de desconto”.
- CTA: “Resolver dívida”.
- Bloco “Simule seu programa” + texto “Descubra quanto…”.
- Formulário (campos não especificados).

**Evidências**: `Conteudo site - aba a aba.docx`.

### Blog
- Texto de introdução sobre estabilidade financeira.
- Seções/categorias: “Todos os Artigos”, “Conselhos Financeiros”, “Crédito”, “Sobre nós”.
- Lista de leitura.
- 18 artigos em `.docx`.

**Evidências**: `Conteudo site - aba a aba.docx`, pasta `Artigos blog /`.

### Contato
- Apenas citado em navegação/rodapé.

**Evidência**: `Conteudo site - aba a aba.docx`.

## 4) UX/UI e Conteúdo

### Tom de voz
- Humano, direto, acolhedor e transparente.
- Evita promessas irreais, reforça clareza e acompanhamento.

### Componentes de conteúdo
- Headline/subheadline;
- Estatísticas de confiança;
- Fluxo em passos;
- Depoimentos;
- Logos de parceiros e acreditações;
- FAQ em formato de acordeão (hipótese de UI, não evidência);
- Blog com categorias e listagem.

### Branding
- Paleta:
  - Navy Profundo: `#0C213E`
  - Verde Esmeralda: `#10A081`
  - Azul Céu Suave: `#D4EEEE`
  - Cinza Ardósia: `#4A5668`
  - Branco: `#FFFFFF`
- Indicação de contraste WCAG favorável (branco↔navy, navy↔céu suave, esmeralda em branco >= AA para 18px).

**Evidências**: `Cores site  Branding.docx`.

## 5) Arquitetura técnica (rotas, componentes, estado, APIs, dados)

### Rotas (derivadas do conteúdo)
- `/` (Home)
- `/sobre` (Sobre a Resolvver)
- `/faq` (Perguntas Frequentes)
- `/simule-seu-caso` (Simule seu caso)
- `/blog` (Blog index)
- `/blog/[slug]` (Detalhe de artigo) **Hipótese**
- `/contato` (Contato) **Hipótese**
- `/termos` e `/privacidade` **Hipótese**

### Componentes (sugeridos)
- `Header/Nav` (links para Home/Sobre/FAQ/Simule/Blog/Contato)
- `Hero` + `CTAButtons`
- `Stats`
- `HowItWorks`
- `AppTrackingSection`
- `BenefitsList`
- `Testimonials` (cards/slider)
- `MediaSection` (logos)
- `PartnersGrid` (logos de `parceiros/`)
- `Accreditations` (Selo do Procon)
- `FAQAccordion`
- `BlogIndex` e `BlogCard`
- `LeadForm` (simulador)
- `Footer`

### Estado/dados
- Conteúdo principal pode ser estático (markdown/JSON) **Hipótese**.
- Blog: converter `.docx` -> markdown/HTML ou importar para CMS **Hipótese**.
- Depoimentos, stats, FAQ, passos: estruturas estáticas.

### APIs / Integrações
- Formulário de simulação: integração com CRM/atendimento (ex.: webhook/email/CRM) **Hipótese**.
- Captura de leads com consentimento LGPD **Hipótese**.

## 6) Requisitos não-funcionais
- Responsivo (mobile-first).
- Performance: LCP < 2.5s em páginas públicas **Hipótese de meta**.
- SEO: metadata, OpenGraph, sitemap.
- Acessibilidade: contraste e navegação por teclado.
- LGPD: consentimento e política de privacidade.

## 7) Critérios de aceite (MVP de site)
- Todas as páginas do sitemap renderizam com conteúdo do docx.
- Navegação consistente entre páginas e CTAs funcionais.
- FAQ completo com as 9 perguntas/ respostas.
- Seção de depoimentos com pelo menos 10 cards visíveis (ou scroll/slider).
- Logos de parceiros e acreditações exibidos com grid responsivo.
- Blog index lista todos os 18 artigos, com categoria.
- Formulário de simulação envia dados para destino definido.

## 8) Riscos e lacunas
- Campos e fluxo do formulário de simulação não definidos.
- Conteúdo da página Contato inexistente.
- Termos de uso/Política de Privacidade não fornecidos.
- Metadados do blog ausentes (autor, data, categoria, slug).
- Mapeamento de logos (“mídia”, “parceiros”, “acreditações”) não especificado.
- Stack técnica e CMS não definidos.
