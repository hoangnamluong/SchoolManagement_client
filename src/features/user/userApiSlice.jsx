import apiSlice from "../../app/api/apiSlice";
import { setUser } from "./userSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => ({
        url: "/user/current-user/",
        method: "GET",
      }),

      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUser({ user: data }));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    updateCurrentUser: builder.mutation({
      query: (user) => ({
        url: "/user/current-user/",
        method: "POST",
        body: {
          ...user,
        },
      }),
    }),
  }),
});

export const { useGetCurrentUserQuery, useUpdateCurrentUserMutation } =
  userApiSlice;
