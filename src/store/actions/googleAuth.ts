// src/store/actions/googleAuth.ts
import { GoogleAuthActionTypes } from '../reducers/googleAuth';

export const setGoogleAccessToken = (
  token: string,
): GoogleAuthActionTypes => ({
  type: 'SET_GOOGLE_ACCESS_TOKEN',
  payload: token,
});
