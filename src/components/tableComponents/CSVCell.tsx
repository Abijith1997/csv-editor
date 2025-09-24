import { useState } from "react";

interface Props {
  value: string | number;
  onChange: (val: string) => void;
}

export const CSVCell = ({ value, onChange }: Props) => {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(String(value));

  const handleBlur = () => {
    setEditing(false);
    onChange(temp);
  };

  return (
    <td className="px-3 py-2 border text-sm" onClick={() => setEditing(true)}>
      {editing ? (
        <input
          className="w-full p-1 border rounded"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        String(value)
      )}
    </td>
  );
};
