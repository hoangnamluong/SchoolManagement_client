import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LogoutIcon from "@mui/icons-material/Logout";

import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";

const Logout = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = (e) => {
    Cookies.remove("refresh_token");
    dispatch({ type: "USER_LOGOUT" });
    signOut(auth);
    toast.success("Logout success!");
    navigate("/", { replace: true });
  };

  return (
    <span onClick={handleClick} className="logout secondary-btn fw-300">
      <LogoutIcon />
    </span>
  );
};
export default Logout;
