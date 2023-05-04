import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import apiEndpoints from "../../config/apiEndpoints";
import { axiosPrivate } from "../../app/api/axiosClient";
import RESPONSE_STATUS from "../../config/RESPONSE_STATUS";
import { toast } from "react-toastify";

const initialState = {
  current_user: {},
  status: "idle",
  update_status: "idle",
  error: "",
};

export const getCurrentUser = createAsyncThunk(
  "current-user/get",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { data, status } = await axiosPrivate.get(apiEndpoints.currentUser);

      if (RESPONSE_STATUS.some((i) => i === status)) {
        return data;
      }
    } catch (err) {
      if (err.response && err.response.data.error_description) {
        return rejectWithValue(err.response.data.error_description);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const updateCurrentUser = createAsyncThunk(
  "current-user/patch",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { data, status } = await axiosPrivate.patch(apiEndpoints.user, arg);

      if (RESPONSE_STATUS.some((i) => i === status)) {
        toast.success("Update Profile Succeed");
        return data;
      }
    } catch (err) {
      toast.error("Update Profile Failed");
      if (err.response && err.response.data.error_description) {
        return rejectWithValue(err.response.data.error_description);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload;

      if (user) {
        state.current_user = { ...user };
      }
    },

    clearUser: (state, action) => {
      state.current_user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.current_user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(updateCurrentUser.pending, (state, action) => {
        state.update_status = "pending";
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.update_status = "fulfilled";
        state.current_user = action.payload;
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.update_status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.current_user;
export const selectStatus = (state) => state.user.status;
export const selectUpdateStatus = (state) => state.user.update_status;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
