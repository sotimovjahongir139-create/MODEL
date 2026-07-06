import { useQuery } from "@tanstack/react-query";
import * as analyticsApi from "@/services/analytics.api";

export function useHighlights() {
  return useQuery({ queryKey: ["analytics", "highlights"], queryFn: analyticsApi.getHighlights });
}

export function useByCategory() {
  return useQuery({ queryKey: ["analytics", "by-category"], queryFn: analyticsApi.getByCategory });
}

export function useDistribution() {
  return useQuery({
    queryKey: ["analytics", "distribution"],
    queryFn: analyticsApi.getDistribution,
  });
}

export function useAnalyticsTrend() {
  return useQuery({ queryKey: ["analytics", "trend"], queryFn: analyticsApi.getTrend });
}

export function useRanking() {
  return useQuery({ queryKey: ["analytics", "ranking"], queryFn: analyticsApi.getRanking });
}
