import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { HttpError } from "../shared/http-error";

type RequestPart = "body" | "query" | "params";

export function validate(schema: ZodSchema, part: RequestPart = "body") {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[part]);
    if (!result.success) {
      const message = result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");
      throw new HttpError(400, message);
    }
    req[part] = result.data;
    next();
  };
}
