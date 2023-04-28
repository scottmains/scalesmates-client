
import { DailyCalorieBurn, NewPhysicalActivity, PhysicalActivity} from '../interfaces/CalorieInterfaces'

const API_URL = "https://localhost:7255";

export async function getAllBurns(token: string): Promise<DailyCalorieBurn[]> {
  const response = await fetch(`${API_URL}/CalorieBurn/burn`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get all burns");
  }

  return await response.json();
}

export async function getOrCreateTodaysBurn(token: string, date: Date): Promise<DailyCalorieBurn> {
    const response = await fetch(`${API_URL}/CalorieBurn/today`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to get or create today's calorie burn");
    }
  
    const data = await response.json();
    return data as DailyCalorieBurn;
  }

  
  export async function getCurrentDateBurn(token: string): Promise<DailyCalorieBurn | null> {
    const response = await fetch(`${API_URL}/CalorieBurn/current`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (response.status === 204) {
      return null;
    }
  
    if (!response.ok) {
      throw new Error(`Failed to get current date burn. Status: ${response.status}, StatusText: ${response.statusText}`);
    }
  
    const burn: DailyCalorieBurn = await response.json();
    return burn;
  }

export async function logActivity(token: string, activity: NewPhysicalActivity): Promise<PhysicalActivity> {
  const response = await fetch(`${API_URL}/CalorieBurn/logactivity`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    throw new Error("Failed to log activity");
  }

  return await response.json();
}

export async function getActivitiesForDailyBurn(token: string, dailyCalorieBurnId: number): Promise<PhysicalActivity[]> {
  const response = await fetch(`${API_URL}/CalorieBurn/activities/${dailyCalorieBurnId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get activities for daily burn");
  }

  return await response.json();
}

export async function deleteActivity(token: string, id: number): Promise<void> {
const response = await fetch(`${API_URL}/CalorieBurn/activity/${id}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

if (!response.ok) {
  throw new Error("Failed to delete activity");
}
}

