import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Briefcase,
  CalendarClock,
  Bell,
  Brain,
  CheckSquare,
  FileText,
  Users,
  ShieldCheck,
  ArrowRight,
  Check,
  Scale,
  TrendingUp,
} from "lucide-react";
import { PublicLayout } from "@/components/public/PublicLayout";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadges";
import { InsightCard } from "@/components/InsightCard";
import { insights, deadlines } from "@/lib/mock/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vasconcelos & Nogueira — Hub jurídico inteligente com IA" },
      {
        name: "description",
        content:
          "Plataforma SaaS jurídica para organizar casos, controlar prazos e produzir petições com inteligência artificial.",
      },
      { property: "og:title", content: "Vasconcelos & Nogueira — Hub jurídico inteligente" },
      {
        property: "og:description",
        content:
          "Organize casos, acompanhe prazos e gere petições com IA em uma plataforma jurídica premium.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

const features = [
  { icon: Sparkles, title: "IA para petições", desc: "Geração assistida com base no contexto do caso." },
  { icon: Briefcase, title: "Hub de casos", desc: "Tudo sobre cada processo em um único lugar." },
  { icon: CalendarClock, title: "Hub de prazos", desc: "Visão consolidada de prazos críticos e ordinários." },
  { icon: Bell, title: "Alertas por e-mail", desc: "Avisos automáticos antes do vencimento." },
  { icon: Brain, title: "Insights inteligentes", desc: "Recomendações estratégicas a partir do caso." },
  { icon: CheckSquare, title: "Tarefas por caso", desc: "Distribuição clara de responsabilidades." },
  { icon: FileText, title: "Documentos centralizados", desc: "Repositório jurídico com contexto para a IA." },
  { icon: Users, title: "Usuários e permissões", desc: "Controle granular para sócios, advogados e clientes." },
];

const benefits = [
  "Reduza o risco de perder prazos críticos",
  "Acelere a produção de petições com apoio de IA",
  "Centralize informações jurídicas e documentos",
  "Organize a operação para equipes e escritórios",
  "Tenha visão estratégica e em tempo real dos casos",
  "Acompanhe tarefas, responsáveis e andamentos",
];

function LandingPage() {
  return (
    <PublicLayout>
      <Hero />
      <FeaturesSection />
      <AiSection />
      <CasesSection />
      <DeadlinesSection />
      <BenefitsSection />
      <PlansSection />
      <FaqPreview />
      <CtaBand />
    </PublicLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#111c2a] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(187,151,100,0.6), transparent 40%), radial-gradient(circle at 80% 60%, rgba(187,151,100,0.4), transparent 45%)",
        }}
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 text-xs text-[var(--gold)]">
            <Scale className="h-3.5 w-3.5" />
            Hub jurídico inteligente
          </div>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl">
            Gestão jurídica inteligente com{" "}
            <span className="text-[var(--gold)]">IA</span>, prazos e casos em um só lugar.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75">
            Organize casos, acompanhe prazos, gere petições com inteligência artificial e receba
            insights estratégicos para tomar decisões com mais segurança.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[var(--gold)]/20 transition-opacity hover:opacity-90"
            >
              Solicitar demonstração <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/recursos"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--gold)]/40 px-6 py-3 text-sm font-medium text-[var(--gold)] transition-colors hover:bg-[var(--gold)]/10"
            >
              Conhecer recursos
            </Link>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6 text-white/70">
            <div>
              <p className="font-serif text-2xl text-[var(--gold)]">+12 mil</p>
              <p className="text-xs">prazos monitorados</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-[var(--gold)]">+3 mil</p>
              <p className="text-xs">petições com IA</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-[var(--gold)]">98%</p>
              <p className="text-xs">cumprimento de prazos</p>
            </div>
          </div>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="relative">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="label-caps text-[var(--gold)]">Painel de operação</p>
            <p className="font-serif text-xl text-white">Dashboard jurídico</p>
          </div>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { l: "Casos ativos", v: "128" },
            { l: "Prazos 7d", v: "24" },
            { l: "Petições IA", v: "57" },
          ].map((m) => (
            <div key={m.l} className="rounded-lg border border-white/10 bg-[#0c1622] p-3">
              <p className="label-caps text-white/50">{m.l}</p>
              <p className="mt-1 font-serif text-2xl text-[var(--gold)]">{m.v}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-white/10 bg-[#0c1622] p-4">
          <p className="label-caps text-white/50 mb-3">Próximos prazos</p>
          <ul className="space-y-2.5">
            {deadlines.slice(0, 3).map((d) => (
              <li key={d.id} className="flex items-center justify-between text-sm">
                <div className="min-w-0">
                  <p className="truncate text-white/90">{d.title}</p>
                  <p className="truncate text-xs text-white/50">{d.caseName}</p>
                </div>
                <span className="ml-3 shrink-0 text-xs text-[var(--gold)]">{d.dueDate}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating insight card */}
      <div className="absolute -left-6 -bottom-8 hidden w-72 rounded-xl border border-white/15 bg-white p-4 shadow-2xl md:block">
        <InsightCard insight={insights[0]} />
      </div>

      {/* Floating petition card */}
      <div className="absolute -right-6 -top-8 hidden w-60 rounded-xl border border-white/15 bg-white p-4 shadow-2xl md:block">
        <p className="label-caps text-[var(--gold)]">Petição gerada</p>
        <p className="mt-1 font-serif text-base text-foreground">Contestação — Almeida</p>
        <div className="mt-3 space-y-1">
          <div className="h-1.5 w-full rounded bg-muted" />
          <div className="h-1.5 w-5/6 rounded bg-muted" />
          <div className="h-1.5 w-4/6 rounded bg-muted" />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <StatusBadge status="Em revisão" />
          <span className="text-xs text-muted-foreground">2 min</span>
        </div>
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className="border-b border-border py-20" id="recursos">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label-caps text-[var(--gold)]">Recursos principais</p>
          <h2 className="mt-2 font-serif text-4xl">Tudo que sua operação jurídica precisa</h2>
          <p className="mt-3 text-muted-foreground">
            Funcionalidades pensadas para escritórios e equipes jurídicas que valorizam organização,
            controle e inteligência.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--gold)]/40 hover:shadow-md"
            >
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#111c2a] text-[var(--gold)]">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif text-xl">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AiSection() {
  const items = [
    "Gerar petições contextualizadas",
    "Revisar textos com sugestões inteligentes",
    "Sugerir próximos passos no processo",
    "Identificar riscos e pontos de atenção",
    "Resumir casos longos em segundos",
    "Criar checklists processuais",
  ];
  return (
    <section className="bg-[#111c2a] py-20 text-white" id="ia">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <p className="label-caps text-[var(--gold)]">IA Jurídica</p>
          <h2 className="mt-2 font-serif text-4xl text-white">
            Inteligência que apoia o profissional, sem substituí-lo.
          </h2>
          <p className="mt-4 text-white/75">
            Nossa IA é treinada para o contexto jurídico e atua como copiloto da equipe — sempre sob
            supervisão humana, com transparência e segurança.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {items.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                <Check className="mt-0.5 h-4 w-4 text-[var(--gold)]" /> {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="space-y-3">
            <InsightCard insight={insights[0]} />
            <InsightCard insight={insights[2]} />
            <InsightCard insight={insights[4]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CasesSection() {
  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        <div>
          <p className="label-caps text-[var(--gold)]">Hub de casos</p>
          <h2 className="mt-2 font-serif text-4xl">Cada caso, uma central completa</h2>
          <p className="mt-3 text-muted-foreground">
            Reúna em um único lugar dados do cliente, número do processo, status, documentos,
            prazos, tarefas, petições, histórico e insights da IA.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {[
              "Dados do cliente",
              "Número do processo",
              "Status e prioridade",
              "Documentos e prazos",
              "Tarefas vinculadas",
              "Petições geradas",
              "Histórico completo",
              "Insights inteligentes",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-foreground/85">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="label-caps text-muted-foreground">Caso #c-1001</p>
              <p className="font-serif text-xl">Ação de Cobrança — Almeida Comércio Ltda.</p>
            </div>
            <StatusBadge status="Ativo" />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <MetricCard label="Prazos" value="3" />
            <MetricCard label="Tarefas" value="4" />
            <MetricCard label="Documentos" value="12" />
          </div>
          <div className="mt-5 space-y-3 border-t border-border pt-4">
            <div className="flex items-center justify-between text-sm">
              <span>Contestação à petição inicial</span>
              <PriorityBadge priority="Alta" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Reunir documentos do cliente</span>
              <PriorityBadge priority="Alta" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Cálculo de juros atualizados</span>
              <PriorityBadge priority="Média" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeadlinesSection() {
  const items = [
    "Visualização de prazos críticos em destaque",
    "Alertas automáticos por e-mail",
    "Acompanhamento por responsável",
    "Agenda semanal e mensal",
    "Prazos vinculados a casos e clientes",
    "Notificações configuráveis por prioridade",
  ];
  return (
    <section className="bg-[#0f1825] py-20 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="label-caps text-[var(--gold)]">Próximos prazos</p>
            <ul className="mt-4 divide-y divide-white/10">
              {deadlines.slice(0, 5).map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <div className="min-w-0">
                    <p className="truncate text-white">{d.title}</p>
                    <p className="truncate text-xs text-white/55">{d.caseName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <PriorityBadge priority={d.priority} />
                    <span className="text-xs text-[var(--gold)]">{d.dueDate}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="label-caps text-[var(--gold)]">Hub de prazos</p>
          <h2 className="mt-2 font-serif text-4xl text-white">Nunca mais perca um prazo crítico</h2>
          <p className="mt-3 text-white/75">
            Centralize todos os prazos da equipe com alertas inteligentes, calendário e visão por
            responsável.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-white/80">
            {items.map((i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-[var(--gold)]" /> {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label-caps text-[var(--gold)]">Benefícios</p>
          <h2 className="mt-2 font-serif text-4xl">Resultados reais para o escritório</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <div
              key={b}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-6"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--gold)]/12 text-[var(--gold)]">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="label-caps text-muted-foreground">0{i + 1}</p>
                <p className="mt-1 text-foreground">{b}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const plans = [
  {
    name: "Individual",
    price: "Sob consulta",
    description: "Para advogados autônomos.",
    items: ["Hub de casos e prazos", "Petições com IA", "Alertas por e-mail", "1 usuário"],
  },
  {
    name: "Escritório",
    price: "A partir de",
    description: "Para equipes que precisam de colaboração.",
    items: ["Tudo do Individual", "Até 15 usuários", "Permissões granulares", "Insights da IA"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Sob consulta",
    description: "Para grandes operações jurídicas.",
    items: ["Usuários ilimitados", "SSO e auditoria", "SLA dedicado", "Onboarding assistido"],
  },
];

function PlansSection() {
  return (
    <section className="bg-background py-20" id="planos">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label-caps text-[var(--gold)]">Planos</p>
          <h2 className="mt-2 font-serif text-4xl">Escolha o plano ideal para sua operação</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
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
              <p className="mt-5 font-serif text-3xl text-foreground">{p.price}</p>
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
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "A plataforma substitui o advogado?",
    a: "Não. A IA atua como copiloto, apoiando a produção, organização e revisão de documentos sob supervisão humana.",
  },
  {
    q: "Posso cadastrar vários usuários?",
    a: "Sim. O escritório pode adicionar advogados, assistentes, sócios e clientes com permissões diferentes.",
  },
  {
    q: "Os prazos são enviados por e-mail?",
    a: "Sim. Você configura quando e para quem os alertas devem ser enviados, com regras por prioridade.",
  },
  {
    q: "A IA gera petições automaticamente?",
    a: "Sim, com base no contexto do caso e nos documentos vinculados. O texto é sempre editável antes do uso.",
  },
  {
    q: "É possível vincular documentos aos casos?",
    a: "Sim. Cada caso tem seu repositório próprio, e os documentos podem servir de contexto para a IA.",
  },
  {
    q: "A plataforma é segura?",
    a: "Sim. Adotamos boas práticas de segurança, criptografia em repouso e em trânsito, e controle de acessos.",
  },
];

function FaqPreview() {
  return (
    <section className="border-b border-border py-20" id="faq">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="label-caps text-[var(--gold)]">Perguntas frequentes</p>
          <h2 className="mt-2 font-serif text-4xl">Tire suas dúvidas</h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-border bg-card p-5 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                <span>{f.q}</span>
                <span className="grid h-7 w-7 place-items-center rounded-full border border-border text-[var(--gold)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="bg-[#111c2a] py-16 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:text-left">
        <div className="flex items-start gap-4">
          <ShieldCheck className="hidden h-12 w-12 text-[var(--gold)] md:block" />
          <div>
            <h2 className="font-serif text-3xl">Pronto para elevar a operação do seu escritório?</h2>
            <p className="mt-2 text-white/70">
              Agende uma demonstração guiada e veja a plataforma aplicada ao seu fluxo real.
            </p>
          </div>
        </div>
        <Link
          to="/contato"
          className="inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-6 py-3 text-sm font-medium text-white"
        >
          Solicitar demonstração <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
