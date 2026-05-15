import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public/PublicLayout";
import { Check } from "lucide-react";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos — Vasconcelos & Nogueira" },
      { name: "description", content: "Planos sob medida para advogados autônomos, escritórios e operações enterprise." },
      { property: "og:title", content: "Planos — Vasconcelos & Nogueira" },
      { property: "og:description", content: "Escolha o plano ideal para sua operação jurídica." },
      { property: "og:url", content: "/planos" },
    ],
    links: [{ rel: "canonical", href: "/planos" }],
  }),
  component: PlansPage,
});

const plans = [
  {
    name: "Individual",
    price: "Sob consulta",
    description: "Para advogados autônomos.",
    items: ["Hub de casos e prazos", "Petições com IA", "Alertas por e-mail", "1 usuário", "Suporte por e-mail"],
  },
  {
    name: "Escritório",
    price: "A partir de",
    description: "Para equipes que precisam de colaboração.",
    items: [
      "Tudo do Individual",
      "Até 15 usuários",
      "Permissões granulares",
      "Insights da IA",
      "Documentos centralizados",
      "Suporte prioritário",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Sob consulta",
    description: "Para grandes operações jurídicas.",
    items: ["Usuários ilimitados", "SSO e auditoria", "SLA dedicado", "Onboarding assistido", "API e integrações"],
  },
];

function PlansPage() {
  return (
    <PublicLayout>
      <section className="bg-[#111c2a] py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="label-caps text-[var(--gold)]">Planos</p>
          <h1 className="mt-2 font-serif text-5xl">Escolha o plano ideal</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Estrutura flexível para advogados autônomos, escritórios em crescimento e operações
            jurídicas de grande porte.
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={
                "flex flex-col rounded-2xl border bg-card p-7 " +
                (p.highlighted
                  ? "border-[var(--gold)] shadow-xl shadow-[var(--gold)]/10 ring-1 ring-[var(--gold)]/20"
                  : "border-border")
              }
            >
              {p.highlighted && (
                <span className="mb-3 inline-flex w-fit rounded-full bg-[var(--gold)]/12 px-2.5 py-0.5 text-[11px] font-medium text-[var(--gold)]">
                  Mais escolhido
                </span>
              )}
              <p className="font-serif text-2xl">{p.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              <p className="mt-5 font-serif text-3xl">{p.price}</p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                {p.items.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[var(--gold)]" /> {i}
                  </li>
                ))}
              </ul>
              <Link
                to="/contato"
                className={
                  "mt-6 inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium " +
                  (p.highlighted
                    ? "bg-[var(--gold)] text-white hover:opacity-90"
                    : "border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)]/10")
                }
              >
                Falar com a equipe
              </Link>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
