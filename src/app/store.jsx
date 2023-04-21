import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authReducer from "../features/auth/authSlice";
import courseReducer from "../features/course/courseSlice";
import topicReducer from "../features/topic/topicSlice";

const appReducer = combineReducers({
  auth: authReducer,
  course: courseReducer,
  topic: topicReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    storage.removeItem("persist:root");

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  devTools: true,
});
