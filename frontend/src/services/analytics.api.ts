import { api } from "./api";
import {
  AnalyticsHighlights,
  CategoryBreakdown,
  DistributionSlice,
  RankingEntry,
} from "@/types/analytics";
import { TrendPoint } from "@/types/dashboard";

export async function getHighlights(): Promise<AnalyticsHighlights> {
  const { data } = await api.get<AnalyticsHighlights>("/analytics/highlights");
  return data;
}

export async function getByCategory(): Promise<CategoryBreakdown[]> {
  const { data } = await api.get<CategoryBreakdown[]>("/analytics/by-category");
  return data;
}

export async function getDistribution(): Promise<DistributionSlice[]> {
  const { data } = await api.get<DistributionSlice[]>("/analytics/distribution");
  return data;
}

export async function getTrend(): Promise<TrendPoint[]> {
  const { data } = await api.get<TrendPoint[]>("/analytics/trend");
  return data;
}

export async function getRanking(): Promise<RankingEntry[]> {
  const { data } = await api.get<RankingEntry[]>("/analytics/ranking");
  return data;
}
