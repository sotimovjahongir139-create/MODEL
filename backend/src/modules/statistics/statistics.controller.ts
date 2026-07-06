import { Request, Response } from "express";
import * as statisticsService from "./statistics.service";

export async function addStatisticHandler(req: Request, res: Response) {
  const result = await statisticsService.addStatisticEntry(req.params.modelId, req.body);
  res.status(201).json(result);
}

export async function listHistoryHandler(req: Request, res: Response) {
  const history = await statisticsService.listHistory(req.params.modelId);
  res.json(history);
}
