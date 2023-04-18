import apiSlice from "../../app/api/apiSlice";
import { setUser } from "../user/userSlice";
import { logout, setCredentials } from "./authSlice";
import Cookies from "js-cookie";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (form) => ({
        url: "/authenticate/token/",
        method: "POST",
        body: form,
      }),

      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { access_token, refresh_token, user_info } = data;

          if (data) {
            Cookies.set("refresh_token", refresh_token, { expires: 1 });
            dispatch(setCredentials({ access_token }));
            dispatch(setUser({ user: user_info }));
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),

    refresh: builder.mutation({
      query: (form) => ({
        url: "/authenticate/token/",
        method: "POST",
        body: form,
      }),

      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { access_token, refresh_token, user_info } = data;

          if (data) {
            Cookies.set("refresh_token", refresh_token);
            dispatch(setCredentials({ access_token }));
            dispatch(setUser({ user: user_info }));
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation } = authApiSlice;
