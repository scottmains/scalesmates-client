import { useState, useEffect } from "react";
import { DailyCalorieIntake, PhysicalActivity } from "../../interfaces/CalorieInterfaces";
import ActivityList from "./ActivityList";
import { getActivitiesForDailyBurn } from "../../services/calorieBurnService";
import LogActivityModal from "./LogActivityModal";
import { getValidToken } from "../../store/reducers/user";
import { useSelector } from "react-redux";

interface CalorieBurnProps {
  dailyBurn: DailyCalorieIntake | null | undefined;
  onRefreshIntake?: () => void;
}

  const CalorieBurnView: React.FC<CalorieBurnProps> = ({ dailyBurn, onRefreshIntake }) => {
    const [showModal, setShowModal] = useState(false);
    const [activities, setActivities] = useState<PhysicalActivity[]>([]);

    const token = useSelector(getValidToken);
  
    useEffect(() => {
      async function fetchActivities() {
        if (dailyBurn && token) {
          const fetchedActivities = await getActivitiesForDailyBurn(token, dailyBurn.id);
          setActivities(fetchedActivities);
        }
      }
      fetchActivities();
    }, [dailyBurn, token]);
  
    const toggleModal = () => {
      setShowModal(!showModal);
    };
  
    const onActivityLogged = () => {
      if (onRefreshIntake) {
        onRefreshIntake();
      }
    };
  
    const onActivityDeleted = () => {
      if (onRefreshIntake) {
        onRefreshIntake();
      }
    };
  
    return (
      <div className="bg-gray-100 p-6 min-h-screen">
        <div className="container mx-auto bg-white p-8 rounded-lg shadow-md">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mb-4"
            onClick={toggleModal}
          >
            Log Activity
          </button>
          {dailyBurn ? (
            <>
              <p className="text-xl mb-4">Total Burned: {dailyBurn.totalCalories} calories</p>
              {showModal && (
                <LogActivityModal
                  onClose={toggleModal}
                  onActivityLogged={onActivityLogged}
                  dailyCalorieIntakeId={dailyBurn.id}
                />
              )}
              <ActivityList
                activities={activities}
                dailyCalorieBurnId={dailyBurn.id}
                onActivityDeleted={onActivityDeleted}
              />
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
  };
  
  export default CalorieBurnView;
  