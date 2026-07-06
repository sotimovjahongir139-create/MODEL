import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/common/EmptyState";
import { TopModel } from "@/types/dashboard";
import { formatNumber, formatPercent } from "@/lib/format";

export function TopModelsTable({ models }: { models: TopModel[] }) {
  if (models.length === 0) {
    return <EmptyState title="Modellar yo'q" description="Hali model qo'shilmagan" />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Model</TableHead>
          <TableHead>Kategoriya</TableHead>
          <TableHead>Qiziqish</TableHead>
          <TableHead>Taklif</TableHead>
          <TableHead>Namuna</TableHead>
          <TableHead>Sotuv</TableHead>
          <TableHead>Konversiya</TableHead>
          <TableHead>Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {models.map((model) => (
          <TableRow key={model.id}>
            <TableCell className="font-medium text-foreground">
              <Link to={`/models/${model.id}`} className="hover:underline">
                {model.name}
              </Link>
            </TableCell>
            <TableCell className="text-muted-foreground">{model.category}</TableCell>
            <TableCell>{formatNumber(model.totalInterest)}</TableCell>
            <TableCell>{formatNumber(model.totalQuotations)}</TableCell>
            <TableCell>{formatNumber(model.totalSamples)}</TableCell>
            <TableCell>{formatNumber(model.totalSales)}</TableCell>
            <TableCell>{formatPercent(model.conversion)}</TableCell>
            <TableCell className="font-medium">{model.score.toFixed(1)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
