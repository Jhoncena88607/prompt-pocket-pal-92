import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth";
import { Bell, Shield, Wallet, KeyRound, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your profile, security and preferences.</p>
      </div>

      <SectionCard title="Profile">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={user?.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user?.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" defaultValue="+91 98765 43210" />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <div><StatusBadge status={user?.role ?? ""} /></div>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <Button className="bg-gradient-primary" onClick={() => toast({ title: "Profile updated" })}>
            Save changes
          </Button>
        </div>
      </SectionCard>

      <SectionCard title="KYC & Compliance">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: <Shield className="h-4 w-4" />, label: "KYC Verification", status: "Confirmed" },
            { icon: <Wallet className="h-4 w-4" />, label: "Bank Account", status: "Confirmed" },
            { icon: <KeyRound className="h-4 w-4" />, label: "Wallet Linked", status: "Pending" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-xl border border-border bg-card-2 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">{item.icon}</div>
                <div className="text-sm font-medium">{item.label}</div>
              </div>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Notifications">
        {[
          { label: "Order updates", desc: "Status changes for your investments" },
          { label: "Dividend payouts", desc: "When dividends are credited" },
          { label: "Governance proposals", desc: "New votes from your assets" },
          { label: "AI recommendations", desc: "Personalized investment ideas" },
        ].map((n, i) => (
          <div key={n.label}>
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium">{n.label}</div>
                <div className="text-xs text-muted-foreground">{n.desc}</div>
              </div>
              <Switch defaultChecked={i < 3} />
            </div>
            {i < 3 && <Separator />}
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Security">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">Two-Factor Authentication</div>
              <div className="text-xs text-muted-foreground">Add an extra layer of security to your account</div>
            </div>
          </div>
          <Switch defaultChecked />
        </div>
        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Sign out of all sessions</div>
            <div className="text-xs text-muted-foreground">Log out of every device you're signed in on</div>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </SectionCard>
    </div>
  );
};

export default Settings;
