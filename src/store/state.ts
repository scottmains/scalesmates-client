// src/store/state.ts
export interface RootState {
  googleAuth: {
    accessToken: string | null;
  };
  user: {
    isAuthenticated: boolean;
    token: string | null;
  };
  calorieTracker: {
    burnCalories: number;
    intakeCalories: number;
  };
}

