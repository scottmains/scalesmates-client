
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
    dailyCalorieIntakeId: number;
    name: string;
    calories: number;
    
  }

  export interface NewMeal {
    dailyCalorieIntakeId: number;
    name: string;
    calories: number;
  }
  
  export interface PhysicalActivity {
    id: number;
    name: string;
    calories: number;
    dailyCalorieBurnId: number;
    steps?: number;
  }

  export interface NewPhysicalActivity {
    name: string;
    caloriesBurned: number;
    dailyCalorieBurnId: number;
    steps?: number;
  }
  
  export interface CalorieTarget {
    id: number;
    targetCalories: number;
    userId: string;
  }
  