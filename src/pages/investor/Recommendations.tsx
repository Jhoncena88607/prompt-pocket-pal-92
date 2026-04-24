import { SectionCard } from "@/components/SectionCard";
import { ASSETS } from "@/lib/mockData";
import { Sparkles, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const TABS = ["For You", "Diversify Portfolio", "Trending"] as const;

const Recommendations = () => {
  const [tab, setTab] = useState<(typeof TABS)[number]>("For You");

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <Sparkles className="h-5 w-5 text-primary" /> AI Recommendations
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Personalised matches based on your risk profile and holdings.</p>
      </div>

      <SectionCard
        title="Your Risk Profile"
        action={<Button size="sm" variant="outline">Update Preferences</Button>}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Risk Tolerance</div>
            <div className="mt-1 text-base font-semibold">Moderate</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Preferred Types</div>
            <div className="mt-1 text-base font-semibold">Real Estate · Bonds</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Portfolio Maturity</div>
            <div className="mt-1 text-base font-semibold">Growing (12 months)</div>
          </div>
        </div>
      </SectionCard>

      <div className="flex gap-1 rounded-lg border border-border bg-card-2 p-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 rounded-md px-3 py-2 text-sm font-medium",
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <TooltipProvider>
          {ASSETS.map((a) => (
            <div key={a.id} className="surface relative overflow-hidden rounded-xl border border-border">
              <span className="absolute right-3 top-3 z-10 rounded-full border border-primary/40 bg-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-primary backdrop-blur shadow-elegant">
                {a.matchScore}% match
              </span>
              <img src={a.image} alt={a.name} className="h-36 w-full object-cover" loading="lazy" />
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.category}</div>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-muted-foreground hover:text-foreground" aria-label="Why recommended">
                        <Info className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <ul className="space-y-1 text-xs">
                        <li>• Matches your real-estate preference</li>
                        <li>• Within your moderate risk band</li>
                        <li>• Similar investors allocated 18% here</li>
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Expected yield</span>
                  <span className="font-semibold text-success tabular">{a.expectedReturn}%</span>
                </div>
                <Button asChild size="sm" className="w-full bg-gradient-primary">
                  <Link to={`/assets/${a.id}`}>Invest Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Recommendations;
