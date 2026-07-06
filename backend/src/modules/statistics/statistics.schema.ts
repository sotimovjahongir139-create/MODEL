import { z } from "zod";

export const addStatisticSchema = z.object({
  interest: z.coerce.number().int().nonnegative().default(0),
  quotations: z.coerce.number().int().nonnegative().default(0),
  samples: z.coerce.number().int().nonnegative().default(0),
  sales: z.coerce.number().int().nonnegative().default(0),
  note: z.string().optional(),
});

export type AddStatisticInput = z.infer<typeof addStatisticSchema>;
