import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FunnelSummary } from "@/types/dashboard";

export function StageBarChart({ funnel }: { funnel: FunnelSummary }) {
  const data = [
    { stage: "Qiziqish", value: funnel.interest },
    { stage: "Taklif", value: funnel.quotations },
    { stage: "Namuna", value: funnel.samples },
    { stage: "Sotuv", value: funnel.sales },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Voronka bosqichlari</CardTitle>
      </CardHeader>
      <CardContent className="h-72 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
