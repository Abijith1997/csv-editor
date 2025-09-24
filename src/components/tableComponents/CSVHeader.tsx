interface Props {
  headers: string[];
  sortConfig: { key: string; direction: "asc" | "desc" } | null;
  setSortConfig: (
    config: { key: string; direction: "asc" | "desc" } | null
  ) => void;
}

export const CSVHeader = ({ headers, sortConfig, setSortConfig }: Props) => {
  const toggleSort = (col: string) => {
    if (!sortConfig || sortConfig.key !== col) {
      // No sort yet OR switching to a new column → start with ascending
      setSortConfig({ key: col, direction: "asc" });
    } else if (sortConfig.direction === "asc") {
      // Was ascending → switch to descending
      setSortConfig({ key: col, direction: "desc" });
    } else {
      // Was descending → clear sort
      setSortConfig(null);
    }
  };

  return (
    <tr>
      {headers.map((h) => (
        <th
          key={h}
          className="px-3 py-2 border cursor-pointer select-none bg-black"
          onClick={() => toggleSort(h)}
        >
          {h}
          {sortConfig?.key === h &&
            (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
        </th>
      ))}
    </tr>
  );
};
