import { Router } from "express";
import { asyncHandler } from "../../shared/async-handler";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { loginSchema } from "./auth.schema";
import { loginHandler, meHandler } from "./auth.controller";

export const authRouter = Router();

authRouter.post("/login", validate(loginSchema), asyncHandler(loginHandler));
authRouter.get("/me", authMiddleware, asyncHandler(meHandler));
