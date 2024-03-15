import { ActionTypes } from "../actions/postActions";

const initialState = {
  isLoading: false,
  posts: null,
  error: null
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_POSTS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case ActionTypes.GET_POSTS_SUCCESS:
      return { ...state, isLoading: false, posts: action.payload };
    case ActionTypes.GET_POSTS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default postReducer;
