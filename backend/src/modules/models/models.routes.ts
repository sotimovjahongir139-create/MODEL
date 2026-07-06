import { Router } from "express";
import { asyncHandler } from "../../shared/async-handler";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { uploadModelImage } from "../../middleware/upload.middleware";
import {
  createModelSchema,
  listModelsQuerySchema,
  updateModelSchema,
} from "./models.schema";
import {
  createModelHandler,
  deleteModelHandler,
  getModelHandler,
  listModelsHandler,
  updateModelHandler,
} from "./models.controller";
import { statisticsRouter } from "../statistics/statistics.routes";

export const modelsRouter = Router();

modelsRouter.use(authMiddleware);

modelsRouter.get("/", validate(listModelsQuerySchema, "query"), asyncHandler(listModelsHandler));
modelsRouter.post(
  "/",
  uploadModelImage,
  validate(createModelSchema),
  asyncHandler(createModelHandler)
);
modelsRouter.get("/:id", asyncHandler(getModelHandler));
modelsRouter.patch(
  "/:id",
  uploadModelImage,
  validate(updateModelSchema),
  asyncHandler(updateModelHandler)
);
modelsRouter.delete("/:id", asyncHandler(deleteModelHandler));

modelsRouter.use("/:modelId", statisticsRouter);
