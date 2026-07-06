export function formatNumber(value: number): string {
  return new Intl.NumberFormat("uz-UZ").format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("uz-UZ", { day: "2-digit", month: "2-digit", year: "numeric" }).format(
    new Date(value)
  );
}
