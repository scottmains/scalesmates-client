import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalorieTrackerState {
    burnCalories: number;
    intakeCalories: number;
  }
  
  const initialState: CalorieTrackerState = {
    burnCalories: 0,
    intakeCalories: 0,
  };
  

const calorieTracker = createSlice({
    name: 'calorieTracker',
    initialState,
    reducers: {
      setBurnCalories: (state, action: PayloadAction<number>) => {
        state.burnCalories = action.payload;
      },
      setIntakeCalories: (state, action: PayloadAction<number>) => {
        state.intakeCalories = action.payload;
      },
    },
  });

  export const { setBurnCalories, setIntakeCalories } = calorieTracker.actions;

export default calorieTracker.reducer;
