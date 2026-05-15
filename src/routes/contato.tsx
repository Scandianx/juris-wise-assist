import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public/PublicLayout";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Vasconcelos & Nogueira" },
      { name: "description", content: "Fale com nosso time e agende uma demonstração da plataforma." },
      { property: "og:title", content: "Contato — Vasconcelos & Nogueira" },
      { property: "og:description", content: "Solicite uma demonstração guiada da plataforma jurídica." },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PublicLayout>
      <section className="bg-[#111c2a] py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="label-caps text-[var(--gold)]">Contato</p>
          <h1 className="mt-2 font-serif text-5xl">Vamos conversar</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/75">
            Solicite uma demonstração guiada e veja a plataforma aplicada à realidade do seu
            escritório.
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.2fr_1fr]">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome completo" placeholder="Seu nome" />
              <Field label="E-mail" type="email" placeholder="voce@escritorio.com" />
              <Field label="Telefone" placeholder="(11) 99999-9999" />
              <Field label="Escritório" placeholder="Nome do escritório" />
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium">Mensagem</label>
              <textarea
                rows={5}
                placeholder="Conte-nos sobre sua operação"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]"
              />
            </div>
            <button className="mt-6 inline-flex items-center justify-center rounded-md bg-[var(--gold)] px-6 py-3 text-sm font-medium text-white">
              Solicitar demonstração
            </button>
          </form>
          <aside className="space-y-6">
            <Info icon={<Mail className="h-5 w-5" />} title="E-mail" value="contato@vneadvogados.com.br" />
            <Info icon={<Phone className="h-5 w-5" />} title="Telefone" value="+55 (11) 4002-8922" />
            <Info icon={<MapPin className="h-5 w-5" />} title="Endereço" value="Av. Paulista, 1000 — São Paulo/SP" />
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]"
      />
    </div>
  );
}

function Info({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#111c2a] text-[var(--gold)]">{icon}</div>
      <div>
        <p className="label-caps text-muted-foreground">{title}</p>
        <p className="mt-1 text-foreground">{value}</p>
      </div>
    </div>
  );
}
