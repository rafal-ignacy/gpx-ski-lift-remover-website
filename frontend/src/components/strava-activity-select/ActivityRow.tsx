import { ActivityRowProps } from "../../types";

function ActivityRow({ activity, isSelected, onRadioChange }: ActivityRowProps) {
  return (
    <tr key={activity.id} className="border-t border-gray-700">
      <td className="px-4 py-2 flex items-center justify-center">
        <input
          type="radio"
          checked={isSelected}
          onChange={() => onRadioChange(activity.id)}
          className="form-radio h-5 w-5 text-green-500 focus:ring-green-500"
        />
      </td>
      <td className="px-4 py-2 text-center">{activity.name}</td>
      <td className="px-4 py-2 text-center">
        {activity.sport_type.replace(/([A-Z])/g, " $1").trim()}
      </td>
      <td className="px-4 py-2 text-center">
        {new Date(activity.start_date).toLocaleString()}
      </td>
      <td className="px-4 py-2 text-center">
        {new Date(activity.end_date).toLocaleString()}
      </td>
      <td className="px-4 py-2 text-center">{activity.distance} km</td>
    </tr>
  );
}

export default ActivityRow;
