import { cn } from "@/lib/utils";
import type { CaseStatus, Priority, DeadlineStatus, TaskStatus } from "@/lib/mock/data";

const statusMap: Record<string, string> = {
  // Case statuses
  Ativo: "bg-[var(--success)]/12 text-[var(--success)] border-[var(--success)]/25",
  "Em análise": "bg-muted text-muted-foreground border-border",
  "Aguardando documento": "bg-[var(--warning)]/15 text-[#8a6113] border-[var(--warning)]/30",
  "Aguardando audiência": "bg-[var(--warning)]/15 text-[#8a6113] border-[var(--warning)]/30",
  Suspenso: "bg-muted text-muted-foreground border-border",
  Encerrado: "bg-muted text-muted-foreground border-border",
  // Deadline statuses
  Pendente: "bg-muted text-muted-foreground border-border",
  "Em andamento": "bg-[var(--gold)]/12 text-[var(--gold)] border-[var(--gold)]/30",
  Concluído: "bg-[var(--success)]/12 text-[var(--success)] border-[var(--success)]/25",
  Vencido: "bg-[var(--danger)]/12 text-[var(--danger)] border-[var(--danger)]/25",
  Urgente: "bg-[var(--danger)]/12 text-[var(--danger)] border-[var(--danger)]/25",
  // Task
  "Em revisão": "bg-[var(--gold)]/12 text-[var(--gold)] border-[var(--gold)]/30",
  // User
  Inativo: "bg-muted text-muted-foreground border-border",
  // Petition
  Rascunho: "bg-muted text-muted-foreground border-border",
  Final: "bg-[var(--success)]/12 text-[var(--success)] border-[var(--success)]/25",
  // Documents
  Arquivado: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({
  status,
  className,
}: {
  status: CaseStatus | DeadlineStatus | TaskStatus | string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        statusMap[status] ?? "bg-muted text-muted-foreground border-border",
        className,
      )}
    >
      {status}
    </span>
  );
}

const priorityMap: Record<Priority, string> = {
  Alta: "bg-[var(--danger)]/12 text-[var(--danger)] border-[var(--danger)]/25",
  Média: "bg-[var(--warning)]/15 text-[#8a6113] border-[var(--warning)]/30",
  Baixa: "bg-[var(--success)]/12 text-[var(--success)] border-[var(--success)]/25",
};

export function PriorityBadge({ priority, className }: { priority: Priority; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        priorityMap[priority],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {priority}
    </span>
  );
}
