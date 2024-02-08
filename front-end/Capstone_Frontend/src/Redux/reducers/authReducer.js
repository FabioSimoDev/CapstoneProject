import { ActionTypes } from "../actions/authActions";

const initialState = {
  isLoading: false,
  token: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
    case ActionTypes.REGISTER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, isLoading: false, token: action.payload };
    case ActionTypes.REGISTER_SUCCESS:
      return { ...state, isLoading: false };
    case ActionTypes.LOGIN_FAILURE:
    case ActionTypes.REGISTER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
