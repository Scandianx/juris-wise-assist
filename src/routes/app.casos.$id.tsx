import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  findCase,
  deadlinesForCase,
  tasksForCase,
  documentsForCase,
  petitionsForCase,
  insightsForCase,
} from "@/lib/mock/data";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadges";
import { InsightCard } from "@/components/InsightCard";
import { Sparkles, Plus, ArrowLeft, Upload, FileText, Clock } from "lucide-react";

export const Route = createFileRoute("/app/casos/$id")({
  loader: ({ params }) => {
    const c = findCase(params.id);
    if (!c) throw notFound();
    return { caseItem: c };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData.caseItem.name} — V&N` }],
  }),
  component: CaseDetail,
});

const tabs = ["Resumo", "Prazos", "Documentos", "Petições", "Tarefas", "Insights da IA", "Histórico"] as const;
type Tab = (typeof tabs)[number];

function CaseDetail() {
  const { caseItem: c } = Route.useLoaderData();
  const [tab, setTab] = useState<Tab>("Resumo");

  const deadlines = deadlinesForCase(c.id);
  const tasks = tasksForCase(c.id);
  const docs = documentsForCase(c.id);
  const pets = petitionsForCase(c.id);
  const ins = insightsForCase(c.id);

  return (
    <>
      <Link to="/app/casos" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[var(--gold)]">
        <ArrowLeft className="h-4 w-4" /> Voltar para casos
      </Link>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="label-caps text-muted-foreground">{c.type}</p>
            <h1 className="mt-1 font-serif text-3xl">{c.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {c.client} · {c.processNumber}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusBadge status={c.status} />
              <PriorityBadge priority={c.priority} />
              <span className="text-xs text-muted-foreground">Responsável: {c.responsible}</span>
              <span className="text-xs text-[var(--gold)]">Próx. prazo: {c.nextDeadline}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/app/peticoes" className="inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-4 py-2 text-sm font-medium text-white">
              <Sparkles className="h-4 w-4" /> Criar petição com IA
            </Link>
            <button className="inline-flex items-center gap-2 rounded-md border border-[var(--gold)] px-4 py-2 text-sm font-medium text-[var(--gold)]">
              <Plus className="h-4 w-4" /> Adicionar prazo
            </button>
            <button className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm">
              <Plus className="h-4 w-4" /> Adicionar tarefa
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 border-b border-border">
        <div className="flex flex-wrap gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                "relative px-4 py-3 text-sm font-medium transition-colors " +
                (tab === t ? "text-[var(--gold)]" : "text-muted-foreground hover:text-foreground")
              }
            >
              {t}
              {tab === t && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[var(--gold)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {tab === "Resumo" && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
              <h3 className="font-serif text-xl">Descrição do caso</h3>
              <p className="mt-3 text-sm text-foreground/80">{c.description}</p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Cliente" value={c.client} />
                <Field label="Número do processo" value={c.processNumber} />
                <Field label="Responsável" value={c.responsible} />
                <Field label="Data de criação" value={c.createdAt} />
                <Field label="Status atual" value={c.status} />
                <Field label="Próximo prazo" value={c.nextDeadline} />
              </dl>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-serif text-xl">Linha do tempo recente</h3>
              <ol className="mt-4 space-y-4">
                {[
                  { t: "Petição protocolada", d: "Há 2 dias" },
                  { t: "Documento juntado pelo cliente", d: "Há 4 dias" },
                  { t: "Tarefa criada por Marina", d: "Há 6 dias" },
                  { t: "Caso criado", d: c.createdAt },
                ].map((e, idx) => (
                  <li key={idx} className="relative pl-5">
                    <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-[var(--gold)]" />
                    <p className="text-sm">{e.t}</p>
                    <p className="text-xs text-muted-foreground">{e.d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {tab === "Prazos" && (
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40 text-left">
                <tr className="label-caps text-muted-foreground">
                  <th className="px-4 py-3">Título</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Responsável</th>
                  <th className="px-4 py-3">Prioridade</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Vencimento</th>
                </tr>
              </thead>
              <tbody>
                {deadlines.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">Nenhum prazo cadastrado.</td></tr>
                ) : deadlines.map((d) => (
                  <tr key={d.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium">{d.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.type}</td>
                    <td className="px-4 py-3">{d.responsible}</td>
                    <td className="px-4 py-3"><PriorityBadge priority={d.priority} /></td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                    <td className="px-4 py-3 text-[var(--gold)]">{d.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "Documentos" && (
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="font-serif text-lg">Documentos do caso</p>
              <button className="inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-3 py-1.5 text-xs font-medium text-white">
                <Upload className="h-3.5 w-3.5" /> Enviar documento
              </button>
            </div>
            {docs.length === 0 ? (
              <div className="px-4 py-12 text-center text-sm text-muted-foreground">Nenhum documento anexado.</div>
            ) : (
              <ul className="divide-y divide-border">
                {docs.map((d) => (
                  <li key={d.id} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="grid h-9 w-9 place-items-center rounded-md bg-muted text-muted-foreground">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{d.name}</p>
                        <p className="text-xs text-muted-foreground">{d.type} · {d.uploadedAt} · {d.uploadedBy}</p>
                      </div>
                    </div>
                    <button className="text-xs text-[var(--gold)] hover:underline">Usar como contexto da IA</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === "Petições" && (
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="font-serif text-lg">Petições geradas</p>
              <Link to="/app/peticoes" className="inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-3 py-1.5 text-xs font-medium text-white">
                <Sparkles className="h-3.5 w-3.5" /> Gerar nova petição
              </Link>
            </div>
            {pets.length === 0 ? (
              <div className="px-4 py-12 text-center text-sm text-muted-foreground">Nenhuma petição gerada para este caso ainda.</div>
            ) : (
              <ul className="divide-y divide-border">
                {pets.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div>
                      <p className="font-medium">{p.type}</p>
                      <p className="text-xs text-muted-foreground">{p.responsible} · {p.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={p.status} />
                      <button className="text-xs text-[var(--gold)] hover:underline">Abrir prévia</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === "Tarefas" && (
          <div className="rounded-xl border border-border bg-card">
            {tasks.length === 0 ? (
              <div className="px-4 py-12 text-center text-sm text-muted-foreground">Nenhuma tarefa vinculada.</div>
            ) : (
              <ul className="divide-y divide-border">
                {tasks.map((t) => (
                  <li key={t.id} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div>
                      <p className="font-medium">{t.title}</p>
                      <p className="text-xs text-muted-foreground">{t.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <PriorityBadge priority={t.priority} />
                      <StatusBadge status={t.status} />
                      <span className="hidden text-xs text-muted-foreground sm:inline">{t.dueDate}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === "Insights da IA" && (
          <div className="grid gap-3 lg:grid-cols-2">
            {[...ins, {
              id: "extra-1",
              caseId: c.id,
              message: "Faltam documentos importantes para fortalecer a petição inicial.",
              level: "warning" as const,
            }, {
              id: "extra-2",
              caseId: c.id,
              message: "A IA recomenda revisar os fundamentos antes da próxima manifestação.",
              level: "info" as const,
            }].map((i) => (
              <InsightCard key={i.id} insight={i} />
            ))}
          </div>
        )}

        {tab === "Histórico" && (
          <div className="rounded-xl border border-border bg-card p-6">
            <ol className="space-y-5">
              {[
                { t: "Petição de manifestação gerada com IA", d: "Hoje, 10:42", icon: Sparkles },
                { t: "Status alterado para 'Aguardando documento'", d: "Ontem, 16:10", icon: Clock },
                { t: "Documento juntado: Decisão interlocutória.pdf", d: "Há 2 dias", icon: FileText },
                { t: "Prazo cadastrado: Manifestação sobre laudo pericial", d: "Há 4 dias", icon: Clock },
                { t: "Caso criado", d: c.createdAt, icon: Plus },
              ].map((e, i) => (
                <li key={i} className="relative flex gap-4 pl-2">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#111c2a] text-[var(--gold)]">
                    <e.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{e.t}</p>
                    <p className="text-xs text-muted-foreground">{e.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label-caps text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  );
}
