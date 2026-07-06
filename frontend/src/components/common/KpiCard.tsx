import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description?: string;
  className?: string;
  accent?: "primary" | "success" | "warning" | "destructive";
}

const accentClasses: Record<NonNullable<KpiCardProps["accent"]>, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
};

export function KpiCard({
  icon,
  label,
  value,
  description,
  className,
  accent = "primary",
}: KpiCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      <CardContent className="flex items-start gap-4 py-2">
        <div className={cn("flex size-11 shrink-0 items-center justify-center rounded-lg", accentClasses[accent])}>
          {icon}
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-2xl font-semibold tracking-tight text-foreground">{value}</span>
          <span className="text-sm font-medium text-foreground/80 truncate">{label}</span>
          {description && (
            <span className="text-xs text-muted-foreground truncate">{description}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
