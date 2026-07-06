import { Request, Response } from "express";
import * as dashboardService from "./dashboard.service";

export async function summaryHandler(_req: Request, res: Response) {
  res.json(await dashboardService.getSummary());
}

export async function topModelsHandler(_req: Request, res: Response) {
  res.json(await dashboardService.getTopModels());
}

export async function trendHandler(_req: Request, res: Response) {
  res.json(await dashboardService.getTrend());
}

export async function funnelHandler(_req: Request, res: Response) {
  res.json(await dashboardService.getFunnel());
}
