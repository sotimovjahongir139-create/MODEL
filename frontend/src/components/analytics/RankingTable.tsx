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
import { RankingEntry } from "@/types/analytics";
import { formatNumber, formatPercent } from "@/lib/format";

export function RankingTable({ rankings }: { rankings: RankingEntry[] }) {
  if (rankings.length === 0) {
    return <EmptyState title="Modellar yo'q" />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
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
        {rankings.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell className="text-muted-foreground">{entry.rank}</TableCell>
            <TableCell className="font-medium text-foreground">
              <Link to={`/models/${entry.id}`} className="hover:underline">
                {entry.name}
              </Link>
            </TableCell>
            <TableCell className="text-muted-foreground">{entry.category}</TableCell>
            <TableCell>{formatNumber(entry.totalInterest)}</TableCell>
            <TableCell>{formatNumber(entry.totalQuotations)}</TableCell>
            <TableCell>{formatNumber(entry.totalSamples)}</TableCell>
            <TableCell>{formatNumber(entry.totalSales)}</TableCell>
            <TableCell>{formatPercent(entry.conversion)}</TableCell>
            <TableCell className="font-medium">{entry.score.toFixed(1)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
