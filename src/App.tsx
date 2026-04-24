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
import Settings from "./pages/Settings";
import Dashboard from "./pages/investor/Dashboard";
import Assets from "./pages/investor/Assets";
import AssetDetail from "./pages/investor/AssetDetail";
import Portfolio from "./pages/investor/Portfolio";
import Orders from "./pages/investor/Orders";
import Dividends from "./pages/investor/Dividends";
import Governance from "./pages/investor/Governance";
import Recommendations from "./pages/investor/Recommendations";
import BrokerDashboard from "./pages/broker/BrokerDashboard";
import BrokerNetwork from "./pages/broker/BrokerNetwork";
import BrokerCatalog from "./pages/broker/BrokerCatalog";
import BrokerReferrals from "./pages/broker/BrokerReferrals";
import BrokerCommissions from "./pages/broker/BrokerCommissions";
import BrokerSubBrokers from "./pages/broker/BrokerSubBrokers";
import CustodianDashboard from "./pages/custodian/CustodianDashboard";
import CustodianFunds from "./pages/custodian/CustodianFunds";
import CustodianSettlements from "./pages/custodian/CustodianSettlements";
import CustodianCustody from "./pages/custodian/CustodianCustody";
import CustodianCompliance from "./pages/custodian/CustodianCompliance";
import IssuerDashboard from "./pages/issuer/IssuerDashboard";
import IssuerAssets from "./pages/issuer/IssuerAssets";
import IssuerCreateAsset from "./pages/issuer/IssuerCreateAsset";
import IssuerProposals from "./pages/issuer/IssuerProposals";
import IssuerDividends from "./pages/issuer/IssuerDividends";

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

            {/* Settings — any authenticated role */}
            <Route element={<AppShell />}>
              <Route path="/settings" element={<Settings />} />
            </Route>

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
              <Route path="/broker/network" element={<BrokerNetwork />} />
              <Route path="/broker/catalog" element={<BrokerCatalog />} />
              <Route path="/broker/referrals" element={<BrokerReferrals />} />
              <Route path="/broker/commissions" element={<BrokerCommissions />} />
              <Route path="/broker/sub-brokers" element={<BrokerSubBrokers />} />
            </Route>

            {/* Custodian */}
            <Route element={<AppShell allow={["custodian"]} />}>
              <Route path="/custodian" element={<CustodianDashboard />} />
              <Route path="/custodian/funds" element={<CustodianFunds />} />
              <Route path="/custodian/escrow" element={<CustodianDashboard />} />
              <Route path="/custodian/settlements" element={<CustodianSettlements />} />
              <Route path="/custodian/custody" element={<CustodianCustody />} />
              <Route path="/custodian/compliance" element={<CustodianCompliance />} />
            </Route>

            {/* Issuer */}
            <Route element={<AppShell allow={["issuer"]} />}>
              <Route path="/issuer" element={<IssuerDashboard />} />
              <Route path="/issuer/assets" element={<IssuerAssets />} />
              <Route path="/issuer/create-asset" element={<IssuerCreateAsset />} />
              <Route path="/issuer/proposals" element={<IssuerProposals />} />
              <Route path="/issuer/dividends" element={<IssuerDividends />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
