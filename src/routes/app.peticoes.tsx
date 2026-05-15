import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { cases } from "@/lib/mock/data";
import { Sparkles, Save, Download, Copy, RefreshCw, Wand2, FileText } from "lucide-react";

export const Route = createFileRoute("/app/peticoes")({
  head: () => ({ meta: [{ title: "Petições com IA — Vasconcelos & Nogueira" }] }),
  component: PetitionsPage,
});

const docTypes = [
  "Petição inicial",
  "Contestação",
  "Réplica",
  "Recurso",
  "Manifestação",
  "Notificação extrajudicial",
  "Contrato",
  "Documento personalizado",
];
const tones = ["Técnico", "Objetivo", "Persuasivo", "Formal"];

const aiActions = [
  { label: "Melhorar linguagem", icon: Wand2 },
  { label: "Deixar mais técnico", icon: Wand2 },
  { label: "Resumir", icon: Wand2 },
  { label: "Expandir", icon: Wand2 },
  { label: "Adicionar fundamentos", icon: Wand2 },
  { label: "Revisar coerência", icon: Wand2 },
  { label: "Criar versão final", icon: Wand2 },
  { label: "Gerar checklist", icon: Wand2 },
  { label: "Identificar riscos", icon: Wand2 },
];

const sample = `EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA __ª VARA CÍVEL DA COMARCA DE SÃO PAULO/SP

VASCONCELOS & NOGUEIRA ADVOGADOS ASSOCIADOS, sociedade já qualificada nos autos do processo em epígrafe, vem, respeitosamente, à presença de Vossa Excelência, apresentar CONTESTAÇÃO em face dos termos da inicial, pelos motivos de fato e de direito a seguir expostos.

I — DOS FATOS
A parte autora alega, em síntese, inadimplemento contratual relativo às notas fiscais nº 1023, 1024 e 1025. Contudo, conforme demonstrado pela documentação anexa, os valores foram regularmente quitados nas datas avençadas, restando descabida a presente cobrança.

II — DO DIREITO
Os documentos juntados aos autos demonstram, de forma cabal, o adimplemento da obrigação. O artigo 320 do Código Civil consagra o princípio da quitação, segundo o qual o pagamento extingue a obrigação...

III — DOS PEDIDOS
Diante do exposto, requer:
a) o recebimento e processamento da presente contestação;
b) a improcedência integral dos pedidos formulados na inicial;
c) a condenação da parte autora ao pagamento das custas processuais e honorários advocatícios.

Termos em que, pede deferimento.
São Paulo, ___ de ____________ de 2025.`;

function PetitionsPage() {
  const [generated, setGenerated] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setContent(sample);
      setGenerated(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      <PageHeader
        eyebrow="IA Jurídica"
        title="Petições com IA"
        description="Gere documentos jurídicos contextualizados com base no caso selecionado."
      />

      <div className="grid gap-4 lg:grid-cols-[320px_1fr_300px]">
        {/* Left: form */}
        <aside className="rounded-xl border border-border bg-card p-5">
          <p className="label-caps text-muted-foreground">Configuração</p>
          <h3 className="mt-1 font-serif text-lg">Nova petição</h3>

          <div className="mt-4 space-y-4">
            <Selector label="Caso" options={cases.map((c) => `${c.name}`)} />
            <Selector label="Tipo de documento" options={docTypes} />
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Fatos relevantes</label>
              <textarea rows={4} placeholder="Descreva os fatos centrais do caso" className="w-full rounded-md border border-border bg-background p-2 text-sm focus:border-[var(--gold)] focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Objetivo da petição</label>
              <textarea rows={3} placeholder="O que esta peça precisa alcançar?" className="w-full rounded-md border border-border bg-background p-2 text-sm focus:border-[var(--gold)] focus:outline-none" />
            </div>
            <Selector label="Tom do documento" options={tones} />
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Documentos de apoio</p>
              <div className="space-y-1.5">
                {["Contrato de Prestação.pdf", "Notas fiscais.pdf", "Comprovantes.pdf"].map((d) => (
                  <label key={d} className="flex items-center gap-2 rounded-md border border-border p-2 text-xs">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" /> {d}
                  </label>
                ))}
              </div>
            </div>
            <button onClick={handleGenerate} disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[var(--gold)] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60">
              <Sparkles className="h-4 w-4" /> {loading ? "Gerando…" : "Gerar prévia"}
            </button>
          </div>
        </aside>

        {/* Center: preview/editor */}
        <section className="rounded-xl border border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3">
            <div>
              <p className="label-caps text-muted-foreground">Documento</p>
              <p className="font-serif text-lg">Prévia da petição</p>
            </div>
            {generated && (
              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs hover:bg-muted"><Copy className="h-3.5 w-3.5" /> Copiar</button>
                <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs hover:bg-muted"><Download className="h-3.5 w-3.5" /> Exportar</button>
                <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs hover:bg-muted"><RefreshCw className="h-3.5 w-3.5" /> Nova versão</button>
                <button className="inline-flex items-center gap-1.5 rounded-md bg-[var(--gold)] px-3 py-1.5 text-xs font-medium text-white"><Save className="h-3.5 w-3.5" /> Salvar no caso</button>
              </div>
            )}
          </div>
          {!generated ? (
            <div className="flex min-h-[520px] flex-col items-center justify-center px-6 py-16 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--gold)]/10 text-[var(--gold)]">
                <Sparkles className="h-6 w-6" />
              </div>
              <p className="mt-4 font-serif text-xl">Sua petição aparecerá aqui</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Preencha os campos ao lado e clique em "Gerar prévia". O documento gerado será editável e contextual ao caso.
              </p>
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[600px] w-full resize-none rounded-b-xl bg-background p-6 font-serif text-[15px] leading-relaxed outline-none"
            />
          )}
        </section>

        {/* Right: AI panel */}
        <aside className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[#111c2a] text-[var(--gold)]"><Sparkles className="h-4 w-4" /></div>
            <div>
              <p className="label-caps text-muted-foreground">Assistente</p>
              <p className="font-serif text-lg leading-tight">IA contextual</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Sugestões inteligentes baseadas no caso selecionado e nos documentos vinculados.
          </p>
          <div className="mt-5">
            <p className="label-caps mb-2 text-muted-foreground">Ações rápidas</p>
            <div className="space-y-1.5">
              {aiActions.map((a) => (
                <button key={a.label} className="flex w-full items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 text-left text-xs hover:border-[var(--gold)]/40 hover:text-[var(--gold)]">
                  <span className="flex items-center gap-2"><a.icon className="h-3.5 w-3.5" /> {a.label}</span>
                  <span className="text-muted-foreground">→</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 rounded-md border border-[var(--gold)]/30 bg-[var(--gold)]/8 p-3 text-xs text-foreground/80">
            <p className="label-caps text-[var(--gold)]">Sugestão</p>
            <p className="mt-1">A IA recomenda incluir os documentos "Contrato de Prestação.pdf" e "Notas fiscais.pdf" como contexto para fortalecer os fundamentos de fato.</p>
          </div>
        </aside>
      </div>
    </>
  );
}

function Selector({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</label>
      <select className="w-full rounded-md border border-border bg-background px-2.5 py-2 text-sm focus:border-[var(--gold)] focus:outline-none">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
