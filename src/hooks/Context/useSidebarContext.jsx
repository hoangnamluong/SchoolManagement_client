import { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";

const useSidebarContext = () => {
  const context = useContext(SidebarContext);

  if (!context)
    console.log("SidebarContext must be used inside of Its Provider");

  return context;
};
export default useSidebarContext;
