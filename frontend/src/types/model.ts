import { Category } from "./category";

export type ModelStatus = "ACTIVE" | "INACTIVE" | "DISCONTINUED";

export interface ModelMetrics {
  interestToQuotation: number;
  quotationToSample: number;
  sampleToSale: number;
  interestToSale: number;
  score: number;
}

export interface Model extends ModelMetrics {
  id: string;
  name: string;
  categoryId: string;
  category: Category;
  imagePath: string | null;
  launchDate: string;
  status: ModelStatus;
  totalInterest: number;
  totalQuotations: number;
  totalSamples: number;
  totalSales: number;
  createdAt: string;
  updatedAt: string;
}

export interface ModelListResult {
  items: Model[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ModelListParams {
  search?: string;
  categoryId?: string;
  status?: ModelStatus;
  sortBy?: "name" | "launchDate" | "conversion" | "score" | "createdAt";
  sortDir?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}
