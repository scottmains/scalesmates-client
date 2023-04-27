export interface WeightRecord {
    id: number;
    weight: number;
    date: string;
    userId: string;
  }
  
  export interface WeightGoal {
    id: number;
    goalWeight: number;
    targetDate: string;
    userId: string;
    active: boolean;
  }
  
  export interface DailyCalorieIntake {
    id: number;
    totalCalories: number;
    date: string;
    userId: string;
  }
  
  export interface DailyCalorieBurn {
    id: number;
    totalCalories: number;
    date: string;
    userId: string;
  }
  
  export interface Meal {
    id: number;
    name: string;
    calories: number;
    dailyCalorieIntakeId: number;
  }
  
  export interface PhysicalActivity {
    id: number;
    name: string;
    caloriesBurned: number;
    dailyCalorieBurnId: number;
  }
  
  export interface CalorieTarget {
    id: number;
    targetCalories: number;
    date: string;
    userId: string;
  }
  