import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email noto'g'ri formatda"),
  password: z.string().min(1, "Parol kiritilishi shart"),
});

export type LoginInput = z.infer<typeof loginSchema>;
