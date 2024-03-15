import { HASHTAGS_ENDPOINTS, fetchApi } from "../../utils/backEndUtils";

export const ActionTypes = {
  HASHTAG_REQUEST: "HASHTAG_REQUEST",
  HASHTAG_SUCCESS: "HASHTAG_SUCCESS",
  HASHTAG_FAILURE: "HASHTAG_FAILURE"
};

export const hashtagRequest = () => ({
  type: ActionTypes.HASHTAG_REQUEST
});

export const hashtagSuccess = (hashtags) => ({
  type: ActionTypes.HASHTAG_SUCCESS,
  payload: hashtags
});

export const hashtagFailure = (error) => ({
  type: ActionTypes.HASHTAG_FAILURE,
  payload: error
});

export const getPostHashtags = (token, postId) => {
  return async (dispatch) => {
    dispatch(hashtagRequest());
    try {
      const data = await fetchApi(
        HASHTAGS_ENDPOINTS.GET_POST_HASHTAGS + postId,
        "GET",
        {},
        token
      );
      dispatch(hashtagSuccess({ [postId]: data["content"] }));
      return data;
    } catch (error) {
      dispatch(hashtagFailure(error.detail));
    }
  };
};
