import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useAuth, type Role, ROLE_HOME } from "@/lib/auth";

export const AppShell = ({ allow }: { allow?: Role[] }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allow && !allow.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role]} replace />;
  }
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
