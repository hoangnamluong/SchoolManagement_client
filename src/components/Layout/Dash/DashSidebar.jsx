import { Link } from "react-router-dom";

//icon
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";

//components
import Avatar from "../../User/Avatar";

//pics
import AvatarPic from "../../../assets/img/profile-pic.png";

const items = [
  {
    title: "Home",
    icon: <HomeIcon />,
  },
  {
    title: "Courses",
    icon: <SchoolIcon />,
  },
  {
    title: "Profiles",
    icon: <PersonIcon />,
  },
];

const DashSidebar = () => {
  const navItemsRender = items.map((item) => (
    <li key={item.title.toLowerCase()}>
      <Link>
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
        <Link className="sidebar__user-info">
          <Avatar img={AvatarPic} />
          <p>Username</p>
        </Link>
      </div>
    </div>
  );
};
export default DashSidebar;
