import { api } from "./api";
import { Category } from "@/types/category";

export async function listCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>("/categories");
  return data;
}

export async function createCategory(name: string): Promise<Category> {
  const { data } = await api.post<Category>("/categories", { name });
  return data;
}
