import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  delta?: { value: string; positive: boolean };
  className?: string;
}

export const MetricCard = ({ icon, label, value, delta, className }: MetricCardProps) => (
  <div className={cn("surface relative overflow-hidden rounded-xl border border-border p-5", className)}>
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    <div className="flex items-start justify-between">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      {delta && (
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium tabular",
            delta.positive
              ? "border-success/30 bg-success/15 text-success"
              : "border-destructive/30 bg-destructive/15 text-destructive"
          )}
        >
          {delta.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {delta.value}
        </span>
      )}
    </div>
    <div className="mt-5">
      <div className="text-2xl font-semibold tracking-tight tabular text-foreground">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  </div>
);
