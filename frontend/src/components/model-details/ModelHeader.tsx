import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ImageOff, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/models/StatusBadge";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { StatisticsModal } from "./StatisticsModal";
import { Model } from "@/types/model";
import { formatDate } from "@/lib/format";
import { resolveImageUrl } from "@/lib/image";
import { useDeleteModel } from "@/hooks/useModels";
import { extractErrorMessage } from "@/services/api";

export function ModelHeader({ model }: { model: Model }) {
  const navigate = useNavigate();
  const deleteModel = useDeleteModel();
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [statsOpen, setStatsOpen] = React.useState(false);
  const imageUrl = resolveImageUrl(model.imagePath);

  async function handleDelete() {
    try {
      await deleteModel.mutateAsync(model.id);
      toast.success("Model o'chirildi");
      navigate("/models");
    } catch (error) {
      toast.error(extractErrorMessage(error, "O'chirishda xatolik yuz berdi"));
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
          {imageUrl ? (
            <img src={imageUrl} alt={model.name} className="size-full object-cover" />
          ) : (
            <ImageOff className="size-8 text-muted-foreground" />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">{model.name}</h1>
            <StatusBadge status={model.status} />
          </div>
          <p className="text-sm text-muted-foreground">{model.category.name}</p>
          <p className="text-sm text-muted-foreground">{formatDate(model.launchDate)}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate(`/models/${model.id}/edit`)}>
          <Pencil /> Tahrirlash
        </Button>
        <Button
          variant="outline"
          className="w-full text-destructive sm:w-auto"
          onClick={() => setConfirmOpen(true)}
        >
          <Trash2 /> O'chirish
        </Button>
        <Button className="w-full sm:w-auto" onClick={() => setStatsOpen(true)}>
          <Plus /> Statistika qo'shish
        </Button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Modelni o'chirish"
        description={`"${model.name}" modelini o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.`}
        onConfirm={handleDelete}
        isLoading={deleteModel.isPending}
      />

      <StatisticsModal open={statsOpen} onOpenChange={setStatsOpen} modelId={model.id} />
    </div>
  );
}
