import { useQuery } from "@tanstack/react-query";
import { listCategories } from "@/services/categories.api";

export function useCategories() {
  return useQuery({ queryKey: ["categories"], queryFn: listCategories });
}
