import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";
import { RootState } from '..';

interface UserState {
  isAuthenticated: boolean;
  token: string | null;
}

interface DecodedToken {
  exp: number;
  // Add other properties of the decoded token here, if needed
}

const tokenFromLocalStorage = localStorage.getItem("authToken");

// Add this function to check the validity of the token
function isTokenValid(token: string | null): boolean {
  if (!token) {
    return false;
  }

  const decodedToken = jwt_decode(token) as DecodedToken;
  const currentTime = Date.now() / 1000; // convert milliseconds to seconds

  if (decodedToken.exp < currentTime) {
    // Token is expired, remove it from localStorage
    localStorage.removeItem("authToken");
    return false;
  }

  return true;
}

const initialState: UserState = {
  isAuthenticated: isTokenValid(tokenFromLocalStorage),
  token: tokenFromLocalStorage,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isAuthenticated = isTokenValid(action.payload);
    },
  },
});

export function getValidToken(state: RootState): string | null {
  const token = state.user.token;
  return isTokenValid(token) ? token : null;
}

export const { setIsAuthenticated, setToken } = userSlice.actions;
export default userSlice.reducer;
