import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, ROLE_HOME, type Role } from "@/lib/auth";
import { cn } from "@/lib/utils";

const ROLES: { id: Role; label: string }[] = [
  { id: "investor", label: "Investor" },
  { id: "broker", label: "Broker" },
  { id: "custodian", label: "Custodian" },
  { id: "issuer", label: "Issuer" },
];

const Login = () => {
  const [role, setRole] = useState<Role>("investor");
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(role);
    navigate(ROLE_HOME[role]);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary shadow-elegant" />
          <span className="text-2xl font-semibold tracking-tight">Fractiq</span>
        </div>
        <div className="surface rounded-2xl border border-border p-7">
          <h1 className="text-xl font-semibold">Sign in to Fractiq</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tokenized real-asset investing — institutional grade, instantly liquid.
          </p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="arjun@fractiq.io" className="bg-card-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a className="text-xs text-primary hover:underline" href="#">Forgot password?</a>
              </div>
              <Input id="password" type="password" defaultValue="demo-password" className="bg-card-2" />
            </div>
            <Button type="submit" className="h-11 w-full bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-90">
              Sign In
            </Button>
          </form>

          <div className="mt-7">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Demo mode — preview a role
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-xs font-medium transition-all",
                    role === r.id
                      ? "border-primary bg-primary/10 text-foreground shadow-elegant"
                      : "border-border bg-card-2 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to Fractiq's Terms and acknowledge our Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
