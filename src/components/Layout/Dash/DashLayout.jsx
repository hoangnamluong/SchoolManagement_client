import "./dash.scss";
import DashSidebar from "./DashSidebar";

import { Outlet } from "react-router-dom";

import Chat from "../../Chat/Chat";
import useSidebarContext from "../../../hooks/Context/useSidebarContext";

const DashLayout = () => {
  const { isSidebarOpen, dispatch } = useSidebarContext();

  return (
    <div className="dash">
      <DashSidebar isOpen={isSidebarOpen} dispatch={dispatch} />
      <div
        className={`dash__inner ${isSidebarOpen ? "expanded" : "collapsed"}`}
      >
        <Outlet />
        <Chat />
      </div>
    </div>
  );
};
export default DashLayout;
