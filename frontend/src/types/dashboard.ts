export interface DashboardSummary {
  activeModels: number;
  totalInterest: number;
  totalQuotations: number;
  totalSamples: number;
  totalSales: number;
  bestModel: { id: string; name: string; score: number } | null;
  highestConversion: { id: string; name: string; conversion: number } | null;
}

export interface TopModel {
  id: string;
  name: string;
  category: string;
  totalInterest: number;
  totalQuotations: number;
  totalSamples: number;
  totalSales: number;
  conversion: number;
  score: number;
}

export interface TrendPoint {
  date: string;
  interest: number;
  quotations: number;
  samples: number;
  sales: number;
}

export interface FunnelSummary {
  interest: number;
  quotations: number;
  samples: number;
  sales: number;
}
