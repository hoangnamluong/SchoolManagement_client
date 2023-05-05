import { useEffect, useRef } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { refresh } from "../../features/auth/authSlice";
import useAuthSelector from "../../hooks/Selectors/useAuthSelector";
import usePersist from "../../hooks/usePersist";

//components
import SpinnerComponent from "../misc/SpinnerComponent";

const PersistsLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [persist] = usePersist();

  const { accessToken, refreshStatus } = useAuthSelector();

  const runOnce = useRef(false);

  const [isLoading, setIsLoading] = useState(false);

  // const [refresh, { isLoading, isSuccess, isError, isUninitialized }] =
  //   useRefreshMutation();

  useEffect(() => {
    let isMounted = true;

    if (runOnce.current) return;

    if (!Cookies.get("refresh_token")) toast.info("Please login again.");

    const refreshToken = () => {
      try {
        setIsLoading(true);

        const formRefresh = new FormData();
        formRefresh.append("grant_type", "refresh_token");
        formRefresh.append("client_id", import.meta.env.VITE_CLIENT_ID);
        formRefresh.append("client_secret", import.meta.env.VITE_CLIENT_SECRET);
        formRefresh.append("refresh_token", Cookies.get("refresh_token"));

        dispatch(refresh(formRefresh));
      } catch (err) {
        navigate("/login", { replace: true });
        toast.info("Please Login Again");
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    if (!accessToken && refreshStatus === "idle" && persist) refreshToken();

    return () => {
      runOnce.current = true;

      isMounted = false;
    };
  }, []);

  // let content;
  // if (isLoading) {
  //   console.log("loading");
  //   content = <SpinnerComponent />;
  // } else if (isError) {
  //   console.log("error");
  //   toast.error("Oops, something's wrong. Please login again");
  //   navigate("/login", { replace: true });
  //   content = <>error</>;
  // } else if (isSuccess && trueSuccess) {
  //   console.log("success");
  //   content = <Outlet />;
  // } else if (accessToken && isUninitialized) {
  //   console.log("Uninit");
  //   content = <Outlet />;
  // }

  return !Cookies.get("refresh_token") ? (
    <Navigate to={"/login"} replace={true} />
  ) : isLoading ? (
    <SpinnerComponent />
  ) : (
    <Outlet />
  );
};
export default PersistsLogin;
