import { MetricCard } from "@/components/MetricCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ESCROW } from "@/lib/mockData";
import { inr, inrCompact } from "@/lib/format";
import { Wallet, Vault, CheckCircle2, AlertTriangle } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";

const FLOW = [
  { day: "Mon", inflow: 1200000, outflow: 800000 },
  { day: "Tue", inflow: 1450000, outflow: 950000 },
  { day: "Wed", inflow: 1750000, outflow: 1100000 },
  { day: "Thu", inflow: 1320000, outflow: 1250000 },
  { day: "Fri", inflow: 1900000, outflow: 1400000 },
  { day: "Sat", inflow: 980000, outflow: 700000 },
  { day: "Sun", inflow: 620000, outflow: 480000 },
];

const CustodianDashboard = () => (
  <div className="mx-auto max-w-7xl space-y-6">
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Custodian Console</h1>
      <p className="mt-1 text-sm text-muted-foreground">Escrow, settlements and compliance oversight.</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard icon={<Wallet className="h-5 w-5" />} label="Total AUM" value={inrCompact(48500000000)} />
      <MetricCard icon={<Vault className="h-5 w-5" />} label="In Escrow" value={inrCompact(12400000)} />
      <MetricCard icon={<CheckCircle2 className="h-5 w-5" />} label="Settled (MTD)" value={inrCompact(96200000)} delta={{ value: "8%", positive: true }} />
      <MetricCard icon={<AlertTriangle className="h-5 w-5" />} label="Flagged" value="3" delta={{ value: "1 new", positive: false }} />
    </div>

    <SectionCard title="Fund Flow (this week)">
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <AreaChart data={FLOW}>
            <defs>
              <linearGradient id="in" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142 71% 45%)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="hsl(142 71% 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="out" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0 84% 60%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(0 84% 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} width={50} />
            <Tooltip
              contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
              formatter={(v: number) => inr(v)}
            />
            <Area type="monotone" dataKey="inflow" stroke="hsl(142 71% 45%)" fill="url(#in)" strokeWidth={2} />
            <Area type="monotone" dataKey="outflow" stroke="hsl(0 84% 60%)" fill="url(#out)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>

    <SectionCard title="Escrow Management">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="pb-3 font-medium">Order ID</th>
              <th className="pb-3 font-medium">Investor</th>
              <th className="pb-3 font-medium">Asset</th>
              <th className="pb-3 font-medium text-right">Amount</th>
              <th className="pb-3 font-medium">Received</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ESCROW.map((e) => (
              <tr key={e.id} className="hover:bg-card-2/40">
                <td className="py-3 font-mono text-xs">{e.id}</td>
                <td className="py-3 font-medium">{e.investor}</td>
                <td className="py-3 text-muted-foreground">{e.asset}</td>
                <td className="py-3 text-right tabular">{inr(e.amount)}</td>
                <td className="py-3 text-muted-foreground tabular">{e.received}</td>
                <td className="py-3"><StatusBadge status={e.status} /></td>
                <td className="py-3 text-right space-x-1">
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">Validate</Button>
                  <Button size="sm" className="h-7 bg-gradient-primary px-2 text-xs">Release</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  </div>
);

export default CustodianDashboard;
