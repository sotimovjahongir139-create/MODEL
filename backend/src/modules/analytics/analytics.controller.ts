import { Request, Response } from "express";
import * as analyticsService from "./analytics.service";
import { getTrend } from "../dashboard/dashboard.service";

export async function highlightsHandler(_req: Request, res: Response) {
  res.json(await analyticsService.getHighlights());
}

export async function byCategoryHandler(_req: Request, res: Response) {
  res.json(await analyticsService.getByCategory());
}

export async function distributionHandler(_req: Request, res: Response) {
  res.json(await analyticsService.getDistribution());
}

export async function trendHandler(_req: Request, res: Response) {
  res.json(await getTrend());
}

export async function rankingHandler(_req: Request, res: Response) {
  res.json(await analyticsService.getRanking());
}
