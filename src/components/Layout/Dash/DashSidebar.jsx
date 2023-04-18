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

const items = [
  {
    title: "Home",
    path: "/user/home",
    icon: <HomeIcon />,
  },
  {
    title: "Courses",
    path: "/user/course",
    icon: <SchoolIcon />,
  },
  {
    title: "Profile",
    path: "/user/profile",
    icon: <PersonIcon />,
  },
];

const DashSidebar = () => {
  const { pathname } = useLocation();

  const { userInfo } = useAuthSelector();
  const { image, username } = userInfo;

  const navItemsRender = items.map((item) => (
    <li
      key={item.title.toLowerCase()}
      className={pathname === item.path ? "active" : ""}
    >
      <Link to={item.path}>
        <span>{item.icon}</span>
        {item.title}
      </Link>
    </li>
  ));

  return (
    <div className="dash__sidebar background-gradient">
      <div className="sidebar__inner">
        <div className="sidebar__items">
          <h1>Brand</h1>
          <ul>{navItemsRender}</ul>
        </div>
        <div className="sidebar__user-info">
          <Link>
            <Avatar img={image} alt="User" />
            <p>{username}</p>
          </Link>
          <Logout />
        </div>
      </div>
    </div>
  );
};
export default DashSidebar;
