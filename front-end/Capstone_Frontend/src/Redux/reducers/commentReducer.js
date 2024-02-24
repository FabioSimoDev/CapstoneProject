import { ActionTypes } from "../actions/commentActions";

const initialState = {
  isLoading: false,
  comments: null,
  error: null
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.COMMENTS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case ActionTypes.GET_COMMENTS_SUCCESS:
      return { ...state, isLoading: false, comments: action.payload };
    case ActionTypes.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: {
          ...state.comments,
          content: [...state.comments.content, action.payload]
        }
      };
    case ActionTypes.COMMENTS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default commentReducer;
