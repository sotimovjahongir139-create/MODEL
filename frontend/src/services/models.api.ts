import { api } from "./api";
import { Model, ModelListParams, ModelListResult, ModelStatus } from "@/types/model";

export async function listModels(params: ModelListParams): Promise<ModelListResult> {
  const { data } = await api.get<ModelListResult>("/models", { params });
  return data;
}

export async function getModel(id: string): Promise<Model> {
  const { data } = await api.get<Model>(`/models/${id}`);
  return data;
}

export interface ModelFormValues {
  name: string;
  categoryId: string;
  launchDate: string;
  status: ModelStatus;
  image?: File;
}

function toFormData(values: ModelFormValues): FormData {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("categoryId", values.categoryId);
  formData.append("launchDate", values.launchDate);
  formData.append("status", values.status);
  if (values.image) formData.append("image", values.image);
  return formData;
}

export async function createModel(values: ModelFormValues): Promise<Model> {
  const { data } = await api.post<Model>("/models", toFormData(values), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function updateModel(id: string, values: ModelFormValues): Promise<Model> {
  const { data } = await api.patch<Model>(`/models/${id}`, toFormData(values), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function deleteModel(id: string): Promise<void> {
  await api.delete(`/models/${id}`);
}
