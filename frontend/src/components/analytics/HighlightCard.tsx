import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HighlightEntry } from "@/types/analytics";
import { cn } from "@/lib/utils";

interface HighlightCardProps {
  icon: React.ReactNode;
  label: string;
  entry: HighlightEntry | null;
  formatValue: (value: number) => string;
  accent?: "primary" | "success" | "warning" | "destructive";
}

const accentClasses: Record<NonNullable<HighlightCardProps["accent"]>, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
};

export function HighlightCard({ icon, label, entry, formatValue, accent = "primary" }: HighlightCardProps) {
  return (
    <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex items-start gap-4 py-2">
        <div className={cn("flex size-11 shrink-0 items-center justify-center rounded-lg", accentClasses[accent])}>
          {icon}
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-sm font-medium text-foreground/80">{label}</span>
          <span className="truncate text-lg font-semibold text-foreground">{entry?.name ?? "—"}</span>
          <span className="text-xs text-muted-foreground">{entry ? formatValue(entry.value) : ""}</span>
        </div>
      </CardContent>
    </Card>
  );
}
