// src/store/rootReducer.ts
import { combineReducers } from 'redux';
import googleAuthReducer from './reducers/googleAuth';
import userReducer from './reducers/user'; // Add this import

const rootReducer = combineReducers({
  googleAuth: googleAuthReducer,
  user: userReducer, // Add the user reducer
  // Add other reducers here, e.g., someReducer: someReducer
});

export default rootReducer;
