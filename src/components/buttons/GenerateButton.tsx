import { useState } from "react";
import { generateSampleData } from "../../functions/GenerateSampleData";
import { setBooks } from "../../slice/fakerSlice";
import { useAppDispatch } from "../../store/hooks";

export const GenerateButton = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleGenerate = () => {
    generateSampleData({ count: 1000, setLoading }).then((data) => {
      console.log("data:", data);
      dispatch(setBooks(data)); // ✅ save in Redux (rows + originalRows)
    });
  };

  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer flex items-center justify-center ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleGenerate}
      disabled={loading}
    >
      {loading && (
        <span className="loader mr-2"></span> // spinner
      )}
      {loading ? "Generating..." : "Generate CSV"}
    </button>
  );
};
