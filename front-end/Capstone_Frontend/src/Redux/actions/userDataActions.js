import { USERS_DATA_ENDPOINT, fetchApi } from "../../utils/backEndUtils.js";

export const ActionTypes = {
  LOAD_USER_DATA_REQUEST: "LOAD_USER_DATA_REQUEST",
  LOAD_USER_DATA_SUCCESS: "LOAD_USER_DATA_SUCCESS",
  LOAD_USER_DATA_FAILURE: "LOAD_USER_DATA_FAILURE",
  SET_CURRENT_USER: "SET_CURRENT_USER"
};

export const loadUserDataRequest = () => ({
  type: ActionTypes.LOAD_USER_DATA_REQUEST
});

export const loadUserDataSuccess = (userData) => ({
  type: ActionTypes.LOAD_USER_DATA_SUCCESS,
  payload: userData
});

export const loadUserDataFailure = (error) => ({
  type: ActionTypes.LOAD_USER_DATA_FAILURE,
  payload: error
});

export const setCurrentUser = (userData) => ({
  type: ActionTypes.SET_CURRENT_USER,
  payload: userData
});

export const loadUserData = (token) => {
  return async (dispatch) => {
    dispatch(loadUserDataRequest());
    console.log("inizio");
    try {
      const data = await fetchApi(
        USERS_DATA_ENDPOINT.PERSONAL_DATA,
        "GET",
        {},
        token
      );
      console.log("tutto ok");
      dispatch(loadUserDataSuccess(data));
      dispatch(setCurrentUser(data));
    } catch (error) {
      console.log("errore");
      console.log(error);
      //se error.status === 404 vuol dire che il token rappresenta uno user non presente nel DB.
      dispatch(loadUserDataFailure(error.status));
    }
  };
};

export const loadUserDataById = (token, id) => {
  return async (dispatch) => {
    dispatch(loadUserDataRequest());
    console.log("inizio");
    try {
      const data = await fetchApi(
        USERS_DATA_ENDPOINT.BY_ID_DATA + id,
        "GET",
        {},
        token
      );
      console.log("tutto ok");
      dispatch(loadUserDataSuccess(data));
      return data;
    } catch (error) {
      console.log("errore");
      dispatch(loadUserDataFailure(error.detail));
      console.error(error.detail);
    }
  };
};
