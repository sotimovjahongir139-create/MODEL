import { Router } from "express";
import { asyncHandler } from "../../shared/async-handler";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { createCategorySchema } from "./categories.schema";
import { createCategoryHandler, listCategoriesHandler } from "./categories.controller";

export const categoriesRouter = Router();

categoriesRouter.use(authMiddleware);
categoriesRouter.get("/", asyncHandler(listCategoriesHandler));
categoriesRouter.post("/", validate(createCategorySchema), asyncHandler(createCategoryHandler));
