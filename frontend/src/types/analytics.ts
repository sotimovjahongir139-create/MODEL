export interface HighlightEntry {
  id: string;
  name: string;
  value: number;
}

export interface AnalyticsHighlights {
  topPerforming: HighlightEntry | null;
  highestInterest: HighlightEntry | null;
  highestQuotations: HighlightEntry | null;
  highestSamples: HighlightEntry | null;
  highestSales: HighlightEntry | null;
  highestConversion: HighlightEntry | null;
}

export interface CategoryBreakdown {
  category: string;
  interest: number;
  quotations: number;
  samples: number;
  sales: number;
}

export interface DistributionSlice {
  name: string;
  value: number;
}

export interface RankingEntry {
  rank: number;
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
