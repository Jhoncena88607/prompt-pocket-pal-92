import { MetricCard } from "@/components/MetricCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { BROKERS } from "@/lib/mockData";
import { inr } from "@/lib/format";
import { Network, Users, Coins, Hourglass } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const COMMISSION_DATA = [
  { month: "Nov", value: 42000 },
  { month: "Dec", value: 51000 },
  { month: "Jan", value: 48000 },
  { month: "Feb", value: 62000 },
  { month: "Mar", value: 71000 },
  { month: "Apr", value: 84000 },
];

const BrokerDashboard = () => (
  <div className="mx-auto max-w-7xl space-y-6">
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Broker Console</h1>
      <p className="mt-1 text-sm text-muted-foreground">Track your network, referrals and commissions.</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard icon={<Network className="h-5 w-5" />} label="Network Size" value="32" delta={{ value: "+4 MoM", positive: true }} />
      <MetricCard icon={<Users className="h-5 w-5" />} label="Active Investors" value="248" />
      <MetricCard icon={<Coins className="h-5 w-5" />} label="Commission Earned" value={inr(358000)} delta={{ value: "12%", positive: true }} />
      <MetricCard icon={<Hourglass className="h-5 w-5" />} label="Pending Commission" value={inr(42500)} />
    </div>

    <SectionCard title="Monthly Commission Earnings">
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <BarChart data={COMMISSION_DATA}>
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

    <SectionCard title="Broker Network">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="pb-3 font-medium">Broker</th>
              <th className="pb-3 font-medium">ID</th>
              <th className="pb-3 font-medium">Level</th>
              <th className="pb-3 font-medium">Region</th>
              <th className="pb-3 font-medium text-right">Investors</th>
              <th className="pb-3 font-medium text-right">Commission %</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {BROKERS.map((b) => (
              <tr key={b.id} className="hover:bg-card-2/40">
                <td className="py-3 font-medium">{b.name}</td>
                <td className="py-3 font-mono text-xs text-muted-foreground">{b.id}</td>
                <td className="py-3"><StatusBadge status={b.level} /></td>
                <td className="py-3 text-muted-foreground">{b.region}</td>
                <td className="py-3 text-right tabular">{b.investors}</td>
                <td className="py-3 text-right tabular">{b.commission}%</td>
                <td className="py-3"><StatusBadge status={b.status} /></td>
                <td className="py-3 text-muted-foreground tabular">{b.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  </div>
);

export default BrokerDashboard;
