import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/EmptyState";
import { TopModel } from "@/types/dashboard";
import { cn } from "@/lib/utils";

export function Leaderboard({ models }: { models: TopModel[] }) {
  const top5 = models.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Yetakchilar reytingi</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {top5.length === 0 ? (
          <EmptyState title="Ma'lumot yo'q" />
        ) : (
          top5.map((model, index) => (
            <Link
              key={model.id}
              to={`/models/${model.id}`}
              className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-accent"
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{model.name}</p>
                <p className="truncate text-xs text-muted-foreground">{model.category}</p>
              </div>
              <span className="text-sm font-semibold text-foreground">{model.score.toFixed(1)}</span>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
}
