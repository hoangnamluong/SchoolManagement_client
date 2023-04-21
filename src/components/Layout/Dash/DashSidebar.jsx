import { Link, useLocation } from "react-router-dom";

//icon
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";

//components
import Avatar from "../../User/Avatar";

//pics
import Logout from "../../misc/Logout";

//hooks
import useAuthSelector from "../../../hooks/Selectors/useAuthSelector";

const COURSE_REGEX = /user\/courses/;
const HOME_REGEX = /user\/home/;
const PROFILE_REGEX = /user\/profile/;

const DashSidebar = () => {
  const { pathname } = useLocation();

  const { userInfo } = useAuthSelector();
  const { image, username } = userInfo;

  return (
    <div className="dash__sidebar background-gradient">
      <div className="sidebar__inner">
        <div className="sidebar__items">
          <h1>Brand</h1>
          <ul>
            <li className={HOME_REGEX.test(pathname) ? "active" : ""}>
              <Link to={"/user/home"}>
                <span>
                  <HomeIcon />
                </span>
                Home
              </Link>
            </li>
            <li className={COURSE_REGEX.test(pathname) ? "active" : ""}>
              <Link to={"/user/courses"}>
                <span>
                  <SchoolIcon />
                </span>
                Courses
              </Link>
            </li>
            <li className={PROFILE_REGEX.test(pathname) ? "active" : ""}>
              <Link to={"/user/profile"}>
                <span>
                  <PersonIcon />
                </span>
                Profile
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebar__user-info">
          <Link to={"/user/profile"}>
            <Avatar img={image} username={username} />
            <p className="fw-400">{username}</p>
          </Link>
          <Logout />
        </div>
      </div>
    </div>
  );
};
export default DashSidebar;
