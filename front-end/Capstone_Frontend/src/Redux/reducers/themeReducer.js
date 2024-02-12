import { ActionTypes } from "../actions/themeActions";

const initialState = {
  darkMode: false
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_DARK_MODE:
      return { ...state, darkMode: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
