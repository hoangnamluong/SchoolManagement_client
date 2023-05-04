import { Outlet, Navigate } from "react-router-dom";

import useAuthSelector from "../../hooks/Selectors/useAuthSelector";

import { toast } from "react-toastify";

const RequiredRole = ({ role }) => {
  const { userInfo } = useAuthSelector();

  if (!userInfo) {
    toast.warning("Login Required");
  } else if (userInfo.role !== role) {
    toast.warning("Access Denied");
  }

  return userInfo ? (
    userInfo.role === role ? (
      <Outlet />
    ) : (
      <Navigate to={-1} replace={true} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
};
export default RequiredRole;
