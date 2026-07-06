import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Package } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { ModelsToolbar } from "@/components/models/ModelsToolbar";
import { ModelCard } from "@/components/models/ModelCard";
import { useModels } from "@/hooks/useModels";
import { useCategories } from "@/hooks/useCategories";
import { ModelListParams } from "@/types/model";

export default function ModelsPage() {
  const navigate = useNavigate();
  const [params, setParams] = React.useState<ModelListParams>({
    sortBy: "createdAt",
    sortDir: "desc",
    page: 1,
    pageSize: 24,
  });

  const { data: categories } = useCategories();
  const { data, isLoading, isError, refetch } = useModels(params);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Modellar"
        description="Barcha padoshva modellarini boshqarish"
        actions={
          <Button className="w-full sm:w-auto" onClick={() => navigate("/models/new")}>
            <Plus /> Yangi model
          </Button>
        }
      />

      <ModelsToolbar params={params} onChange={setParams} categories={categories ?? []} />

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full" />
          ))}
        </div>
      )}

      {isError && <ErrorState onRetry={() => refetch()} />}

      {!isLoading && !isError && data?.items.length === 0 && (
        <EmptyState
          icon={<Package className="size-5" />}
          title="Modellar topilmadi"
          description="Qidiruv shartlariga mos model yo'q yoki hali model qo'shilmagan"
          actionLabel="Yangi model qo'shish"
          onAction={() => navigate("/models/new")}
        />
      )}

      {!isLoading && !isError && data && data.items.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.items.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      )}
    </div>
  );
}
