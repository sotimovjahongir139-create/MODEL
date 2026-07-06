import { Router } from "express";
import { asyncHandler } from "../../shared/async-handler";
import { validate } from "../../middleware/validate.middleware";
import { addStatisticSchema } from "./statistics.schema";
import { addStatisticHandler, listHistoryHandler } from "./statistics.controller";

export const statisticsRouter = Router({ mergeParams: true });

statisticsRouter.post(
  "/statistics",
  validate(addStatisticSchema),
  asyncHandler(addStatisticHandler)
);
statisticsRouter.get("/history", asyncHandler(listHistoryHandler));
