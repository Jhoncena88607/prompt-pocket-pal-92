import { MetricCard } from "@/components/MetricCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { inr } from "@/lib/format";
import { Users, UserPlus, CheckCircle2, Hourglass } from "lucide-react";

const REFERRALS = [
  { id: "INV-2041", name: "Aarav Sharma", joined: "2025-04-21", invested: 250000, status: "Active" },
  { id: "INV-2038", name: "Diya Patel", joined: "2025-04-18", invested: 75000, status: "Active" },
  { id: "INV-2032", name: "Karan Singh", joined: "2025-04-12", invested: 0, status: "Pending" },
  { id: "INV-2027", name: "Meera Nair", joined: "2025-04-05", invested: 180000, status: "Active" },
  { id: "INV-2018", name: "Rohan Gupta", joined: "2025-03-28", invested: 45000, status: "Active" },
  { id: "INV-2009", name: "Sneha Rao", joined: "2025-03-22", invested: 0, status: "Pending" },
];

const BrokerReferrals = () => (
  <div className="mx-auto max-w-7xl space-y-6">
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">My Referrals</h1>
      <p className="mt-1 text-sm text-muted-foreground">Investors you've onboarded and their activity.</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard icon={<Users className="h-5 w-5" />} label="Total Referrals" value="248" />
      <MetricCard icon={<UserPlus className="h-5 w-5" />} label="This Month" value="18" delta={{ value: "5 vs last", positive: true }} />
      <MetricCard icon={<CheckCircle2 className="h-5 w-5" />} label="Converted" value="201" />
      <MetricCard icon={<Hourglass className="h-5 w-5" />} label="Pending KYC" value="9" />
    </div>

    <SectionCard title="Recent Referrals">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="pb-3 font-medium">Investor</th>
              <th className="pb-3 font-medium">ID</th>
              <th className="pb-3 font-medium">Joined</th>
              <th className="pb-3 font-medium text-right">Invested</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {REFERRALS.map((r) => (
              <tr key={r.id} className="hover:bg-card-2/40">
                <td className="py-3 font-medium">{r.name}</td>
                <td className="py-3 font-mono text-xs text-muted-foreground">{r.id}</td>
                <td className="py-3 text-muted-foreground tabular">{r.joined}</td>
                <td className="py-3 text-right tabular">{inr(r.invested)}</td>
                <td className="py-3"><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  </div>
);

export default BrokerReferrals;
