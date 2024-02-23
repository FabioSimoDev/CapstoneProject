import { COMMENTS_ENDPOINT, fetchApi } from "../../utils/backEndUtils";

export const ActionTypes = {
  COMMENTS_REQUEST: "COMMENTS_REQUEST",
  COMMENTS_SUCCESS: "COMMENTS_SUCCESS",
  COMMENTS_FAILURE: "COMMENTS_FAILURE"
};

export const commentsRequest = () => ({
  type: ActionTypes.COMMENTS_REQUEST
});

export const commentsSuccess = (comments) => ({
  type: ActionTypes.COMMENTS_SUCCESS,
  payload: comments
});

export const commentsFailure = (error) => ({
  type: ActionTypes.COMMENTS_FAILURE,
  payload: error
});

export const getPostComments = (token, postId) => {
  return async (dispatch) => {
    dispatch(commentsRequest());
    try {
      const data = await fetchApi(
        COMMENTS_ENDPOINT.GET_POST_COMMENTS + postId,
        "GET",
        {},
        token
      );
      dispatch(commentsSuccess(data));
    } catch (error) {
      console.log("errore");
      dispatch(commentsFailure(error.detail));
      console.error(error.detail);
    }
  };
};

export const createComment = (token, postId, commentText) => {
  return async (dispatch) => {
    dispatch(commentsRequest());
    try {
      const data = await fetchApi(
        COMMENTS_ENDPOINT.CREATE_COMMENT + `?postId=${postId}`,
        "POST",
        { content: commentText },
        token
      );
      dispatch(commentsSuccess(data));
    } catch (error) {
      console.log("errore");
      dispatch(commentsFailure(error.detail));
      console.error(error.detail);
    }
  };
};
