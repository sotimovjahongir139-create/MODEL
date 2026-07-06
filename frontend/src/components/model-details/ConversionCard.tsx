import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatPercent } from "@/lib/format";

interface ConversionCardProps {
  label: string;
  value: number;
  description: string;
}

export function ConversionCard({ label, value, description }: ConversionCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 py-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-lg font-semibold text-foreground">{formatPercent(value)}</span>
        </div>
        <Progress value={value} />
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
