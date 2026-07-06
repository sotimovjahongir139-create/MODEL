export interface ModelCounters {
  totalInterest: number;
  totalQuotations: number;
  totalSamples: number;
  totalSales: number;
}

export interface ModelMetrics {
  interestToQuotation: number;
  quotationToSample: number;
  sampleToSale: number;
  interestToSale: number;
  score: number;
}

function safeRatio(numerator: number, denominator: number): number {
  if (denominator <= 0) return 0;
  const pct = (numerator / denominator) * 100;
  return Math.min(Math.round(pct * 10) / 10, 100);
}

export function computeMetrics(
  counters: ModelCounters,
  maxSalesAcrossModels: number
): ModelMetrics {
  const interestToQuotation = safeRatio(counters.totalQuotations, counters.totalInterest);
  const quotationToSample = safeRatio(counters.totalSamples, counters.totalQuotations);
  const sampleToSale = safeRatio(counters.totalSales, counters.totalSamples);
  const interestToSale = safeRatio(counters.totalSales, counters.totalInterest);

  const normalizedVolume =
    maxSalesAcrossModels > 0
      ? Math.min(counters.totalSales / maxSalesAcrossModels, 1) * 100
      : 0;

  const score =
    Math.round(
      (0.4 * interestToSale +
        0.3 * sampleToSale +
        0.2 * quotationToSample +
        0.1 * normalizedVolume) *
        10
    ) / 10;

  return {
    interestToQuotation,
    quotationToSample,
    sampleToSale,
    interestToSale,
    score: Math.min(score, 100),
  };
}
