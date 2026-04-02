# Funcionalidades: contato-e-simulacao

Documentação viva da jornada de atendimento e captação do site.

## FEAT-001 - Triagem de cliente existente por CPF

- Status: Ativa
- Propósito: identificar clientes atuais e direcioná-los para o canal correto de atendimento.
- Fluxo principal: o usuário escolhe o painel `Já sou cliente`, informa CPF, a interface consulta `/api/clientes/buscar` e, quando encontra o cadastro, exibe resumo do caso e canais disponíveis.
- Regras de negócio:
  - RN-01: o CPF é formatado no cliente, mas enviado apenas com 11 dígitos.
  - RN-02: CPF inválido bloqueia a busca antes da chamada ao backend.
  - RN-03: quando o cliente é encontrado, a interface mostra nome, status, plano e próximo vencimento.
  - RN-04: o contato prioritário do cliente encontrado é o WhatsApp do consultor dedicado.
- Fluxos alternativos e edge cases:
  - Se o CPF não for encontrado, a tela oferece migração para a jornada de simulação.
  - Se a busca falhar, a interface mostra erro temporário e mantém o formulário.
- Integrações e dependências:
  - `src/components/contact/ContatoExperience.tsx`
  - `src/app/api/clientes/buscar/route.ts`
  - `src/data/clientes.ts`
- Validações e restrições:
  - A base atual é mockada e não deve ser confundida com integração real de CRM.
  - A API aplica rate limit em memória de 5 buscas por minuto por cliente identificado por IP/header.
- Referências de implementação:
  - `src/types/contact.ts`
  - `src/lib/validation.ts`
- TODOs para confirmar com o usuário:
  - Confirmar quando a busca por CPF deixará de usar mock e qual será a fonte oficial dos dados.

## FEAT-002 - Simulação qualificada de renegociação

- Status: Ativa
- Propósito: captar leads com maior aderência à operação da Resolvver antes do contato comercial.
- Fluxo principal: o usuário escolhe o painel `Quero simular meu caso`, preenche dados pessoais, perfil, faixa de dívida, faixa de renda e consentimento; o front valida, envia para `/api/leads/simulacao` e mostra confirmação.
- Regras de negócio:
  - RN-01: perfis elegíveis são somente `aposentado`, `loas` e `servidor`.
  - RN-02: faixas aceitas para envio são dívida `5k`, `10k`, `50k` e renda `2k`, `5k`.
  - RN-03: combinações com dívida abaixo de R$ 5.000 ou renda abaixo de R$ 2.000 geram mensagem de desqualificação e desabilitam o envio.
  - RN-04: o payload enviado completa automaticamente `utm_source=site`, `utm_medium=contato` e `created_at` com timestamp ISO.
  - RN-05: consentimento obrigatório é pré-requisito de envio.
- Fluxos alternativos e edge cases:
  - Erros de validação Zod são projetados campo a campo no formulário.
  - Falha do backend mantém o usuário na tela com mensagem de erro sem limpar os dados.
- Integrações e dependências:
  - `src/components/contact/ContatoExperience.tsx`
  - `src/app/api/leads/simulacao/route.ts`
  - `src/lib/validation.ts`
- Validações e restrições:
  - A rota de backend hoje apenas registra log estruturado; não existe persistência nem envio de email para simulação.
  - O rate limit da API é de 5 requisições a cada 10 minutos por cliente identificado por IP/header.
- Referências de implementação:
  - `src/types/contact.ts`
  - `src/lib/wolfgang-tracking.ts`
- TODOs para confirmar com o usuário:
  - Confirmar o destino operacional definitivo dos leads de simulação.
