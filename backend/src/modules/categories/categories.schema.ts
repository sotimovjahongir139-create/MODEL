import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Kategoriya nomi kiritilishi shart"),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
