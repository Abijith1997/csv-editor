import type { BookRow } from "../types/types";

export const convertToCSV = (rows: BookRow[]): string => {
  if (rows.length === 0) return "";

  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","), // header row
    ...rows.map((row) =>
      headers
        .map((h) => `"${String(row[h as keyof BookRow]).replace(/"/g, '""')}"`)
        .join(",")
    ),
  ].join("\n");

  return csv;
};
