import { Router } from "express";
import { asyncHandler } from "../../shared/async-handler";
import { authMiddleware } from "../../middleware/auth.middleware";
import {
  funnelHandler,
  summaryHandler,
  topModelsHandler,
  trendHandler,
} from "./dashboard.controller";

export const dashboardRouter = Router();

dashboardRouter.use(authMiddleware);
dashboardRouter.get("/summary", asyncHandler(summaryHandler));
dashboardRouter.get("/top-models", asyncHandler(topModelsHandler));
dashboardRouter.get("/trend", asyncHandler(trendHandler));
dashboardRouter.get("/funnel", asyncHandler(funnelHandler));
