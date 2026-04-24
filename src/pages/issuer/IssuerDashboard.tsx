import { MetricCard } from "@/components/MetricCard";
import { SectionCard } from "@/components/SectionCard";
import { ISSUER_ASSETS } from "@/lib/mockData";
import { inr, inrCompact } from "@/lib/format";
import { Building2, Users, Banknote, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";

const IssuerDashboard = () => (
  <div className="mx-auto max-w-7xl space-y-6">
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Issuer Console</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your tokenized assets, investors, and dividends.</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard icon={<Building2 className="h-5 w-5" />} label="Listed Assets" value={String(ISSUER_ASSETS.length)} />
      <MetricCard icon={<Users className="h-5 w-5" />} label="Investors" value="1,284" delta={{ value: "32 this week", positive: true }} />
      <MetricCard icon={<Banknote className="h-5 w-5" />} label="Capital Raised" value={inrCompact(124500000)} />
      <MetricCard icon={<Vote className="h-5 w-5" />} label="Active Proposals" value="2" />
    </div>

    <SectionCard
      title="My Assets"
      action={<Button size="sm" className="bg-gradient-primary">+ Create Asset</Button>}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {ISSUER_ASSETS.map((a) => {
          const pct = Math.round((a.fundedTokens / a.totalTokens) * 100);
          return (
            <div key={a.id} className="overflow-hidden rounded-xl border border-border bg-card-2">
              <img src={a.image} alt={a.name} className="h-32 w-full object-cover" />
              <div className="space-y-3 p-4">
                <div>
                  <div className="font-semibold">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.category} · {a.location}</div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{pct}% funded</span>
                    <span className="tabular text-muted-foreground">{inrCompact(a.fundedTokens * a.tokenPrice)}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline" className="text-xs">Investors</Button>
                  <Button size="sm" className="bg-gradient-primary text-xs">Deposit Dividend</Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  </div>
);

export default IssuerDashboard;
