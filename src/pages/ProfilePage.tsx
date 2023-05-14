import React, { useEffect, useState } from "react";
import GoalWeightModal from "../components/ProfileManagement/GoalWeightModal";
import DateDisplay from "../components/Common/DateDisplay";
import { useActiveGoals } from '../hooks/useActiveGoals';
import { useActiveCalorieTarget } from "../hooks/useActiveCalorieTarget";
import CalorieTargetModal from "../components/ProfileManagement/CalorieTargetModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setGoogleAccessToken } from "../store/actions/googleAuth";


declare global {
  interface Window {
    gapi: any;
  }
}
const ProfilePage: React.FC = () => {

  const [showGoalWeightModal, setShowGoalWeightModal] = useState(false);
  const [showCalorieTargetModal, setShowCalorieTargetModal] = useState(false);
  const token = useSelector((state: RootState) => state.user.token);
  const signedInUser = useSelector((state: RootState) => state.googleAuth);
  const dispatch = useDispatch();
  const activeGoal = useActiveGoals(token);
  const activeCalorieTarget = useActiveCalorieTarget(token);

  useEffect(() => {
    // Load the Google API Client and initialize it with your API credentials
    window.google.accounts.id.initialize({
      client_id: "460694380781-jd65u7pf0nr7n1c7g4or5tcer8lin9vn.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      scope: "https://www.googleapis.com/auth/fitness.activity.read",
    });
  }, []);
  
  const handleSignIn = () => {
    window.google.accounts.id.prompt();
  };
  
  const handleCredentialResponse = async (response: any) => {
    
    dispatch(setGoogleAccessToken(response.credential));
    
  };
  
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
              Your current goal is: {activeGoal.goalWeight} by 
            </p>
            <DateDisplay date={activeGoal.targetDate} />
            <button
              className="bg-pastel-purple text-black font-bold py-2 px-4 rounded border-2 border-black shadow-button"
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
            className="bg-pastel-purple text-black font-bold py-2 px-4 rounded border-2 border-black shadow-button"
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

<div className="mt-3">
  {signedInUser.accessToken ? (
   <p> You are signed into google </p>
    
  ) : (
    <button
      className="bg-gradient-to-r from-pastel-blue via-pastel-purple to-pastel-pink text-white font-bold py-2 px-4 rounded border-2 border-black shadow-button"
      onClick={handleSignIn}
    >
      Connect with Google
    </button>
  )}
</div>

</>
);
};

export default ProfilePage;