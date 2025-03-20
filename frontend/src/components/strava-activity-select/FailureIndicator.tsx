import { FaExclamationCircle  } from "react-icons/fa";
import { FailureIndicatorProps } from "../../types";

function FailureIndicator({ text }: FailureIndicatorProps) {
  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <FaExclamationCircle size={60} style={{ color: "rgba(255, 0, 0, 0.4)" }} />
      <p className="mt-4 text-lg text-white">{text}</p>
    </div>
  );
}

export default FailureIndicator;
