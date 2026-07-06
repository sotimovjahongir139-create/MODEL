import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { prisma } from "../../lib/prisma";
import { HttpError } from "../../shared/http-error";
import { LoginInput } from "./auth.schema";

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new HttpError(401, "Email yoki parol noto'g'ri");

  const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);
  if (!passwordMatches) throw new HttpError(401, "Email yoki parol noto'g'ri");

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn } as jwt.SignOptions
  );

  return {
    token,
    user: { id: user.id, email: user.email, role: user.role },
  };
}

export async function getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new HttpError(404, "Foydalanuvchi topilmadi");
  return { id: user.id, email: user.email, role: user.role };
}
