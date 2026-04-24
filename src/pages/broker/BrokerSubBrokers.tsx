import { MetricCard } from "@/components/MetricCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { BROKERS } from "@/lib/mockData";
import { Users, UserPlus, Layers, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inr } from "@/lib/format";

const SUBS = BROKERS.filter((b) => b.level.includes("L2"));

const BrokerSubBrokers = () => (
  <div className="mx-auto max-w-7xl space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Sub-broker Management</h1>
        <p className="mt-1 text-sm text-muted-foreground">Onboard, manage and track your sub-broker network.</p>
      </div>
      <Button className="bg-gradient-primary">
        <UserPlus className="mr-2 h-4 w-4" /> Add Sub-broker
      </Button>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard icon={<Users className="h-5 w-5" />} label="Sub-brokers" value={String(SUBS.length)} />
      <MetricCard icon={<Layers className="h-5 w-5" />} label="L2 Active" value={String(SUBS.filter(s => s.status === "Active").length)} />
      <MetricCard icon={<UserPlus className="h-5 w-5" />} label="Investors via L2" value="124" delta={{ value: "8%", positive: true }} />
      <MetricCard icon={<Coins className="h-5 w-5" />} label="Override Earned" value={inr(48200)} />
    </div>

    <SectionCard title="Sub-brokers">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">ID</th>
              <th className="pb-3 font-medium">Region</th>
              <th className="pb-3 font-medium text-right">Investors</th>
              <th className="pb-3 font-medium text-right">Commission %</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {SUBS.map((b) => (
              <tr key={b.id} className="hover:bg-card-2/40">
                <td className="py-3 font-medium">{b.name}</td>
                <td className="py-3 font-mono text-xs text-muted-foreground">{b.id}</td>
                <td className="py-3 text-muted-foreground">{b.region}</td>
                <td className="py-3 text-right tabular">{b.investors}</td>
                <td className="py-3 text-right tabular">{b.commission}%</td>
                <td className="py-3"><StatusBadge status={b.status} /></td>
                <td className="py-3 text-right space-x-1">
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">View</Button>
                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs">Manage</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  </div>
);

export default BrokerSubBrokers;
