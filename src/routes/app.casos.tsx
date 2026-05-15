import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadges";
import { cases } from "@/lib/mock/data";
import { Plus, Search, LayoutGrid, Table2, FileText, CheckSquare } from "lucide-react";

export const Route = createFileRoute("/app/casos")({
  head: () => ({ meta: [{ title: "Casos — Vasconcelos & Nogueira" }] }),
  component: CasesPage,
});

function CasesPage() {
  const [view, setView] = useState<"table" | "cards">("table");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("Todos");

  const filtered = cases.filter(
    (c) =>
      (status === "Todos" || c.status === status) &&
      (q === "" ||
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.client.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <>
      <PageHeader
        eyebrow="Operação"
        title="Hub de casos"
        description="Visualize, filtre e gerencie todos os casos do escritório."
        actions={
          <button className="inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-4 py-2 text-sm font-medium text-white">
            <Plus className="h-4 w-4" /> Novo caso
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por caso ou cliente"
            className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-[var(--gold)]"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-9 rounded-md border border-border bg-background px-3 text-sm"
        >
          {["Todos", "Ativo", "Em análise", "Aguardando documento", "Aguardando audiência", "Suspenso", "Encerrado"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select className="h-9 rounded-md border border-border bg-background px-3 text-sm">
          <option>Todos os responsáveis</option>
          <option>Dra. Marina Azevedo</option>
          <option>Dr. Rafael Monteiro</option>
          <option>Ana Clara Souza</option>
          <option>Felipe Andrade</option>
        </select>
        <select className="h-9 rounded-md border border-border bg-background px-3 text-sm">
          <option>Todas prioridades</option>
          <option>Alta</option>
          <option>Média</option>
          <option>Baixa</option>
        </select>
        <div className="ml-auto inline-flex rounded-md border border-border bg-background">
          <button
            onClick={() => setView("table")}
            className={`px-3 py-2 text-sm ${view === "table" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
            aria-label="Visão em tabela"
          >
            <Table2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("cards")}
            className={`px-3 py-2 text-sm ${view === "cards" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
            aria-label="Visão em cards"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>

      {view === "table" ? (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40 text-left">
                <tr className="label-caps text-muted-foreground">
                  <th className="px-4 py-3">Caso</th>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Processo</th>
                  <th className="px-4 py-3">Responsável</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Prioridade</th>
                  <th className="px-4 py-3">Próx. prazo</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <Link to="/app/casos/$id" params={{ id: c.id }} className="font-medium hover:text-[var(--gold)]">
                        {c.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{c.lastUpdate}</p>
                    </td>
                    <td className="px-4 py-3">{c.client}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{c.processNumber}</td>
                    <td className="px-4 py-3">{c.responsible}</td>
                    <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-4 py-3"><PriorityBadge priority={c.priority} /></td>
                    <td className="px-4 py-3 text-[var(--gold)]">{c.nextDeadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => (
            <Link
              to="/app/casos/$id"
              params={{ id: c.id }}
              key={c.id}
              className="group rounded-xl border border-border bg-card p-5 transition hover:border-[var(--gold)]/40 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="label-caps text-muted-foreground">{c.type}</p>
                  <h3 className="mt-1 font-serif text-lg leading-tight group-hover:text-[var(--gold)]">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">{c.client}</p>
                </div>
                <PriorityBadge priority={c.priority} />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{c.processNumber}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" /> {c.documents} docs
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <CheckSquare className="h-3.5 w-3.5" /> {c.openTasks} tarefas
                </span>
                <span className="text-[var(--gold)]">{c.nextDeadline}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <StatusBadge status={c.status} />
                <span className="text-xs text-muted-foreground">{c.responsible}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
