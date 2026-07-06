import { prisma } from "../../lib/prisma";
import { computeMetrics } from "../../shared/metrics";

async function getAllModelsWithMetrics() {
  const models = await prisma.model.findMany({ include: { category: true } });
  const maxSales = models.reduce((max, m) => Math.max(max, m.totalSales), 0);
  return models.map((model) => ({ ...model, ...computeMetrics(model, maxSales) }));
}

export async function getSummary() {
  const models = await getAllModelsWithMetrics();

  const activeModels = models.filter((m) => m.status === "ACTIVE").length;
  const totalInterest = models.reduce((sum, m) => sum + m.totalInterest, 0);
  const totalQuotations = models.reduce((sum, m) => sum + m.totalQuotations, 0);
  const totalSamples = models.reduce((sum, m) => sum + m.totalSamples, 0);
  const totalSales = models.reduce((sum, m) => sum + m.totalSales, 0);

  const bestModel = models.reduce<(typeof models)[number] | null>(
    (best, m) => (!best || m.score > best.score ? m : best),
    null
  );
  const highestConversion = models.reduce<(typeof models)[number] | null>(
    (best, m) => (!best || m.interestToSale > best.interestToSale ? m : best),
    null
  );

  return {
    activeModels,
    totalInterest,
    totalQuotations,
    totalSamples,
    totalSales,
    bestModel: bestModel ? { id: bestModel.id, name: bestModel.name, score: bestModel.score } : null,
    highestConversion: highestConversion
      ? { id: highestConversion.id, name: highestConversion.name, conversion: highestConversion.interestToSale }
      : null,
  };
}

export async function getTopModels(limit = 10) {
  const models = await getAllModelsWithMetrics();
  return models
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((m) => ({
      id: m.id,
      name: m.name,
      category: m.category.name,
      totalInterest: m.totalInterest,
      totalQuotations: m.totalQuotations,
      totalSamples: m.totalSamples,
      totalSales: m.totalSales,
      conversion: m.interestToSale,
      score: m.score,
    }));
}

export async function getTrend() {
  const entries = await prisma.statisticEntry.findMany({ orderBy: { date: "asc" } });
  const byDate = new Map<string, { interest: number; quotations: number; samples: number; sales: number }>();

  for (const entry of entries) {
    const key = entry.date.toISOString().slice(0, 10);
    const existing = byDate.get(key) ?? { interest: 0, quotations: 0, samples: 0, sales: 0 };
    existing.interest += entry.interestDelta;
    existing.quotations += entry.quotationsDelta;
    existing.samples += entry.samplesDelta;
    existing.sales += entry.salesDelta;
    byDate.set(key, existing);
  }

  return Array.from(byDate.entries()).map(([date, values]) => ({ date, ...values }));
}

export async function getFunnel() {
  const models = await prisma.model.findMany();
  return {
    interest: models.reduce((sum, m) => sum + m.totalInterest, 0),
    quotations: models.reduce((sum, m) => sum + m.totalQuotations, 0),
    samples: models.reduce((sum, m) => sum + m.totalSamples, 0),
    sales: models.reduce((sum, m) => sum + m.totalSales, 0),
  };
}
