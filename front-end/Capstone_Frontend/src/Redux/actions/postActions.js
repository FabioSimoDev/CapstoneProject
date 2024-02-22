import { POSTS_ENDPOINTS, fetchApi } from "../../utils/backEndUtils";

export const ActionTypes = {
  GET_POSTS_REQUEST: "GET_POSTS_REQUEST",
  GET_POSTS_SUCCESS: "GET_POSTS_SUCCESS",
  GET_POSTS_FAILURE: "GET_POSTS_FAILURE"
};

export const getPostsRequest = () => ({
  type: ActionTypes.GET_POSTS_REQUEST
});

export const getPostSuccess = (posts) => ({
  type: ActionTypes.GET_POSTS_SUCCESS,
  payload: posts
});

export const getPostFailure = (error) => ({
  type: ActionTypes.GET_POSTS_FAILURE,
  payload: error
});

export const getPersonalPosts = (token) => {
  return async (dispatch) => {
    dispatch(getPostsRequest());
    try {
      const data = await fetchApi(
        POSTS_ENDPOINTS.GET_PERSONAL_POSTS,
        "GET",
        {},
        token
      );
      dispatch(getPostSuccess(data));
    } catch (error) {
      console.log("errore");
      dispatch(getPostFailure(error.detail));
      console.error(error.detail);
    }
  };
};

export const getAllPosts = (token) => {
  return async (dispatch) => {
    dispatch(getPostsRequest());
    try {
      const data = await fetchApi(
        POSTS_ENDPOINTS.GET_ALL_POSTS,
        "GET",
        {},
        token
      );
      dispatch(getPostSuccess(data));
    } catch (error) {
      dispatch(getPostFailure(error.detail));
    }
  };
};
