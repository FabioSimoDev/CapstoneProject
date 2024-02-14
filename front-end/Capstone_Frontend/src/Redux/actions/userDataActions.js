import { USERS_DATA_ENDPOINT, fetchApi } from "../../utils/backEndUtils.js";

export const ActionTypes = {
  LOAD_USER_DATA_REQUEST: "LOAD_USER_DATA_REQUEST",
  LOAD_USER_DATA_SUCCESS: "LOAD_USER_DATA_SUCCESS",
  LOAD_USER_DATA_FAILURE: "LOAD_USER_DATA_FAILURE"
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
    } catch (error) {
      console.log("errore");
      console.log(error);
      dispatch(loadUserDataFailure(error.detail));
      console.error(error.detail);
    }
  };
};
