import React, { useState } from 'react';
import { NewMeal, NewPhysicalActivity } from '../../interfaces/CalorieInterfaces';
import { logActivity } from '../../services/calorieBurnService';
import { getValidToken } from '../../store/reducers/user';
import { useSelector } from 'react-redux';

interface LogActivityModalProps {
  onClose: () => void;
  onActivityLogged: () => void;
  dailyCalorieIntakeId: number;
}

const LogActivityModal: React.FC<LogActivityModalProps> = ({ onClose, onActivityLogged, dailyCalorieIntakeId }) => {
  const token = useSelector(getValidToken);
  const [activityName, setActivityName] = useState<string>();
  const [activityCalories, setActivityCalories] = useState<number>();
  const [activitySteps, setActivitySteps] = useState<number>();

  const handleLogMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!token || !activityName || !activityCalories) return;
      const activity: NewPhysicalActivity = {
        dailyCalorieBurnId: dailyCalorieIntakeId,
        name: activityName,
        caloriesBurned: activityCalories, 
        steps: activitySteps
        
      };
      await logActivity(token, activity);
      onActivityLogged(); // Trigger data refetching
      onClose();
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <h1 className="text-2xl font-bold mb-2">Log Meal</h1>
          <form onSubmit={handleLogMeal}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Name of Activity:
              </label>
              <input
                type="string"
                step="0.01"
                onChange={(e) => setActivityName((e.target.value))}
                className="w-full p-2 mt-4 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Amount of calories:
              </label>
              <input
                type="number"
                onChange={(e) => setActivityCalories(parseInt(e.target.value))}
                className="w-full p-2 mt-4 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Steps (If applicacable)
              </label>
              <input
                type="number"
                onChange={(e) => setActivitySteps(parseInt(e.target.value))}
                className="w-full p-2 mt-4 border rounded"
                
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogActivityModal;
