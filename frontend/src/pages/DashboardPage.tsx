import { Eye, FileText, PackageCheck, ShoppingCart, TrendingUp, Trophy, Zap } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { KpiCard } from "@/components/common/KpiCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { TopModelsTable } from "@/components/dashboard/TopModelsTable";
import { TrendLineChart } from "@/components/dashboard/TrendLineChart";
import { StageBarChart } from "@/components/dashboard/StageBarChart";
import { Leaderboard } from "@/components/dashboard/Leaderboard";
import { useDashboardSummary, useDashboardTrend, useFunnel, useTopModels } from "@/hooks/useDashboard";
import { formatNumber, formatPercent } from "@/lib/format";

export default function DashboardPage() {
  const summary = useDashboardSummary();
  const topModels = useTopModels();
  const trend = useDashboardTrend();
  const funnel = useFunnel();

  const isLoading = summary.isLoading || topModels.isLoading || trend.isLoading || funnel.isLoading;
  const isError = summary.isError || topModels.isError || trend.isError || funnel.isError;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !summary.data) {
    return <ErrorState onRetry={() => { summary.refetch(); topModels.refetch(); trend.refetch(); funnel.refetch(); }} />;
  }

  const data = summary.data;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Bosh sahifa" description="Barcha modellar bo'yicha umumiy ko'rsatkichlar" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={<PackageCheck className="size-5" />} label="Faol modellar" value={formatNumber(data.activeModels)} accent="primary" />
        <KpiCard icon={<Eye className="size-5" />} label="Jami qiziqish" value={formatNumber(data.totalInterest)} accent="primary" />
        <KpiCard icon={<FileText className="size-5" />} label="Jami taklif" value={formatNumber(data.totalQuotations)} accent="warning" />
        <KpiCard icon={<PackageCheck className="size-5" />} label="Jami namuna" value={formatNumber(data.totalSamples)} accent="success" />
        <KpiCard icon={<ShoppingCart className="size-5" />} label="Jami sotuv" value={formatNumber(data.totalSales)} accent="destructive" />
        <KpiCard
          icon={<Trophy className="size-5" />}
          label="Eng yaxshi model"
          value={data.bestModel?.name ?? "—"}
          description={data.bestModel ? `Score: ${data.bestModel.score.toFixed(1)}` : undefined}
          accent="primary"
        />
        <KpiCard
          icon={<Zap className="size-5" />}
          label="Eng yuqori konversiya"
          value={data.highestConversion ? formatPercent(data.highestConversion.conversion) : "—"}
          description={data.highestConversion?.name}
          accent="success"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TrendLineChart data={trend.data ?? []} title="Umumiy dinamika" />
        <StageBarChart funnel={funnel.data ?? { interest: 0, quotations: 0, samples: 0, sales: 0 }} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="size-4" /> Top modellar
          </h2>
          <div className="rounded-xl border">
            <TopModelsTable models={topModels.data ?? []} />
          </div>
        </div>
        <Leaderboard models={topModels.data ?? []} />
      </div>
    </div>
  );
}
