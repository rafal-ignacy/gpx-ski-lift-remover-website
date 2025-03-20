import { ConfirmButtonProps } from "../../types";

function ConfirmButton({click, selectedActivityId}: ConfirmButtonProps) {
  return (
    <button
      onClick={click}
      className={`${
        selectedActivityId
          ? "bg-blue-500 hover:bg-blue-600"
          : "bg-gray-500 cursor-not-allowed"
      } text-white font-bold py-2 px-4 rounded`}
    >
      Confirm
    </button>
  );
}

export default ConfirmButton;
