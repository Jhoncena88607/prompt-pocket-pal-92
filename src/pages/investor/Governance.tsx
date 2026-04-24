import { SectionCard } from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Gavel, Clock } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";

const PROPOSALS = [
  {
    id: "PR-21",
    title: "Approve renovation of Block A — Prestige Tower",
    issuer: "Prestige Group",
    asset: "Prestige Tech Park",
    type: "Renovation",
    closesIn: "2d 14h",
    forPct: 62, againstPct: 28, abstainPct: 10,
    quorum: 42,
  },
  {
    id: "PR-19",
    title: "Strategy change — extend lease tenure to 10 years",
    issuer: "DLF Limited",
    asset: "DLF Cyber City",
    type: "Strategy Change",
    closesIn: "5d 02h",
    forPct: 51, againstPct: 36, abstainPct: 13,
    quorum: 78,
  },
];

const PAST = [
  { id: "PR-18", title: "Refinance senior debt at 7.4%", outcome: "Passed" },
  { id: "PR-17", title: "Sell Block C — Godrej BKC", outcome: "Failed" },
  { id: "PR-16", title: "Increase dividend frequency", outcome: "Quorum Not Met" },
];

const Governance = () => {
  const [voting, setVoting] = useState<typeof PROPOSALS[number] | null>(null);
  const [choice, setChoice] = useState<"For" | "Against" | "Abstain">("For");
  const { toast } = useToast();

  const cast = () => {
    toast({ title: "Vote cast", description: `${choice} on ${voting?.title} — tx 0x4f9a…b21c` });
    setVoting(null);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Governance</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Vote on proposals for assets you hold tokens in.
        </p>
      </div>

      <SectionCard title="Active Proposals">
        <div className="space-y-4">
          {PROPOSALS.map((p) => (
            <div key={p.id} className="rounded-xl border border-border bg-card-2 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Gavel className="h-3 w-3" /> {p.issuer} · {p.asset}
                  </div>
                  <div className="mt-1 text-base font-semibold">{p.title}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <StatusBadge status={p.type} />
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> closes in {p.closesIn}
                    </span>
                  </div>
                </div>
                <Button onClick={() => setVoting(p)} className="bg-gradient-primary">Cast Your Vote</Button>
              </div>

              <div className="mt-5 space-y-3">
                <div>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="text-muted-foreground">Vote tally</span>
                    <span className="text-muted-foreground tabular">For {p.forPct}% · Against {p.againstPct}% · Abstain {p.abstainPct}%</span>
                  </div>
                  <div className="flex h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="bg-success" style={{ width: `${p.forPct}%` }} />
                    <div className="bg-destructive" style={{ width: `${p.againstPct}%` }} />
                    <div className="bg-muted-foreground" style={{ width: `${p.abstainPct}%` }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="text-muted-foreground">Quorum</span>
                    <span className="text-muted-foreground tabular">{p.quorum}% of required</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${p.quorum}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Past Proposals">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-border">
            {PAST.map((p) => (
              <tr key={p.id}>
                <td className="py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                <td className="py-3 font-medium">{p.title}</td>
                <td className="py-3 text-right"><StatusBadge status={p.outcome} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>

      <Dialog open={!!voting} onOpenChange={(o) => !o && setVoting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cast your vote</DialogTitle>
          </DialogHeader>
          <div>
            <div className="text-sm font-medium">{voting?.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Your voting power: <span className="font-semibold tabular text-foreground">450 tokens</span> · 4.5% weight
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {(["For", "Against", "Abstain"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setChoice(c)}
                  className={cn(
                    "rounded-lg border px-3 py-3 text-sm font-medium transition-all",
                    choice === c
                      ? c === "For"
                        ? "border-success bg-success/15 text-success"
                        : c === "Against"
                        ? "border-destructive bg-destructive/15 text-destructive"
                        : "border-primary bg-primary/15 text-primary"
                      : "border-border bg-card-2 text-muted-foreground"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={cast} className="bg-gradient-primary">Confirm Vote</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Governance;
