import { MetricCard } from "@/components/MetricCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ALLOCATION, ASSETS, DIVIDENDS, ORDERS } from "@/lib/mockData";
import { inr } from "@/lib/format";
import { Briefcase, TrendingUp, Wallet, Layers, Sparkles, ArrowRight } from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from "recharts";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const recommended = ASSETS.slice(0, 3);
  const recentOrders = ORDERS.slice(0, 4);
  const upcomingDivs = DIVIDENDS.filter((d) => d.status !== "Paid").slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back, Arjun</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's how your tokenized portfolio is performing today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={<Wallet className="h-5 w-5" />} label="Total Portfolio Value" value={inr(482500)} delta={{ value: "2.3% MoM", positive: true }} />
        <MetricCard icon={<Briefcase className="h-5 w-5" />} label="Total Invested" value={inr(450000)} />
        <MetricCard icon={<TrendingUp className="h-5 w-5" />} label="Total Returns" value={inr(32500)} delta={{ value: "7.2%", positive: true }} />
        <MetricCard icon={<Layers className="h-5 w-5" />} label="Active Assets" value="7" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Portfolio Allocation" className="lg:col-span-1">
          <div className="flex items-center gap-6">
            <div className="h-44 w-44 shrink-0">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={ALLOCATION} dataKey="value" innerRadius={48} outerRadius={72} paddingAngle={2}>
                    {ALLOCATION.map((a) => (
                      <Cell key={a.name} fill={a.color} stroke="hsl(var(--card))" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="flex-1 space-y-2 text-sm">
              {ALLOCATION.map((a) => (
                <li key={a.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: a.color }} />
                    {a.name}
                  </span>
                  <span className="font-medium tabular">{a.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionCard>

        <SectionCard
          title="Recent Orders"
          className="lg:col-span-2"
          action={
            <Link to="/orders" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="pb-3 font-medium">Asset</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-card-2/40">
                    <td className="py-3 font-medium">{o.assetName}</td>
                    <td className="py-3 text-muted-foreground">{o.type}</td>
                    <td className="py-3 text-right tabular">{inr(o.amount)}</td>
                    <td className="py-3"><StatusBadge status={o.status} /></td>
                    <td className="py-3 text-muted-foreground tabular">{o.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Recommended For You"
        action={
          <span className="inline-flex items-center gap-1.5 text-xs text-primary">
            <Sparkles className="h-3.5 w-3.5" /> AI matched
          </span>
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          {recommended.map((a) => (
            <div key={a.id} className="group overflow-hidden rounded-xl border border-border bg-card-2 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant">
              <div className="relative h-32 overflow-hidden">
                <img src={a.image} alt={a.name} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <span className="absolute right-2 top-2 rounded-full border border-primary/40 bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary backdrop-blur">
                  {a.matchScore}% match
                </span>
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <div className="text-sm font-semibold">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.category} · {a.location}</div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Yield</span>
                  <span className="font-semibold text-success tabular">{a.expectedReturn}%</span>
                </div>
                <Button asChild size="sm" className="w-full bg-gradient-primary">
                  <Link to={`/assets/${a.id}`}>Invest Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Upcoming Dividends"
        action={<Link to="/dividends" className="text-xs text-primary hover:underline">View all</Link>}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="pb-3 font-medium">Asset</th>
                <th className="pb-3 font-medium text-right">Amount</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {upcomingDivs.map((d) => (
                <tr key={d.id}>
                  <td className="py-3 font-medium">{d.assetName}</td>
                  <td className="py-3 text-right tabular">{inr(d.amount)}</td>
                  <td className="py-3 text-muted-foreground tabular">{d.date}</td>
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

export default Dashboard;
