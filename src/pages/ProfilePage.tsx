import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import GoalWeightModal from "../components/WeightManagement/GoalWeightModal";
import DateDisplay from "../components/Common/DateDisplay";
import { useActiveGoals } from '../hooks/useActiveGoals';


const ProfilePage: React.FC = () => {
  const { isAuthenticated } = useUserContext();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const { token } = useUserContext();
  const activeGoals = useActiveGoals(token);


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
   <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 rounded-md shadow-lg mb-8">
        <h1 className="text-4xl font-semibold text-white text-center">Profile</h1>
        <p className="text-xl font-light text-white text-center mt-2">Welcome to your profile</p>
      </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">My Goal</h1>
          {activeGoals ? (
            <>
              <p className="text-lg font-medium mb-4">
              {activeGoals.map((goal) => (
                  <div key={goal.id}>
                    Goal Weight: {goal.goalWeight} | Target Date: <DateDisplay date={goal.targetDate}/>
                  </div>
                ))}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowModal(true)}
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowModal(true)}
              >
                Set Goal
              </button>
            </>
          )}
        </div>

    
      {showModal && (
        <GoalWeightModal
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProfilePage;
