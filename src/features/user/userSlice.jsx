import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload;

      if (user) {
        state.user = { ...user };
      }
    },

    clearUser: (state, action) => {
      state.user = {};
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.user;

export default userSlice.reducer;
