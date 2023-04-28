import { useEffect, useState } from 'react';
import { fetchActiveGoal } from '../services/profileService';
import { WeightGoal } from "../interfaces/WeightInterfaces";


export const useActiveGoals = (token: string | null) => {
    const [goalWeight, setGoalWeight] = useState<WeightGoal>();

  useEffect(() => {
    if (!token) return;

    (async () => {
      try {
        const fetchedGoals = await fetchActiveGoal(token);
        setGoalWeight(fetchedGoals);
      } catch (error) {
        console.error("Error fetching active goals:", error);
      }
    })();
  }, [token]);

  return goalWeight;
};
