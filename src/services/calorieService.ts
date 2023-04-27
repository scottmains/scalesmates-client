
import { DailyCalorieIntake, DailyCalorieBurn, Meal, PhysicalActivity, CalorieTarget } from '../interfaces/CalorieInterfaces'

const API_URL = "https://localhost:7255";

export async function getAllIntakes(token: string): Promise<DailyCalorieIntake[]> {
    const response = await fetch(`${API_URL}/calorie/intakes`, {
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
    const response = await fetch(`${API_URL}/calorie/intake/today`, {
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
  
  export async function logMeal(token: string, meal: Meal): Promise<Meal> {
    const response = await fetch(`${API_URL}/calorie/meals`, {
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
    const response = await fetch(`${API_URL}/calorie/intakes/${dailyCalorieIntakeId}/meals`, {
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
  
export async function getAllBurns(token: string): Promise<DailyCalorieBurn[]> {
  const response = await fetch(`${API_URL}/calorie/burns`, {
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

export async function getOrCreateTodaysBurn(token: string): Promise<DailyCalorieBurn> {
    const response = await fetch(`${API_URL}/calorie/burn/today`, {
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

  export async function getCurrentDateIntake(token: string): Promise<DailyCalorieIntake | null> {
    const response = await fetch(`${API_URL}/calorie/current-intake`, {
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
  
  export async function getCurrentDateBurn(token: string): Promise<DailyCalorieBurn | null> {
    const response = await fetch(`${API_URL}/calorie/current-burn`, {
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

export async function logActivity(token: string, activity: PhysicalActivity): Promise<PhysicalActivity> {
  const response = await fetch(`${API_URL}/calorie/activities`, {
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
  const response = await fetch(`${API_URL}/calorie/burns/${dailyCalorieBurnId}/activities`, {
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

export async function setCalorieTarget(token: string, target: CalorieTarget): Promise<CalorieTarget> {
  const response = await fetch(`${API_URL}/calorie/targets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(target),
});

if (!response.ok) {
  throw new Error("Failed to set calorie target");
}

return await response.json();
}

export async function getAllCalorieTargets(token: string): Promise<CalorieTarget[]> {
const response = await fetch(`${API_URL}/calorie/targets`, {
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

export async function deleteIntake(token: string, id: number): Promise<void> {
const response = await fetch(`${API_URL}/calorie/intakes/${id}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

if (!response.ok) {
  throw new Error("Failed to delete intake");
}
}

export async function deleteBurn(token: string, id: number): Promise<void> {
const response = await fetch(`${API_URL}/calorie/burns/${id}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

if (!response.ok) {
  throw new Error("Failed to delete burn");
}
}

export async function deleteMeal(token: string, id: number): Promise<void> {
const response = await fetch(`${API_URL}/calorie/meals/${id}`, {
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

export async function deleteActivity(token: string, id: number): Promise<void> {
const response = await fetch(`${API_URL}/calorie/activities/${id}`, {
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

