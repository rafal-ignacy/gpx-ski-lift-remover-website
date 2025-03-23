import { useRef, ChangeEvent, JSX } from "react";
import { useNavigate } from "react-router-dom";

function UploadGpxButton(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  }

  function handleFiles(files: FileList): void {
    if (files[0].type !== "application/gpx+xml" && !files[0].name.toLowerCase().endsWith('.gpx')) {
      alert("Please select GPX file");
      return;
    }
    if (files[0].size > 20 * 1024 * 1024) {
      alert("The file is too large. Please select a file smaller than 20MB");
      return;
    }
    
    navigate("/dashboard", {
      state: {
        gpxFile: files[0],
        fileName: files[0].name
      }
    });
  }

  function onButtonClick(): void {
    inputRef.current?.click();
  }

  return (
    <div
      className="mt-4 relative bg-zinc-700 text-white px-4 py-3 rounded-lg hover:bg-zinc-800 hover:cursor-pointer"
      onClick={onButtonClick}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".gpx"
        onChange={handleChange}
      />
      <div className="text-center">
        <span className="block font-semibold">Upload GPX file</span>
        <span className="block text-xs mt-1">
          click to add or drag the file
        </span>
      </div>
    </div>
  );
}

export default UploadGpxButton;
