import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { access_token } = getState().auth;

    if (access_token) {
      headers.set("Authorization", `Bearer ${access_token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    //refresh formdata
    const form = new FormData();
    form.append("grant_type", "refresh_token");
    form.append("client_id", import.meta.env.VITE_CLIENT_ID);
    form.append("client_secret", import.meta.env.VITE_CLIENT_SECRET);
    form.append("refresh_token", Cookies.get("refresh"));

    const refreshResult = await baseQuery(
      {
        url: "/o/token/",
        method: "POST",
        body: form,
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      api.dispatch(
        setCredentials({
          access_token: refreshResult.data.access_token,
          refresh_token: refreshResult.data.refresh_token,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else if (refreshResult?.error?.status === 403) {
      refreshResult.error.data.message = "Your login has expired";

      return refreshResult;
    }
  }

  return result;
};

export default createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [""],
  endpoints: (builder) => ({}),
});
