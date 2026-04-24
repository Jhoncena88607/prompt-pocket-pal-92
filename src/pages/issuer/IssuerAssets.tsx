import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ISSUER_ASSETS } from "@/lib/mockData";
import { inr, inrCompact } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const IssuerAssets = () => (
  <div className="mx-auto max-w-7xl space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My Assets</h1>
        <p className="mt-1 text-sm text-muted-foreground">All assets you've tokenized on Fractiq.</p>
      </div>
      <Button asChild className="bg-gradient-primary">
        <Link to="/issuer/create-asset"><PlusCircle className="mr-2 h-4 w-4" /> Create Asset</Link>
      </Button>
    </div>

    <SectionCard title="Asset Portfolio">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="pb-3 font-medium">Asset</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Location</th>
              <th className="pb-3 font-medium text-right">Tokens</th>
              <th className="pb-3 font-medium text-right">Funded</th>
              <th className="pb-3 font-medium text-right">Yield</th>
              <th className="pb-3 font-medium">Risk</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ISSUER_ASSETS.map((a) => {
              const pct = Math.round((a.fundedTokens / a.totalTokens) * 100);
              return (
                <tr key={a.id} className="hover:bg-card-2/40">
                  <td className="py-3 font-medium">{a.name}</td>
                  <td className="py-3 text-muted-foreground">{a.type}</td>
                  <td className="py-3 text-muted-foreground">{a.location}</td>
                  <td className="py-3 text-right tabular">{a.totalTokens.toLocaleString()}</td>
                  <td className="py-3 text-right tabular">{pct}% · {inrCompact(a.fundedTokens * a.tokenPrice)}</td>
                  <td className="py-3 text-right tabular text-success">{a.expectedReturn}%</td>
                  <td className="py-3"><StatusBadge status={a.risk} /></td>
                  <td className="py-3 text-right space-x-1">
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">View</Button>
                    <Button size="sm" variant="outline" className="h-7 px-2 text-xs">Edit</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>

    <div className="grid gap-4 md:grid-cols-3">
      {ISSUER_ASSETS.map((a) => (
        <div key={a.id} className="overflow-hidden rounded-xl border border-border bg-card-2">
          <img src={a.image} alt={a.name} className="h-32 w-full object-cover" />
          <div className="space-y-2 p-4">
            <div className="font-semibold">{a.name}</div>
            <div className="text-xs text-muted-foreground">Total raise · {inr(a.totalValue)}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default IssuerAssets;
