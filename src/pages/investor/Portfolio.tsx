import { MetricCard } from "@/components/MetricCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { HOLDINGS, PORTFOLIO_HISTORY } from "@/lib/mockData";
import { inr } from "@/lib/format";
import { Briefcase, TrendingUp, Wallet, Coins } from "lucide-react";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const RANGES = ["1W", "1M", "3M", "6M", "1Y", "All"] as const;

const Portfolio = () => {
  const [range, setRange] = useState<(typeof RANGES)[number]>("6M");
  const invested = HOLDINGS.reduce((s, h) => s + h.invested, 0);
  const current = HOLDINGS.reduce((s, h) => s + h.currentValue, 0);
  const yieldEarned = HOLDINGS.reduce((s, h) => s + h.yieldEarned, 0);
  const gain = current - invested;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My Portfolio</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Real-time view of your tokenized holdings.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={<Briefcase className="h-5 w-5" />} label="Total Invested" value={inr(invested)} />
        <MetricCard icon={<Wallet className="h-5 w-5" />} label="Current Value" value={inr(current)} delta={{ value: `${((gain / invested) * 100).toFixed(1)}%`, positive: gain >= 0 }} />
        <MetricCard icon={<TrendingUp className="h-5 w-5" />} label="Unrealized Gain" value={inr(gain)} delta={{ value: inr(gain), positive: gain >= 0 }} />
        <MetricCard icon={<Coins className="h-5 w-5" />} label="Yield Earned" value={inr(yieldEarned)} />
      </div>

      <SectionCard
        title="Portfolio Performance"
        action={
          <div className="flex gap-1 rounded-lg border border-border bg-card-2 p-1">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium",
                  range === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        }
      >
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <AreaChart data={PORTFOLIO_HISTORY} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(239 84% 67%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(239 84% 67%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} width={50} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                formatter={(v: number) => [inr(v), "Value"]}
              />
              <Area type="monotone" dataKey="value" stroke="hsl(239 84% 67%)" strokeWidth={2} fill="url(#g)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="Holdings">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="pb-3 font-medium">Asset</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium text-right">Tokens</th>
                <th className="pb-3 font-medium text-right">Invested</th>
                <th className="pb-3 font-medium text-right">Current Value</th>
                <th className="pb-3 font-medium text-right">Gain / Loss</th>
                <th className="pb-3 font-medium text-right">Yield</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {HOLDINGS.map((h) => {
                const g = h.currentValue - h.invested;
                const pct = (g / h.invested) * 100;
                return (
                  <tr key={h.assetId} className="hover:bg-card-2/40">
                    <td className="py-3 font-medium">{h.assetName}</td>
                    <td className="py-3"><StatusBadge status={h.type} /></td>
                    <td className="py-3 text-right tabular">{h.tokens}</td>
                    <td className="py-3 text-right tabular">{inr(h.invested)}</td>
                    <td className="py-3 text-right tabular">{inr(h.currentValue)}</td>
                    <td className={cn("py-3 text-right tabular font-medium", g >= 0 ? "text-success" : "text-destructive")}>
                      {g >= 0 ? "▲" : "▼"} {inr(Math.abs(g))} ({pct.toFixed(1)}%)
                    </td>
                    <td className="py-3 text-right tabular text-success">{inr(h.yieldEarned)}</td>
                    <td className="py-3 text-right">
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">View</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
};

export default Portfolio;
