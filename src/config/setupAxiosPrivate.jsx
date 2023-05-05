import axiosClient, { axiosPrivate } from "../app/api/axiosClient";
import Cookies from "js-cookie";
import convertObjectToFormData from "../utils/convertObjectToFormData";
import apiEndpoints from "./apiEndpoints";
import RESPONSE_STATUS from "./RESPONSE_STATUS";
import store from "../app/store";

const setupAxiosPrivate = () => {
  axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config?.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${
          store.getState().auth.access_token
        }`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;

      if (
        (error?.response?.status === 403 ||
          error?.response?.status === 401 ||
          error?.response?.status === 500) &&
        !prevRequest?.sent
      ) {
        try {
          const form = convertObjectToFormData({
            grant_type: "refresh_token",
            client_id: import.meta.env.VITE_CLIENT_ID,
            client_secret: import.meta.env.VITE_CLIENT_SECRET,
            refresh_token: Cookies.get("refresh_token"),
          });

          const { data, status } = await axiosClient.post(
            apiEndpoints.auth,
            form
          );

          if (RESPONSE_STATUS.some((i) => i === status)) {
            const { access_token, refresh_token, user_info } = data;

            store.dispatch(
              setCredentials({
                access_token,
                refresh_token,
                user_info,
              })
            );

            prevRequest.headers["Authorization"] = `Bearer ${
              store.getState().auth.access_token
            }`;
          }

          return axiosPrivate(prevRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosPrivate;
