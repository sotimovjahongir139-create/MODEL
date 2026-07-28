-- CreateEnum
CREATE TYPE "StatCategory" AS ENUM ('INTEREST', 'QUOTATIONS', 'SAMPLES', 'SALES');

-- CreateTable
CREATE TABLE "statistic_clients" (
    "id" TEXT NOT NULL,
    "statisticEntryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stage" "StatCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "statistic_clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "statistic_clients_statisticEntryId_idx" ON "statistic_clients"("statisticEntryId");

-- AddForeignKey
ALTER TABLE "statistic_clients" ADD CONSTRAINT "statistic_clients_statisticEntryId_fkey" FOREIGN KEY ("statisticEntryId") REFERENCES "model_statistics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
