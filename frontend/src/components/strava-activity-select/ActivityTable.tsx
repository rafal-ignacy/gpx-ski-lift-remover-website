import { ActivityTableProps, Activity } from "../../types";
import ActivityRow from "./ActivityRow";
function ActivityTable({
  activities,
  selectedActivityId,
  onRadioChange,
}: ActivityTableProps) {
  return (
    <table className="w-full text-white">
      <thead>
        <tr>
          <th className="px-4 py-2 sticky top-0 bg-gray-800"></th>
          <th className="px-4 py-2 sticky top-0 bg-gray-800">Name</th>
          <th className="px-4 py-2 sticky top-0 bg-gray-800">Type</th>
          <th className="px-4 py-2 sticky top-0 bg-gray-800">Start date</th>
          <th className="px-4 py-2 sticky top-0 bg-gray-800">End date</th>
          <th className="px-4 py-2 sticky top-0 bg-gray-800">Distance</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity: Activity) => (
          <ActivityRow
            activity={activity}
            isSelected={selectedActivityId === activity.id}
            onRadioChange={onRadioChange}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ActivityTable;
