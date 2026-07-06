import { Request, Response } from "express";
import * as modelsService from "./models.service";

function resolveImagePath(req: Request): string | null {
  return req.file ? `models/${req.file.filename}` : null;
}

export async function listModelsHandler(req: Request, res: Response) {
  const result = await modelsService.listModels(req.query as any);
  res.json(result);
}

export async function getModelHandler(req: Request, res: Response) {
  const model = await modelsService.getModelById(req.params.id);
  res.json(model);
}

export async function createModelHandler(req: Request, res: Response) {
  const model = await modelsService.createModel(req.body, resolveImagePath(req));
  res.status(201).json(model);
}

export async function updateModelHandler(req: Request, res: Response) {
  const imagePath = req.file ? resolveImagePath(req) : undefined;
  const model = await modelsService.updateModel(req.params.id, req.body, imagePath);
  res.json(model);
}

export async function deleteModelHandler(req: Request, res: Response) {
  await modelsService.deleteModel(req.params.id);
  res.status(204).send();
}
