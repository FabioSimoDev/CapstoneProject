import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import userDataReducer from "./reducers/userDataReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  userData: userDataReducer
});

const store = configureStore({ reducer: rootReducer });

export default store;
