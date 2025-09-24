import { convertToCSV } from "../../functions/ConvertToCSV";
import { useAppSelector } from "../../store/hooks";

export const DownloadCSVButton = () => {
  const rows = useAppSelector((state) => state.books.rows);

  const handleDownload = () => {
    if (rows.length === 0) return;

    const csvContent = convertToCSV(rows);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "books.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="px-3 py-1 border rounded bg-green-500 text-white hover:bg-green-600"
    >
      Download CSV
    </button>
  );
};
