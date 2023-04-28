import { CalorieTarget } from "../interfaces/CalorieInterfaces";
import { WeightGoal } from "../interfaces/WeightInterfaces";

const API_URL = "https://localhost:7255"; // Replace with your API URL


export async function addWeightGoal(token: string, weight: number, date: string): Promise<void> {
 
    const response = await fetch(`${API_URL}/profile/creategoal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ GoalWeight: weight, TargetDate: date }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to add weight");
    }
  }

  export async function fetchActiveGoal(token: string): Promise<WeightGoal> {
    const response = await fetch(`${API_URL}/profile/active`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch active goals");
    }
  
    const goal: WeightGoal= await response.json();
    return goal;
  }

  export async function setCalorieTarget(token: string, calorieTarget: number): Promise<CalorieTarget> {
    const response = await fetch(`${API_URL}/profile/setcalorietarget`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(calorieTarget),
  });
  
  if (!response.ok) {
    throw new Error("Failed to set calorie target");
  }
  
  return await response.json();
  }
  
  export async function getCalorieTarget(token: string): Promise<CalorieTarget> {
  const response = await fetch(`${API_URL}/profile/calorietarget`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error("Failed to get all calorie targets");
  }
  
  return await response.json();
  }
  