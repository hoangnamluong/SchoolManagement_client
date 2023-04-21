import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import usePersist from "../../hooks/usePersist";

const CheckLoggedIn = () => {
  const [persist] = usePersist();

  const checked = Cookies.get("refresh_token") && persist;

  if (checked) return <Navigate to={"/user/home"} />;

  return <Outlet />;
};
export default CheckLoggedIn;
