import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import { AppShell } from "@/components/layout/AppShell";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/investor/Dashboard";
import Assets from "./pages/investor/Assets";
import AssetDetail from "./pages/investor/AssetDetail";
import Portfolio from "./pages/investor/Portfolio";
import Orders from "./pages/investor/Orders";
import Dividends from "./pages/investor/Dividends";
import Governance from "./pages/investor/Governance";
import Recommendations from "./pages/investor/Recommendations";
import BrokerDashboard from "./pages/broker/BrokerDashboard";
import CustodianDashboard from "./pages/custodian/CustodianDashboard";
import IssuerDashboard from "./pages/issuer/IssuerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            {/* Investor */}
            <Route element={<AppShell allow={["investor"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/assets/:id" element={<AssetDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/dividends" element={<Dividends />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/recommendations" element={<Recommendations />} />
            </Route>

            {/* Broker */}
            <Route element={<AppShell allow={["broker"]} />}>
              <Route path="/broker" element={<BrokerDashboard />} />
              <Route path="/broker/network" element={<BrokerDashboard />} />
              <Route path="/broker/referrals" element={<BrokerDashboard />} />
              <Route path="/broker/commissions" element={<BrokerDashboard />} />
            </Route>

            {/* Custodian */}
            <Route element={<AppShell allow={["custodian"]} />}>
              <Route path="/custodian" element={<CustodianDashboard />} />
              <Route path="/custodian/escrow" element={<CustodianDashboard />} />
              <Route path="/custodian/settlements" element={<CustodianDashboard />} />
              <Route path="/custodian/compliance" element={<CustodianDashboard />} />
            </Route>

            {/* Issuer */}
            <Route element={<AppShell allow={["issuer"]} />}>
              <Route path="/issuer" element={<IssuerDashboard />} />
              <Route path="/issuer/assets" element={<IssuerDashboard />} />
              <Route path="/issuer/create-asset" element={<IssuerDashboard />} />
              <Route path="/issuer/proposals" element={<IssuerDashboard />} />
              <Route path="/issuer/dividends" element={<IssuerDashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
