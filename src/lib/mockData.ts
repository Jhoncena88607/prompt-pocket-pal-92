export type AssetType = "Real Estate" | "Bonds" | "Infrastructure" | "Commodities";
export type RiskLevel = "Low" | "Medium" | "High";

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  category: string;
  location: string;
  image: string;
  tokenPrice: number;
  totalTokens: number;
  fundedTokens: number;
  minInvestment: number;
  expectedReturn: number; // %
  durationMonths: number;
  risk: RiskLevel;
  totalValue: number;
  matchScore: number;
  issuer: string;
  description: string;
}

const img = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=900&q=70`;

export const ASSETS: Asset[] = [
  {
    id: "prestige-tech-park",
    name: "Prestige Tech Park",
    type: "Real Estate",
    category: "Commercial Real Estate",
    location: "Bangalore",
    image: img("1486406146926-c627a92ad1ab"),
    tokenPrice: 1000,
    totalTokens: 50000,
    fundedTokens: 36500,
    minInvestment: 10000,
    expectedReturn: 11.4,
    durationMonths: 60,
    risk: "Medium",
    totalValue: 50000000,
    matchScore: 94,
    issuer: "Prestige Group",
    description:
      "Grade-A commercial tower in Bangalore's Whitefield IT corridor. Long-term leases with Fortune 500 tenants generate stable rental yields with quarterly distributions.",
  },
  {
    id: "dlf-cyber-city",
    name: "DLF Cyber City",
    type: "Real Estate",
    category: "Commercial Real Estate",
    location: "Gurgaon",
    image: img("1545324418-cc1a3fa10c00"),
    tokenPrice: 1000,
    totalTokens: 80000,
    fundedTokens: 58400,
    minInvestment: 25000,
    expectedReturn: 10.2,
    durationMonths: 72,
    risk: "Low",
    totalValue: 80000000,
    matchScore: 89,
    issuer: "DLF Limited",
    description:
      "Premium business district asset with diversified tenant mix and exceptional location. Anchored by long-tenor leases.",
  },
  {
    id: "godrej-bkc",
    name: "Godrej BKC",
    type: "Real Estate",
    category: "Mixed Use",
    location: "Mumbai",
    image: img("1493809842364-78817add7ffb"),
    tokenPrice: 1000,
    totalTokens: 65000,
    fundedTokens: 21500,
    minInvestment: 50000,
    expectedReturn: 12.6,
    durationMonths: 48,
    risk: "High",
    totalValue: 65000000,
    matchScore: 81,
    issuer: "Godrej Properties",
    description:
      "Prime BKC retail-and-office tower with strong rental upside. Higher yield with development-phase risk.",
  },
  {
    id: "sovereign-green-bond",
    name: "Sovereign Green Bond 2031",
    type: "Bonds",
    category: "Government Bond",
    location: "Pan-India",
    image: img("1518544801976-3e159e50e5bb"),
    tokenPrice: 1000,
    totalTokens: 100000,
    fundedTokens: 91000,
    minInvestment: 10000,
    expectedReturn: 7.8,
    durationMonths: 84,
    risk: "Low",
    totalValue: 100000000,
    matchScore: 76,
    issuer: "RBI · Govt of India",
    description:
      "Sovereign-backed green bond financing renewable infrastructure. Fixed coupon, semi-annual payouts.",
  },
  {
    id: "adani-highway",
    name: "Adani Highway InvIT",
    type: "Infrastructure",
    category: "Toll Road",
    location: "Maharashtra",
    image: img("1473893604213-3df9c15611c0"),
    tokenPrice: 1000,
    totalTokens: 70000,
    fundedTokens: 47600,
    minInvestment: 25000,
    expectedReturn: 9.6,
    durationMonths: 96,
    risk: "Medium",
    totalValue: 70000000,
    matchScore: 84,
    issuer: "Adani Infrastructure",
    description:
      "Operational toll road with stable cashflows backed by traffic concessions. Quarterly distributions.",
  },
  {
    id: "gold-vault",
    name: "Sovereign Gold Vault",
    type: "Commodities",
    category: "Gold",
    location: "Singapore Vault",
    image: img("1610375461246-83df859d849d"),
    tokenPrice: 1000,
    totalTokens: 40000,
    fundedTokens: 12000,
    minInvestment: 10000,
    expectedReturn: 8.4,
    durationMonths: 36,
    risk: "Low",
    totalValue: 40000000,
    matchScore: 72,
    issuer: "Fractiq Commodities",
    description:
      "Allocated physical gold stored in tier-1 vaults. Each token represents 1 gram of LBMA-certified bullion.",
  },
];

export type OrderStatus = "Pending" | "Compliance" | "Confirmed" | "Settled" | "Failed";

export interface Order {
  id: string;
  assetId: string;
  assetName: string;
  type: AssetType;
  amount: number;
  tokens: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  compliance: { aml: boolean; ofac: boolean; wallet: boolean };
}

export const ORDERS: Order[] = [
  { id: "ORD-10421", assetId: "prestige-tech-park", assetName: "Prestige Tech Park", type: "Real Estate", amount: 150000, tokens: 150, status: "Settled", createdAt: "2025-03-12", updatedAt: "2025-03-14", compliance: { aml: true, ofac: true, wallet: true } },
  { id: "ORD-10487", assetId: "sovereign-green-bond", assetName: "Sovereign Green Bond 2031", type: "Bonds", amount: 75000, tokens: 75, status: "Confirmed", createdAt: "2025-04-02", updatedAt: "2025-04-03", compliance: { aml: true, ofac: true, wallet: true } },
  { id: "ORD-10512", assetId: "adani-highway", assetName: "Adani Highway InvIT", type: "Infrastructure", amount: 60000, tokens: 60, status: "Compliance", createdAt: "2025-04-18", updatedAt: "2025-04-18", compliance: { aml: true, ofac: false, wallet: true } },
  { id: "ORD-10530", assetId: "godrej-bkc", assetName: "Godrej BKC", type: "Real Estate", amount: 100000, tokens: 100, status: "Pending", createdAt: "2025-04-22", updatedAt: "2025-04-22", compliance: { aml: false, ofac: false, wallet: true } },
  { id: "ORD-10401", assetId: "dlf-cyber-city", assetName: "DLF Cyber City", type: "Real Estate", amount: 65000, tokens: 65, status: "Settled", createdAt: "2025-02-10", updatedAt: "2025-02-12", compliance: { aml: true, ofac: true, wallet: true } },
];

export interface Holding {
  assetId: string;
  assetName: string;
  type: AssetType;
  tokens: number;
  invested: number;
  currentValue: number;
  yieldEarned: number;
}

export const HOLDINGS: Holding[] = [
  { assetId: "prestige-tech-park", assetName: "Prestige Tech Park", type: "Real Estate", tokens: 150, invested: 150000, currentValue: 168400, yieldEarned: 8200 },
  { assetId: "dlf-cyber-city", assetName: "DLF Cyber City", type: "Real Estate", tokens: 65, invested: 65000, currentValue: 71300, yieldEarned: 4100 },
  { assetId: "godrej-bkc", assetName: "Godrej BKC", type: "Real Estate", tokens: 40, invested: 40000, currentValue: 42800, yieldEarned: 1900 },
  { assetId: "sovereign-green-bond", assetName: "Sovereign Green Bond 2031", type: "Bonds", tokens: 75, invested: 75000, currentValue: 78200, yieldEarned: 5400 },
  { assetId: "adani-highway", assetName: "Adani Highway InvIT", type: "Infrastructure", tokens: 60, invested: 60000, currentValue: 65900, yieldEarned: 3700 },
  { assetId: "gold-vault", assetName: "Sovereign Gold Vault", type: "Commodities", tokens: 30, invested: 30000, currentValue: 33200, yieldEarned: 1100 },
  { assetId: "navi-bond", assetName: "Navi Corporate Bond", type: "Bonds", tokens: 30, invested: 30000, currentValue: 31700, yieldEarned: 2100 },
];

export interface Dividend {
  id: string;
  assetName: string;
  date: string;
  amount: number;
  perToken: number;
  status: "Paid" | "Upcoming" | "Processing";
}

export const DIVIDENDS: Dividend[] = [
  { id: "DV-01", assetName: "Prestige Tech Park", date: "2025-04-01", amount: 4200, perToken: 28, status: "Paid" },
  { id: "DV-02", assetName: "DLF Cyber City", date: "2025-04-05", amount: 1950, perToken: 30, status: "Paid" },
  { id: "DV-03", assetName: "Sovereign Green Bond", date: "2025-05-12", amount: 2925, perToken: 39, status: "Upcoming" },
  { id: "DV-04", assetName: "Adani Highway InvIT", date: "2025-05-20", amount: 1440, perToken: 24, status: "Upcoming" },
  { id: "DV-05", assetName: "Godrej BKC", date: "2025-05-28", amount: 880, perToken: 22, status: "Processing" },
];

export const PORTFOLIO_HISTORY = [
  { date: "Nov", value: 410000 },
  { date: "Dec", value: 425000 },
  { date: "Jan", value: 438000 },
  { date: "Feb", value: 446000 },
  { date: "Mar", value: 462000 },
  { date: "Apr", value: 482500 },
];

export const ALLOCATION = [
  { name: "Real Estate", value: 60, color: "hsl(239 84% 67%)" },
  { name: "Bonds", value: 22, color: "hsl(252 87% 67%)" },
  { name: "Infrastructure", value: 12, color: "hsl(217 91% 60%)" },
  { name: "Commodities", value: 6, color: "hsl(142 71% 45%)" },
];

export const NOTIFICATIONS = [
  { icon: "💰", title: "Investment confirmed", body: "150 tokens of Prestige Tech Park", time: "2h ago" },
  { icon: "⚠️", title: "Compliance check pending", body: "Order ORD-10512 awaiting OFAC", time: "5h ago" },
  { icon: "📊", title: "Dividend received", body: "₹4,200 from Prestige Tech Park", time: "1d ago" },
  { icon: "🗳️", title: "New governance proposal", body: "Renovation of Block A — Prestige Tower", time: "2d ago" },
  { icon: "🔔", title: "Order status update", body: "ORD-10487 → Confirmed", time: "3d ago" },
];

// Broker
export const BROKERS = [
  { id: "BR-001", name: "Wealth First Advisors", level: "L1 Master", region: "West", investors: 142, commission: 2.5, status: "Active", joined: "2024-06-12" },
  { id: "BR-014", name: "Apex Capital Partners", level: "L2 Sub-broker", region: "South", investors: 64, commission: 1.5, status: "Active", joined: "2024-08-22" },
  { id: "BR-021", name: "Northstar Wealth", level: "L2 Sub-broker", region: "North", investors: 38, commission: 1.5, status: "Pending", joined: "2025-02-04" },
  { id: "BR-027", name: "Coastline Investments", level: "L2 Sub-broker", region: "South", investors: 22, commission: 1.5, status: "Active", joined: "2025-01-15" },
  { id: "BR-034", name: "Meridian Advisors", level: "L1 Master", region: "East", investors: 87, commission: 2.5, status: "Suspended", joined: "2024-03-30" },
];

// Custodian
export const ESCROW = [
  { id: "ORD-10530", investor: "Arjun Mehta", asset: "Godrej BKC", amount: 100000, received: "2025-04-22", status: "In Escrow" },
  { id: "ORD-10512", investor: "Priya Iyer", asset: "Adani Highway InvIT", amount: 60000, received: "2025-04-18", status: "On Hold" },
  { id: "ORD-10487", investor: "Rahul Shah", asset: "Sovereign Green Bond", amount: 75000, received: "2025-04-02", status: "Released" },
  { id: "ORD-10421", investor: "Neha Kapoor", asset: "Prestige Tech Park", amount: 150000, received: "2025-03-12", status: "Released" },
];

// Issuer assets (subset shown to issuer)
export const ISSUER_ASSETS = ASSETS.slice(0, 3);
