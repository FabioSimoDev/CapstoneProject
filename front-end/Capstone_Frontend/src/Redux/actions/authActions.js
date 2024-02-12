import { AUTH_ENDPOINTS, fetchApi } from "../../utils/backEndUtils.js";

export const ActionTypes = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",
  RESET_AUTH_STATE: "RESET_AUTH_STATE"
};

export const loginRequest = (credentials) => ({
  type: ActionTypes.LOGIN_REQUEST,
  payload: credentials
});

export const loginSuccess = (token) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload: token
});

export const loginFailure = (error) => ({
  type: ActionTypes.LOGIN_FAILURE,
  payload: error
});

export const registerRequest = (userData) => ({
  type: ActionTypes.REGISTER_REQUEST,
  payload: userData
});

export const registerSuccess = () => ({ type: ActionTypes.REGISTER_SUCCESS });

export const registerFailure = (error) => ({
  type: ActionTypes.REGISTER_FAILURE,
  payload: error
});

export const resetAuthState = () => ({ type: ActionTypes.RESET_AUTH_STATE });

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest(credentials));
    try {
      const data = await fetchApi(AUTH_ENDPOINTS.LOGIN, "POST", credentials);
      localStorage.setItem("TOKEN", data.token);
      dispatch(loginSuccess(data.token));
    } catch (error) {
      dispatch(loginFailure(error.detail));
      console.error(error.detail);
    }
  };
};

export const register = (userData) => {
  return async (dispatch) => {
    dispatch(registerRequest(userData));
    try {
      await fetchApi(AUTH_ENDPOINTS.REGISTER, "POST", userData);
      dispatch(registerSuccess());
    } catch (error) {
      dispatch(registerFailure(error.detail));
      console.error(error.detail);
      return error;
    }
  };
};
