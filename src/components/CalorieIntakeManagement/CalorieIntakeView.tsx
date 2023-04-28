import { useState, useEffect } from "react";
import { DailyCalorieIntake, Meal } from "../../interfaces/CalorieInterfaces";
import LogMealModal from "./LogMealModal";
import MealList from "./MealList";
import { getMealsForDailyIntake } from "../../services/calorieIntakeService";
import { getToken } from "../../services/authService";

interface CalorieIntakeProps {
  dailyIntake: DailyCalorieIntake | null | undefined;
  onRefreshIntake?: () => void;
}

const CalorieIntakeView: React.FC<CalorieIntakeProps> = ({ dailyIntake, onRefreshIntake }) => {
  const [showModal, setShowModal] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const todaysDate = new Date().toDateString();
  const token = getToken();

  useEffect(() => {
    async function fetchMeals() {
      if (dailyIntake && token) {
        const fetchedMeals = await getMealsForDailyIntake(token, dailyIntake.id);
        setMeals(fetchedMeals);
      }
    }
    fetchMeals();
  }, [dailyIntake, token]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onMealLogged = () => {
    if (onRefreshIntake) {
      onRefreshIntake();
    }
  };

  const onMealDeleted = () => {
    if (onRefreshIntake) {
      onRefreshIntake();
    }
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">{todaysDate}</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mb-4"
          onClick={toggleModal}
        >
          Log Meal
        </button>
        {dailyIntake ? (
          <>
            <p className="text-xl mb-4">Total Intake: {dailyIntake.totalCalories} calories</p>
            {showModal && (
              <LogMealModal
                onClose={toggleModal}
                onMealLogged={onMealLogged}
                dailyCalorieIntakeId={dailyIntake.id}
              />
            )}
            <MealList
              meals={meals}
              dailyCalorieIntakeId={dailyIntake.id}
              onMealDeleted={onMealDeleted}
            />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CalorieIntakeView;
