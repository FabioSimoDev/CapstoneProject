const BASE_URL = "http://localhost:3001";
const LOGIN_ENDPOINT = "/auth/login";
const REGISTER_ENDPOINT = "/auth/register";

export const ActionTypes = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE"
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

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest(credentials));
    try {
      const response = await fetch(BASE_URL + LOGIN_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(loginSuccess(data.token));
      } else {
        throw response;
      }
    } catch (error) {
      const body = await error.json();
      dispatch(loginFailure(body.detail));
      console.error(body.detail);
    }
  };
};

export const register = (userData) => {
  return async (dispatch) => {
    dispatch(registerRequest(userData));
    try {
      const response = await fetch(BASE_URL + REGISTER_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        dispatch(registerSuccess());
      } else {
        throw response;
      }
    } catch (error) {
      const body = await error.json();
      dispatch(registerFailure(body.detail));
      console.error(body.detail);
    }
  };
};
