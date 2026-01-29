# DECISIONS (propostas)

1) **Remover item “Simule seu caso” da navegação**
- Status: proposta
- Impacto: CTA permanece via botão verde; navegação mais enxuta.
- Arquivos: `src/config/site.ts`, `src/components/layout/Navigation.tsx`.

2) **Renomear “FAQ” para “Dúvidas Frequentes” e “Sobre” para “Sobre a Resolvver”**
- Status: proposta
- Impacto: alinhamento com texto do doc.
- Arquivos: `src/config/site.ts`, possivelmente `src/app/faq/page.tsx`.

3) **Atualizar logo em todos os pontos visíveis (sem alterar favicon)**
- Status: proposta
- Impacto: consistência de marca.
- Arquivos: `public/images/logo-*.png`, `src/components/layout/*`.

4) **Blog usará thumbnails explícitos por post**
- Status: proposta
- Impacto: controle de imagem por artigo; elimina rotação genérica.
- Arquivos: `src/data/blog/post-*.ts`, `src/components/blog/BlogCard.tsx`.

5) **Categoria “Crédito” passa a label “Créditos e Dívidas”**
- Status: proposta
- Impacto: ajuste de rótulo; id permanece `credito`.
- Arquivos: `src/components/blog/CategoryFilter.tsx`, `src/components/blog/BlogCard.tsx`.

6) **Remover nota “simplificada” em Privacidade/Termos**
- Status: proposta
- Impacto: páginas ficam finais.
- Arquivos: `src/app/privacidade/page.tsx`, `src/app/termos/page.tsx`.

7) **Blog: usar apenas fotos 1–17**
- Status: proposta
- Impacto: foto 18 não utilizada; mapeamento segue doc.
- Arquivos: `src/data/blog/post-*.ts`.

8) **Posts de “Sobre nós” serão recategorizados**
- Status: proposta
- Impacto: posts permanecem no blog com nova categoria (a definir entre “Créditos e Dívidas” e “Conselhos”).
- Arquivos: `src/data/blog/post-*.ts`, `src/types/blog.ts`.
