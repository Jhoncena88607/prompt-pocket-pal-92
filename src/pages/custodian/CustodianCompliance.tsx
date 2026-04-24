import { MetricCard } from "@/components/MetricCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Shield, AlertTriangle, FileCheck2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LOGS = [
  { id: "CMP-3201", time: "2025-04-22 09:14", type: "AML Check", subject: "ORD-10487", outcome: "Cleared", officer: "K. Rao" },
  { id: "CMP-3200", time: "2025-04-22 08:42", type: "OFAC Screen", subject: "INV-2041", outcome: "Cleared", officer: "K. Rao" },
  { id: "CMP-3199", time: "2025-04-22 08:11", type: "OFAC Screen", subject: "ORD-10512", outcome: "Flagged", officer: "S. Bhatt" },
  { id: "CMP-3198", time: "2025-04-21 19:36", type: "KYC Re-verify", subject: "INV-2027", outcome: "Pending", officer: "—" },
  { id: "CMP-3197", time: "2025-04-21 18:02", type: "Wallet Audit", subject: "0x9c4d…71a0", outcome: "Cleared", officer: "K. Rao" },
  { id: "CMP-3196", time: "2025-04-21 14:10", type: "Source of Funds", subject: "ORD-10530", outcome: "Pending", officer: "S. Bhatt" },
];

const CustodianCompliance = () => (
  <div className="mx-auto max-w-7xl space-y-6">
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Compliance Log</h1>
      <p className="mt-1 text-sm text-muted-foreground">Immutable record of all compliance actions and outcomes.</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard icon={<Shield className="h-5 w-5" />} label="Checks (24h)" value="142" />
      <MetricCard icon={<FileCheck2 className="h-5 w-5" />} label="Cleared" value="136" delta={{ value: "96%", positive: true }} />
      <MetricCard icon={<AlertTriangle className="h-5 w-5" />} label="Flagged" value="3" delta={{ value: "review", positive: false }} />
      <MetricCard icon={<FileCheck2 className="h-5 w-5" />} label="Pending" value="3" />
    </div>

    <SectionCard
      title="Audit Trail"
      action={
        <div className="flex gap-2">
          <Input placeholder="Search subject or officer..." className="h-9 w-64" />
          <Button size="sm" variant="outline"><Filter className="mr-1 h-3.5 w-3.5" /> Filter</Button>
          <Button size="sm" variant="outline">Export</Button>
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="pb-3 font-medium">Log ID</th>
              <th className="pb-3 font-medium">Timestamp</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Subject</th>
              <th className="pb-3 font-medium">Outcome</th>
              <th className="pb-3 font-medium">Officer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {LOGS.map((l) => (
              <tr key={l.id} className="hover:bg-card-2/40">
                <td className="py-3 font-mono text-xs">{l.id}</td>
                <td className="py-3 text-muted-foreground tabular">{l.time}</td>
                <td className="py-3 font-medium">{l.type}</td>
                <td className="py-3 font-mono text-xs text-muted-foreground">{l.subject}</td>
                <td className="py-3"><StatusBadge status={l.outcome} /></td>
                <td className="py-3 text-muted-foreground">{l.officer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  </div>
);

export default CustodianCompliance;
