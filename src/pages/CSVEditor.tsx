import { Navbar } from "../components/bars/Navbar";
import { CSVTable } from "../components/sections/CSVTable";
import { HandleCSV } from "../components/sections/HandleCSV";
import { Landing } from "../components/sections/Landing";
import { useAppSelector } from "../store/hooks";

export const CSVEditor = () => {
  const rows = useAppSelector((state) => state.books.rows);
  const hasRows = rows.length > 0;

  return (
    <div className="flex flex-col items-center justify-start w-full h-full gap-5">
      <Navbar />
      <HandleCSV />
      {hasRows ? <CSVTable /> : <Landing />}
    </div>
  );
};
