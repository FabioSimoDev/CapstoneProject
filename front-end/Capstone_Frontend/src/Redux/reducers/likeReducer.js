import { ActionTypes } from "../actions/likeAction";

const initialState = {
  isLoading: false,
  likes: null,
  error: null
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LIKES_REQUEST:
      return { ...state, isLoading: true, error: null };
    case ActionTypes.LIKES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        likes: { ...state.likes, [action.payload.postId]: action.payload.liked }
      };
    case ActionTypes.LIKES_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default likeReducer;
