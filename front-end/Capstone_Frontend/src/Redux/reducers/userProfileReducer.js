import { ActionTypes } from "../actions/userProfileActions";

const initialState = {
  isLoading: false,
  data: null,
  error: null
};

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case ActionTypes.USER_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case ActionTypes.USER_PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userProfileReducer;
