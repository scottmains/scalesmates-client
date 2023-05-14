import { useEffect, useState } from "react";
import { DailyCalorieIntake } from "../../interfaces/CalorieInterfaces";
import ActivityList from "./ActivityList";
import { getActivitiesForDailyBurn } from "../../services/calorieBurnService";
import LogActivityModal from "./LogActivityModal";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { RootState } from "../../store";
import { setBurnCalories } from "../../store/reducers/calorieTracker";

interface CalorieBurnProps {
  dailyBurn: DailyCalorieIntake | null | undefined;
}

  const CalorieBurnView: React.FC<CalorieBurnProps> = ({ dailyBurn}) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.user.token) || "";
    const burnCalories = useSelector(
      (state: RootState) => state.calorieTracker.burnCalories
    );
    const activitiesQuery = useQuery(["activities", token, dailyBurn?.id], () =>
    getActivitiesForDailyBurn(token, dailyBurn?.id || 0)
  );
  
    const toggleModal = () => {
      setShowModal(!showModal);
    };
  
    const onActivityLogged = () => {
      activitiesQuery.refetch();
    };
  
    const onActivityDeleted = () => {
      activitiesQuery.refetch();
    };

    useEffect(() => {
      if (activitiesQuery.data) {
        const newTotalCalories = activitiesQuery.data.reduce(
          (total, meal) => total + meal.calories,
          0
        );
        dispatch(setBurnCalories(newTotalCalories));
      }
    }, [activitiesQuery.data]);
  
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
              <p className="text-xl mb-4">Total Burned: {burnCalories} calories</p>
              {showModal && (
                <LogActivityModal
                  onClose={toggleModal}
                  onActivityLogged={onActivityLogged}
                  dailyCalorieIntakeId={dailyBurn.id}
                />
              )}
              <ActivityList
                activities={activitiesQuery.data || []}
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
  