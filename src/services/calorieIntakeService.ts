
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
  
  export async function getOrCreateTodaysIntake(token: string): Promise<DailyCalorieIntake> {
    const response = await fetch(`${API_URL}/CalorieIntake/today`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to get or create today's calorie intake");
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
  

  export async function getCurrentDateIntake(token: string): Promise<DailyCalorieIntake | null> {
    const response = await fetch(`${API_URL}/CalorieIntake/current`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (response.status === 204) {
      return null;
    }
  
    if (!response.ok) {
      throw new Error(`Failed to get current date intake. Status: ${response.status}, StatusText: ${response.statusText}`);
    }
  
    const intake: DailyCalorieIntake = await response.json();
    return intake;
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
  

