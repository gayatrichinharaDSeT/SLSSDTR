function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function toCsv(headers: string[], rows: string[][]): string {
  const lines = [headers, ...rows].map((row) => row.map(escapeCsvCell).join(","));
  // Leading BOM so Excel detects UTF-8 correctly instead of mangling non-ASCII characters (₹, etc).
  return "﻿" + lines.join("\r\n");
}
