import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/EmptyState";
import { DistributionSlice } from "@/types/analytics";

const COLORS = [
  "var(--color-primary)",
  "var(--color-success)",
  "var(--color-warning)",
  "var(--color-destructive)",
  "oklch(0.6 0.1 300)",
  "oklch(0.6 0.1 200)",
];

export function DistributionPieChart({ data }: { data: DistributionSlice[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Sotuvlar taqsimoti</CardTitle>
      </CardHeader>
      <CardContent className="h-72 pb-4">
        {data.length === 0 ? (
          <EmptyState title="Ma'lumot yo'q" description="Hali sotuv qayd etilmagan" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
