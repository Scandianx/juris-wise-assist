import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public/PublicLayout";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Vasconcelos & Nogueira" },
      { name: "description", content: "Perguntas frequentes sobre a plataforma jurídica." },
      { property: "og:title", content: "FAQ — Vasconcelos & Nogueira" },
      { property: "og:description", content: "Tire dúvidas sobre IA, prazos, segurança e usuários." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FaqPage,
});

const faqs = [
  { q: "A plataforma substitui o advogado?", a: "Não. A IA atua como copiloto, apoiando a produção, organização e revisão de documentos sob supervisão humana." },
  { q: "Posso cadastrar vários usuários?", a: "Sim. O escritório pode adicionar advogados, assistentes, sócios e clientes com permissões diferentes." },
  { q: "Os prazos são enviados por e-mail?", a: "Sim. Você configura quando e para quem os alertas devem ser enviados, com regras por prioridade." },
  { q: "A IA gera petições automaticamente?", a: "Sim, com base no contexto do caso e nos documentos vinculados. O texto é sempre editável antes do uso." },
  { q: "É possível vincular documentos aos casos?", a: "Sim. Cada caso tem seu repositório próprio, e os documentos podem servir de contexto para a IA." },
  { q: "A plataforma é segura?", a: "Sim. Adotamos boas práticas de segurança, criptografia em repouso e em trânsito, e controle de acessos." },
  { q: "Posso exportar minhas petições?", a: "Sim. As petições podem ser exportadas em formato editável para uso fora da plataforma." },
  { q: "Há período de teste?", a: "Sim. Após a demonstração, oferecemos um período guiado de avaliação." },
];

function FaqPage() {
  return (
    <PublicLayout>
      <section className="bg-[#111c2a] py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="label-caps text-[var(--gold)]">FAQ</p>
          <h1 className="mt-2 font-serif text-5xl">Perguntas frequentes</h1>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-3xl space-y-3 px-6">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-card p-5 open:shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                <span>{f.q}</span>
                <span className="grid h-7 w-7 place-items-center rounded-full border border-border text-[var(--gold)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
