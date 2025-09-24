import { useState } from "react";

interface Props {
  value: string | number;
  onChange: (val: string) => void;
}

export const CSVCell = ({ value, onChange }: Props) => {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(String(value));
  const [edited, setEdited] = useState(false); // Track if cell was edited

  const handleSave = () => {
    setEditing(false);
    if (temp !== String(value)) {
      onChange(temp);
      setEdited(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <td
      className={`px-3 py-2 border text-sm ${edited ? "bg-stone-500" : ""}`}
      onClick={() => setEditing(true)}
    >
      {editing ? (
        <input
          className="w-full p-1 border rounded"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          onBlur={handleSave} // save on blur as well
          onKeyDown={handleKeyDown} // save on Enter
          autoFocus
        />
      ) : (
        String(value)
      )}
    </td>
  );
};
