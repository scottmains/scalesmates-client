
import { DailyCalorieIntake,Meal, NewMeal } from '../interfaces/CalorieInterfaces'

const API_URL = "https://localhost:7255";

export async function getAllIntakes(token: string): Promise<DailyCalorieIntake[]> {
    const response = await fetch(`${API_URL}/CalorieIntake/intake`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to get all intakes");
    }
  
    return await response.json();
  }
  
  export async function getOrCreateDateIntake(token: string, date: Date) {
    const response = await fetch(`${API_URL}/CalorieIntake/date?date=${date.toISOString().split('T')[0]}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to get or create date calorie intake");
    }
  
    const data = await response.json();
    return data as DailyCalorieIntake;
  }
  
  
  export async function logMeal(token: string, meal: NewMeal): Promise<Meal> {
    const response = await fetch(`${API_URL}/CalorieIntake/logmeal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(meal),
    });
  
    if (!response.ok) {
      throw new Error("Failed to log meal");
    }
  
    return await response.json();
  }
  
  export async function getMealsForDailyIntake(token: string, dailyCalorieIntakeId: number): Promise<Meal[]> {
    const response = await fetch(`${API_URL}/CalorieIntake/meals/${dailyCalorieIntakeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to get meals for daily intake");
    }
  
    return await response.json();
  }
  

  export async function deleteMeal(token: string, id: number, intakeId: number): Promise<void> {
    const response = await fetch(`${API_URL}/CalorieIntake/meal/${id}?intakeId=${intakeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete meal");
    }
  }
  

