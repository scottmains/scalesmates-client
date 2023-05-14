// src/store/rootReducer.ts
import { combineReducers } from 'redux';
import googleAuthReducer from './reducers/googleAuth';
import userReducer from './reducers/user';
import calorieTrackerReducer from './reducers/calorieTracker' // Add this import

const rootReducer = combineReducers({
  googleAuth: googleAuthReducer,
  user: userReducer, 
  calorieTracker: calorieTrackerReducer, // Add the user reducer
  // Add other reducers here, e.g., someReducer: someReducer
});

export default rootReducer;
