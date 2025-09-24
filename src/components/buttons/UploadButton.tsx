import { useRef } from "react";
import type { BookRow } from "../../types/types";
import { useAppDispatch } from "../../store/hooks";
import { setBooks } from "../../slice/fakerSlice";
import { parseCSV } from "../../functions/PaseCSV";

export const UploadButton = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;

      // ✅ Save raw CSV in localStorage
      localStorage.setItem("uploadedCSV", text);

      // ✅ Parse CSV → BookRow[] before saving in Redux
      const rows: BookRow[] = parseCSV(text);

      // ✅ Save in Redux slice
      dispatch(setBooks(rows));

      console.log("CSV uploaded & saved to Redux + localStorage");
    };

    reader.readAsText(file);
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={handleButtonClick}
      >
        Upload CSV
      </button>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />
    </>
  );
};
