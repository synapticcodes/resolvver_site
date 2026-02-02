# PRD + BLUEPRINT

## 1) Visão do produto (evidências)
- Evidência: `revisao 2 site .docx` descreve ajustes de UI/Conteúdo para o site Resolvver.
- Objetivo imediato: aplicar correções visuais e de conteúdo em componentes existentes (header, home, blog, contato, footer).

## 2) Sitemap / Páginas
- Evidência indireta no doc: Header, Blog, Contato, Footer.
- Hipótese (precisa confirmar no repo): páginas Home, Blog (listagem), Blog (detalhe), Contato, FAQ, Sobre.

## 3) Feature Map por módulo (correções)
- Header
  - Trocar logo para `n.png` e aumentar tamanho.
  - Remover CTA "Simule seu caso" (manter apenas "Comece já").
- Hero/Home
  - Aumentar tamanho de uma figura (provavelmente a imagem principal).
- Mídia (Home)
  - Substituir botões/labels por logos de mídia veiculada.
- Footer
  - Trocar logo para `logo branco.png`.
- Blog
  - Remover título duplicado em posts (título aparece duas vezes).
  - Corrigir texto com palavra final "folga" no post de consignado CLT.
  - Substituir imagem repetida do hero do Blog por `A.jpg`.
- Contato/Formulário
  - Remover telefone e WhatsApp (UI e coleta no formulário).

## 4) UX/UI e conteúdo
- Simplificar CTAs (apenas "Comece já").
- Ajustes de hierarquia visual (logo maior, figura maior).
- Substituir labels por logos (comunicação de prova social).

## 5) Arquitetura técnica (alto nível)
- Evidência: assets (.png/.jpg) para atualização visual.
- Hipótese: site em Next.js com componentes em `src/components`.
- Alterações devem ocorrer em:
  - Componentes de layout (Header/Footer)
  - Seções da Home (Hero/MediaSection)
  - Templates do Blog (listagem e página do post)
  - Formulário/validação (LeadForm + schema)

## 6) Requisitos não-funcionais
- Não quebrar layout responsivo.
- Não referenciar assets inexistentes.

## 7) Critérios de aceite
- Logo do header atualizado para `n.png` e maior que o atual.
- Apenas um CTA "Comece já" na área destacada.
- Figura indicada com tamanho visivelmente maior.
- Logos de mídia exibidos no lugar dos botões/labels.
- Footer usa `logo branco.png`.
- Blog sem título duplicado nos posts.
- Texto com "folga" corrigido no post indicado.
- Imagem repetida substituída por `A.jpg`.
- Contato e formulário sem telefone/WhatsApp.

## 8) Riscos e lacunas
- Logos de mídia não estão presentes nesta pasta.
- "Essa figura" é ambíguo sem indicação da seção.
