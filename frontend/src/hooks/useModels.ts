import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as modelsApi from "@/services/models.api";
import { ModelListParams } from "@/types/model";

export function useModels(params: ModelListParams) {
  return useQuery({
    queryKey: ["models", params],
    queryFn: () => modelsApi.listModels(params),
  });
}

export function useModel(id: string | undefined) {
  return useQuery({
    queryKey: ["model", id],
    queryFn: () => modelsApi.getModel(id!),
    enabled: !!id,
  });
}

export function useCreateModel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: modelsApi.createModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateModel(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: modelsApi.ModelFormValues) => modelsApi.updateModel(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
      queryClient.invalidateQueries({ queryKey: ["model", id] });
    },
  });
}

export function useDeleteModel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: modelsApi.deleteModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
