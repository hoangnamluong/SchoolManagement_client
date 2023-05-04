import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../app/api/axiosClient";
import apiEndpoints from "../../config/apiEndpoints";
import RESPONSE_STATUS from "../../config/RESPONSE_STATUS";
import Cookies from "js-cookie";
import { setUser } from "../user/userSlice";

const ONE_HOUR = 1 / 24;

const initialState = {
  access_token: null,
  user_info: null,
  status: "idle", //idle pending fulfilled rejected,
  error: "",
  refresh_status: "idle",
  signup_status: "idle",
};

export const login = createAsyncThunk(
  "/authentication/login",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      const { data, status } = await axiosClient.post(apiEndpoints.auth, arg, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (RESPONSE_STATUS.some((i) => i === status)) {
        const { access_token, refresh_token, user_info } = data;

        return { access_token, refresh_token, user_info };
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data.error_description) {
        return rejectWithValue(err.response.data.error_description);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const refresh = createAsyncThunk(
  "/authenticate/refresh",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      const { data, status } = await axiosClient.post(apiEndpoints.auth, arg, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (RESPONSE_STATUS.some((i) => i === status)) {
        const { access_token, refresh_token, user_info } = data;

        return { access_token, refresh_token, user_info };
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data.error_description) {
        return rejectWithValue(err.response.data.error_description);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const signup = createAsyncThunk(
  "/authenticate/signup",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      const { data, status } = await axiosClient.post(apiEndpoints.user, arg, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (RESPONSE_STATUS.some((i) => i === status)) {
        const { access_token, refresh_token, user_info } = data;

        dispatch(setUser({ user: user_info }));

        Cookies.set("refresh_token", refresh_token, {
          expires: ONE_HOUR,
          secure: true,
        });

        return access_token;
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data.error_description) {
        return rejectWithValue(err.response.data.error_description);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access_token, refresh_token, user_info } = action.payload;

      state.access_token = access_token;
      state.user_info = user_info;
      Cookies.set("refresh_token", refresh_token, {
        expires: ONE_HOUR,
        secure: true,
      });
      state.refresh_status = "fulfilled";
    },

    logout: (state, action) => {
      state.access_token = null;
      state.status = "idle";
      state.refresh = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { access_token, refresh_token, user_info } = action.payload;

        state.status = "fulfilled";
        state.access_token = access_token;
        state.user_info = user_info;
        Cookies.set("refresh_token", refresh_token, {
          expires: ONE_HOUR,
          secure: true,
        });
      })
      .addCase(login.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        const { access_token, refresh_token, user_info } = action.payload;

        state.refresh_status = "fulfilled";
        state.access_token = access_token;
        state.user_info = user_info;
        Cookies.set("refresh_token", refresh_token, {
          expires: ONE_HOUR,
          secure: true,
        });
      })
      .addCase(refresh.pending, (state, action) => {
        state.refresh_status = "pending";
      })
      .addCase(refresh.rejected, (state, action) => {
        state.refresh_status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAccessToken = (state) => state.auth.access_token;
export const selectUserInfo = (state) => state.auth.user_info;
export const selectStatus = (state) => state.auth.status;
export const selectRefreshStatus = (state) => state.auth.refresh_status;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
