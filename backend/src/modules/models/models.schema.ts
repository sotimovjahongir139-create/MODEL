import { z } from "zod";
import { ModelStatus } from "@prisma/client";

export const createModelSchema = z.object({
  name: z.string().min(1, "Model nomi kiritilishi shart"),
  categoryId: z.string().min(1, "Kategoriya tanlanishi shart"),
  launchDate: z.coerce.date({ errorMap: () => ({ message: "Sana noto'g'ri formatda" }) }),
  status: z.nativeEnum(ModelStatus).default(ModelStatus.ACTIVE),
});

export const updateModelSchema = z.object({
  name: z.string().min(1).optional(),
  categoryId: z.string().min(1).optional(),
  launchDate: z.coerce.date().optional(),
  status: z.nativeEnum(ModelStatus).optional(),
});

export const listModelsQuerySchema = z.object({
  search: z.string().optional(),
  categoryId: z.string().optional(),
  status: z.nativeEnum(ModelStatus).optional(),
  sortBy: z
    .enum(["name", "launchDate", "conversion", "score", "createdAt"])
    .default("createdAt"),
  sortDir: z.enum(["asc", "desc"]).default("desc"),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateModelInput = z.infer<typeof createModelSchema>;
export type UpdateModelInput = z.infer<typeof updateModelSchema>;
export type ListModelsQuery = z.infer<typeof listModelsQuerySchema>;
