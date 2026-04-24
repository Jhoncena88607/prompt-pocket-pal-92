import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ASSETS } from "@/lib/mockData";
import { inr, inrCompact } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Share2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BrokerCatalog = () => {
  const { toast } = useToast();
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Asset Catalog</h1>
        <p className="mt-1 text-sm text-muted-foreground">Share assets with your investors and earn commission.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {ASSETS.map((a) => {
          const pct = Math.round((a.fundedTokens / a.totalTokens) * 100);
          return (
            <div key={a.id} className="surface overflow-hidden rounded-xl border border-border">
              <img src={a.image} alt={a.name} className="h-40 w-full object-cover" />
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.category} · {a.location}</div>
                  </div>
                  <StatusBadge status={a.risk} />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-card-2 p-2">
                    <div className="text-xs text-muted-foreground">Yield</div>
                    <div className="text-sm font-semibold tabular">{a.expectedReturn}%</div>
                  </div>
                  <div className="rounded-lg bg-card-2 p-2">
                    <div className="text-xs text-muted-foreground">Min</div>
                    <div className="text-sm font-semibold tabular">{inrCompact(a.minInvestment)}</div>
                  </div>
                  <div className="rounded-lg bg-card-2 p-2">
                    <div className="text-xs text-muted-foreground">Size</div>
                    <div className="text-sm font-semibold tabular">{inrCompact(a.totalValue)}</div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{pct}% funded</span>
                    <span className="tabular text-muted-foreground">{inr(a.fundedTokens * a.tokenPrice)}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(`https://fractiq.io/r/${a.id}`); toast({ title: "Referral link copied" }); }}>
                    <Copy className="mr-1 h-3.5 w-3.5" /> Copy link
                  </Button>
                  <Button size="sm" className="bg-gradient-primary" onClick={() => toast({ title: "Shared to network" })}>
                    <Share2 className="mr-1 h-3.5 w-3.5" /> Share
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrokerCatalog;
