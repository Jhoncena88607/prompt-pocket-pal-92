import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Role = "investor" | "broker" | "custodian" | "issuer";

export interface User {
  name: string;
  email: string;
  role: Role;
  avatarInitials: string;
}

const ROLE_USERS: Record<Role, User> = {
  investor: { name: "Arjun Mehta", email: "arjun@fractiq.io", role: "investor", avatarInitials: "AM" },
  broker: { name: "Wealth First", email: "broker@fractiq.io", role: "broker", avatarInitials: "WF" },
  custodian: { name: "TrustVault Custody", email: "custody@fractiq.io", role: "custodian", avatarInitials: "TV" },
  issuer: { name: "Prestige Group", email: "issuer@fractiq.io", role: "issuer", avatarInitials: "PG" },
};

interface AuthCtx {
  user: User | null;
  loginAs: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("fractiq.user");
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
  }, []);

  const loginAs = (role: Role) => {
    const u = ROLE_USERS[role];
    setUser(u);
    localStorage.setItem("fractiq.user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fractiq.user");
  };

  return <AuthContext.Provider value={{ user, loginAs, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const ROLE_HOME: Record<Role, string> = {
  investor: "/dashboard",
  broker: "/broker",
  custodian: "/custodian",
  issuer: "/issuer",
};
