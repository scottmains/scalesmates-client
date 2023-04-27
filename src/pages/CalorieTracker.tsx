import React, { useEffect, useState } from "react";
import { CalorieIntakeView } from "../components/CalorieManagement/CalorieIntakeView";
import { CalorieBurnView } from "../components/CalorieManagement/CalorieBurnView";
import { getCurrentDateBurn, getCurrentDateIntake, getOrCreateTodaysBurn, getOrCreateTodaysIntake } from "../services/calorieService";
import { useUserContext } from "../context/UserContext";

const CalorieTracker: React.FC = () => {

  const [activeView, setActiveView] = useState("intake");
  const { token } = useUserContext();


  useEffect(() => {
    async function initCalorieTracker() {
      if (token) {
        try {
          const currentDateIntake = await getCurrentDateIntake(token);
          const currentDateBurn = await getCurrentDateBurn(token);
          console.log(currentDateIntake);
          if (!currentDateIntake) {
            await getOrCreateTodaysIntake(token);
          }

          if (!currentDateBurn) {
            await getOrCreateTodaysBurn(token);
          }
        } catch (error) {
          console.error("Failed to initialize Calorie Tracker", error);
        }
      }
    }

    initCalorieTracker();
  }, [token]);

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 max-w-750px mx-auto p-6 rounded-md shadow-lg">
        <h1 className="text-4xl font-semibold text-white text-center">Calorie Tracker</h1>

        <p className="text-xl font-light text-white text-center mt-2">
          Log calories in and out
        </p>
        <div className="mt-4 text-center">
          <button
            className={`mr-4 p-2 rounded-md ${
              activeView === "intake" ? "bg-white text-blue-500" : "bg-blue-500 text-white"
            }`}
            onClick={() => setActiveView("intake")}
          >
            Calorie Intake
          </button>
          <button
            className={`p-2 rounded-md ${
              activeView === "burn" ? "bg-white text-blue-500" : "bg-blue-500 text-white"
            }`}
            onClick={() => setActiveView("burn")}
          >
            Calorie Burn
          </button>
        </div>
      </div>
      {activeView === "intake" && <CalorieIntakeView />}
      {activeView === "burn" && <CalorieBurnView />}
    </div>
  );
};

export default CalorieTracker;