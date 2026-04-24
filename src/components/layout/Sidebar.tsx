import { useAuth, type Role } from "@/lib/auth";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Search, PieChart, ClipboardList, Banknote, Gavel, Sparkles, Settings,
  Network, Grid3x3, Share2, Coins, Users,
  Wallet, Vault, CheckCircle2, Building2, Shield,
  PlusCircle, Vote,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem { to: string; label: string; icon: React.ComponentType<{ className?: string }>; }

const NAV: Record<Role, NavItem[]> = {
  investor: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/assets", label: "Discover Assets", icon: Search },
    { to: "/portfolio", label: "My Portfolio", icon: PieChart },
    { to: "/orders", label: "Orders", icon: ClipboardList },
    { to: "/dividends", label: "Dividends", icon: Banknote },
    { to: "/governance", label: "Governance", icon: Gavel },
    { to: "/recommendations", label: "AI Recommendations", icon: Sparkles },
    { to: "/settings", label: "Settings", icon: Settings },
  ],
  broker: [
    { to: "/broker", label: "Dashboard", icon: LayoutDashboard },
    { to: "/broker/network", label: "Broker Network", icon: Network },
    { to: "/broker/catalog", label: "Asset Catalog", icon: Grid3x3 },
    { to: "/broker/referrals", label: "My Referrals", icon: Share2 },
    { to: "/broker/commissions", label: "Commission Tracker", icon: Coins },
    { to: "/broker/sub-brokers", label: "Sub-broker Mgmt", icon: Users },
    { to: "/settings", label: "Settings", icon: Settings },
  ],
  custodian: [
    { to: "/custodian", label: "Dashboard", icon: LayoutDashboard },
    { to: "/custodian/funds", label: "Fund Overview", icon: Wallet },
    { to: "/custodian/escrow", label: "Escrow Management", icon: Vault },
    { to: "/custodian/settlements", label: "Settlement Monitor", icon: CheckCircle2 },
    { to: "/custodian/custody", label: "Asset Custody", icon: Building2 },
    { to: "/custodian/compliance", label: "Compliance Log", icon: Shield },
    { to: "/settings", label: "Settings", icon: Settings },
  ],
  issuer: [
    { to: "/issuer", label: "Dashboard", icon: LayoutDashboard },
    { to: "/issuer/assets", label: "My Assets", icon: Building2 },
    { to: "/issuer/create-asset", label: "Create Asset", icon: PlusCircle },
    { to: "/issuer/proposals", label: "Governance", icon: Vote },
    { to: "/issuer/dividends", label: "Dividend Mgmt", icon: Banknote },
    { to: "/settings", label: "Settings", icon: Settings },
  ],
};

export const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return null;
  const items = NAV[user.role];

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <div className="h-8 w-8 rounded-lg bg-gradient-primary shadow-elegant" />
        <span className="text-lg font-semibold tracking-tight">Fractiq</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {user.role}
        </div>
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-sidebar-accent text-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-4 w-4", active && "text-primary")} />
                  <span>{item.label}</span>
                  {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-elegant" />}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-sidebar-border p-4 text-xs text-muted-foreground">
        <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3">
          <div className="font-medium text-foreground">Tokenized · Audited</div>
          <div className="mt-1">Custody by TrustVault · SEBI registered</div>
        </div>
      </div>
    </aside>
  );
};
