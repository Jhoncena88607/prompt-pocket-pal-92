import { MetricCard } from "@/components/MetricCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Vote, Users, CheckCircle2, Clock } from "lucide-react";

const PROPOSALS = [
  { id: "PR-021", asset: "Prestige Tech Park", title: "Renovation of Block A", created: "2025-04-10", deadline: "2025-04-30", participation: 64, yes: 71, no: 29, status: "Active" },
  { id: "PR-018", asset: "DLF Cyber City", title: "Solar rooftop installation", created: "2025-03-22", deadline: "2025-04-12", participation: 82, yes: 88, no: 12, status: "Passed" },
  { id: "PR-015", asset: "Godrej BKC", title: "Refinance senior debt", created: "2025-03-01", deadline: "2025-03-21", participation: 41, yes: 56, no: 44, status: "Failed" },
];

const IssuerProposals = () => (
  <div className="mx-auto max-w-7xl space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Governance</h1>
        <p className="mt-1 text-sm text-muted-foreground">Create and manage proposals for your asset token holders.</p>
      </div>
      <Button className="bg-gradient-primary">
        <PlusCircle className="mr-2 h-4 w-4" /> New Proposal
      </Button>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard icon={<Vote className="h-5 w-5" />} label="Active" value="2" />
      <MetricCard icon={<CheckCircle2 className="h-5 w-5" />} label="Passed" value="14" />
      <MetricCard icon={<Clock className="h-5 w-5" />} label="Avg Participation" value="62%" delta={{ value: "4%", positive: true }} />
      <MetricCard icon={<Users className="h-5 w-5" />} label="Total Voters" value="1,284" />
    </div>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {PROPOSALS.map((p) => (
        <div key={p.id} className="surface space-y-4 rounded-xl border border-border p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-muted-foreground">{p.asset} · {p.id}</div>
              <div className="mt-1 font-semibold">{p.title}</div>
            </div>
            <StatusBadge status={p.status} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Yes</span>
              <span className="tabular text-success">{p.yes}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-success" style={{ width: `${p.yes}%` }} />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">No</span>
              <span className="tabular text-destructive">{p.no}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-destructive" style={{ width: `${p.no}%` }} />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Participation: {p.participation}%</span>
            <span className="tabular">Ends {p.deadline}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline">View votes</Button>
            <Button size="sm" variant="ghost">Details</Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default IssuerProposals;
