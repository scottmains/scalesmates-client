import { useEffect, useState } from 'react';
import { getCalorieTarget } from '../services/profileService';
import { CalorieTarget } from '../interfaces/CalorieInterfaces';


export const useActiveCalorieTarget = (token: string | null) => {
    const [calorieTarget, setCalorieTarget] = useState<CalorieTarget>();

  useEffect(() => {
    if (!token) return;

    (async () => {
      try {
        const fetchedCalorieTarget = await getCalorieTarget(token);
        setCalorieTarget(fetchedCalorieTarget);
      } catch (error) {
        console.error("Error fetching active goals:", error);
      }
    })();
  }, [token]);

  return calorieTarget;
};
