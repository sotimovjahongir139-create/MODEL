import { api } from "./api";
import { DashboardSummary, FunnelSummary, TopModel, TrendPoint } from "@/types/dashboard";

export async function getSummary(): Promise<DashboardSummary> {
  const { data } = await api.get<DashboardSummary>("/dashboard/summary");
  return data;
}

export async function getTopModels(): Promise<TopModel[]> {
  const { data } = await api.get<TopModel[]>("/dashboard/top-models");
  return data;
}

export async function getTrend(): Promise<TrendPoint[]> {
  const { data } = await api.get<TrendPoint[]>("/dashboard/trend");
  return data;
}

export async function getFunnel(): Promise<FunnelSummary> {
  const { data } = await api.get<FunnelSummary>("/dashboard/funnel");
  return data;
}
