import { resetBooks } from "../../slice/fakerSlice";
import { useAppDispatch } from "../../store/hooks";
import { DownloadCSVButton } from "../buttons/DownloadButton";

interface Props {
  filterText: string;
  setFilterText: (t: string) => void;
  page: number;
  setPage: (n: number) => void;
  total: number;
  pageSize: number;
}

export const CSVToolbar = ({
  filterText,
  setFilterText,
  page,
  setPage,
  total,
  pageSize,
}: Props) => {
  const dispatch = useAppDispatch();
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex justify-between items-center mb-2 w-full md:flex-row gap-2 flex-col">
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search..."
        className="border rounded px-2 py-1"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <div className="flex items-center gap-2 [&>button]:cursor-pointer">
        {/* ⬅️ Prev */}
        <button
          className="px-2 py-1 border rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          {page} / {totalPages || 1}
        </span>

        {/* ➡️ Next */}
        <button
          className="px-2 py-1 border rounded disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

        <DownloadCSVButton />

        {/* 🔄 Reset */}
        <button
          className="px-3 py-1 border rounded bg-red-500 text-white hover:bg-red-600"
          onClick={() => dispatch(resetBooks())}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
