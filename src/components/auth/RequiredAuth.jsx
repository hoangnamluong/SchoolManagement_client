import { toast } from "react-toastify";
import useAuthSelector from "../../hooks/Selectors/useAuthSelector";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import SpinnerComponent from "../misc/SpinnerComponent";
import usePersist from "../../hooks/usePersist";

const RequiredAuth = () => {
  const { accessToken, status, refreshStatus } = useAuthSelector();
  const [persist] = usePersist();

  let content = null;
  if (!persist && !accessToken) {
    toast.info("If you want to stay logged in please tick Remember me");
    content = <Navigate to={"/login"} replace={true} />;
  } else if (
    status === "pending" ||
    refreshStatus === "pending" ||
    !accessToken
  ) {
    content = (
      <div className="m-4">
        <SpinnerComponent />
      </div>
    );
  } else if (
    accessToken &&
    (status === "fulfilled" || refreshStatus === "fulfilled")
  ) {
    content = <Outlet />;
  } else if (status === "rejected" || refreshStatus === "rejected") {
    content = <Navigate to={"/login"} replace={true} />;
  }

  return content;
};

export default RequiredAuth;
