import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import BackgroundVideo from "../components/backgroundVideo";
import ActivityTable from "../components/strava-activity-select/ActivityTable";
import SuccessIndicator from "../components/strava-activity-select/SuccessIndicator";
import FailureIndicator from "../components/strava-activity-select/FailureIndicator";
import Loader from "../components/strava-activity-select/Loader";
import ConfirmButton from "../components/strava-activity-select/ConfirmButton";
import LoadMoreActivitesButton from "../components/strava-activity-select/LoadMoreActivitiesButton";
import { Activity } from "../types";
import "../styles/Home.css";

function StravaActivitySelect() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitiesPage, setActivitiesPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreActivitiesToLoad, setHasMoreActivitiesToLoad] = useState(true);
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(
    null
  );
  const [downloadingGpxInProgress, setDownloadingGpxInProgress] =
    useState(false);
  const [downloadGpxSuccess, setDownloadGpxSuccess] = useState(false);
  const [downloadGpxError, setDownloadGpxError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleLoadMoreActivitiesButtonClick();
  }, []);

  const handleLoadMoreActivitiesButtonClick = () => {
    if (!hasMoreActivitiesToLoad) return;

    setIsLoading(true);
    fetch(`http://localhost:8000/strava/activities?page=${activitiesPage}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.next_page === null) {
          setHasMoreActivitiesToLoad(false);
        }

        setActivities((prev) => {
          const newActivities = data.activities.filter(
            (newActivity: Activity) =>
              !prev.some((oldActivity) => oldActivity.id === newActivity.id)
          );
          return [...prev, ...newActivities];
        });
        setActivitiesPage(activitiesPage + 1);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error:", error);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleRadioChange = (activityId: number) => {
    setSelectedActivityId((prev) => (prev === activityId ? null : activityId));
  };

  const handleConfirmButtonClick = async () => {
    setDownloadingGpxInProgress(true);
    fetch(`http://localhost:8000/strava/activities/${selectedActivityId}/gpx`, {
      method: "GET",
      credentials: "include",
      timeout: 10,
    })
      .then((response) => {
        if (!response.ok) {
          setDownloadGpxError(true);
          return response.json().then((errorData) => {
            throw new Error(errorData.detail || "Failed to download GPX");
          });
        }
        setDownloadingGpxInProgress(false);
        setDownloadGpxSuccess(true);
        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setDownloadGpxError(true);
        setDownloadingGpxInProgress(false);
        console.error("Error:", error);
      });
  };

  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <BackgroundVideo />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <div className="custom-background rounded-xl p-12 bg">
          <h1 className="text-4xl text-white font-bold text-center">
            Ski lift remover
          </h1>
          <h2 className="text-xl text-white text-center opacity-90">
            Choose Strava activity you want to remove the ski lifts from
          </h2>
          {activities.length > 0 &&
          !downloadingGpxInProgress &&
          !downloadGpxSuccess &&
          !downloadGpxError ? (
            <>
              <div className="mt-6 max-h-96 overflow-y-auto">
                <ActivityTable
                  activities={activities}
                  selectedActivityId={selectedActivityId}
                  onRadioChange={handleRadioChange}
                />
                <div className="flex flex-col items-center">
                  {isLoading ? (
                    <MoonLoader color="#ffffff" size={30} />
                  ) : hasMoreActivitiesToLoad ? (
                    <LoadMoreActivitesButton
                      click={handleLoadMoreActivitiesButtonClick}
                      isLoading={isLoading}
                    />
                  ) : (
                    <>
                      <div className="w-full border-t border-gray-700"></div>
                      <div className="text-center text-white my-5">
                        No more activities to load
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <ConfirmButton
                  click={handleConfirmButtonClick}
                  selectedActivityId={selectedActivityId}
                />
              </div>
            </>
          ) : activities.length === 0 ? (
            <Loader text="Loading your activities" />
          ) : downloadingGpxInProgress ? (
            <Loader text="Loading GPX file from your selected activity" />
          ) : downloadGpxSuccess && !downloadGpxError ? (
            <SuccessIndicator text="GPX file downloaded successfully" />
          ) : downloadGpxError && !downloadGpxSuccess ? (
            <FailureIndicator text="Could not download GPX file" />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default StravaActivitySelect;
