import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { MetricCard } from "@/components/MetricCard";
import { BROKERS } from "@/lib/mockData";
import { Network, Users, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BrokerNetwork = () => (
  <div className="mx-auto max-w-7xl space-y-6">
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Broker Network</h1>
      <p className="mt-1 text-sm text-muted-foreground">Your distribution network across regions.</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard icon={<Network className="h-5 w-5" />} label="Total Brokers" value="32" />
      <MetricCard icon={<Users className="h-5 w-5" />} label="Active" value="27" delta={{ value: "3 this week", positive: true }} />
      <MetricCard icon={<MapPin className="h-5 w-5" />} label="Regions Covered" value="4" />
      <MetricCard icon={<TrendingUp className="h-5 w-5" />} label="Avg Investors / Broker" value="14" />
    </div>

    <SectionCard
      title="All Brokers"
      action={
        <div className="flex gap-2">
          <Input placeholder="Search broker..." className="h-9 w-56" />
          <Button size="sm" className="bg-gradient-primary">+ Invite Broker</Button>
        </div>
      }
    >
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  </div>
);

export default BrokerNetwork;
