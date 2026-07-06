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
import { TrendPoint } from "@/types/dashboard";
import { formatDate } from "@/lib/format";

export function TrendLineChart({ data, title }: { data: TrendPoint[]; title: string }) {
  const chartData = data.map((point) => ({
    date: formatDate(point.date),
    Qiziqish: point.interest,
    Taklif: point.quotations,
    Namuna: point.samples,
    Sotuv: point.sales,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-72 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Qiziqish" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Sotuv" stroke="var(--color-success)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
