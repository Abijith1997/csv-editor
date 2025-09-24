import { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateBook } from "../../slice/fakerSlice";
import { CSVHeader } from "../tableComponents/CSVHeader";
import { CSVRow } from "../tableComponents/CSVRow";
import { CSVToolbar } from "../tableComponents/CSVToolbar";
import type { BookRow } from "../../types/types";

export const CSVTable = () => {
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.books.rows);
  const headers = useAppSelector((state) => state.books.headers);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [filterText, setFilterText] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // 🔎 Filtering
  const filteredRows = useMemo(() => {
    if (!filterText) return rows;
    return rows.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [rows, filterText]);

  // ↕️ Sorting
  const sortedRows = useMemo(() => {
    if (!sortConfig) return filteredRows;
    const { key, direction } = sortConfig;
    return [...filteredRows].sort((a, b) => {
      const av = String(a[key as keyof typeof a]);
      const bv = String(b[key as keyof typeof b]);
      return direction === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [filteredRows, sortConfig]);

  // 📄 Pagination
  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedRows.slice(start, start + pageSize);
  }, [sortedRows, page, pageSize]);

  const handleEditCell = (rowIndex: number, column: string, value: string) => {
    dispatch(updateBook({ rowIndex, column: column as keyof BookRow, value }));
  };

  return (
    <div className="w-full h-full flex flex-col p-4">
      <CSVToolbar
        filterText={filterText}
        setFilterText={setFilterText}
        page={page}
        setPage={setPage}
        total={sortedRows.length}
        pageSize={pageSize}
      />

      <div className="overflow-auto border rounded-lg shadow-md w-full h-full">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <CSVHeader
              headers={headers}
              sortConfig={sortConfig}
              setSortConfig={setSortConfig}
            />
          </thead>
          <tbody>
            {paginatedRows.map((row, i) => (
              <CSVRow
                key={i}
                row={row}
                rowIndex={(page - 1) * pageSize + i}
                headers={headers}
                onEditCell={handleEditCell}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
