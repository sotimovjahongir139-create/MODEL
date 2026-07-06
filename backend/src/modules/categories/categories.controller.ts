import { Request, Response } from "express";
import * as categoriesService from "./categories.service";

export async function listCategoriesHandler(_req: Request, res: Response) {
  const categories = await categoriesService.listCategories();
  res.json(categories);
}

export async function createCategoryHandler(req: Request, res: Response) {
  const category = await categoriesService.createCategory(req.body);
  res.status(201).json(category);
}
