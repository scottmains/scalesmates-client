import { ThunkAction } from "redux-thunk";
import { RootState } from "../state";
import { UserActionTypes, UserAction } from "./userTypes";
import { login } from "../../services/authService";

export const loginUser = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, UserAction> => async (dispatch) => {
  try {
    const token = await login(email, password);
    localStorage.setItem("authToken", token);
    dispatch({
      type: UserActionTypes.LOGIN_SUCCESS,
      payload: token,
    });
  } catch (error) {
    console.log(((error as Error).message));
  }
};
