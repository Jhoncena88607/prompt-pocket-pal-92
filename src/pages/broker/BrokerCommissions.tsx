import { MetricCard } from "@/components/MetricCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { inr } from "@/lib/format";
import { Coins, Hourglass, Wallet, TrendingUp } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";

const HISTORY = [
  { month: "Nov", value: 42000 },
  { month: "Dec", value: 51000 },
  { month: "Jan", value: 48000 },
  { month: "Feb", value: 62000 },
  { month: "Mar", value: 71000 },
  { month: "Apr", value: 84000 },
];

const PAYOUTS = [
  { id: "CMS-0421", asset: "Prestige Tech Park", investor: "Aarav Sharma", amount: 6250, rate: 2.5, date: "2025-04-22", status: "Paid" },
  { id: "CMS-0418", asset: "Sovereign Green Bond", investor: "Diya Patel", amount: 1875, rate: 2.5, date: "2025-04-18", status: "Paid" },
  { id: "CMS-0412", asset: "Adani Highway InvIT", investor: "Meera Nair", amount: 4500, rate: 2.5, date: "2025-04-12", status: "Processing" },
  { id: "CMS-0405", asset: "DLF Cyber City", investor: "Rohan Gupta", amount: 1125, rate: 2.5, date: "2025-04-05", status: "Pending" },
  { id: "CMS-0328", asset: "Godrej BKC", investor: "Karan Singh", amount: 2500, rate: 2.5, date: "2025-03-28", status: "Paid" },
];

const BrokerCommissions = () => (
  <div className="mx-auto max-w-7xl space-y-6">
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Commission Tracker</h1>
      <p className="mt-1 text-sm text-muted-foreground">Earnings across your investor base.</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard icon={<Coins className="h-5 w-5" />} label="Total Earned (YTD)" value={inr(358000)} delta={{ value: "12%", positive: true }} />
      <MetricCard icon={<Wallet className="h-5 w-5" />} label="Paid Out" value={inr(315500)} />
      <MetricCard icon={<Hourglass className="h-5 w-5" />} label="Pending" value={inr(42500)} />
      <MetricCard icon={<TrendingUp className="h-5 w-5" />} label="Avg Rate" value="2.3%" />
    </div>

    <SectionCard title="Monthly Earnings">
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <BarChart data={HISTORY}>
            <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} width={50} />
            <Tooltip
              contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
              formatter={(v: number) => [inr(v), "Commission"]}
            />
            <Bar dataKey="value" fill="hsl(239 84% 67%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>

    <SectionCard
      title="Payout History"
      action={<Button size="sm" variant="outline">Export CSV</Button>}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="pb-3 font-medium">Ref</th>
              <th className="pb-3 font-medium">Asset</th>
              <th className="pb-3 font-medium">Investor</th>
              <th className="pb-3 font-medium text-right">Rate</th>
              <th className="pb-3 font-medium text-right">Amount</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {PAYOUTS.map((p) => (
              <tr key={p.id} className="hover:bg-card-2/40">
                <td className="py-3 font-mono text-xs">{p.id}</td>
                <td className="py-3 font-medium">{p.asset}</td>
                <td className="py-3 text-muted-foreground">{p.investor}</td>
                <td className="py-3 text-right tabular">{p.rate}%</td>
                <td className="py-3 text-right tabular">{inr(p.amount)}</td>
                <td className="py-3 text-muted-foreground tabular">{p.date}</td>
                <td className="py-3"><StatusBadge status={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  </div>
);

export default BrokerCommissions;
