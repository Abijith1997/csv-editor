import type { BookRow } from "../types/types";

export const parseCSV = (csv: string): BookRow[] => {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());

    // ✅ safer type than `any`
    const row: Partial<BookRow> = {};

    headers.forEach((h, i) => {
      row[h as keyof BookRow] = values[i] || "";
    });

    return row as BookRow;
  });
};
