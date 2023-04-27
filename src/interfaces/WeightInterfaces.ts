
export interface WeightRecord {
    id: number;
    weight: number;
    date: string;
  }
  
  export interface WeightGoal {
    id: number;
    userId: string;
    goalWeight: number;
    targetDate: string;
  }

  export interface WeightCircleProps {
    goalWeight: number;
    difference: number;
    percentage: number;
  }
  