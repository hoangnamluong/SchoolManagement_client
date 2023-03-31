import { Outlet } from "react-router-dom";
import DashSidebar from "./DashSidebar";
import "./dash.scss";

const DashLayout = () => {
  return (
    <div className="dash">
      <DashSidebar />
      <div className="dash__inner">
        <Outlet />
      </div>
    </div>
  );
};
export default DashLayout;
