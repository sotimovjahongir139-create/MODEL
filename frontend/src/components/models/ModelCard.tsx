import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Model } from "@/types/model";
import { formatDate, formatNumber, formatPercent } from "@/lib/format";
import { resolveImageUrl } from "@/lib/image";

export function ModelCard({ model }: { model: Model }) {
  const imageUrl = resolveImageUrl(model.imagePath);

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="aspect-video w-full bg-muted flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={model.name} className="size-full object-cover" />
        ) : (
          <ImageOff className="size-8 text-muted-foreground" />
        )}
      </div>
      <CardContent className="flex flex-col gap-2 pt-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-semibold text-foreground">{model.name}</p>
            <p className="truncate text-xs text-muted-foreground">{model.category.name}</p>
          </div>
          <StatusBadge status={model.status} />
        </div>
        <p className="text-xs text-muted-foreground">{formatDate(model.launchDate)}</p>
        <div className="grid grid-cols-4 gap-2 pt-2 text-center">
          <MiniStat label="Qiziqish" value={model.totalInterest} />
          <MiniStat label="Taklif" value={model.totalQuotations} />
          <MiniStat label="Namuna" value={model.totalSamples} />
          <MiniStat label="Sotuv" value={model.totalSales} />
        </div>
        <div className="flex items-center justify-between pt-1 text-sm">
          <span className="text-muted-foreground">Konversiya: {formatPercent(model.interestToSale)}</span>
          <span className="font-medium text-foreground">Score: {model.score.toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/models/${model.id}`}>Batafsil</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col rounded-md bg-muted/50 py-1.5">
      <span className="text-sm font-semibold text-foreground">{formatNumber(value)}</span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}
