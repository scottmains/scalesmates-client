// src/store/reducers/googleAuth.ts
import { RootState } from '../state';

interface SetGoogleAccessTokenAction {
  type: 'SET_GOOGLE_ACCESS_TOKEN';
  payload: string;
}

export type GoogleAuthActionTypes = SetGoogleAccessTokenAction;

export default function googleAuthReducer(
  state: RootState['googleAuth'] = { accessToken: null },
  action: GoogleAuthActionTypes,
): RootState['googleAuth'] {
  switch (action.type) {
    case 'SET_GOOGLE_ACCESS_TOKEN':
      return { accessToken: action.payload };
    default:
      return state;
  }
}
