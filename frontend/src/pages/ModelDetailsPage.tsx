import { useParams } from "react-router-dom";
import { Eye, FileText, PackageCheck, ShoppingCart } from "lucide-react";
import { KpiCard } from "@/components/common/KpiCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { ModelHeader } from "@/components/model-details/ModelHeader";
import { ConversionCard } from "@/components/model-details/ConversionCard";
import { PerformanceTimelineChart } from "@/components/model-details/PerformanceTimelineChart";
import { HistoryTable } from "@/components/model-details/HistoryTable";
import { useModel } from "@/hooks/useModels";
import { useHistory } from "@/hooks/useStatistics";
import { formatNumber } from "@/lib/format";

export default function ModelDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: model, isLoading, isError, refetch } = useModel(id);
  const { data: history } = useHistory(id);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !model) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <ModelHeader model={model} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={<Eye className="size-5" />} label="Qiziqish" value={formatNumber(model.totalInterest)} accent="primary" />
        <KpiCard icon={<FileText className="size-5" />} label="Taklif" value={formatNumber(model.totalQuotations)} accent="warning" />
        <KpiCard icon={<PackageCheck className="size-5" />} label="Namuna" value={formatNumber(model.totalSamples)} accent="success" />
        <KpiCard icon={<ShoppingCart className="size-5" />} label="Sotuv" value={formatNumber(model.totalSales)} accent="destructive" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ConversionCard
          label="Qiziqish → Taklif"
          value={model.interestToQuotation}
          description="Qiziqish bildirganlardan necha foizi taklif oldi"
        />
        <ConversionCard
          label="Taklif → Namuna"
          value={model.quotationToSample}
          description="Taklif olganlardan necha foizi namuna oldi"
        />
        <ConversionCard
          label="Namuna → Sotuv"
          value={model.sampleToSale}
          description="Namuna olganlardan necha foizi sotib oldi"
        />
        <ConversionCard
          label="Qiziqish → Sotuv"
          value={model.interestToSale}
          description="Umumiy konversiya ko'rsatkichi"
        />
      </div>

      <PerformanceTimelineChart entries={history ?? []} />

      <HistoryTable entries={history ?? []} />
    </div>
  );
}
