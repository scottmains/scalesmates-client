import { useState, useEffect } from "react";
import { DailyCalorieIntake, Meal } from "../../interfaces/CalorieInterfaces";
import LogMealModal from "./LogMealModal";
import MealList from "./MealList";
import { getMealsForDailyIntake } from "../../services/calorieIntakeService";

import { TbSalad } from "react-icons/tb";
import { getValidToken } from "../../store/reducers/user";
import { useSelector } from "react-redux";

interface CalorieIntakeProps {
  dailyIntake: DailyCalorieIntake | null | undefined;
  onRefreshIntake?: () => void;
}

const CalorieIntakeView: React.FC<CalorieIntakeProps> = ({ dailyIntake, onRefreshIntake }) => {
  const [showModal, setShowModal] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const token = useSelector(getValidToken);

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
    <div className="min-h-screen p-6">
      <div className="container mx-auto  p-8 rounded-lg shadow-md">

        <button
          className="bg-pastel-blue hover:bg-pastel-blue-light text-black border-2 border-black shadow-button font-bold py-2 px-4 rounded inline-flex items-center mb-4"

          onClick={toggleModal}
        >
          <TbSalad className="mr-2" />
          <span>Log Meal</span>
        </button>
        {dailyIntake ? (
          <>
            <p className="text-xl  mb-4">Total Intake: {dailyIntake.totalCalories} calories</p>
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
          <p className="text-white">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CalorieIntakeView;
