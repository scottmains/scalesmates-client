import React, { useEffect, useState } from "react";
import { DailyCalorieIntake } from "../../interfaces/CalorieInterfaces";
import LogMealModal from "./LogMealModal";
import MealList from "./MealList";
import { getMealsForDailyIntake } from "../../services/calorieIntakeService";
import { TbSalad } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { RootState } from "../../store";
import { setIntakeCalories } from "../../store/reducers/calorieTracker";

interface CalorieIntakeProps {
  dailyIntake: DailyCalorieIntake | null | undefined;
}

const CalorieIntakeView: React.FC<CalorieIntakeProps> = ({ dailyIntake }) => {
  const [showModal, setShowModal] = useState(false);
  const intakeCalories = useSelector(
    (state: RootState) => state.calorieTracker.intakeCalories
  );
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token) || "";

  const mealsQuery = useQuery(["meals", token, dailyIntake?.id], () =>
    getMealsForDailyIntake(token, dailyIntake?.id || 0)
  );

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onMealLogged = () => {
    mealsQuery.refetch();
  };

  const onMealDeleted = () => {
    mealsQuery.refetch();
  };

  useEffect(() => {
    if (mealsQuery.data) {
      const newTotalCalories = mealsQuery.data.reduce(
        (total, meal) => total + meal.calories,
        0
      );
      dispatch(setIntakeCalories(newTotalCalories));
    }
  }, [mealsQuery.data]);

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto p-8 rounded-lg shadow-md">
        <button
          className="bg-pastel-blue hover:bg-pastel-blue-light text-black border-2 border-black shadow-button font-bold py-2 px-4 rounded inline-flex items-center mb-4"
          onClick={toggleModal}
        >
          <TbSalad className="mr-2" />
          <span>Log Meal</span>
        </button>
        {dailyIntake ? (
          <>
            <p className="text-xl mb-4">Total Intake: {intakeCalories} calories</p>
            {showModal && (
              <LogMealModal
                onClose={toggleModal}
                onMealLogged={onMealLogged}
                dailyCalorieIntakeId={dailyIntake.id}
              />
            )}
            <MealList
              meals={mealsQuery.data || []}
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
