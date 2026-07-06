import { ModelStatus } from "@/types/model";

export const statusLabels: Record<ModelStatus, string> = {
  ACTIVE: "Faol",
  INACTIVE: "Nofaol",
  DISCONTINUED: "To'xtatilgan",
};

export const statusBadgeVariant: Record<ModelStatus, "success" | "secondary" | "destructive"> = {
  ACTIVE: "success",
  INACTIVE: "secondary",
  DISCONTINUED: "destructive",
};
