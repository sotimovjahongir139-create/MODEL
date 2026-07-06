import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatisticEntry } from "@/types/statistics";
import { formatDate } from "@/lib/format";

interface PerformanceTimelineChartProps {
  entries: StatisticEntry[];
}

export function PerformanceTimelineChart({ entries }: PerformanceTimelineChartProps) {
  let runningInterest = 0;
  let runningQuotations = 0;
  let runningSamples = 0;
  let runningSales = 0;

  const data = entries.map((entry) => {
    runningInterest += entry.interestDelta;
    runningQuotations += entry.quotationsDelta;
    runningSamples += entry.samplesDelta;
    runningSales += entry.salesDelta;
    return {
      date: formatDate(entry.date),
      Qiziqish: runningInterest,
      Taklif: runningQuotations,
      Namuna: runningSamples,
      Sotuv: runningSales,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Ishlash dinamikasi</CardTitle>
      </CardHeader>
      <CardContent className="h-72 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Qiziqish" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Taklif" stroke="var(--color-warning)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Namuna" stroke="var(--color-success)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Sotuv" stroke="var(--color-destructive)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
