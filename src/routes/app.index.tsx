import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadges";
import { InsightCard } from "@/components/InsightCard";
import {
  cases,
  deadlines,
  tasks,
  insights,
} from "@/lib/mock/data";
import {
  Briefcase,
  CalendarClock,
  Sparkles,
  CheckSquare,
  AlertTriangle,
  Brain,
  Plus,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [{ title: "Dashboard — Vasconcelos & Nogueira" }],
  }),
  component: Dashboard,
});

function Dashboard() {
  const urgentDeadlines = deadlines
    .filter((d) => d.status === "Urgente" || d.status === "Pendente" || d.status === "Vencido")
    .slice(0, 5);
  const recentCases = cases.slice(0, 4);
  const priorityTasks = tasks.filter((t) => t.priority === "Alta").slice(0, 4);

  return (
    <>
      <PageHeader
        eyebrow="Visão geral"
        title="Bom dia, Marina"
        description="Resumo da operação jurídica do escritório hoje."
        actions={
          <>
            <Link
              to="/app/casos"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-muted"
            >
              <Plus className="h-4 w-4" /> Novo caso
            </Link>
            <Link
              to="/app/peticoes"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-4 py-2 text-sm font-medium text-white"
            >
              <Sparkles className="h-4 w-4" /> Nova petição
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard label="Casos ativos" value={cases.filter((c) => c.status === "Ativo").length + 12} icon={<Briefcase className="h-4 w-4" />} hint="No escritório" />
        <MetricCard label="Prazos próximos" value={deadlines.length} icon={<CalendarClock className="h-4 w-4" />} hint="Próximos 7 dias" accent="gold" />
        <MetricCard label="Petições com IA" value="57" icon={<Sparkles className="h-4 w-4" />} hint="Este mês" />
        <MetricCard label="Tarefas pendentes" value={tasks.filter((t) => t.status !== "Concluído").length} icon={<CheckSquare className="h-4 w-4" />} hint="Equipe" />
        <MetricCard label="Casos com alerta" value="3" icon={<AlertTriangle className="h-4 w-4" />} hint="Atenção necessária" accent="danger" />
        <MetricCard label="Insights da IA" value={insights.length} icon={<Brain className="h-4 w-4" />} hint="Novos hoje" accent="gold" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <p className="label-caps text-muted-foreground">Prioridade</p>
              <h2 className="font-serif text-xl">Prazos urgentes</h2>
            </div>
            <Link to="/app/prazos" className="text-sm text-[var(--gold)] hover:underline inline-flex items-center gap-1">
              Ver todos <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {urgentDeadlines.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate font-medium">{d.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{d.caseName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <PriorityBadge priority={d.priority} />
                  <StatusBadge status={d.status} />
                  <span className="hidden text-xs text-muted-foreground sm:inline">{d.dueDate}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <p className="label-caps text-muted-foreground">IA</p>
              <h2 className="font-serif text-xl">Insights importantes</h2>
            </div>
          </div>
          <div className="space-y-3 p-4">
            {insights.slice(0, 4).map((i) => (
              <InsightCard key={i.id} insight={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-serif text-xl">Casos recentes</h2>
            <Link to="/app/casos" className="text-sm text-[var(--gold)] hover:underline">Ver todos</Link>
          </div>
          <ul className="divide-y divide-border">
            {recentCases.map((c) => (
              <li key={c.id}>
                <Link
                  to="/app/casos/$id"
                  params={{ id: c.id }}
                  className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-muted/50"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{c.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {c.client} · {c.responsible}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={c.status} />
                    <PriorityBadge priority={c.priority} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-serif text-xl">Tarefas prioritárias</h2>
            <Link to="/app/tarefas" className="text-sm text-[var(--gold)] hover:underline">Ver todas</Link>
          </div>
          <ul className="divide-y divide-border">
            {priorityTasks.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate font-medium">{t.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.caseName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={t.status} />
                  <span className="hidden text-xs text-muted-foreground sm:inline">{t.dueDate}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <p className="label-caps text-muted-foreground">Atalhos rápidos</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { to: "/app/casos", label: "Novo caso", icon: Briefcase },
            { to: "/app/prazos", label: "Novo prazo", icon: CalendarClock },
            { to: "/app/tarefas", label: "Nova tarefa", icon: CheckSquare },
            { to: "/app/peticoes", label: "Abrir assistente IA", icon: Sparkles },
          ].map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm hover:border-[var(--gold)]/40 hover:text-[var(--gold)]"
            >
              <s.icon className="h-4 w-4" /> {s.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
