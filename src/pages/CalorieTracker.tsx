import React, { useMemo, useState } from "react";
import CalorieIntakeView from "../components/CalorieIntakeManagement/CalorieIntakeView";
import CalorieBurnView from "../components/CalorieBurnManagement/CalorieBurnView";
import { useQuery } from "react-query";
import { getOrCreateDateIntake } from "../services/calorieIntakeService";
import { getOrCreateDateBurn } from "../services/calorieBurnService";
import { useActiveCalorieTarget } from "../hooks/useActiveCalorieTarget";
import { useGoogleFitData } from "../hooks/useGoogleFitData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { DailyCalorieBurn, DailyCalorieIntake } from "../interfaces/CalorieInterfaces";

const CalorieTracker: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token) || "";
  const [activeView, setActiveView] = useState("intake");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calorieTarget = useActiveCalorieTarget(token);
  const accessToken = useSelector((state: RootState) => state.googleAuth.accessToken);

  const intakeQuery = useQuery<DailyCalorieIntake, Error>(["intakeData", token, selectedDate], () =>
  getOrCreateDateIntake(token, selectedDate)
  );

  const burnQuery = useQuery<DailyCalorieBurn, Error>(["burnData", token, selectedDate], () =>
  getOrCreateDateBurn(token, selectedDate)
  );

  useGoogleFitData(token, accessToken);

  const netCalories = useMemo(() => {
    if (intakeQuery.data && burnQuery.data) {
      return Math.max(intakeQuery.data.totalCalories - burnQuery.data.totalCalories, 0);
    }
    return 0;
  }, [intakeQuery.data, burnQuery.data]);

  const remainingCalories = (calorieTarget?.targetCalories ?? 0) - netCalories;

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
        <CalorieIntakeView dailyIntake={intakeQuery.data} />
      )}
      {activeView === "burn" && (
        <CalorieBurnView dailyBurn={burnQuery.data} />
      )}
    </div>
  );
};

export default CalorieTracker;
