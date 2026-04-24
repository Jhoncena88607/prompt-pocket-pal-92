import { MetricCard } from "@/components/MetricCard";
import { SectionCard } from "@/components/SectionCard";
import { inr, inrCompact } from "@/lib/format";
import { Wallet, TrendingUp, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const FUNDS = [
  { name: "Prestige Tech Park", aum: 365000000, inflow: 12400000, outflow: 4200000 },
  { name: "DLF Cyber City", aum: 584000000, inflow: 18200000, outflow: 7800000 },
  { name: "Godrej BKC", aum: 215000000, inflow: 9600000, outflow: 1200000 },
  { name: "Sovereign Green Bond", aum: 910000000, inflow: 22000000, outflow: 8900000 },
  { name: "Adani Highway InvIT", aum: 476000000, inflow: 14500000, outflow: 5400000 },
];

const TREND = [
  { month: "Nov", aum: 42_000_000_000 },
  { month: "Dec", aum: 43_500_000_000 },
  { month: "Jan", aum: 44_800_000_000 },
  { month: "Feb", aum: 45_900_000_000 },
  { month: "Mar", aum: 47_200_000_000 },
  { month: "Apr", aum: 48_500_000_000 },
];

const CustodianFunds = () => (
  <div className="mx-auto max-w-7xl space-y-6">
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Fund Overview</h1>
      <p className="mt-1 text-sm text-muted-foreground">Aggregate assets under custody across all issuers.</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard icon={<Wallet className="h-5 w-5" />} label="Total AUM" value={inrCompact(48500000000)} delta={{ value: "2.8%", positive: true }} />
      <MetricCard icon={<TrendingUp className="h-5 w-5" />} label="Funds Tracked" value={String(FUNDS.length)} />
      <MetricCard icon={<ArrowDownToLine className="h-5 w-5" />} label="Inflow (MTD)" value={inrCompact(76700000)} />
      <MetricCard icon={<ArrowUpFromLine className="h-5 w-5" />} label="Outflow (MTD)" value={inrCompact(27500000)} />
    </div>

    <SectionCard title="AUM Trend">
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <AreaChart data={TREND}>
            <defs>
              <linearGradient id="aum" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(239 84% 67%)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="hsl(239 84% 67%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 10000000).toFixed(0)}Cr`} width={60} />
            <Tooltip
              contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
              formatter={(v: number) => inrCompact(v)}
            />
            <Area type="monotone" dataKey="aum" stroke="hsl(239 84% 67%)" fill="url(#aum)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>

    <SectionCard title="Fund Breakdown">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="pb-3 font-medium">Fund</th>
              <th className="pb-3 font-medium text-right">AUM</th>
              <th className="pb-3 font-medium text-right">Inflow (MTD)</th>
              <th className="pb-3 font-medium text-right">Outflow (MTD)</th>
              <th className="pb-3 font-medium text-right">Net</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {FUNDS.map((f) => (
              <tr key={f.name} className="hover:bg-card-2/40">
                <td className="py-3 font-medium">{f.name}</td>
                <td className="py-3 text-right tabular">{inr(f.aum)}</td>
                <td className="py-3 text-right tabular text-success">{inr(f.inflow)}</td>
                <td className="py-3 text-right tabular text-destructive">{inr(f.outflow)}</td>
                <td className="py-3 text-right tabular">{inr(f.inflow - f.outflow)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  </div>
);

export default CustodianFunds;
