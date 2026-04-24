import { useMemo, useState } from "react";
import { ASSETS, type AssetType, type RiskLevel } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { inr, inrCompact } from "@/lib/format";

const TYPES: ("All" | AssetType)[] = ["All", "Real Estate", "Bonds", "Infrastructure", "Commodities"];
const RISKS: RiskLevel[] = ["Low", "Medium", "High"];

const Assets = () => {
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [risk, setRisk] = useState<Set<RiskLevel>>(new Set());
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"yield" | "min" | "progress">("yield");

  const filtered = useMemo(() => {
    let list = ASSETS.filter((a) => (type === "All" ? true : a.type === type));
    if (risk.size) list = list.filter((a) => risk.has(a.risk));
    if (search) list = list.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === "yield") list = [...list].sort((a, b) => b.expectedReturn - a.expectedReturn);
    if (sort === "min") list = [...list].sort((a, b) => a.minInvestment - b.minInvestment);
    if (sort === "progress")
      list = [...list].sort((a, b) => b.fundedTokens / b.totalTokens - a.fundedTokens / a.totalTokens);
    return list;
  }, [type, risk, search, sort]);

  const toggleRisk = (r: RiskLevel) => {
    const next = new Set(risk);
    next.has(r) ? next.delete(r) : next.add(r);
    setRisk(next);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Discover Assets</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Curated tokenized opportunities across real estate, bonds and infrastructure.
          </p>
        </div>
        <div className="hidden text-xs text-muted-foreground sm:block">
          Showing <span className="font-semibold text-foreground tabular">{filtered.length}</span> of {ASSETS.length} assets
        </div>
      </div>

      <div className="surface sticky top-16 z-20 rounded-xl border border-border p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-1.5">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  type === t
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border bg-card-2 text-muted-foreground hover:text-foreground"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Risk:</span>
              {RISKS.map((r) => (
                <label key={r} className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={risk.has(r)}
                    onChange={() => toggleRisk(r)}
                  />
                  {r}
                </label>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="h-9 rounded-md border border-border bg-card-2 px-2 text-xs text-foreground"
            >
              <option value="yield">Sort: Highest yield</option>
              <option value="min">Lowest min investment</option>
              <option value="progress">Most funded</option>
            </select>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="h-9 w-48 bg-card-2 pl-8 text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => {
          const pct = Math.round((a.fundedTokens / a.totalTokens) * 100);
          return (
            <Link
              key={a.id}
              to={`/assets/${a.id}`}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={a.image} alt={a.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-border/50 bg-background/60 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur">
                  📍 {a.location}
                </span>
                <span className="absolute right-3 top-3 rounded-full border border-primary/40 bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary backdrop-blur">
                  {a.type}
                </span>
              </div>
              <div className="space-y-4 p-4">
                <div>
                  <div className="font-semibold">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.category}</div>
                </div>
                <div className="grid grid-cols-3 gap-2 rounded-lg bg-card-2 p-3 text-center">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Min</div>
                    <div className="text-xs font-semibold tabular">{inrCompact(a.minInvestment)}</div>
                  </div>
                  <div className="border-x border-border">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Yield</div>
                    <div className="text-xs font-semibold text-success tabular">{a.expectedReturn}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Tenure</div>
                    <div className="text-xs font-semibold tabular">{Math.round(a.durationMonths / 12)}y</div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{pct}% funded</span>
                    <span className="tabular text-muted-foreground">
                      {inrCompact(a.fundedTokens * a.tokenPrice)} / {inrCompact(a.totalValue)}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-primary"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Token</div>
                    <div className="text-sm font-semibold tabular">{inr(a.tokenPrice)}</div>
                  </div>
                  <span className="rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Assets;
