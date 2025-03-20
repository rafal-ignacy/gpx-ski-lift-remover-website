import { FaCheckCircle } from "react-icons/fa";
import { SuccessIndicatorProps } from "../../types";

function SuccessIndicator({ text }: SuccessIndicatorProps) {
  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <FaCheckCircle size={60} style={{ color: "rgba(0, 255, 0, 0.4)" }} />
      <p className="mt-4 text-lg text-white">{text}</p>
    </div>
  );
}

export default SuccessIndicator;
