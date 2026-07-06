import { useQuery } from "@tanstack/react-query";
import * as dashboardApi from "@/services/dashboard.api";

export function useDashboardSummary() {
  return useQuery({ queryKey: ["dashboard", "summary"], queryFn: dashboardApi.getSummary });
}

export function useTopModels() {
  return useQuery({ queryKey: ["dashboard", "top-models"], queryFn: dashboardApi.getTopModels });
}

export function useDashboardTrend() {
  return useQuery({ queryKey: ["dashboard", "trend"], queryFn: dashboardApi.getTrend });
}

export function useFunnel() {
  return useQuery({ queryKey: ["dashboard", "funnel"], queryFn: dashboardApi.getFunnel });
}
