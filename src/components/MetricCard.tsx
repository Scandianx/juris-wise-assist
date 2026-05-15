import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  hint,
  icon,
  accent,
  className,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
  accent?: "default" | "gold" | "danger" | "success";
  className?: string;
}) {
  const accentClass =
    accent === "gold"
      ? "text-[var(--gold)]"
      : accent === "danger"
        ? "text-[var(--danger)]"
        : accent === "success"
          ? "text-[var(--success)]"
          : "text-foreground";
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(17,28,42,0.04)] transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <p className="label-caps text-muted-foreground">{label}</p>
        {icon && <span className="text-[var(--gold)]">{icon}</span>}
      </div>
      <p className={cn("mt-3 font-serif text-4xl tracking-tight", accentClass)}>{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
