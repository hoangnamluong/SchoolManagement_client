import { combineReducers, configureStore } from "@reduxjs/toolkit";

import apiSlice from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";

const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

export default configureStore({
  reducer: reducers,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: true,
});
