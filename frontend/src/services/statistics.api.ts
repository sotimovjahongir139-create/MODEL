import { api } from "./api";
import { AddStatisticInput, StatisticEntry } from "@/types/statistics";
import { Model } from "@/types/model";

export async function addStatisticEntry(modelId: string, input: AddStatisticInput) {
  const { data } = await api.post<{ entry: StatisticEntry; model: Model }>(
    `/models/${modelId}/statistics`,
    input
  );
  return data;
}

export async function listHistory(modelId: string): Promise<StatisticEntry[]> {
  const { data } = await api.get<StatisticEntry[]>(`/models/${modelId}/history`);
  return data;
}
