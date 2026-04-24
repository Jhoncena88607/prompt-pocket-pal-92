import { useState } from "react";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ORDERS, type Order } from "@/lib/mockData";
import { inr } from "@/lib/format";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Check, Loader2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Open Order", "Compliance Check", "Funds Verified", "Tokens Allocated", "Settled"];

const stepIndexFor = (status: Order["status"]) => {
  switch (status) {
    case "Pending": return 0;
    case "Compliance": return 1;
    case "Confirmed": return 2;
    case "Settled": return 4;
    default: return 0;
  }
};

const Orders = () => {
  const [active, setActive] = useState<Order | null>(null);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track every order from compliance to settlement.
        </p>
      </div>

      <SectionCard title="Order Lifecycle">
        <ol className="flex flex-wrap items-center gap-2">
          {STEPS.map((s, i) => {
            const isActive = i === 1; // demo current step
            return (
              <li key={s} className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold tabular",
                    isActive
                      ? "border-primary bg-primary/15 text-primary animate-pulse-soft"
                      : i < 1
                      ? "border-success/40 bg-success/15 text-success"
                      : "border-border bg-card-2 text-muted-foreground"
                  )}
                >
                  {i + 1}
                </span>
                <span className={cn("text-xs", isActive ? "text-foreground" : "text-muted-foreground")}>{s}</span>
                {i < STEPS.length - 1 && <span className="hidden h-px w-8 bg-border sm:inline-block" />}
              </li>
            );
          })}
        </ol>
      </SectionCard>

      <SectionCard title="All Orders">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Asset</th>
                <th className="pb-3 font-medium text-right">Amount</th>
                <th className="pb-3 font-medium text-right">Tokens</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Compliance</th>
                <th className="pb-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ORDERS.map((o) => (
                <tr key={o.id} onClick={() => setActive(o)} className="cursor-pointer hover:bg-card-2/40">
                  <td className="py-3 font-mono text-xs">{o.id}</td>
                  <td className="py-3 font-medium">{o.assetName}</td>
                  <td className="py-3 text-right tabular">{inr(o.amount)}</td>
                  <td className="py-3 text-right tabular">{o.tokens}</td>
                  <td className="py-3"><StatusBadge status={o.status} /></td>
                  <td className="py-3">
                    <div className="flex items-center gap-2 text-[11px]">
                      {(["aml", "ofac", "wallet"] as const).map((k) => (
                        <span key={k} className={cn("inline-flex items-center gap-1", o.compliance[k] ? "text-success" : "text-warning")}>
                          {o.compliance[k] ? <Check className="h-3 w-3" /> : <Loader2 className="h-3 w-3 animate-spin" />}
                          {k.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground tabular">{o.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full sm:max-w-[480px] bg-background">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="font-mono text-base">{active.id}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="surface rounded-lg border border-border p-4">
                  <div className="text-sm font-semibold">{active.assetName}</div>
                  <div className="text-xs text-muted-foreground">{active.type}</div>
                  <div className="mt-3 grid grid-cols-3 gap-3 text-center text-xs">
                    <div>
                      <div className="text-muted-foreground">Tokens</div>
                      <div className="mt-0.5 font-semibold tabular">{active.tokens}</div>
                    </div>
                    <div className="border-x border-border">
                      <div className="text-muted-foreground">Price</div>
                      <div className="mt-0.5 font-semibold tabular">{inr(active.amount / active.tokens)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Total</div>
                      <div className="mt-0.5 font-semibold tabular">{inr(active.amount)}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status Timeline</div>
                  <ol className="space-y-3">
                    {[
                      "Order Created", "KYC Verified", "AML Cleared", "OFAC Cleared",
                      "Funds in Escrow", "Tokens Minted", "Settled",
                    ].map((step, i) => {
                      const max = stepIndexFor(active.status) + 2;
                      const done = i < max;
                      const inProg = i === max;
                      return (
                        <li key={step} className="flex items-start gap-3">
                          <span
                            className={cn(
                              "mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border",
                              done && "border-success/40 bg-success/15 text-success",
                              inProg && "border-primary/40 bg-primary/15 text-primary",
                              !done && !inProg && "border-border text-muted-foreground"
                            )}
                          >
                            {done ? <Check className="h-3 w-3" /> : inProg ? <Loader2 className="h-3 w-3 animate-spin" /> : <Circle className="h-2 w-2" />}
                          </span>
                          <div>
                            <div className={cn("text-sm", done || inProg ? "text-foreground" : "text-muted-foreground")}>{step}</div>
                            <div className="text-[10px] text-muted-foreground tabular">
                              {done ? `${active.createdAt} 14:0${i}` : inProg ? "in progress…" : "pending"}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Orders;
