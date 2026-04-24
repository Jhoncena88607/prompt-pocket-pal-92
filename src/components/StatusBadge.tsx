import { cn } from "@/lib/utils";

type Variant = "pending" | "compliance" | "confirmed" | "settled" | "failed" | "info" | "neutral";

const map: Record<Variant, string> = {
  pending: "bg-warning/15 text-warning border-warning/30",
  compliance: "bg-info/15 text-info border-info/30",
  confirmed: "bg-success/15 text-success border-success/30",
  settled: "bg-primary/15 text-primary border-primary/30",
  failed: "bg-destructive/15 text-destructive border-destructive/30",
  info: "bg-info/15 text-info border-info/30",
  neutral: "bg-muted text-muted-foreground border-border",
};

export const StatusBadge = ({
  status,
  className,
}: {
  status: string;
  className?: string;
}) => {
  const key = status.toLowerCase();
  let variant: Variant = "neutral";
  if (key.includes("pend")) variant = "pending";
  else if (key.includes("compl")) variant = key.includes("clear") ? "confirmed" : "compliance";
  else if (key.includes("confirm")) variant = "confirmed";
  else if (key.includes("settl") || key.includes("paid") || key.includes("released")) variant = "settled";
  else if (key.includes("fail") || key.includes("suspend") || key.includes("hold") || key.includes("loss")) variant = "failed";
  else if (key.includes("active") || key.includes("passed")) variant = "confirmed";
  else if (key.includes("upcoming") || key.includes("processing") || key.includes("escrow")) variant = "pending";
  else if (key.includes("l1")) variant = "settled";
  else if (key.includes("l2")) variant = "info";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tabular",
        map[variant],
        className
      )}
    >
      {status}
    </span>
  );
};
