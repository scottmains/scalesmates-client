import React from "react";
import { deleteMeal } from "../../services/calorieIntakeService";
import { Meal } from "../../interfaces/CalorieInterfaces";
import { MdDelete } from 'react-icons/md';
import { getValidToken } from "../../store/reducers/user";
import { useSelector } from "react-redux";

interface MealListProps {
  meals: Meal[];
  dailyCalorieIntakeId: number;
  onMealDeleted: (calories: number) => void;
}

const MealList: React.FC<MealListProps> = ({ meals, dailyCalorieIntakeId, onMealDeleted }) => {
  const token = useSelector(getValidToken);

  const handleDeleteMeal = async (mealId: number, calories: number) => {
    if (token) {
      await deleteMeal(token, mealId, dailyCalorieIntakeId);
      onMealDeleted(calories);
    }
  };

  return (
    <div className="bg-pastel-purple-light p-4 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-pastel-purple mb-4">Meals</h3>
      <ul>
        {meals.map((meal) => (
          <li key={meal.id} className="flex justify-between items-center mb-2">
            <div>
              <span className="font-bold">{meal.name}</span> - {meal.calories} calories
            </div>
            <button
            className="bg-pastel-pink hover:bg-pastel-pink-dark text-white font-bold py-1 px-2 rounded inline-flex items-center"
            onClick={() => handleDeleteMeal(meal.id, meal.calories)}
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
