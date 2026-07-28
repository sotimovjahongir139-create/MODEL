import { z } from "zod";

export const statCategorySchema = z.enum(["INTEREST", "QUOTATIONS", "SAMPLES", "SALES"]);

export const statisticClientSchema = z.object({
  name: z.string().trim().min(1, "Mijoz ismini kiriting"),
  stage: statCategorySchema,
});

export const addStatisticSchema = z.object({
  interest: z.coerce.number().int().nonnegative().default(0),
  quotations: z.coerce.number().int().nonnegative().default(0),
  samples: z.coerce.number().int().nonnegative().default(0),
  sales: z.coerce.number().int().nonnegative().default(0),
  note: z.string().optional(),
  clients: z.array(statisticClientSchema).optional().default([]),
});

export type AddStatisticInput = z.infer<typeof addStatisticSchema>;
