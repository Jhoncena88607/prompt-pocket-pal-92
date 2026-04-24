import { SectionCard } from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const STEPS = ["Basics", "Tokenomics", "Documents", "Review"];

const IssuerCreateAsset = () => {
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Create New Asset</h1>
        <p className="mt-1 text-sm text-muted-foreground">Tokenize a new asset and list it on Fractiq.</p>
      </div>

      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
              i <= step ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
            }`}>
              {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            <div className={`text-sm ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</div>
            {i < STEPS.length - 1 && <div className={`h-px flex-1 ${i < step ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <SectionCard title={STEPS[step]}>
        {step === 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2"><Label>Asset Name</Label><Input placeholder="e.g. Prestige Tech Park" /></div>
            <div className="space-y-2">
              <Label>Asset Type</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="re">Real Estate</SelectItem>
                  <SelectItem value="bond">Bonds</SelectItem>
                  <SelectItem value="infra">Infrastructure</SelectItem>
                  <SelectItem value="comm">Commodities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Location</Label><Input placeholder="City, Country" /></div>
            <div className="space-y-2"><Label>Issuer</Label><Input defaultValue="Prestige Group" /></div>
            <div className="space-y-2 md:col-span-2"><Label>Description</Label><Textarea rows={4} placeholder="Brief description of the asset..." /></div>
          </div>
        )}
        {step === 1 && (
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2"><Label>Total Asset Value (₹)</Label><Input type="number" placeholder="50000000" /></div>
            <div className="space-y-2"><Label>Token Price (₹)</Label><Input type="number" placeholder="1000" /></div>
            <div className="space-y-2"><Label>Total Tokens</Label><Input type="number" placeholder="50000" /></div>
            <div className="space-y-2"><Label>Min Investment (₹)</Label><Input type="number" placeholder="10000" /></div>
            <div className="space-y-2"><Label>Expected Return (%)</Label><Input type="number" placeholder="11.4" /></div>
            <div className="space-y-2"><Label>Lock-in Period (months)</Label><Input type="number" placeholder="60" /></div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            {["Title Deed", "Valuation Report", "Audit Certificate", "Legal Opinion"].map((d) => (
              <div key={d} className="flex items-center justify-between rounded-lg border border-dashed border-border p-4">
                <div>
                  <div className="text-sm font-medium">{d}</div>
                  <div className="text-xs text-muted-foreground">PDF up to 25 MB</div>
                </div>
                <Button size="sm" variant="outline">Upload</Button>
              </div>
            ))}
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card-2 p-4">
              <div className="text-sm text-muted-foreground">Once submitted, your asset enters the Fractiq compliance review queue. Estimated review time: <span className="text-foreground font-medium">2-3 business days</span>.</div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border p-4">
                <div className="text-xs text-muted-foreground">Compliance review</div>
                <div className="text-sm font-medium">SEBI · KYC · Custody</div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="text-xs text-muted-foreground">Smart contract</div>
                <div className="text-sm font-medium">Auto-generated on approval</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
          {step < STEPS.length - 1 ? (
            <Button className="bg-gradient-primary" onClick={() => setStep(step + 1)}>Continue</Button>
          ) : (
            <Button className="bg-gradient-primary" onClick={() => {
              toast({ title: "Asset submitted", description: "Your asset is now in compliance review." });
              navigate("/issuer/assets");
            }}>Submit for Review</Button>
          )}
        </div>
      </SectionCard>
    </div>
  );
};

export default IssuerCreateAsset;
