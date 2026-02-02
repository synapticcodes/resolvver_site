# ROUTES & COMPONENTS

## Rotas impactadas (hipótese)
- `/` (Home)
- `/blog` (listagem)
- `/blog/[slug]` (detalhe)
- `/contato`

## Componentes impactados (hipótese)
- `src/components/layout/Header.tsx` (logo + CTA)
- `src/components/home/Hero.tsx` (CTA + figura)
- `src/components/home/MediaSection.tsx` (logos de mídia)
- `src/components/layout/Footer.tsx` (logo branco)
- `src/app/blog/[slug]/page.tsx` (título duplicado)
- `src/app/blog/page.tsx` (hero do Blog)
- `src/components/forms/LeadForm.tsx` + `src/lib/validation.ts` + `src/lib/email.ts` + `src/types/lead.ts` (remoção de telefone/WhatsApp)
- `src/app/contato/page.tsx` (remoção de telefone/WhatsApp)
