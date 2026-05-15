import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { documents } from "@/lib/mock/data";
import { Upload, FileText, Search } from "lucide-react";

export const Route = createFileRoute("/app/documentos")({
  head: () => ({ meta: [{ title: "Documentos — Vasconcelos & Nogueira" }] }),
  component: DocsPage,
});

function DocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Operação"
        title="Documentos"
        description="Repositório centralizado de documentos jurídicos vinculados aos casos."
        actions={
          <button className="inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-4 py-2 text-sm font-medium text-white">
            <Upload className="h-4 w-4" /> Enviar documento
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Buscar documento" className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm" />
        </div>
        <select className="h-9 rounded-md border border-border bg-background px-3 text-sm">
          <option>Todos os tipos</option>
          {["Procuração","Contrato","Comprovante","Documento pessoal","Petição","Decisão","Sentença","Outro"].map((t) => <option key={t}>{t}</option>)}
        </select>
        <select className="h-9 rounded-md border border-border bg-background px-3 text-sm">
          <option>Todos os casos</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40 text-left">
              <tr className="label-caps text-muted-foreground">
                <th className="px-4 py-3">Documento</th>
                <th className="px-4 py-3">Caso</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Enviado por</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-md bg-muted text-muted-foreground">
                        <FileText className="h-4 w-4" />
                      </div>
                      <p className="font-medium">{d.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{d.caseName}</td>
                  <td className="px-4 py-3">{d.type}</td>
                  <td className="px-4 py-3">{d.uploadedBy}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.uploadedAt}</td>
                  <td className="px-4 py-3"><button className="text-xs text-[var(--gold)] hover:underline">Usar como contexto da IA</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
