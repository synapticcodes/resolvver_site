# Site Resolvver

Site institucional da Resolvver - Empresa de renegociação de dívidas.

## Stack Técnico

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript (strict mode)
- **Estilização**: Tailwind CSS
- **Validação**: Zod
- **Email**: Nodemailer
- **Monitoramento**: Sentry
- **Deploy**: Vercel

## Estrutura do Projeto

```
site_resolvver/
├── src/
│   ├── app/              # Páginas e rotas (App Router)
│   ├── components/       # Componentes React
│   ├── data/            # Dados estáticos e conteúdo
│   ├── lib/             # Utilitários e configurações
│   ├── types/           # Definições TypeScript
│   └── config/          # Configurações do site
├── public/              # Assets estáticos
└── projeto_docs/        # Documentação e assets originais
```

## Páginas Implementadas

- `/` - Home (Hero, Stats, Como funciona, Depoimentos, etc.)
- `/sobre` - Sobre a Resolvver
- `/faq` - Perguntas Frequentes (9 Q&A)
- `/simule-seu-caso` - Formulário de lead com validação
- `/blog` - Lista de artigos (18 posts)
- `/blog/[slug]` - Detalhe de artigo
- `/contato` - Página de contato
- `/privacidade` - Política de privacidade
- `/termos` - Termos de uso

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie `.env.local.example` para `.env.local` e configure:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=senha-app
LEAD_EMAIL_TO=contato@resolvver.com
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=0.1
SENTRY_TRACES_SAMPLE_RATE=0.1
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=
```

### 3. Executar em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### 4. Build de produção

```bash
npm run build
npm start
```

## Recursos

### Blog

- 18 artigos organizados por categorias:
  - Conselhos Financeiros (8 artigos)
  - Créditos e Dívidas (10 artigos)
- Filtro por categoria
- Posts gerados estaticamente em build time
- Listagem com filtro por querystring
- SEO otimizado para cada artigo

### Formulário de Lead

- Validação client-side e server-side com Zod
- Campos: Nome, Email, Telefone, Valor da dívida, Mensagem
- Checkbox LGPD obrigatório
- Envio de email via Nodemailer
- Feedback visual de sucesso/erro

### SEO

- Metadata configurada em todas as páginas
- Sitemap dinâmico (`/sitemap.xml`)
- Robots.txt configurado
- OpenGraph tags para redes sociais

### Monitoramento com Sentry

- SDK do Sentry instalado para frontend, servidor e edge
- `NEXT_PUBLIC_SENTRY_DSN` ativa o envio de eventos
- `SENTRY_ORG`, `SENTRY_PROJECT` e `SENTRY_AUTH_TOKEN` ativam upload de source maps no build
- Headers sensíveis como `authorization`, `cookie`, `x-forwarded-for` e `x-real-ip` são removidos antes do envio

## Deploy

### Vercel (Recomendado)

1. Conecte o repositório GitHub à Vercel
2. Configure as variáveis de ambiente no dashboard
3. Deploy automático a cada push

### Outras plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- etc.

## Melhorias Futuras

- [ ] Adicionar testes (Jest/React Testing Library)
- [ ] Implementar sistema de newsletter
- [ ] Adicionar mais conteúdo ao blog
- [ ] Integrar com CRM para leads
- [ ] Adicionar chat ao vivo
- [ ] Implementar sistema de agendamento

## Suporte

Para questões técnicas ou bugs, abra uma issue no repositório.

## Licença

© 2026 Resolvver. Todos os direitos reservados.
