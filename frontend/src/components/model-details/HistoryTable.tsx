import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/common/EmptyState";
import { StatisticEntry } from "@/types/statistics";
import { formatDate, formatNumber } from "@/lib/format";

export function HistoryTable({ entries }: { entries: StatisticEntry[] }) {
  if (entries.length === 0) {
    return <EmptyState title="Tarix bo'sh" description="Hali statistika kiritilmagan" />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sana</TableHead>
          <TableHead>Qiziqish</TableHead>
          <TableHead>Taklif</TableHead>
          <TableHead>Namuna</TableHead>
          <TableHead>Sotuv</TableHead>
          <TableHead>Izoh</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...entries].reverse().map((entry) => (
          <TableRow key={entry.id}>
            <TableCell>{formatDate(entry.date)}</TableCell>
            <TableCell>+{formatNumber(entry.interestDelta)}</TableCell>
            <TableCell>+{formatNumber(entry.quotationsDelta)}</TableCell>
            <TableCell>+{formatNumber(entry.samplesDelta)}</TableCell>
            <TableCell>+{formatNumber(entry.salesDelta)}</TableCell>
            <TableCell className="max-w-56 truncate text-muted-foreground">
              {entry.note || "—"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
