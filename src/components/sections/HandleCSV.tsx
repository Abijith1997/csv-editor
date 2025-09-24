import { GenerateButton } from "../buttons/GenerateButton";
import { UploadButton } from "../buttons/UploadButton";

export const HandleCSV = () => {
  return (
    <div className="w-full flex items-center justify-center gap-5">
      <UploadButton />
      <GenerateButton />
    </div>
  );
};
