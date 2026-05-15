import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadges";
import { deadlines } from "@/lib/mock/data";
import { Plus, CalendarClock, AlertTriangle, CheckCircle2, Clock, Table2, Calendar as CalendarIcon } from "lucide-react";

export const Route = createFileRoute("/app/prazos")({
  head: () => ({ meta: [{ title: "Prazos — Vasconcelos & Nogueira" }] }),
  component: DeadlinesPage,
});

function DeadlinesPage() {
  const [view, setView] = useState<"table" | "calendar">("table");

  return (
    <>
      <PageHeader
        eyebrow="Operação"
        title="Hub de prazos"
        description="Controle todos os prazos jurídicos com visão por responsável e prioridade."
        actions={
          <button className="inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-4 py-2 text-sm font-medium text-white">
            <Plus className="h-4 w-4" /> Novo prazo
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Vencendo hoje" value="2" icon={<AlertTriangle className="h-4 w-4" />} accent="danger" />
        <MetricCard label="Próximos 7 dias" value="6" icon={<Clock className="h-4 w-4" />} accent="gold" />
        <MetricCard label="Atrasados" value="1" icon={<CalendarClock className="h-4 w-4" />} accent="danger" />
        <MetricCard label="Concluídos" value="34" icon={<CheckCircle2 className="h-4 w-4" />} accent="success" />
      </div>

      <div className="mt-6 mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3">
        <select className="h-9 rounded-md border border-border bg-background px-3 text-sm">
          <option>Todos responsáveis</option><option>Dra. Marina Azevedo</option><option>Dr. Rafael Monteiro</option>
        </select>
        <select className="h-9 rounded-md border border-border bg-background px-3 text-sm">
          <option>Todos status</option><option>Pendente</option><option>Em andamento</option><option>Vencido</option><option>Concluído</option>
        </select>
        <select className="h-9 rounded-md border border-border bg-background px-3 text-sm">
          <option>Todas prioridades</option><option>Alta</option><option>Média</option><option>Baixa</option>
        </select>
        <div className="ml-auto inline-flex rounded-md border border-border bg-background">
          <button onClick={() => setView("table")} className={`px-3 py-2 ${view === "table" ? "bg-muted" : "text-muted-foreground"}`}><Table2 className="h-4 w-4" /></button>
          <button onClick={() => setView("calendar")} className={`px-3 py-2 ${view === "calendar" ? "bg-muted" : "text-muted-foreground"}`}><CalendarIcon className="h-4 w-4" /></button>
        </div>
      </div>

      {view === "table" ? (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40 text-left">
                <tr className="label-caps text-muted-foreground">
                  <th className="px-4 py-3">Título</th>
                  <th className="px-4 py-3">Caso</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Responsável</th>
                  <th className="px-4 py-3">Prioridade</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Vencimento</th>
                </tr>
              </thead>
              <tbody>
                {deadlines.map((d) => (
                  <tr key={d.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <p className="font-medium">{d.title}</p>
                      {d.note && <p className="text-xs text-muted-foreground">{d.note}</p>}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{d.caseName}</td>
                    <td className="px-4 py-3">{d.type}</td>
                    <td className="px-4 py-3">{d.responsible}</td>
                    <td className="px-4 py-3"><PriorityBadge priority={d.priority} /></td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                    <td className="px-4 py-3 text-[var(--gold)]">{d.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <CalendarView />
      )}
    </>
  );
}

function CalendarView() {
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const startOffset = 2; // mock month start
  const total = 35;
  const today = 12;
  const marked: Record<number, { color: string; label: string }> = {
    [today]: { color: "bg-[var(--danger)]", label: "Hoje" },
    14: { color: "bg-[var(--gold)]", label: "Contestação" },
    16: { color: "bg-[var(--warning)]", label: "Juntada" },
    18: { color: "bg-[var(--gold)]", label: "Audiência" },
    24: { color: "bg-[var(--success)]", label: "Pagamento" },
  };
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-serif text-lg">Maio · 2025</p>
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[var(--danger)]" /> Crítico</span>
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[var(--gold)]" /> Alto</span>
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[var(--warning)]" /> Médio</span>
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[var(--success)]" /> Concluído</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => (
          <p key={d} className="label-caps text-center text-muted-foreground">{d}</p>
        ))}
        {Array.from({ length: total }).map((_, i) => {
          const day = i - startOffset + 1;
          const valid = day > 0 && day <= 31;
          const m = marked[day];
          return (
            <div key={i} className={"min-h-[72px] rounded-md border p-1.5 text-xs " + (valid ? "bg-background border-border" : "border-transparent")}>
              {valid && (
                <>
                  <div className={"mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] " + (day === today ? "bg-[var(--danger)] text-white font-semibold" : "text-foreground")}>{day}</div>
                  {m && (
                    <p className={"truncate rounded px-1 py-0.5 text-[10px] text-white " + m.color}>{m.label}</p>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
