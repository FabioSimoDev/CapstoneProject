import { ActionTypes } from "../actions/userDataActions";

const initialState = {
  isLoading: false,
  data: null,
  error: null
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_USER_DATA_REQUEST:
      return { ...state, isLoading: true, error: null };
    case ActionTypes.LOAD_USER_DATA_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case ActionTypes.LOAD_USER_DATA_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default userDataReducer;
