import { Award, Eye, FileText, PackageCheck, ShoppingCart, Zap } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { HighlightCard } from "@/components/analytics/HighlightCard";
import { CategoryBarChart } from "@/components/analytics/CategoryBarChart";
import { DistributionPieChart } from "@/components/analytics/DistributionPieChart";
import { TrendLineChart } from "@/components/dashboard/TrendLineChart";
import { RankingTable } from "@/components/analytics/RankingTable";
import {
  useAnalyticsTrend,
  useByCategory,
  useDistribution,
  useHighlights,
  useRanking,
} from "@/hooks/useAnalytics";
import { formatNumber, formatPercent } from "@/lib/format";

export default function AnalyticsPage() {
  const highlights = useHighlights();
  const byCategory = useByCategory();
  const distribution = useDistribution();
  const trend = useAnalyticsTrend();
  const ranking = useRanking();

  const isLoading =
    highlights.isLoading || byCategory.isLoading || distribution.isLoading || trend.isLoading || ranking.isLoading;
  const isError =
    highlights.isError || byCategory.isError || distribution.isError || trend.isError || ranking.isError;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (isError || !highlights.data) {
    return (
      <ErrorState
        onRetry={() => {
          highlights.refetch();
          byCategory.refetch();
          distribution.refetch();
          trend.refetch();
          ranking.refetch();
        }}
      />
    );
  }

  const h = highlights.data;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Tahlil" description="Modellar bo'yicha chuqur tahliliy ko'rsatkichlar" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <HighlightCard icon={<Award className="size-5" />} label="Eng yaxshi model" entry={h.topPerforming} formatValue={(v) => `Score: ${v.toFixed(1)}`} accent="primary" />
        <HighlightCard icon={<Eye className="size-5" />} label="Eng yuqori qiziqish" entry={h.highestInterest} formatValue={formatNumber} accent="primary" />
        <HighlightCard icon={<FileText className="size-5" />} label="Eng yuqori taklif" entry={h.highestQuotations} formatValue={formatNumber} accent="warning" />
        <HighlightCard icon={<PackageCheck className="size-5" />} label="Eng yuqori namuna" entry={h.highestSamples} formatValue={formatNumber} accent="success" />
        <HighlightCard icon={<ShoppingCart className="size-5" />} label="Eng yuqori sotuv" entry={h.highestSales} formatValue={formatNumber} accent="destructive" />
        <HighlightCard icon={<Zap className="size-5" />} label="Eng yuqori konversiya" entry={h.highestConversion} formatValue={formatPercent} accent="success" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CategoryBarChart data={byCategory.data ?? []} />
        <DistributionPieChart data={distribution.data ?? []} />
      </div>

      <TrendLineChart data={trend.data ?? []} title="Umumiy tendensiya" />

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">Reyting jadvali</h2>
        <div className="rounded-xl border">
          <RankingTable rankings={ranking.data ?? []} />
        </div>
      </div>
    </div>
  );
}
