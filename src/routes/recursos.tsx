import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public/PublicLayout";
import {
  Sparkles,
  Briefcase,
  CalendarClock,
  Bell,
  Brain,
  CheckSquare,
  FileText,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/recursos")({
  head: () => ({
    meta: [
      { title: "Recursos — Vasconcelos & Nogueira" },
      { name: "description", content: "Conheça os recursos da plataforma jurídica inteligente." },
      { property: "og:title", content: "Recursos — Vasconcelos & Nogueira" },
      { property: "og:description", content: "IA, hub de casos, prazos, documentos e muito mais." },
      { property: "og:url", content: "/recursos" },
    ],
    links: [{ rel: "canonical", href: "/recursos" }],
  }),
  component: ResourcesPage,
});

const blocks = [
  { icon: Sparkles, title: "IA para petições", desc: "Gere documentos contextualizados a partir do caso, dos documentos vinculados e do tom desejado." },
  { icon: Briefcase, title: "Hub de casos", desc: "Reúna dados do cliente, status, prazos, documentos e histórico em uma única tela." },
  { icon: CalendarClock, title: "Hub de prazos", desc: "Visualize prazos críticos, atrasados e ordinários em tabela e calendário." },
  { icon: Bell, title: "Alertas por e-mail", desc: "Avisos antes do vencimento, resumos diários e alertas de casos parados." },
  { icon: Brain, title: "Insights inteligentes", desc: "Recomendações estratégicas a partir do andamento e dos documentos." },
  { icon: CheckSquare, title: "Tarefas por caso", desc: "Distribuição clara de responsabilidades, com kanban e tabela." },
  { icon: FileText, title: "Documentos centralizados", desc: "Anexe documentos ao caso e use-os como contexto para a IA." },
  { icon: Users, title: "Usuários e permissões", desc: "Permissões granulares para sócios, advogados, assistentes e clientes." },
];

function ResourcesPage() {
  return (
    <PublicLayout>
      <section className="bg-[#111c2a] py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="label-caps text-[var(--gold)]">Recursos da plataforma</p>
          <h1 className="mt-2 font-serif text-5xl">Tudo o que sua operação jurídica precisa</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Funcionalidades pensadas para escritórios e equipes jurídicas que valorizam
            organização, controle e inteligência.
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2">
          {blocks.map((b) => (
            <div key={b.title} className="flex gap-4 rounded-xl border border-border bg-card p-6">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#111c2a] text-[var(--gold)]">
                <b.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-7xl px-6 text-center">
          <Link to="/contato" className="inline-flex items-center justify-center rounded-md bg-[var(--gold)] px-6 py-3 text-sm font-medium text-white">
            Solicitar demonstração
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
