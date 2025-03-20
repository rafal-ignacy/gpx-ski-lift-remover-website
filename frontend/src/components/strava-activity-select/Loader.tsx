import { MoonLoader } from "react-spinners";
import { LoaderProps } from "../../types";

function Loader({ text }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <MoonLoader color="#ffffff" loading={true} size={50} />
      <p className="mt-4 text-lg text-white">{text}</p>
    </div>
  );
}

export default Loader;