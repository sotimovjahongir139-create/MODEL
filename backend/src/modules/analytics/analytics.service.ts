import { prisma } from "../../lib/prisma";
import { computeMetrics } from "../../shared/metrics";

async function getAllModelsWithMetrics() {
  const models = await prisma.model.findMany({ include: { category: true } });
  const maxSales = models.reduce((max, m) => Math.max(max, m.totalSales), 0);
  return models.map((model) => ({ ...model, ...computeMetrics(model, maxSales) }));
}

function pickTop<T>(models: T[], selector: (m: T) => number) {
  return models.reduce<T | null>((best, m) => {
    if (!best) return m;
    return selector(m) > selector(best) ? m : best;
  }, null);
}

export async function getHighlights() {
  const models = await getAllModelsWithMetrics();

  const topPerforming = pickTop(models, (m) => m.score);
  const highestInterest = pickTop(models, (m) => m.totalInterest);
  const highestQuotations = pickTop(models, (m) => m.totalQuotations);
  const highestSamples = pickTop(models, (m) => m.totalSamples);
  const highestSales = pickTop(models, (m) => m.totalSales);
  const highestConversion = pickTop(models, (m) => m.interestToSale);

  const toSummary = (m: (typeof models)[number] | null, valueKey: keyof (typeof models)[number]) =>
    m ? { id: m.id, name: m.name, value: m[valueKey] } : null;

  return {
    topPerforming: toSummary(topPerforming, "score"),
    highestInterest: toSummary(highestInterest, "totalInterest"),
    highestQuotations: toSummary(highestQuotations, "totalQuotations"),
    highestSamples: toSummary(highestSamples, "totalSamples"),
    highestSales: toSummary(highestSales, "totalSales"),
    highestConversion: toSummary(highestConversion, "interestToSale"),
  };
}

export async function getByCategory() {
  const models = await getAllModelsWithMetrics();
  const byCategory = new Map<
    string,
    { category: string; interest: number; quotations: number; samples: number; sales: number }
  >();

  for (const model of models) {
    const key = model.category.name;
    const existing = byCategory.get(key) ?? {
      category: key,
      interest: 0,
      quotations: 0,
      samples: 0,
      sales: 0,
    };
    existing.interest += model.totalInterest;
    existing.quotations += model.totalQuotations;
    existing.samples += model.totalSamples;
    existing.sales += model.totalSales;
    byCategory.set(key, existing);
  }

  return Array.from(byCategory.values());
}

export async function getDistribution() {
  const models = await getAllModelsWithMetrics();
  return models
    .filter((m) => m.totalSales > 0)
    .map((m) => ({ name: m.name, value: m.totalSales }));
}

export async function getRanking() {
  const models = await getAllModelsWithMetrics();
  return models
    .sort((a, b) => b.score - a.score)
    .map((m, index) => ({
      rank: index + 1,
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
