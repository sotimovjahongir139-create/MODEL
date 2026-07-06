import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { HttpError } from "../shared/http-error";

interface JwtPayload {
  id: string;
  email: string;
  role: "ADMIN" | "MANAGER";
}

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new HttpError(401, "Autentifikatsiya talab qilinadi");
  }

  const token = header.slice("Bearer ".length);
  try {
    const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
    req.user = payload;
    next();
  } catch {
    throw new HttpError(401, "Token yaroqsiz yoki muddati o'tgan");
  }
}
