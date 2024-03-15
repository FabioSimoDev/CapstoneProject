import { LIKES_ENDPOINTS, fetchApi } from "../../utils/backEndUtils";

export const ActionTypes = {
  LIKES_REQUEST: "LIKES_REQUEST",
  LIKES_SUCCESS: "LIKES_SUCCESS",
  LIKES_FAILURE: "LIKES_FAILURE"
};

export const likeRequest = () => ({
  type: ActionTypes.LIKES_REQUEST
});

export const likeSuccess = (data) => ({
  type: ActionTypes.LIKES_SUCCESS,
  payload: data
});

export const likeFailure = (error) => ({
  type: ActionTypes.LIKES_FAILURE,
  payload: error
});

export const checkUserLikedPost = (token, postId) => {
  return async (dispatch) => {
    dispatch(likeRequest());
    try {
      const data = await fetchApi(
        LIKES_ENDPOINTS.CHECK_USER_LIKED_POST + `?postId=${postId}`,
        "GET",
        {},
        token
      );
      dispatch(likeSuccess({ ["postId"]: postId, ["liked"]: data }));
      return data;
    } catch (error) {
      console.log("errore");
      dispatch(likeFailure(error.detail));
      console.error(error.detail);
    }
  };
};

export const setLike = (token, postId) => {
  return async (dispatch) => {
    dispatch(likeRequest());
    try {
      const data = await fetchApi(
        LIKES_ENDPOINTS.ADD_LIKE + `?postId=${postId}`,
        "POST",
        {},
        token
      );

      return data;
    } catch (error) {
      console.log(error);
      dispatch(likeFailure(error.detail));
      console.error(error.detail);
    }
  };
};

export const removeLike = (token, postId) => {
  return async (dispatch) => {
    dispatch(likeRequest());
    try {
      const data = await fetchApi(
        LIKES_ENDPOINTS.REMOVE_LIKE + `?postId=${postId}`,
        "DELETE",
        {},
        token
      );

      return data;
    } catch (error) {
      console.log(error);
      dispatch(likeFailure(error.detail));
      // console.error(error.detail);
    }
  };
};
