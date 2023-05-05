// src/store/state.ts
// src/store/state.ts
export interface RootState {
  googleAuth: {
    accessToken: string | null;
  };
  user: {
    isAuthenticated: boolean;
    token: string | null;
  };
}
