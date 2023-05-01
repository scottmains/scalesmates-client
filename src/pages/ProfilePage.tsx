import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import GoalWeightModal from "../components/ProfileManagement/GoalWeightModal";
import DateDisplay from "../components/Common/DateDisplay";
import { useActiveGoals } from '../hooks/useActiveGoals';
import { useActiveCalorieTarget } from "../hooks/useActiveCalorieTarget";
import CalorieTargetModal from "../components/ProfileManagement/CalorieTargetModal";

const ProfilePage: React.FC = () => {
  const { isAuthenticated } = useUserContext();
  const navigate = useNavigate();

  const [showGoalWeightModal, setShowGoalWeightModal] = useState(false);
  const [showCalorieTargetModal, setShowCalorieTargetModal] = useState(false);
  const { token } = useUserContext();
  const activeGoal = useActiveGoals(token);
  const activeCalorieTarget = useActiveCalorieTarget(token);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="bg-gradient-to-br from-pastel-blue-light via-pastel-purple-light to-pastel-pink-light p-6 rounded-md shadow-black mb-8 border-2 border-black">
        <h1 className="text-4xl font-semibold text-black text-center">Profile</h1>
        <p className="text-xl font-light text-black text-center mt-2">Welcome to your profile</p>
      </div>
      <div className="bg-gradient-to-br from-pastel-blue-light via-pastel-purple-light to-pastel-pink-light p-6 rounded-lg shadow-black border-2 border-black">
        <h1 className="text-2xl font-bold mb-4">My Goal</h1>
        {activeGoal ? (
          <>
            <p className="text-lg font-medium mb-4">
              Your current goal is: {activeGoal.goalWeight} by <DateDisplay date={activeGoal.targetDate} />
            </p>
            <button
              className="bg-gradient-to-r from-pastel-blue via-pastel-purple to-pastel-pink text-black font-bold py-2 px-4 rounded border-2 border-black shadow-button"
              onClick={() => setShowGoalWeightModal(true)}
            >
              Edit Goal
            </button>
          </>
        ) : (
          <>
            <p className="text-lg font-medium mb-4">
              You haven't set a goal weight yet.
            </p>
            <button
              className="bg-gradient-to-r from-pastel-blue via-pastel-purple to-pastel-pink text-black font-bold py-2 px-4 rounded border-2 border-black shadow-button"
              onClick={() => setShowGoalWeightModal(true)}
            >
              Set Goal
            </button>
          </>
        )}
      </div>

      <div className="bg-gradient-to-br from-pastel-blue-light via-pastel-purple-light to-pastel-pink-light p-6 rounded-lg shadow-black border-2 border-black mt-4">
        <h1 className="text-2xl font-bold mb-4">My Calorie Target</h1>
        {activeCalorieTarget ? (
          <>
            <p className="text-lg font-medium mb-4">
              Your current calorie target is: {activeCalorieTarget?.targetCalories}
            </p>
            <button
            className="bg-gradient-to-r from-pastel-blue via-pastel-purple to-pastel-pink text-black font-bold py-2 px-4 rounded border-2 border-black shadow-button"
            onClick={() => setShowCalorieTargetModal(true)}
            >
            Edit Target
            </button>
            </>
            ) : (
            <>
            <p className="text-lg font-medium mb-4">
            You haven't set a calorie target yet.
            </p>
            <button
            className="bg-gradient-to-r from-pastel-blue via-pastel-purple to-pastel-pink text-white font-bold py-2 px-4 rounded border-2 border-black shadow-button"
            onClick={() => setShowCalorieTargetModal(true)}
            >
            Set Target
            </button>
            </>
            )}
            </div>
            {showGoalWeightModal && (
    <GoalWeightModal
      onClose={() => setShowGoalWeightModal(false)}
    />
  )}

  {showCalorieTargetModal && (
    <CalorieTargetModal
      onClose={() => setShowCalorieTargetModal(false)}
    />
  )}

</>
);
};

export default ProfilePage;