import { LoadMoreActivitiesButtonProps } from "../../types";

function LoadMoreActivitesButton({click, isLoading}: LoadMoreActivitiesButtonProps) {
  return (
    <button
      onClick={click}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      disabled={isLoading}
    >
      Load more activities
    </button>
  );
}

export default LoadMoreActivitesButton;
