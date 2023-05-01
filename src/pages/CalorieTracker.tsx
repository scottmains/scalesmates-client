import React, { useEffect, useState } from "react";
import CalorieIntakeView from "../components/CalorieIntakeManagement/CalorieIntakeView";
import CalorieBurnView from "../components/CalorieBurnManagement/CalorieBurnView";
import { getCurrentDateIntake, getOrCreateTodaysIntake } from "../services/calorieIntakeService";
import { getCurrentDateBurn, getOrCreateTodaysBurn } from "../services/calorieBurnService";
import { useUserContext } from "../context/UserContext";
import { DailyCalorieBurn, DailyCalorieIntake } from "../interfaces/CalorieInterfaces";
import { useActiveCalorieTarget } from "../hooks/useActiveCalorieTarget";

const CalorieTracker: React.FC = () => {
  const [activeView, setActiveView] = useState("intake");
  const [currentDateIntake, setCurrentDateIntake] = useState<DailyCalorieIntake | null>();
  const [currentDateBurn, setCurrentDateBurn] = useState<DailyCalorieBurn | null>();
  const { token } = useUserContext();
  const calorieTarget = useActiveCalorieTarget(token);
  const [netCalories, setNetCalories] = useState<number>(0);


  useEffect(() => {
    async function fetchAndSetData() {
      if (token) {
        const [intakeData, burnData] = await Promise.all([
          getCurrentDateIntake(token),
          getCurrentDateBurn(token),
        ]);
  
        setCurrentDateIntake(intakeData);
        setCurrentDateBurn(burnData);
  
        if (!intakeData) {
          const todaysIntake = await getOrCreateTodaysIntake(token);
          setCurrentDateIntake(todaysIntake);
        }
  
        if (!burnData) {
          const todaysBurn = await getOrCreateTodaysBurn(token);
          setCurrentDateBurn(todaysBurn);
        }
      }
    }
  
    fetchAndSetData();
  }, [token]);
  

  useEffect(() => {
    if (currentDateIntake && currentDateBurn) {
      const newNetCalories =
        (currentDateIntake.totalCalories || 0) -
        (currentDateBurn.totalCalories || 0);
      setNetCalories(Math.max(newNetCalories, 0));
    }
  }, [currentDateIntake, currentDateBurn]);

  const remainingCalories = (calorieTarget?.targetCalories ?? 0) - netCalories;


  const refreshCurrentDateIntake = async () => {
    if (token) {
      try {
        const currentDateIntake = await getCurrentDateIntake(token);
        setCurrentDateIntake(currentDateIntake);
      } catch (error) {
        console.error("Failed to refresh Calorie Intake", error);
      }
    }
  };

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

      <div>
      {calorieTarget && (
        <div className="mt-4 p-4 bg-blue-500 text-white rounded-md shadow-lg max-w-750px mx-auto text-center">
          <p className="text-2xl font-semibold">
            You are {remainingCalories} calories{" "}
            {remainingCalories >= 0 ? "under" : "over"} your target of{" "}
            {calorieTarget.targetCalories}.
          </p>
        </div>
      )}
    </div>
      {activeView === "intake" && (
        <CalorieIntakeView dailyIntake={currentDateIntake} onRefreshIntake={refreshCurrentDateIntake} />
      )}
      {activeView === "burn" && <CalorieBurnView dailyBurn={currentDateBurn} onRefreshIntake={refreshCurrentDateIntake}/>}
    </div>
  );
};

export default CalorieTracker;
