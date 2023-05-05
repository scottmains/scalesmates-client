import React, { useEffect, useState } from "react";
import CalorieIntakeView from "../components/CalorieIntakeManagement/CalorieIntakeView";
import CalorieBurnView from "../components/CalorieBurnManagement/CalorieBurnView";
import {  getOrCreateDateIntake} from "../services/calorieIntakeService";
import { getGoogleFitData, getOrCreateDateBurn } from "../services/calorieBurnService";
import { DailyCalorieBurn, DailyCalorieIntake } from "../interfaces/CalorieInterfaces";
import { useActiveCalorieTarget } from "../hooks/useActiveCalorieTarget";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";
const CalorieTracker: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const [activeView, setActiveView] = useState("intake");
  const [selectedDateIntake, setSelectedDateIntake] = useState<DailyCalorieIntake | null>();
  const [selectedDateBurn, setSelectedDateBurn] = useState<DailyCalorieBurn | null>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calorieTarget = useActiveCalorieTarget(token);
  const [netCalories, setNetCalories] = useState<number>(0);
  const accessToken = useSelector((state: RootState) => state.googleAuth.accessToken);

  const fetchAndSetData = async () => {
    if (token) {
      const [intakeData, burnData] = await Promise.all([
        getOrCreateDateIntake(token, selectedDate),
        getOrCreateDateBurn(token, selectedDate),
        
      ]);
      if(accessToken)
      {
        getGoogleFitData(token, accessToken)
      }

      setSelectedDateIntake(intakeData);
      setSelectedDateBurn(burnData);
    }
  }

  useEffect(() => {
    fetchAndSetData();
    
  }, [token, selectedDate]);
  

  useEffect(() => {
    if (selectedDateIntake && selectedDateBurn) {
      const newNetCalories =
        (selectedDateIntake.totalCalories || 0) -
        (selectedDateBurn.totalCalories || 0);
      setNetCalories(Math.max(newNetCalories, 0));
    }
  }, [selectedDateIntake, selectedDateBurn]);

  const remainingCalories = (calorieTarget?.targetCalories ?? 0) - netCalories;


  const refreshCurrentDateIntake = async () => {
    if (token) {
      try {
        const currentDateIntake = await getOrCreateDateIntake(token, selectedDate);
        setSelectedDateIntake(currentDateIntake);
      } catch (error) {
        console.error("Failed to refresh Calorie Intake", error);
      }
    }
  };

  const refreshCurrentDateBurn = async () => {
    if (token) {
      try {
        const currentDateIntake = await getOrCreateDateBurn(token, selectedDate);
        setSelectedDateIntake(currentDateIntake);
      } catch (error) {
        console.error("Failed to refresh Calorie Intake", error);
      }
    }
  };

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };



  return (
    <div>
      <div className="bg-gradient-to-br from-pastel-blue-light via-pastel-purple-light to-pastel-pink-light p-6 rounded-md shadow-black mb-8 border-2 border-black">
        <h1 className="text-4xl font-semibold text-black text-center">Calorie Tracker</h1>

        <p className="text-xl font-light text-black text-center mt-2">
          Log calories in and out
        </p>
       
      </div>
      <h2 className="text-3xl font-bold mb-4 text-center mt-4">{selectedDate.toDateString()}</h2>  
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        className="w-full px-4 py-2 text-black border border-blue-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      />
 
      <div>
      {calorieTarget && (
        <div className="bg-gradient-to-br from-pastel-blue-light via-pastel-purple-light to-pastel-pink-light p-6 rounded-lg shadow-black border-2 border-black">
          <p className="text-2xl font-semibold">
            You are {remainingCalories} calories{" "}
            {remainingCalories >= 0 ? "under" : "over"} your target of{" "}
            {calorieTarget.targetCalories}.
          </p>
        </div>
      )}
    </div>
    <div className="mt-4 text-center">
          <button
            className={`mr-4 p-2 rounded-md ${
              activeView === "intake" ? "bg-pastel-purple text-black font-bold py-2 px-4 rounded border-2 border-black shadow-button" : "bg-pastel-purple-light text-black font-bold py-2 px-4 rounded border-2 border-black shadow-button"
            }`}
            onClick={() => setActiveView("intake")}
          >
            Calorie Intake
          </button>
          <button
            className={`p-2 rounded-md ${
              activeView === "burn" ? "bg-pastel-purple text-black font-bold py-2 px-4 rounded border-2 border-black shadow-button" : "bg-pastel-purple-light text-black font-bold py-2 px-4 rounded border-2 border-black shadow-button"
            }`}
            onClick={() => setActiveView("burn")}
          >
            Calorie Burn
          </button>
        </div>
      {activeView === "intake" && (
        <CalorieIntakeView dailyIntake={selectedDateIntake} onRefreshIntake={refreshCurrentDateIntake} />
      )}
      {activeView === "burn" && <CalorieBurnView dailyBurn={selectedDateBurn} onRefreshIntake={refreshCurrentDateBurn}/>}
    </div>
  );
};

export default CalorieTracker;
