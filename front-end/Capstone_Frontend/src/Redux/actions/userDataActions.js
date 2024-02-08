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
