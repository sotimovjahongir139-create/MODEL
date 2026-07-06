import { prisma } from "../../lib/prisma";
import { HttpError } from "../../shared/http-error";
import { AddStatisticInput } from "./statistics.schema";

export async function addStatisticEntry(modelId: string, input: AddStatisticInput) {
  const model = await prisma.model.findUnique({ where: { id: modelId } });
  if (!model) throw new HttpError(404, "Model topilmadi");

  return prisma.$transaction(async (tx) => {
    const entry = await tx.statisticEntry.create({
      data: {
        modelId,
        interestDelta: input.interest,
        quotationsDelta: input.quotations,
        samplesDelta: input.samples,
        salesDelta: input.sales,
        note: input.note,
      },
    });

    const updatedModel = await tx.model.update({
      where: { id: modelId },
      data: {
        totalInterest: { increment: input.interest },
        totalQuotations: { increment: input.quotations },
        totalSamples: { increment: input.samples },
        totalSales: { increment: input.sales },
      },
    });

    return { entry, model: updatedModel };
  });
}

export async function listHistory(modelId: string) {
  const model = await prisma.model.findUnique({ where: { id: modelId } });
  if (!model) throw new HttpError(404, "Model topilmadi");

  return prisma.statisticEntry.findMany({
    where: { modelId },
    orderBy: { date: "asc" },
  });
}
