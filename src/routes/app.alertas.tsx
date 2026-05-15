import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";

export const Route = createFileRoute("/app/alertas")({
  head: () => ({ meta: [{ title: "Alertas — Vasconcelos & Nogueira" }] }),
  component: AlertsPage,
});

const rules = [
  { id: "r1", label: "Avisar 7 dias antes do prazo", on: true },
  { id: "r2", label: "Avisar 3 dias antes do prazo", on: true },
  { id: "r3", label: "Avisar 1 dia antes do prazo", on: true },
  { id: "r4", label: "Avisar no dia do prazo", on: true },
  { id: "r5", label: "Enviar resumo diário", on: false },
  { id: "r6", label: "Enviar resumo semanal", on: true },
  { id: "r7", label: "Enviar insights importantes da IA por e-mail", on: true },
  { id: "r8", label: "Enviar alerta de caso parado", on: false },
  { id: "r9", label: "Enviar alerta de tarefas atrasadas", on: true },
];

function AlertsPage() {
  const [state, setState] = useState(() => Object.fromEntries(rules.map((r) => [r.id, r.on])));
  return (
    <>
      <PageHeader
        eyebrow="Configurações"
        title="Alertas e notificações"
        description="Defina como e quando sua equipe será notificada."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <h3 className="font-serif text-xl">Regras de notificação por e-mail</h3>
          <p className="text-sm text-muted-foreground">Ative apenas o que faz sentido para sua operação.</p>
          <ul className="mt-5 divide-y divide-border">
            {rules.map((r) => (
              <li key={r.id} className="flex items-center justify-between py-3">
                <span className="text-sm">{r.label}</span>
                <button
                  onClick={() => setState((s) => ({ ...s, [r.id]: !s[r.id] }))}
                  className={"relative h-6 w-11 rounded-full transition-colors " + (state[r.id] ? "bg-[var(--gold)]" : "bg-muted")}
                  aria-pressed={state[r.id]}
                >
                  <span className={"absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all " + (state[r.id] ? "left-5" : "left-0.5")} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-serif text-xl">Preferências</h3>
            <div className="mt-4 space-y-3">
              <Field label="Horário preferido" type="time" defaultValue="08:30" />
              <Field label="E-mail principal" type="email" defaultValue="contato@vneadvogados.com.br" />
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Responsáveis</label>
                <select multiple className="h-28 w-full rounded-md border border-border bg-background px-2 py-2 text-sm">
                  <option>Dra. Marina Azevedo</option>
                  <option>Dr. Rafael Monteiro</option>
                  <option>Ana Clara Souza</option>
                  <option>Felipe Andrade</option>
                </select>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-serif text-xl">Alertas por prioridade</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex justify-between"><span>Alta prioridade</span><span className="text-[var(--gold)]">Imediato</span></li>
              <li className="flex justify-between"><span>Média prioridade</span><span className="text-muted-foreground">Diário</span></li>
              <li className="flex justify-between"><span>Baixa prioridade</span><span className="text-muted-foreground">Semanal</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="rounded-md bg-[var(--gold)] px-5 py-2.5 text-sm font-medium text-white">Salvar alterações</button>
      </div>
    </>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</label>
      <input {...props} className="w-full rounded-md border border-border bg-background px-2.5 py-2 text-sm focus:border-[var(--gold)] focus:outline-none" />
    </div>
  );
}
