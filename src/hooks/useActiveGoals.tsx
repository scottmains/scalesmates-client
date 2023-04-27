import { useEffect, useState } from 'react';
import { fetchActiveGoals } from '../services/weightService';
import { WeightGoal } from "../interfaces/WeightInterfaces";


export const useActiveGoals = (token: string | null) => {
    const [goalWeight, setGoalWeight] = useState<WeightGoal[]>([]);

  useEffect(() => {
    if (!token) return;

    (async () => {
      try {
        const fetchedGoals = await fetchActiveGoals(token);
        setGoalWeight(fetchedGoals);
      } catch (error) {
        console.error("Error fetching active goals:", error);
      }
    })();
  }, [token]);

  return goalWeight;
};
