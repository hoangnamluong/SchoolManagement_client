import { Link, useLocation } from "react-router-dom";

//icon
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import ViewListIcon from "@mui/icons-material/ViewList";

//components
import Avatar from "../../User/Avatar";

//pics
import Logout from "../../misc/Logout";

//hooks
import useUserSelector from "../../../hooks/Selectors/useUserSelector";
import useAuthSelector from "../../../hooks/Selectors/useAuthSelector";

import { toggleSidebar } from "../../../context/action/SidebarAction";

import ROLE from "../../../data/ROLE";

const COURSE_REGEX = /user\/courses/;
const HOME_REGEX = /user\/home/;
const PROFILE_REGEX = /user\/profile/;
const GRADES_REGEX = /user\/grades/;

const DashSidebar = ({ isOpen = false, dispatch = null }) => {
  const { pathname } = useLocation();

  const { currentUser } = useUserSelector();
  const { image, username } = currentUser;
  const { userInfo } = useAuthSelector();

  const handleOpenSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="dash__sidebar background-gradient">
      <span
        className={`burger ${isOpen ? "close" : ""}`}
        onClick={handleOpenSidebar}
      >
        <div className="first"></div>
        <div className="second"></div>
        <div className="third"></div>
      </span>
      <div className={`sidebar__inner ${isOpen ? "active" : ""}`}>
        <div className="sidebar__items">
          <h1>Brand</h1>
          <ul>
            <li className={HOME_REGEX.test(pathname) ? "active" : ""}>
              <Link to={"/user/home"}>
                <span>
                  <HomeIcon />
                </span>
                <p className="m-0 fw-400">Home</p>
              </Link>
            </li>
            <li className={COURSE_REGEX.test(pathname) ? "active" : ""}>
              <Link to={"/user/courses"}>
                <span>
                  <SchoolIcon />
                </span>
                <p className="m-0 fw-400">Courses</p>
              </Link>
            </li>
            {userInfo.role === ROLE.STUDENT && (
              <li className={GRADES_REGEX.test(pathname) ? "active" : ""}>
                <Link to={"/user/grades"}>
                  <span>
                    <ViewListIcon />
                  </span>
                  <p className="m-0 fw-400">Your Grades</p>
                </Link>
              </li>
            )}
            <li className={PROFILE_REGEX.test(pathname) ? "active" : ""}>
              <Link to={"/user/profile"}>
                <span>
                  <PersonIcon />
                </span>
                <p className="m-0 fw-400">Profile</p>
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
