import { Router } from "express";
import { asyncHandler } from "../../shared/async-handler";
import { authMiddleware } from "../../middleware/auth.middleware";
import {
  byCategoryHandler,
  distributionHandler,
  highlightsHandler,
  rankingHandler,
  trendHandler,
} from "./analytics.controller";

export const analyticsRouter = Router();

analyticsRouter.use(authMiddleware);
analyticsRouter.get("/highlights", asyncHandler(highlightsHandler));
analyticsRouter.get("/by-category", asyncHandler(byCategoryHandler));
analyticsRouter.get("/distribution", asyncHandler(distributionHandler));
analyticsRouter.get("/trend", asyncHandler(trendHandler));
analyticsRouter.get("/ranking", asyncHandler(rankingHandler));
