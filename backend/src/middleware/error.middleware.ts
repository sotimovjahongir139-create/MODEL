import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { HttpError } from "../shared/http-error";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({ message: err.issues.map((i) => i.message).join("; ") });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      res.status(409).json({ message: "Bu qiymat allaqachon mavjud" });
      return;
    }
    if (err.code === "P2025") {
      res.status(404).json({ message: "Topilmadi" });
      return;
    }
  }

  console.error(err);
  res.status(500).json({ message: "Serverda kutilmagan xatolik yuz berdi" });
}
