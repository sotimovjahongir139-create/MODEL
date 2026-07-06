import { Badge } from "@/components/ui/badge";
import { statusBadgeVariant, statusLabels } from "@/lib/uz-labels";
import { ModelStatus } from "@/types/model";

export function StatusBadge({ status }: { status: ModelStatus }) {
  return <Badge variant={statusBadgeVariant[status]}>{statusLabels[status]}</Badge>;
}
