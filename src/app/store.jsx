import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import courseReducer from "../features/course/courseSlice";

const reducers = combineReducers({
  auth: authReducer,
  course: courseReducer,
});

export default configureStore({
  reducer: reducers,
  devTools: true,
});
