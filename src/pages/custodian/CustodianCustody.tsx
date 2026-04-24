import { MetricCard } from "@/components/MetricCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ASSETS } from "@/lib/mockData";
import { inrCompact } from "@/lib/format";
import { Building2, Shield, FileCheck2, Vault } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustodianCustody = () => (
  <div className="mx-auto max-w-7xl space-y-6">
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Asset Custody</h1>
      <p className="mt-1 text-sm text-muted-foreground">Tokenized assets held under custody and their on-chain status.</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard icon={<Building2 className="h-5 w-5" />} label="Assets Under Custody" value={String(ASSETS.length)} />
      <MetricCard icon={<Vault className="h-5 w-5" />} label="Total Value" value={inrCompact(ASSETS.reduce((s, a) => s + a.totalValue, 0))} />
      <MetricCard icon={<Shield className="h-5 w-5" />} label="Insured Coverage" value="100%" />
      <MetricCard icon={<FileCheck2 className="h-5 w-5" />} label="Audit Status" value="Current" />
    </div>

    <SectionCard title="Custody Ledger">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="pb-3 font-medium">Asset</th>
              <th className="pb-3 font-medium">Issuer</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium text-right">Tokens</th>
              <th className="pb-3 font-medium text-right">Total Value</th>
              <th className="pb-3 font-medium">Audit</th>
              <th className="pb-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ASSETS.map((a) => (
              <tr key={a.id} className="hover:bg-card-2/40">
                <td className="py-3 font-medium">{a.name}</td>
                <td className="py-3 text-muted-foreground">{a.issuer}</td>
                <td className="py-3 text-muted-foreground">{a.type}</td>
                <td className="py-3 text-right tabular">{a.totalTokens.toLocaleString()}</td>
                <td className="py-3 text-right tabular">{inrCompact(a.totalValue)}</td>
                <td className="py-3"><StatusBadge status="Active" /></td>
                <td className="py-3 text-right">
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">Audit Trail</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  </div>
);

export default CustodianCustody;
