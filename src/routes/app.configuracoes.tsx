import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import logo from "@/assets/logo-circular.png";

export const Route = createFileRoute("/app/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — Vasconcelos & Nogueira" }] }),
  component: SettingsPage,
});

const tabs = ["Perfil", "Escritório", "IA", "Segurança", "Plano"] as const;
type Tab = (typeof tabs)[number];

function SettingsPage() {
  const [tab, setTab] = useState<Tab>("Perfil");

  return (
    <>
      <PageHeader
        eyebrow="Configurações"
        title="Conta e escritório"
        description="Gerencie suas preferências, dados do escritório e configurações da plataforma."
      />

      <div className="mb-6 border-b border-border">
        <div className="flex flex-wrap gap-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={"relative px-4 py-3 text-sm font-medium " + (tab === t ? "text-[var(--gold)]" : "text-muted-foreground hover:text-foreground")}
            >
              {t}
              {tab === t && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[var(--gold)]" />}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        {tab === "Perfil" && (
          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <div className="text-center">
              <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-[#111c2a] font-serif text-3xl text-[var(--gold)]">MA</div>
              <p className="mt-3 font-serif text-lg">Marina Azevedo</p>
              <p className="text-sm text-muted-foreground">Sócia</p>
              <button className="mt-4 rounded-md border border-border px-3 py-1.5 text-xs">Trocar avatar</button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome" defaultValue="Marina Azevedo" />
              <Field label="E-mail" defaultValue="marina@vneadvogados.com.br" />
              <Field label="Cargo" defaultValue="Sócia fundadora" />
              <Field label="Escritório" defaultValue="Vasconcelos & Nogueira" />
              <Field label="Senha atual" type="password" defaultValue="********" />
              <Field label="Nova senha" type="password" placeholder="Nova senha" />
              <div className="sm:col-span-2 flex justify-end">
                <button className="rounded-md bg-[var(--gold)] px-5 py-2.5 text-sm font-medium text-white">Salvar alterações</button>
              </div>
            </div>
          </div>
        )}

        {tab === "Escritório" && (
          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <div className="text-center">
              <img src={logo} alt="V&N" className="mx-auto h-28 w-28" />
              <button className="mt-4 rounded-md border border-border px-3 py-1.5 text-xs">Trocar logo</button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome do escritório" defaultValue="Vasconcelos & Nogueira Advogados Associados" />
              <Field label="CNPJ" defaultValue="00.000.000/0001-00" />
              <Field label="Endereço" defaultValue="Av. Paulista, 1000 — São Paulo/SP" />
              <Field label="Telefone" defaultValue="(11) 4002-8922" />
              <div className="sm:col-span-2 flex justify-end">
                <button className="rounded-md bg-[var(--gold)] px-5 py-2.5 text-sm font-medium text-white">Salvar</button>
              </div>
            </div>
          </div>
        )}

        {tab === "IA" && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl">Preferências da IA</h3>
            <ToggleRow label="Sugerir melhorias automáticas em petições" on />
            <ToggleRow label="Identificar riscos antes de salvar documentos" on />
            <ToggleRow label="Gerar resumo automático ao abrir um caso" />
            <ToggleRow label="Permitir uso de documentos como contexto" on />
          </div>
        )}

        {tab === "Segurança" && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl">Segurança da conta</h3>
            <ToggleRow label="Autenticação em duas etapas (2FA)" on />
            <ToggleRow label="Receber alertas de novos acessos" on />
            <ToggleRow label="Sessão expira após 30 minutos de inatividade" />
            <button className="rounded-md border border-border px-4 py-2 text-sm">Encerrar todas as sessões</button>
          </div>
        )}

        {tab === "Plano" && (
          <div>
            <p className="label-caps text-muted-foreground">Plano atual</p>
            <p className="mt-1 font-serif text-3xl">Escritório</p>
            <p className="mt-1 text-sm text-muted-foreground">Faturamento mensal · Próxima renovação em 12 dias.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Stat label="Usuários" value="8 / 15" />
              <Stat label="Petições com IA" value="57 este mês" />
              <Stat label="Armazenamento" value="12 GB / 50 GB" />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <button className="rounded-md bg-[var(--gold)] px-5 py-2.5 text-sm font-medium text-white">Fazer upgrade</button>
              <button className="rounded-md border border-border px-5 py-2.5 text-sm">Gerenciar faturamento</button>
            </div>
          </div>
        )}
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

function ToggleRow({ label, on }: { label: string; on?: boolean }) {
  const [v, setV] = useState(!!on);
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
      <span className="text-sm">{label}</span>
      <button
        onClick={() => setV(!v)}
        className={"relative h-6 w-11 rounded-full transition-colors " + (v ? "bg-[var(--gold)]" : "bg-muted")}
      >
        <span className={"absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all " + (v ? "left-5" : "left-0.5")} />
      </button>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="label-caps text-muted-foreground">{label}</p>
      <p className="mt-1 font-serif text-xl">{value}</p>
    </div>
  );
}
