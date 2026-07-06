import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryBreakdown } from "@/types/analytics";

export function CategoryBarChart({ data }: { data: CategoryBreakdown[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Kategoriyalar bo'yicha taqsimot</CardTitle>
      </CardHeader>
      <CardContent className="h-72 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="interest" name="Qiziqish" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="sales" name="Sotuv" fill="var(--color-success)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
