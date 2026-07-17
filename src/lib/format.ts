const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatMonth(isoMonth: string): string {
  const [year, month] = isoMonth.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatDateRange(start: string, end: string | null): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : "Present"}`;
}

export function formatDuration(start: string, end: string | null): string {
  const [startYear, startMonth] = start.split("-").map(Number);
  const endDate = end ? end.split("-").map(Number) : null;
  const now = new Date();
  const endYear = endDate ? endDate[0] : now.getFullYear();
  const endMonth = endDate ? endDate[1] : now.getMonth() + 1;

  const totalMonths = Math.max(1, (endYear - startYear) * 12 + (endMonth - startMonth) + 1);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  return parts.join(" ");
}
