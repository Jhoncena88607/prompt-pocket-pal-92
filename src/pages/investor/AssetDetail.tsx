import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ASSETS } from "@/lib/mockData";
import { inr, inrCompact } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, FileText, Download, Wallet, Heart } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { useToast } from "@/hooks/use-toast";

const AssetDetail = () => {
  const { id } = useParams();
  const asset = ASSETS.find((a) => a.id === id) ?? ASSETS[0];
  const [tokens, setTokens] = useState(10);
  const { toast } = useToast();
  const pct = Math.round((asset.fundedTokens / asset.totalTokens) * 100);
  const total = tokens * asset.tokenPrice;
  const walletBalance = 250000;

  const invest = () => {
    toast({
      title: "Investment placed",
      description: `${tokens} tokens of ${asset.name} for ${inr(total)}. Order entering compliance review.`,
    });
  };

  const highlights = [
    { label: "Location", value: asset.location },
    { label: "Total Value", value: inrCompact(asset.totalValue) },
    { label: "Token Price", value: inr(asset.tokenPrice) },
    { label: "Total Tokens", value: asset.totalTokens.toLocaleString("en-IN") },
    { label: "Min Investment", value: inrCompact(asset.minInvestment) },
    { label: "Duration", value: `${Math.round(asset.durationMonths / 12)} years` },
    { label: "Expected Yield", value: `${asset.expectedReturn}%` },
    { label: "Risk", value: asset.risk },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <Link to="/assets" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" /> Back to assets
      </Link>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <div className="surface overflow-hidden rounded-xl border border-border">
            <img src={asset.image} alt={asset.name} className="h-80 w-full object-cover" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">{asset.name}</h1>
              <span className="rounded-full border border-primary/40 bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
                {asset.category}
              </span>
              <StatusBadge status={asset.risk + " Risk"} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{asset.description}</p>
          </div>

          <div className="surface rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold">Key Highlights</h2>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {highlights.map((h) => (
                <div key={h.label}>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{h.label}</div>
                  <div className="mt-1 text-sm font-semibold tabular">{h.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold">Documents</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {["Prospectus.pdf", "Legal Agreement.pdf", "Property Title.pdf", "Audit Report.pdf"].map((d) => (
                <button
                  key={d}
                  className="flex items-center justify-between rounded-lg border border-border bg-card-2 px-4 py-3 text-sm text-left hover:border-primary/40"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" /> {d}
                  </span>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          <div className="surface rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold">About the Issuer</h2>
            <div className="mt-4 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary text-base font-semibold">
                {asset.issuer[0]}
              </div>
              <div>
                <div className="font-medium">{asset.issuer}</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  SEBI-registered issuer with a track record of premium real-asset offerings.
                  All assets are held in segregated custody and audited annually.
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-2">
          <div className="surface sticky top-20 rounded-xl border border-border p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Token Price</div>
                <div className="text-2xl font-semibold tabular">{inr(asset.tokenPrice)}</div>
              </div>
              <span className="rounded-full border border-success/30 bg-success/15 px-2.5 py-1 text-xs font-medium text-success tabular">
                {asset.expectedReturn}% yield
              </span>
            </div>

            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{pct}% funded</span>
                <span className="tabular text-muted-foreground">
                  {inrCompact(asset.fundedTokens * asset.tokenPrice)} / {inrCompact(asset.totalValue)}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${pct}%` }} />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <label className="text-xs text-muted-foreground">Number of tokens</label>
              <Input
                type="number"
                min={1}
                value={tokens}
                onChange={(e) => setTokens(Math.max(1, Number(e.target.value) || 0))}
                className="h-11 bg-card-2 text-base tabular"
              />
              <div className="flex items-center justify-between rounded-lg bg-card-2 px-3 py-2.5 text-sm">
                <span className="text-muted-foreground">Total Investment</span>
                <span className="font-semibold tabular">{inr(total)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Wallet className="h-3.5 w-3.5" /> Wallet
                </span>
                <span className="tabular">{inr(walletBalance)} available</span>
              </div>
            </div>

            <Button
              onClick={invest}
              className="mt-5 h-11 w-full bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-90"
            >
              Invest Now
            </Button>
            <Button variant="outline" className="mt-2 h-11 w-full">
              <Heart className="mr-2 h-4 w-4" /> Add to Watchlist
            </Button>

            <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground">
              Investments in tokenized real assets carry market and liquidity risk.
              Past performance is not indicative of future returns. Read the prospectus before investing.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AssetDetail;
