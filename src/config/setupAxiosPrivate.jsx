import axiosClient, { axiosPrivate } from "../app/api/axiosClient";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refresh, setCredentials } from "../features/auth/authSlice";
import useAuthSelector from "../hooks/Selectors/useAuthSelector";
import Cookies from "js-cookie";
import convertObjectToFormData from "../utils/convertObjectToFormData";
import apiEndpoints from "./apiEndpoints";
import RESPONSE_STATUS from "./RESPONSE_STATUS";

const setupAxiosPrivate = () => {
  const dispatch = useDispatch();

  const { accessToken } = useAuthSelector();
  const refreshToken = Cookies.get("refresh_token");

  axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config?.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
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
        prevRequest.url !==
          import.meta.env.VITE_SERVER_URL.concat(apiEndpoints.auth) &&
        error.response
      ) {
        if (
          (error?.response?.status === 403 ||
            error?.response?.status === 401) &&
          !prevRequest?.sent &&
          refreshToken
        ) {
          try {
            const form = convertObjectToFormData({
              grant_type: "refresh_token",
              client_id: import.meta.env.VITE_CLIENT_ID,
              client_secret: import.meta.env.VITE_CLIENT_SECRET,
              refresh_token: refreshToken,
            });

            const { data, status } = await axiosClient.post(
              apiEndpoints.auth,
              form
            );

            if (RESPONSE_STATUS.some((i) => i === status)) {
              const { access_token, refresh_token, user_info } = data;

              dispatch(
                setCredentials({
                  access_token,
                  refresh_token,
                  user_info,
                })
              );

              prevRequest.headers["Authorization"] = `Bearer ${access_token}`;
            }

            return axiosPrivate(prevRequest);
          } catch (err) {
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    }
  );

  return axiosPrivate;
};

export default setupAxiosPrivate;
