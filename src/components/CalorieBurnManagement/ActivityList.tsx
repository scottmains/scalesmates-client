import React from "react";
import { deleteMeal } from "../../services/calorieIntakeService";
import {  PhysicalActivity } from "../../interfaces/CalorieInterfaces";
import { getToken } from "../../services/authService";
import { MdDelete } from 'react-icons/md';
import { deleteActivity } from "../../services/calorieBurnService";

interface ActivityListProps {
  activities: PhysicalActivity[];
  dailyCalorieBurnId: number;
  onActivityDeleted: () => void;
}

const ActivityList: React.FC<ActivityListProps> = ({ activities, dailyCalorieBurnId, onActivityDeleted }) => {
  const token = getToken();

  const handleDeleteActivity = async (activityId: number) => {
    console.log(dailyCalorieBurnId)
    if (token) {
      await deleteActivity(token, activityId, dailyCalorieBurnId);
      onActivityDeleted();
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4">Activities</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id} className="flex justify-between items-center mb-2">
            <div>
              <span className="font-bold">{activity.name}</span> - {activity.calories} calories
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded inline-flex items-center"
              onClick={() => handleDeleteActivity(activity.id)}
            >
              <MdDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
