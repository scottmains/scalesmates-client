import React from "react";
import { deleteMeal } from "../../services/calorieIntakeService";
import { Meal } from "../../interfaces/CalorieInterfaces";
import { getToken } from "../../services/authService";
import { MdDelete } from 'react-icons/md';

interface MealListProps {
  meals: Meal[];
  dailyCalorieIntakeId: number;
  onMealDeleted: () => void;
}

const MealList: React.FC<MealListProps> = ({ meals, dailyCalorieIntakeId, onMealDeleted }) => {
  const token = getToken();

  const handleDeleteMeal = async (mealId: number) => {
    if (token) {
      await deleteMeal(token, mealId, dailyCalorieIntakeId);
      onMealDeleted();
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4">Meals</h3>
      <ul>
        {meals.map((meal) => (
          <li key={meal.id} className="flex justify-between items-center mb-2">
            <div>
              <span className="font-bold">{meal.name}</span> - {meal.calories} calories
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded inline-flex items-center"
              onClick={() => handleDeleteMeal(meal.id)}
            >
              <MdDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealList;
