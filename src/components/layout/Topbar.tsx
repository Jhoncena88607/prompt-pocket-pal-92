import { Bell, Search, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { NOTIFICATIONS } from "@/lib/mockData";

export const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur lg:px-6">
      <div className="lg:hidden flex items-center gap-2">
        <div className="h-7 w-7 rounded-md bg-gradient-primary" />
        <span className="font-semibold">Fractiq</span>
      </div>
      <div className="relative ml-auto max-w-md flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search assets, orders, investors…"
          className="h-10 border-border bg-card pl-9 text-sm placeholder:text-muted-foreground"
        />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
              {NOTIFICATIONS.length}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-0">
          <div className="border-b border-border p-3 text-sm font-semibold">Notifications</div>
          <ul className="max-h-80 divide-y divide-border overflow-y-auto">
            {NOTIFICATIONS.map((n, i) => (
              <li key={i} className="flex items-start gap-3 p-3 text-sm hover:bg-card-2">
                <span className="text-lg leading-none">{n.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-foreground">{n.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{n.body}</div>
                </div>
                <span className="text-[10px] text-muted-foreground">{n.time}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border p-2 text-center text-xs text-muted-foreground">
            View all notifications
          </div>
        </PopoverContent>
      </Popover>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 rounded-lg border border-border bg-card px-2 py-1.5 text-left hover:bg-card-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
              {user.avatarInitials}
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium leading-tight">{user.name}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{user.role}</div>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="text-sm">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => { logout(); navigate("/login"); }}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
