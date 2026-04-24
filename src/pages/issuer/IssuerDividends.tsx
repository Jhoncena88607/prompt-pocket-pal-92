import { MetricCard } from "@/components/MetricCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ISSUER_ASSETS } from "@/lib/mockData";
import { inr, inrCompact } from "@/lib/format";
import { Banknote, CalendarClock, TrendingUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const DISTRIBUTIONS = [
  { id: "DIST-08", asset: "Prestige Tech Park", date: "2025-04-01", total: 4_200_000, perToken: 28, holders: 482, status: "Paid" },
  { id: "DIST-07", asset: "DLF Cyber City", date: "2025-04-05", total: 1_950_000, perToken: 30, holders: 312, status: "Paid" },
  { id: "DIST-06", asset: "Godrej BKC", date: "2025-05-28", total: 880_000, perToken: 22, holders: 158, status: "Processing" },
  { id: "DIST-05", asset: "Prestige Tech Park", date: "2025-01-01", total: 3_980_000, perToken: 26, holders: 466, status: "Paid" },
];

const IssuerDividends = () => (
  <div className="mx-auto max-w-7xl space-y-6">
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Dividend Management</h1>
      <p className="mt-1 text-sm text-muted-foreground">Schedule and distribute payouts to token holders.</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard icon={<Banknote className="h-5 w-5" />} label="Distributed (YTD)" value={inrCompact(11020000)} />
      <MetricCard icon={<CalendarClock className="h-5 w-5" />} label="Next Payout" value="May 28" />
      <MetricCard icon={<TrendingUp className="h-5 w-5" />} label="Avg Yield" value="10.4%" delta={{ value: "0.6%", positive: true }} />
      <MetricCard icon={<Send className="h-5 w-5" />} label="Holders" value="952" />
    </div>

    <SectionCard
      title="Schedule Distribution"
      action={<Button size="sm" className="bg-gradient-primary"><Send className="mr-2 h-4 w-4" /> New Distribution</Button>}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {ISSUER_ASSETS.map((a) => (
          <div key={a.id} className="rounded-xl border border-border bg-card-2 p-4">
            <div className="text-sm font-semibold">{a.name}</div>
            <div className="text-xs text-muted-foreground">Last paid · {inr(a.expectedReturn * 1000)}</div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-card p-2">
                <div className="text-xs text-muted-foreground">Tokens</div>
                <div className="text-sm font-semibold tabular">{a.fundedTokens.toLocaleString()}</div>
              </div>
              <div className="rounded-lg bg-card p-2">
                <div className="text-xs text-muted-foreground">Yield</div>
                <div className="text-sm font-semibold tabular text-success">{a.expectedReturn}%</div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="mt-3 w-full">Deposit Dividend</Button>
          </div>
        ))}
      </div>
    </SectionCard>

    <SectionCard title="Distribution History">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="pb-3 font-medium">Distribution</th>
              <th className="pb-3 font-medium">Asset</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium text-right">Total</th>
              <th className="pb-3 font-medium text-right">Per Token</th>
              <th className="pb-3 font-medium text-right">Holders</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {DISTRIBUTIONS.map((d) => (
              <tr key={d.id} className="hover:bg-card-2/40">
                <td className="py-3 font-mono text-xs">{d.id}</td>
                <td className="py-3 font-medium">{d.asset}</td>
                <td className="py-3 text-muted-foreground tabular">{d.date}</td>
                <td className="py-3 text-right tabular">{inr(d.total)}</td>
                <td className="py-3 text-right tabular">{inr(d.perToken)}</td>
                <td className="py-3 text-right tabular">{d.holders}</td>
                <td className="py-3"><StatusBadge status={d.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  </div>
);

export default IssuerDividends;
