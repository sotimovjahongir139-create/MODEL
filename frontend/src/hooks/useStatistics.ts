import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as statisticsApi from "@/services/statistics.api";
import { AddStatisticInput } from "@/types/statistics";

export function useHistory(modelId: string | undefined) {
  return useQuery({
    queryKey: ["history", modelId],
    queryFn: () => statisticsApi.listHistory(modelId!),
    enabled: !!modelId,
  });
}

export function useAddStatistic(modelId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: AddStatisticInput) => statisticsApi.addStatisticEntry(modelId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["model", modelId] });
      queryClient.invalidateQueries({ queryKey: ["history", modelId] });
      queryClient.invalidateQueries({ queryKey: ["models"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}
