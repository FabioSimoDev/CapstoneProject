import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import userDataReducer from "./reducers/userDataReducer";
import themeReducer from "./reducers/themeReducer";
import userProfileReducer from "./reducers/userProfileReducer";
import postReducer from "./reducers/postReducer";
import likeReducer from "./reducers/likeReducer";
import commentReducer from "./reducers/commentReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  userData: userDataReducer,
  theme: themeReducer,
  userProfile: userProfileReducer,
  posts: postReducer,
  likes: likeReducer,
  comments: commentReducer
});

const store = configureStore({ reducer: rootReducer });

export default store;
