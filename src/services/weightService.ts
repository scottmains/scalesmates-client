import { WeightGoal, WeightRecord } from '../interfaces/WeightInterfaces';


const API_URL = "https://localhost:7255"; // Replace with your API URL



export async function fetchWeights(token: string): Promise<WeightRecord[]> {
  console.log("testing token ");
  const response = await fetch(`${API_URL}/weight`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch weights');
  }

  return await response.json();
}

export async function addWeight(token: string, weight: number, date: string): Promise<void> {
 
    const response = await fetch(`${API_URL}/weight`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ weight, date }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to add weight");
    }
  }

  export async function addWeightGoal(token: string, weight: number, date: string): Promise<void> {
 
    const response = await fetch(`${API_URL}/weight/creategoal`, {
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

  export async function fetchActiveGoals(token: string): Promise<WeightGoal[]> {
    const response = await fetch(`${API_URL}/weight/active`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch active goals");
    }
  
    const goals: WeightGoal[] = await response.json();
    return goals;
  }
  
  export async function deleteWeight(token: string, id: number): Promise<void> {
    const response = await fetch(`${API_URL}/weight/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete weight");
    }
  }
