import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public/PublicLayout";
import { InsightCard } from "@/components/InsightCard";
import { insights } from "@/lib/mock/data";
import { Brain, Check } from "lucide-react";

export const Route = createFileRoute("/ia-juridica")({
  head: () => ({
    meta: [
      { title: "IA Jurídica — Vasconcelos & Nogueira" },
      { name: "description", content: "Como a IA apoia advogados na produção de petições, revisão e análise estratégica de casos." },
      { property: "og:title", content: "IA Jurídica — Vasconcelos & Nogueira" },
      { property: "og:description", content: "Inteligência que apoia o profissional jurídico, sem substituí-lo." },
      { property: "og:url", content: "/ia-juridica" },
    ],
    links: [{ rel: "canonical", href: "/ia-juridica" }],
  }),
  component: AiPage,
});

const capabilities = [
  "Gerar petições contextualizadas",
  "Revisar e melhorar a linguagem jurídica",
  "Sugerir próximos passos no processo",
  "Identificar riscos e pontos de atenção",
  "Resumir casos longos em segundos",
  "Criar checklists processuais",
  "Analisar informações relevantes do caso",
  "Comparar versões de documentos",
];

function AiPage() {
  return (
    <PublicLayout>
      <section className="bg-[#111c2a] py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 text-xs text-[var(--gold)]">
            <Brain className="h-3.5 w-3.5" /> IA Jurídica
          </div>
          <h1 className="mt-4 font-serif text-5xl">
            Inteligência que apoia o profissional, <span className="text-[var(--gold)]">sem substituí-lo</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Nossa IA é treinada para o contexto jurídico e atua como copiloto da equipe, com
            transparência, segurança e supervisão humana.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl">O que a IA pode fazer pelo seu escritório</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {capabilities.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 text-[var(--gold)]" /> {c}
                </li>
              ))}
            </ul>
            <Link to="/contato" className="mt-8 inline-flex rounded-md bg-[var(--gold)] px-6 py-3 text-sm font-medium text-white">
              Solicitar demonstração
            </Link>
          </div>
          <div className="space-y-3">
            {insights.map((i) => <InsightCard key={i.id} insight={i} />)}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
