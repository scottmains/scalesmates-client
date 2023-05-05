
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

 
export async function getOrCreateDateBurn(token: string, date: Date) {
  const response = await fetch(`${API_URL}/CalorieBurn/date?date=${date.toISOString().split('T')[0]}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get or create date calorie intake");
  }

  const data = await response.json();
  return data as DailyCalorieBurn;
}


export async function getGoogleFitData(token: string, accessToken: string) {
  const response = await fetch('https://localhost:7255/CalorieBurn/googlefit?accessToken=' + accessToken, {
     headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Google-Authorization": `Bearer ${accessToken}`,
    },
  });


  if (!response.ok) {
    throw new Error("Failed to get or create date calorie intake");
  }

  const data = await response.json();
  return data;
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

export async function deleteActivity(token: string, id: number, burnId: number): Promise<void> {
  console.log(burnId);
const response = await fetch(`${API_URL}/CalorieBurn/activity/${id}?burnId=${burnId}`, {
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

