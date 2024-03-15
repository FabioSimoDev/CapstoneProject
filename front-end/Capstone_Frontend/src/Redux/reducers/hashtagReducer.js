import { ActionTypes } from "../actions/hashtagActions";

const initialState = {
  isLoading: false,
  hashtags: null,
  error: null
};

const hashtagReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.HASHTAG_REQUEST:
      return { ...state, isLoading: true, error: null };
    case ActionTypes.HASHTAG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hashtags: { ...state.hashtags, ...action.payload }
      };
    case ActionTypes.HASHTAG_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default hashtagReducer;
