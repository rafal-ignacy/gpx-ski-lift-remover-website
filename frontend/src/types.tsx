interface Activity {
  id: number;
  name: string;
  sport_type: string;
  start_date: string;
  end_date: string;
  distance: number;
}

interface ActivityTableProps {
  activities: Activity[];
  selectedActivityId: number | null;
  onRadioChange: (id: number) => void;
}

interface ActivityRowProps {
  activity: Activity;
  isSelected: boolean;
  onRadioChange: (id: number) => void;
}

interface LoaderProps {
  text: string;
}

interface SuccessIndicatorProps {
  text: string;
}

interface FailureIndicatorProps {
  text: string;
}

interface ConfirmButtonProps {
  click: () => void;
  selectedActivityId: number | null;
}

interface LoadMoreActivitiesButtonProps {
  click: () => void;
  isLoading: boolean;
}

export type {
  Activity,
  ActivityTableProps,
  ActivityRowProps,
  LoaderProps,
  SuccessIndicatorProps,
  FailureIndicatorProps,
  ConfirmButtonProps,
  LoadMoreActivitiesButtonProps,
};
