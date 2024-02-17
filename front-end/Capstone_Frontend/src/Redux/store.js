import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import userDataReducer from "./reducers/userDataReducer";
import themeReducer from "./reducers/themeReducer";
import userProfileReducer from "./reducers/userProfileReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  userData: userDataReducer,
  theme: themeReducer,
  userProfile: userProfileReducer
});

const store = configureStore({ reducer: rootReducer });

export default store;
