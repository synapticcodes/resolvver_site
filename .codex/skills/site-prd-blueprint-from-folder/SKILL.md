---
name: site-prd-blueprint-from-folder
description: Analisa uma pasta/repo e gera um PRD + BLUEPRINT completo (features, UX, arquitetura, rotas, componentes, dados, APIs, tarefas) para implementar um site funcional baseado nos arquivos existentes. Saídas sempre em ./blueprint/.
metadata:
  short-description: Gera PRD + Blueprint a partir de uma pasta existente (saída em /blueprint)
  version: "1.1.0"
  tags: ["prd", "blueprint", "spec", "web", "architecture", "reverse-spec"]
  inputs:
    - repo_or_folder_path
  outputs:
    - blueprint/INVENTORY.md
    - blueprint/PRD_BLUEPRINT.md
    - blueprint/IMPLEMENTATION_PLAN.md
    - blueprint/OPEN_QUESTIONS.md
    - blueprint/ROUTES_COMPONENTS.md
    - blueprint/DECISIONS.md
---

# Skill: PRD + BLUEPRINT a partir de uma pasta (saída em /blueprint)

## Objetivo
Analisar TODO o conteúdo existente em uma pasta (ou repositório) e produzir um **pacote completo de BLUEPRINT** em **Markdown**, concentrado **exclusivamente** na pasta `./blueprint/`, para permitir implementação rápida e segura de um **site 100% funcional** baseado nos arquivos existentes.

### Regra absoluta de output
- **TUDO que for gerado deve ir para `./blueprint/`.**
- **Não criar nem modificar `docs/`, `README`, ou qualquer outro arquivo fora de `./blueprint/`.**
- Se `./blueprint/` não existir, criar.

> Regra de evidência: não inventar. Se algo não estiver evidenciado, registrar como **Hipótese** ou **Pergunta em Aberto**.

---

## Entradas
- `repo_or_folder_path`: caminho da pasta alvo (default: diretório atual).

---

## Saídas obrigatórias (todas em ./blueprint)
1. `blueprint/INVENTORY.md`
2. `blueprint/PRD_BLUEPRINT.md`
3. `blueprint/IMPLEMENTATION_PLAN.md`
4. `blueprint/OPEN_QUESTIONS.md`

## Saídas recomendadas (se houver material)
- `blueprint/ROUTES_COMPONENTS.md`
- `blueprint/DECISIONS.md`

---

## Workflow

### Fase 0 — Preparação
1. Defina `TARGET = repo_or_folder_path` (default: `.`).
2. Garanta `OUT_DIR = TARGET/blueprint` (criar se não existir).
3. Identifique stack/framework em arquivos existentes (package.json, next.config, etc.).
4. Reforce: **nenhuma escrita fora do OUT_DIR**.

### Fase 1 — Inventário total
Crie `blueprint/INVENTORY.md` com:
- Tree de diretórios (profundidade 4–6; expandir áreas relevantes).
- Artefatos por categoria:
  - Produto/UX
  - Frontend
  - Backend/API
  - Dados
  - Infra/DevOps
  - Assets/Content
- “Pronto / Incompleto / Ausente”.

### Fase 2 — Reverse PRD + Blueprint
Crie `blueprint/PRD_BLUEPRINT.md` com:
1) Visão do produto (apenas evidências)
2) Sitemap / Páginas
3) Feature Map por módulo
4) UX/UI e conteúdo
5) Arquitetura técnica (rotas, componentes, estado, APIs, banco)
6) Requisitos não-funcionais
7) Critérios de aceite
8) Riscos e lacunas

### Fase 3 — Plano executável de implementação
Crie `blueprint/IMPLEMENTATION_PLAN.md` com:
- Milestones (sprints) e entregáveis
- Backlog priorizado (P0/P1/P2)
- Para cada tarefa: objetivo, arquivos-alvo, DoD, riscos

### Fase 4 — Perguntas em aberto (sem travar)
Crie `blueprint/OPEN_QUESTIONS.md` com:
- P0/P1/P2
- Por que importa
- Evidência faltante
- Opções de decisão

### Fase 5 — Decisões e rastreabilidade (recomendado)
Crie `blueprint/DECISIONS.md` para:
- decisões técnicas e de produto inferidas
- alternativas
- impacto
- status (proposta/aceita/pendente)

---

## Regras de qualidade
- Não inventar telas/fluxos/features.
- Sempre vincular evidência (arquivo/pasta) para itens críticos.
- Escrever curto e prático.
- Se houver contradições entre arquivos, registrar em riscos/lacunas.

---

## Comandos sugeridos (se scripts existirem)
- `bash scripts/inventory.sh <path>`
- `python3 scripts/summarize_repo.py <path>`
- `python3 scripts/extract_routes_and_components.py <path>`

Todos os scripts devem escrever exclusivamente em `TARGET/blueprint/`.
