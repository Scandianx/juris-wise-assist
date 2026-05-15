import { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Insight } from "@/lib/mock/data";

const levelClass = {
  info: "border-l-[var(--gold)]",
  warning: "border-l-[var(--warning)]",
  danger: "border-l-[var(--danger)]",
} as const;

export function InsightCard({
  insight,
  action,
  className,
}: {
  insight: Insight;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-border border-l-4 bg-card p-4",
        levelClass[insight.level],
        className,
      )}
    >
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#111c2a] text-[var(--gold)]">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="label-caps text-muted-foreground">Insight da IA</p>
        <p className="mt-1 text-sm text-foreground">{insight.message}</p>
      </div>
      {action}
    </div>
  );
}
