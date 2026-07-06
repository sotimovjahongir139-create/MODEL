export interface StatisticEntry {
  id: string;
  modelId: string;
  date: string;
  interestDelta: number;
  quotationsDelta: number;
  samplesDelta: number;
  salesDelta: number;
  note: string | null;
  createdAt: string;
}

export interface AddStatisticInput {
  interest: number;
  quotations: number;
  samples: number;
  sales: number;
  note?: string;
}
