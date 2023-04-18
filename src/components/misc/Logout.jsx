import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearUser } from "../../features/user/userSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../features/auth/authSlice";

const Logout = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = (e) => {
    Cookies.remove("refresh_token");
    dispatch(clearUser());
    dispatch(logout());
    toast.success("Logout success!");
    navigate("/", { replace: true });
  };

  return (
    <button onClick={handleClick} className="secondary-btn">
      <LogoutIcon /> Logout
    </button>
  );
};
export default Logout;
