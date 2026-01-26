# Open Questions

## P0 (bloqueia implementação)
1) **Qual stack/framework e hospedagem?**
   - Por que importa: define estrutura de rotas, componentes e deploy.
   - Evidência faltante: não há código nem docs técnicos.
   - Opções: Next.js / Astro / Webflow / outro.

2) **Para onde o formulário de simulação deve enviar os dados?**
   - Por que importa: integrações e LGPD.
   - Evidência faltante: nenhum endpoint, CRM ou email fornecido.
   - Opções: webhook/CRM (HubSpot/ RD Station), email, API própria.

3) **Quais campos do formulário de simulação?**
   - Por que importa: UX, validações e compliance.
   - Evidência faltante: “Formulario” é citado sem campos.
   - Opções: nome/telefone/email/valor dívidas/credor/renda etc.

4) **Conteúdo da página Contato?**
   - Por que importa: link está no menu e rodapé.
   - Evidência faltante: não há texto/canais.
   - Opções: telefone/WhatsApp/email/endereço/form.

5) **Termos de uso e Política de Privacidade**
   - Por que importa: exigência legal e LGPD.
   - Evidência faltante: apenas links no rodapé.
   - Opções: criar textos legais ou fornecer documentos existentes.

## P1 (impacta escopo/cronograma)
6) **Como organizar o blog (metadados)?**
   - Por que importa: categorias, slugs, datas e SEO.
   - Evidência faltante: docx sem metadados estruturados.
   - Opções: definir manualmente ou importar para CMS com campos.

7) **“Estamos na mídia” usa quais logos?**
   - Por que importa: seção da Home depende de assets corretos.
   - Evidência faltante: nenhuma pasta específica para mídia.
   - Opções: usar subset de `parceiros/` ou fornecer novos logos.

8) **Acreditações: somente “Selo do Procon”?**
   - Por que importa: seção específica exige assets/selos oficiais.
   - Evidência faltante: não há imagem do selo.
   - Opções: adicionar selo oficial ou ajustar texto.

9) **App Resolvver: existem links (iOS/Android) e screenshots?**
   - Por que importa: CTA e credibilidade.
   - Evidência faltante: nenhuma URL ou imagem do app.
   - Opções: inserir links para lojas e imagens do app.

## P2 (refinamento)
10) **Depoimentos: usar todos ou curadoria?**
   - Por que importa: performance e UX.
   - Evidência faltante: não há priorização.
   - Opções: slider com subset + página de histórias.

11) **Imagens “Fotos/” onde se aplicam?**
   - Por que importa: layout e narrativa visual.
   - Evidência faltante: sem indicação de uso.
   - Opções: hero, sobre, blog.

12) **Renomear pastas com espaço ao final?**
   - Por que importa: facilita automação e build.
   - Evidência faltante: intenção de nomenclatura.
   - Opções: manter ou renomear (impacta paths).
