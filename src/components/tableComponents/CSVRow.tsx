import { CSVCell } from "./CSVCell";
import type { BookRow } from "../../types/types";

interface Props {
  row: BookRow;
  rowIndex: number;
  headers: string[];
  onEditCell: (rowIndex: number, column: string, value: string) => void;
}

export const CSVRow = ({ row, rowIndex, headers, onEditCell }: Props) => {
  return (
    <tr className="hover:bg-black/50 cursor-pointer">
      {headers.map((col) => (
        <CSVCell
          key={col}
          value={row[col as keyof BookRow]}
          onChange={(val) => onEditCell(rowIndex, col, val)}
        />
      ))}
    </tr>
  );
};
