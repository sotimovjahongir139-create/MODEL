import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { HttpError } from "../../shared/http-error";
import { computeMetrics } from "../../shared/metrics";
import { CreateModelInput, ListModelsQuery, UpdateModelInput } from "./models.schema";

async function getMaxSales(): Promise<number> {
  const result = await prisma.model.aggregate({ _max: { totalSales: true } });
  return result._max.totalSales ?? 0;
}

function withMetrics<T extends Parameters<typeof computeMetrics>[0]>(
  model: T,
  maxSales: number
) {
  return { ...model, ...computeMetrics(model, maxSales) };
}

export async function listModels(query: ListModelsQuery) {
  const where: Prisma.ModelWhereInput = {
    ...(query.search ? { name: { contains: query.search, mode: "insensitive" } } : {}),
    ...(query.categoryId ? { categoryId: query.categoryId } : {}),
    ...(query.status ? { status: query.status } : {}),
  };

  const [models, maxSales] = await Promise.all([
    prisma.model.findMany({ where, include: { category: true } }),
    getMaxSales(),
  ]);

  const enriched = models.map((model) => withMetrics(model, maxSales));

  const sortKey = query.sortBy === "conversion" ? "interestToSale" : query.sortBy;
  enriched.sort((a, b) => {
    const aValue = (a as any)[sortKey];
    const bValue = (b as any)[sortKey];
    if (aValue < bValue) return query.sortDir === "asc" ? -1 : 1;
    if (aValue > bValue) return query.sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const total = enriched.length;
  const start = (query.page - 1) * query.pageSize;
  const items = enriched.slice(start, start + query.pageSize);

  return { items, total, page: query.page, pageSize: query.pageSize };
}

export async function getModelById(id: string) {
  const model = await prisma.model.findUnique({ where: { id }, include: { category: true } });
  if (!model) throw new HttpError(404, "Model topilmadi");
  const maxSales = await getMaxSales();
  return withMetrics(model, maxSales);
}

export async function createModel(input: CreateModelInput, imagePath: string | null) {
  return prisma.model.create({
    data: { ...input, imagePath },
    include: { category: true },
  });
}

export async function updateModel(
  id: string,
  input: UpdateModelInput,
  imagePath: string | null | undefined
) {
  const existing = await prisma.model.findUnique({ where: { id } });
  if (!existing) throw new HttpError(404, "Model topilmadi");

  return prisma.model.update({
    where: { id },
    data: { ...input, ...(imagePath !== undefined ? { imagePath } : {}) },
    include: { category: true },
  });
}

export async function deleteModel(id: string) {
  const existing = await prisma.model.findUnique({ where: { id } });
  if (!existing) throw new HttpError(404, "Model topilmadi");
  await prisma.model.delete({ where: { id } });
}
