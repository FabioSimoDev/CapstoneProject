import { USER_PROFILE_ENDPOINT } from "../../utils/backEndUtils";
import { fetchApi } from "../../utils/backEndUtils";
import { loadUserDataSuccess } from "./userDataActions";

export const ActionTypes = {
  USER_PROFILE_UPDATE_REQUEST: "USER_PROFILE_UPDATE_REQUEST",
  USER_PROFILE_UPDATE_SUCCESS: "USER_PROFILE_UPDATE_SUCCESS",
  USER_PROFILE_UPDATE_FAILURE: "USER_PROFILE_UPDATE_FAILURE"
};

export const userProfileUpdateRequest = () => ({
  type: ActionTypes.USER_PROFILE_UPDATE_REQUEST
});

export const userProfileUpdateSuccess = (URL) => ({
  type: ActionTypes.USER_PROFILE_UPDATE_SUCCESS,
  payload: URL
});

export const userProfileUpdateFailure = (error) => ({
  type: ActionTypes.USER_PROFILE_UPDATE_FAILURE,
  payload: error
});

export const updateAvatar = (token, formData) => {
  return async (dispatch) => {
    dispatch(userProfileUpdateRequest());
    console.log("inizio");
    try {
      const data = await fetchApi(
        USER_PROFILE_ENDPOINT.UPLOAD_AVATAR,
        "POST",
        formData,
        token
      );
      console.log("tutto ok");
      dispatch(userProfileUpdateSuccess(data));
      dispatch(loadUserDataSuccess(data));
    } catch (error) {
      console.log("errore");
      //se error.status === 404 vuol dire che il token rappresenta uno user non presente nel DB.
      dispatch(userProfileUpdateFailure(error.detail));
      console.error(error.detail);
    }
  };
};

export const updateUser = (token, userData) => {
  return async (dispatch) => {
    dispatch(userProfileUpdateRequest());
    console.log("inizio");
    try {
      const data = await fetchApi(
        USER_PROFILE_ENDPOINT.UPDATE_USER,
        "PUT",
        userData,
        token
      );
      console.log("tutto ok");
      dispatch(userProfileUpdateSuccess(data));
      dispatch(loadUserDataSuccess(data));
    } catch (error) {
      console.log("errore");
      //se error.status === 404 vuol dire che il token rappresenta uno user non presente nel DB.
      dispatch(userProfileUpdateFailure(error.detail));
      console.error(error.detail);
    }
  };
};
