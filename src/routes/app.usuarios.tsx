import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { StatusBadge } from "@/components/StatusBadges";
import { users } from "@/lib/mock/data";
import { Plus, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/app/usuarios")({
  head: () => ({ meta: [{ title: "Usuários — Vasconcelos & Nogueira" }] }),
  component: UsersPage,
});

function UsersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Equipe"
        title="Usuários e permissões"
        description="Gerencie acessos, papéis e permissões da equipe jurídica."
        actions={
          <button className="inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-4 py-2 text-sm font-medium text-white">
            <Plus className="h-4 w-4" /> Novo usuário
          </button>
        }
      />

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40 text-left">
              <tr className="label-caps text-muted-foreground">
                <th className="px-4 py-3">Usuário</th>
                <th className="px-4 py-3">Cargo</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Permissões</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Último acesso</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-[#111c2a] text-[11px] font-semibold text-[var(--gold)]">
                        {u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{u.role}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-[11px]">
                      <ShieldCheck className="h-3 w-3 text-[var(--gold)]" /> {u.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {u.permissions.map((p) => (
                        <span key={p} className="rounded-full bg-[var(--gold)]/10 px-2 py-0.5 text-[10px] text-[var(--gold)]">{p}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground">{u.lastAccess}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
