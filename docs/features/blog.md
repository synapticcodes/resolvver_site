# Funcionalidades: blog

Documentação viva do módulo editorial do site.

## FEAT-001 - Listagem editorial com filtro por categoria

- Status: Ativa
- Propósito: disponibilizar conteúdos de educação financeira e crédito para aquisição orgânica e nutrição de leads.
- Fluxo principal: a rota `/blog` lê `searchParams.categoria`, valida a categoria e renderiza cards com base em `blogPostMetadata`.
- Regras de negócio:
  - RN-01: somente as categorias `conselhos-financeiros` e `credito` são aceitas como válidas.
  - RN-02: ausência de categoria ou valor inválido cai em listagem completa.
  - RN-03: quando o filtro não encontra itens, a interface mostra estado vazio explícito.
- Fluxos alternativos e edge cases:
  - A canonical da listagem muda quando o filtro é válido.
- Integrações e dependências:
  - `src/app/blog/page.tsx`
  - `src/components/blog/BlogCard.tsx`
  - `src/components/blog/CategoryFilter.tsx`
  - `src/data/blog/posts.ts`
- Validações e restrições:
  - O filtro depende de querystring e não de rota dedicada por categoria.
  - O CTA final da página sempre aponta para a simulação.
- Referências de implementação:
  - `src/app/blog/page.tsx`
  - `src/types/blog.ts`
- TODOs para confirmar com o usuário:
  - Confirmar se a categoria `credito` deve continuar com esse identificador interno no longo prazo.

## FEAT-002 - Detalhe de artigo estático com slug canônico

- Status: Ativa
- Propósito: entregar páginas indexáveis por artigo, com metadata social e compatibilidade com URLs antigas.
- Fluxo principal: `generateStaticParams` publica slugs do catálogo, a página resolve slug legado para o canônico e renderiza o HTML do post.
- Regras de negócio:
  - RN-01: se o slug recebido existir apenas como legado, a rota faz redirecionamento permanente para `/blog/[slug-canônico]`.
  - RN-02: se o post não existir, a rota responde com `notFound()`.
  - RN-03: o conteúdo do artigo remove um parágrafo inicial duplicado quando ele repete o título em HTML.
- Fluxos alternativos e edge cases:
  - O `publishedAt` do post é reaproveitado tanto para metadata quanto para sitemap.
- Integrações e dependências:
  - `src/app/blog/[slug]/page.tsx`
  - `src/data/blog/post-*.ts`
  - `src/data/blog/posts.ts`
- Validações e restrições:
  - O corpo do artigo é renderizado com `dangerouslySetInnerHTML`, então o HTML fonte precisa ser tratado como conteúdo confiável versionado no repositório.
  - Mudanças de slug devem considerar `legacySlugs` para preservar URLs antigas.
- Referências de implementação:
  - `src/app/blog/[slug]/page.tsx`
  - `src/data/blog/posts.ts`
- TODOs para confirmar com o usuário:
  - Confirmar quem é responsável por aprovar HTML e thumbnails de novos posts.
