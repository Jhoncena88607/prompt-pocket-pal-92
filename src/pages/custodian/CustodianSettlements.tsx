import { MetricCard } from "@/components/MetricCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { inr, inrCompact } from "@/lib/format";
import { CheckCircle2, Clock, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const SETTLEMENTS = [
  { id: "STL-9821", order: "ORD-10487", asset: "Sovereign Green Bond", investor: "Rahul Shah", amount: 75000, initiated: "2025-04-22 09:14", status: "Settled", txn: "0xa12f…b8e2" },
  { id: "STL-9820", order: "ORD-10421", asset: "Prestige Tech Park", investor: "Neha Kapoor", amount: 150000, initiated: "2025-04-22 08:42", status: "Settled", txn: "0x9c4d…71a0" },
  { id: "STL-9819", order: "ORD-10512", asset: "Adani Highway InvIT", investor: "Priya Iyer", amount: 60000, initiated: "2025-04-22 08:11", status: "Processing", txn: "—" },
  { id: "STL-9818", order: "ORD-10530", asset: "Godrej BKC", investor: "Arjun Mehta", amount: 100000, initiated: "2025-04-21 19:36", status: "Pending", txn: "—" },
  { id: "STL-9817", order: "ORD-10401", asset: "DLF Cyber City", investor: "Karan Singh", amount: 65000, initiated: "2025-04-21 18:02", status: "Failed", txn: "—" },
];

const CustodianSettlements = () => (
  <div className="mx-auto max-w-7xl space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settlement Monitor</h1>
        <p className="mt-1 text-sm text-muted-foreground">Real-time settlement and reconciliation pipeline.</p>
      </div>
      <Button variant="outline" size="sm">
        <RefreshCw className="mr-2 h-4 w-4" /> Refresh
      </Button>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard icon={<CheckCircle2 className="h-5 w-5" />} label="Settled (24h)" value={inrCompact(96200000)} delta={{ value: "8%", positive: true }} />
      <MetricCard icon={<Clock className="h-5 w-5" />} label="Pending" value="12" />
      <MetricCard icon={<RefreshCw className="h-5 w-5" />} label="Processing" value="4" />
      <MetricCard icon={<AlertTriangle className="h-5 w-5" />} label="Failed" value="1" delta={{ value: "needs review", positive: false }} />
    </div>

    <SectionCard title="Recent Settlements">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="pb-3 font-medium">Settlement ID</th>
              <th className="pb-3 font-medium">Order</th>
              <th className="pb-3 font-medium">Asset</th>
              <th className="pb-3 font-medium">Investor</th>
              <th className="pb-3 font-medium text-right">Amount</th>
              <th className="pb-3 font-medium">Initiated</th>
              <th className="pb-3 font-medium">Txn Hash</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {SETTLEMENTS.map((s) => (
              <tr key={s.id} className="hover:bg-card-2/40">
                <td className="py-3 font-mono text-xs">{s.id}</td>
                <td className="py-3 font-mono text-xs text-muted-foreground">{s.order}</td>
                <td className="py-3 font-medium">{s.asset}</td>
                <td className="py-3 text-muted-foreground">{s.investor}</td>
                <td className="py-3 text-right tabular">{inr(s.amount)}</td>
                <td className="py-3 text-muted-foreground tabular">{s.initiated}</td>
                <td className="py-3 font-mono text-xs text-primary">{s.txn}</td>
                <td className="py-3"><StatusBadge status={s.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  </div>
);

export default CustodianSettlements;
