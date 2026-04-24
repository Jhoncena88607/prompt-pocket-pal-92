import { MetricCard } from "@/components/MetricCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { DIVIDENDS } from "@/lib/mockData";
import { inr } from "@/lib/format";
import { Banknote, CalendarClock, TrendingUp, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dividends = () => {
  const total = DIVIDENDS.filter((d) => d.status === "Paid").reduce((s, d) => s + d.amount, 0);
  const upcoming = DIVIDENDS.filter((d) => d.status !== "Paid");

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dividends</h1>
        <p className="mt-1 text-sm text-muted-foreground">All payouts from your tokenized holdings.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={<Banknote className="h-5 w-5" />} label="Total Earned" value={inr(total)} />
        <MetricCard icon={<Coins className="h-5 w-5" />} label="Last Payout" value={inr(4200)} />
        <MetricCard icon={<CalendarClock className="h-5 w-5" />} label="Next Expected" value={inr(2925)} />
        <MetricCard icon={<TrendingUp className="h-5 w-5" />} label="Avg Yield" value="9.6%" delta={{ value: "0.4%", positive: true }} />
      </div>

      <SectionCard title="Upcoming Payouts">
        <div className="grid gap-4 md:grid-cols-3">
          {upcoming.map((d) => (
            <div key={d.id} className="rounded-xl border border-border bg-card-2 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{d.assetName}</div>
                <StatusBadge status={d.status} />
              </div>
              <div className="mt-3 text-2xl font-semibold tabular">{inr(d.amount)}</div>
              <div className="text-xs text-muted-foreground tabular">on {d.date}</div>
              <Button variant="outline" size="sm" className="mt-3 w-full">Set Reminder</Button>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Dividend History">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="pb-3 font-medium">Asset</th>
                <th className="pb-3 font-medium">Payout Date</th>
                <th className="pb-3 font-medium text-right">Amount</th>
                <th className="pb-3 font-medium text-right">Per Token</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {DIVIDENDS.map((d) => (
                <tr key={d.id} className="hover:bg-card-2/40">
                  <td className="py-3 font-medium">{d.assetName}</td>
                  <td className="py-3 text-muted-foreground tabular">{d.date}</td>
                  <td className="py-3 text-right tabular">{inr(d.amount)}</td>
                  <td className="py-3 text-right tabular">{inr(d.perToken)}</td>
                  <td className="py-3"><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
};

export default Dividends;
