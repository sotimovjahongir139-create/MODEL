export type ClientStage = "INTEREST" | "QUOTATIONS" | "SAMPLES" | "SALES";

export interface StatisticClient {
  id: string;
  statisticEntryId: string;
  name: string;
  stage: ClientStage;
  createdAt: string;
}

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
  clients: StatisticClient[];
}

export interface AddStatisticClientInput {
  name: string;
  stage: ClientStage;
}

export interface AddStatisticInput {
  interest: number;
  quotations: number;
  samples: number;
  sales: number;
  note?: string;
  clients?: AddStatisticClientInput[];
}
