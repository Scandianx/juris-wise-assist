# Vasconcelos & Nogueira — Plataforma Jurídica Inteligente

Plataforma SaaS jurídica premium com landing page institucional e área autenticada (dashboard) completa, usando dados mockados. Foco em estética sofisticada (azul antracite + castanho claro), tipografia serifada elegante para títulos e sans-serif para interface, e fluxos centrados em casos, prazos e IA para petições.

## Identidade visual

- Paleta (tokens em `src/styles.css`, formato `oklch`):
  - `--primary` Azul Antracite `#111c2a` (sidebar, header escuro, hero)
  - `--accent` / `--gold` Castanho Claro `#bb9764` (CTA, destaques)
  - `--foreground` Preto Carvão `#111111`
  - `--background` Branco Gelo `#f7f7f7`
  - `--border` `#e5e5e5`, `--muted-foreground` `#6b7280`
  - status: `--success #2f855a`, `--danger #9b2c2c`, `--warning #d69e2e`
- Tipografia (Google Fonts via `<link>` no `__root.tsx`):
  - Títulos: **Cormorant Garamond**
  - Interface: **Inter**
  - Labels small-caps em uppercase com tracking amplo
- Logos enviados copiados para `src/assets/logo-vertical.png`, `logo-horizontal.png`, `logo-circular.png`

## Estrutura de rotas (TanStack Start, file-based)

```text
src/routes/
  __root.tsx                  # html shell + fontes + meta
  index.tsx                   # Landing pública
  recursos.tsx
  ia-juridica.tsx
  planos.tsx
  faq.tsx
  contato.tsx
  login.tsx
  app.tsx                     # Layout autenticado (sidebar + header + Outlet)
  app.index.tsx               # Dashboard
  app.casos.tsx               # Hub de casos
  app.casos.$id.tsx           # Detalhe do caso (abas internas via state)
  app.prazos.tsx
  app.peticoes.tsx            # Gerador IA
  app.tarefas.tsx
  app.documentos.tsx
  app.usuarios.tsx
  app.alertas.tsx
  app.configuracoes.tsx       # Perfil + escritório
```

Sem backend nesta fase: dados em `src/lib/mock/*.ts` (casos, clientes, prazos, tarefas, documentos, usuários, insights).

## Componentes reutilizáveis (`src/components/`)

- Layout público: `PublicHeader`, `PublicFooter`, `Hero`, `FeatureCard`, `PricingCard`, `FaqItem`
- Layout app: `AppSidebar` (azul antracite, colapsável), `AppHeader` (busca, notificações, perfil), `QuickActionButton`
- UI domínio: `MetricCard`, `StatusBadge`, `PriorityBadge`, `CaseCard`, `CaseTable`, `DeadlineRow`, `DeadlineCalendar`, `TaskKanban`, `DocumentList`, `InsightCard`, `AiSidePanel`, `PetitionEditor`, `Timeline`, `EmptyState`, `LoadingState`
- Modais: `NewCaseModal`, `NewDeadlineModal`, `NewTaskModal`, `NewUserModal`, `UploadDocumentModal`
- Botões: variantes `primary` (castanho), `secondary` (outline castanho), `danger`, `ghost`

Aproveita shadcn já instalado (`button`, `card`, `dialog`, `tabs`, `table`, `badge`, `input`, `select`, `tooltip`, `sheet`, `dropdown-menu`, `calendar`).

## Páginas — escopo resumido

**Landing (`/`)**: header + hero escuro com mockup do dashboard flutuante + 8 cards de recursos + seção IA + seção hub de casos + seção prazos + benefícios + planos (3 tiers) + FAQ + footer.

**Páginas públicas filhas** (`/recursos`, `/ia-juridica`, `/planos`, `/faq`, `/contato`): conteúdo aprofundado de cada bloco com mesmo header/footer e SEO próprio (`head()` por rota).

**Login** (`/login`): mockado, redireciona para `/app`.

**Dashboard (`/app`)**: 6 cards de métricas + lista de prazos urgentes + casos recentes + tarefas prioritárias + painel de insights da IA + atalhos rápidos.

**Casos (`/app/casos`)**: tabela + toggle de cards, filtros (status, responsável, cliente, prioridade), busca, botão "Novo caso".

**Detalhe do caso (`/app/casos/$id`)**: cabeçalho com metadados e CTAs + abas internas (Resumo, Prazos, Documentos, Petições, Tarefas, Insights IA, Histórico/Timeline).

**Prazos (`/app/prazos`)**: 4 cards (hoje, 7 dias, atrasados, concluídos) + tabela + visão calendário/agenda + filtros.

**Petições com IA (`/app/peticoes`)**: layout 3 colunas — formulário (caso, tipo, fatos, objetivo, tom, docs apoio) | prévia editável (textarea estilizado) | painel lateral de ações IA contextuais. Estados de geração e versão final com CTAs (Salvar no caso, Exportar, Copiar, Nova versão, Pedir ajustes).

**Tarefas (`/app/tarefas`)**: toggle tabela / kanban (Pendente, Em andamento, Em revisão, Concluído).

**Documentos (`/app/documentos`)**: tabela + filtros + upload modal + empty state.

**Usuários (`/app/usuarios`)**: tabela com permissões em badges + modal edição.

**Alertas (`/app/alertas`)**: formulário com switches para regras de notificação por e-mail, horário, responsáveis, prioridades.

**Configurações (`/app/configuracoes`)**: tabs Perfil / Escritório / IA / Segurança / Plano.

## Detalhes técnicos

- Tailwind v4 via `src/styles.css` com tokens `oklch` e `@theme inline` adicionando `--color-gold`, `--color-success`, `--color-danger`, `--color-warning`.
- Fontes carregadas em `__root.tsx` via `links` (`fonts.googleapis.com`) e expostas como `--font-serif`, `--font-sans`.
- Cada rota define `head()` com title/description/og próprios.
- Dados mockados em PT-BR conforme exemplos do brief (casos, clientes, responsáveis, insights).
- Responsividade: sidebar vira `Sheet` no mobile; tabelas viram cards empilhados; filtros em drawer.
- Sem chamadas reais de IA — geração de petição usa template mockado com delay simulado.
- Sem backend / sem Lovable Cloud nesta fase.

## Fora de escopo (pode vir depois)

- Autenticação real, persistência, Cloud, integração com IA real, exportação PDF, multi-tenant, billing.

## Entregáveis

- Landing pública navegável e premium
- Área autenticada completa com todas as 10 páginas
- Componentes reutilizáveis e tokens de design consistentes
- Mock data realista para demonstração
