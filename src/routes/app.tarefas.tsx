import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadges";
import { tasks } from "@/lib/mock/data";
import type { TaskStatus } from "@/lib/mock/data";
import { Plus, Table2, Kanban } from "lucide-react";

export const Route = createFileRoute("/app/tarefas")({
  head: () => ({ meta: [{ title: "Tarefas — Vasconcelos & Nogueira" }] }),
  component: TasksPage,
});

const columns: TaskStatus[] = ["Pendente", "Em andamento", "Em revisão", "Concluído"];

function TasksPage() {
  const [view, setView] = useState<"table" | "kanban">("kanban");

  return (
    <>
      <PageHeader
        eyebrow="Operação"
        title="Tarefas"
        description="Acompanhe e distribua tarefas vinculadas a cada caso."
        actions={
          <button className="inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-4 py-2 text-sm font-medium text-white">
            <Plus className="h-4 w-4" /> Nova tarefa
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3">
        <select className="h-9 rounded-md border border-border bg-background px-3 text-sm">
          <option>Todos responsáveis</option>
        </select>
        <select className="h-9 rounded-md border border-border bg-background px-3 text-sm">
          <option>Todos status</option>
        </select>
        <select className="h-9 rounded-md border border-border bg-background px-3 text-sm">
          <option>Todas prioridades</option>
        </select>
        <div className="ml-auto inline-flex rounded-md border border-border bg-background">
          <button onClick={() => setView("kanban")} className={`px-3 py-2 ${view === "kanban" ? "bg-muted" : "text-muted-foreground"}`}><Kanban className="h-4 w-4" /></button>
          <button onClick={() => setView("table")} className={`px-3 py-2 ${view === "table" ? "bg-muted" : "text-muted-foreground"}`}><Table2 className="h-4 w-4" /></button>
        </div>
      </div>

      {view === "kanban" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col);
            return (
              <div key={col} className="rounded-xl border border-border bg-card p-3">
                <div className="mb-3 flex items-center justify-between px-1">
                  <p className="label-caps text-muted-foreground">{col}</p>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{colTasks.length}</span>
                </div>
                <div className="space-y-2">
                  {colTasks.map((t) => (
                    <article key={t.id} className="rounded-lg border border-border bg-background p-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-tight">{t.title}</p>
                        <PriorityBadge priority={t.priority} />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{t.caseName}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">{t.responsible}</span>
                        <span className="text-[11px] text-[var(--gold)]">{t.dueDate}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40 text-left">
                <tr className="label-caps text-muted-foreground">
                  <th className="px-4 py-3">Tarefa</th>
                  <th className="px-4 py-3">Caso</th>
                  <th className="px-4 py-3">Responsável</th>
                  <th className="px-4 py-3">Prioridade</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Prazo</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr key={t.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium">{t.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.caseName}</td>
                    <td className="px-4 py-3">{t.responsible}</td>
                    <td className="px-4 py-3"><PriorityBadge priority={t.priority} /></td>
                    <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                    <td className="px-4 py-3 text-[var(--gold)]">{t.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
